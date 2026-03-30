/*
    This file is part of the iText (R) project.
    Copyright (c) 1998-2026 Apryse Group NV
    Authors: Apryse Software.

    This program is offered under a commercial and under the AGPL license.
    For commercial licensing, contact us at https://itextpdf.com/sales.  For AGPL licensing, see below.

    AGPL licensing:
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
using System;
using System.Collections.Generic;
using System.IO;
using System.Text.RegularExpressions;

namespace ReleaseNotesGenerator.Utils
{
    public static class ReleaseNotesDiscoveryUtil
    {
        // Matches:
        //  release-itext-core-9-5-0.html
        //  release-pdfocr-4-1-2.html
        //  release_notes_9-5-0.pdf
        // Product: anything non-empty (non-greedy) between "release[-_]" and the version separator.
        // Version: digits separated by '-', at least 2 numeric parts (e.g. 9-5, 9-5-0).
        private static readonly Regex ReleaseFileRegex = new Regex(
            @"^release[-_](?<product>.+?)[-_](?<version>\d+(?:[.-]\d+)+)\.[^.]+$",
            RegexOptions.Compiled | RegexOptions.CultureInvariant | RegexOptions.IgnoreCase
        );

        /// <summary>
        /// Scans ReleaseNotesGenerator/resources/kb.itextpdf.com/itext for files matching:
        /// "release-${product}-${version}.*" (also supports "release_${product}_${version}.*")
        /// and returns a map: product -> version (version normalized to dot-separated form).
        /// If multiple versions for the same product are found, the highest semantic version wins (best effort).
        /// </summary>
        /// <param name="resourcesRootPath">
        /// Path to the ReleaseNotesGenerator/resources directory (e.g. Program.ResourceRootPath).
        /// </param>
        public static IDictionary<string, string> GetReleaseProductVersions(string resourcesRootPath)
        {
            if (string.IsNullOrWhiteSpace(resourcesRootPath))
                throw new ArgumentException("Resources root path must be provided.", nameof(resourcesRootPath));

            var itextFolder = Path.Combine(resourcesRootPath, "kb.itextpdf.com", "itext");
            if (!Directory.Exists(itextFolder))
                return new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);

            var map = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);

            foreach (var filePath in Directory.EnumerateFiles(itextFolder, "release*", SearchOption.TopDirectoryOnly))
            {
                var fileName = Path.GetFileName(filePath);
                var match = ReleaseFileRegex.Match(fileName);
                if (!match.Success)
                    continue;

                var product = match.Groups["product"].Value.Trim();
                var versionRaw = match.Groups["version"].Value.Trim();

                if (string.IsNullOrEmpty(product) || string.IsNullOrEmpty(versionRaw))
                    continue;

                // Normalize version to dot-separated (9-6-0 -> 9.6.0)
                var versionNormalized = versionRaw.Replace("-", ".");

                if (!map.TryGetValue(product, out var existing))
                {
                    map[product] = versionNormalized;
                    continue;
                }

                // Keep the highest version (best-effort parse).
                if (CompareVersions(versionNormalized, existing) > 0)
                    map[product] = versionNormalized;
            }

            return map;
        }

        /// <summary>
        /// Replaces VERSION placeholders in selectors inside resources/customhtml/custom_style.html.
        /// Placeholders supported:
        /// ReleasepdfXFAVERSION, ReleasepdfSweepVERSION, ReleasepdfOptimizerVERSION,
        /// ReleasepdfOCRVERSION, ReleasepdfHTMLVERSION, ReleaseiTextCoreVERSION
        /// The VERSION part is replaced with the discovered version for the corresponding product.
        /// </summary>
        /// <param name="resourcesRootPath">Path to the ReleaseNotesGenerator/resources directory.</param>
        /// <returns>path to a changed custom_style.html.</returns>
        public static string ReplaceVersionPlaceholdersInCustomStyle(string resourcesRootPath)
        {
            if (string.IsNullOrWhiteSpace(resourcesRootPath))
                throw new ArgumentException("Resources root path must be provided.", nameof(resourcesRootPath));

            var customStylePath = Path.Combine(resourcesRootPath, "customhtml", "custom_style.html");
            if (!File.Exists(customStylePath))
                throw new FileNotFoundException("custom_style.html not found.", customStylePath);

            var versionsByProduct = GetReleaseProductVersions(resourcesRootPath);
            foreach (var kv in versionsByProduct)
                versionsByProduct[kv.Key] = kv.Value.Replace(".", @"\.");

            // Map placeholder token prefix (as used in CSS ids) -> product name as used in release filenames.
            // Example selector: #ReleasepdfXFAVERSION-Downloads ... corresponds to file: release-pdfxfa-<ver>.html
            var placeholderToProduct = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase)
            {
                ["ReleasepdfXFA"] = "pdfxfa",
                ["ReleasepdfSweep"] = "pdfsweep",
                ["ReleasepdfOptimizer"] = "pdfoptimizer",
                ["ReleasepdfOCR"] = "pdfocr",
                ["ReleasepdfHTML"] = "pdfhtml",
                ["ReleaseiTextCore"] = "itext-core"
            };

            var original = File.ReadAllText(customStylePath);
            var updated = original;

            foreach (var kv in placeholderToProduct)
            {
                var placeholderPrefix = kv.Key;     // e.g. "ReleasepdfXFA"
                var product = kv.Value;             // e.g. "pdfxfa"

                if (!versionsByProduct.TryGetValue(product, out var version) || string.IsNullOrWhiteSpace(version))
                    continue;

                // Replace occurrences like "ReleasepdfXFAVERSION" -> "ReleasepdfXFA5.0.5"
                // Only the literal VERSION suffix is replaced, leaving the rest intact.
                updated = Regex.Replace(
                    updated,
                    Regex.Escape(placeholderPrefix) + "VERSION",
                    placeholderPrefix + version,
                    RegexOptions.CultureInvariant | RegexOptions.IgnoreCase
                );
            }
            
            var customStyleOutputPath = Path.Combine(Path.GetFullPath(Path.Combine(resourcesRootPath, @"../")), "out", "custom_style.html");
            
            File.WriteAllText(customStyleOutputPath, updated);
            return customStyleOutputPath;
        }

        private static int CompareVersions(string a, string b)
        {
            // Best-effort: compare using System.Version if possible; otherwise ordinal ignore-case.
            if (Version.TryParse(NormalizeForVersionParse(a), out var va) &&
                Version.TryParse(NormalizeForVersionParse(b), out var vb))
            {
                return va.CompareTo(vb);
            }

            return string.Compare(a, b, StringComparison.OrdinalIgnoreCase);
        }

        private static string NormalizeForVersionParse(string v)
        {
            // System.Version accepts 2-4 components. If more, fall back to string compare.
            // If less than 2 (shouldn't happen with our regex), still try.
            var parts = v.Split('.', StringSplitOptions.RemoveEmptyEntries);
            if (parts.Length is 0)
                return v;

            if (parts.Length > 4)
                return v;

            return string.Join(".", parts);
        }
    }
}