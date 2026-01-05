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
using System.IO;
using System.IO.Compression;

namespace ReleaseNotesGenerator.Utils {
    /// <summary>
    /// Provides functionality to create a structured ZIP archive based on a predefined
    /// set of files and directories. This class is specifically designed for
    /// scenarios requiring a deterministic set of content in the output ZIP,
    /// such as archiving source code and other related resources for distribution.
    /// </summary>
    public static class StructuredZipFolderBuilder {
        /// <summary>
        /// Creates a structured ZIP archive from the specified directory, including only specific files and directories.
        /// </summary>
        /// <param name="archive">The ZIP archive to which files and directories will be added.</param>
        /// <param name="sourceDirName">The root directory containing the files and directories to include in the ZIP archive.</param>
        /// <param name="compressionLevel">The compression level to use when adding files to the ZIP archive.</param>
        /// <exception cref="ArgumentNullException">Thrown if the <paramref name="archive"/> is null.</exception>
        /// <exception cref="ArgumentException">Thrown if the <paramref name="sourceDirName"/> is null, empty, or contains only whitespace.</exception>
        /// <exception cref="DirectoryNotFoundException">Thrown if the <paramref name="sourceDirName"/> does not exist.</exception>
        public static void StructuredZip(ZipArchive archive, string sourceDirName,
            CompressionLevel compressionLevel = CompressionLevel.Fastest)
        {
            if (archive == null) throw new ArgumentNullException(nameof(archive));
            if (string.IsNullOrWhiteSpace(sourceDirName))
                throw new ArgumentException("Source directory is required.", nameof(sourceDirName));
            if (!Directory.Exists(sourceDirName)) throw new DirectoryNotFoundException($"Source directory not found: {sourceDirName}");

            Console.WriteLine("Building structured zip from directory: " + sourceDirName);
            
            // Allow-list (relative to project root = sourceDirName)
            var includeFiles = new[] {
                Path.Combine("ReleaseNotesGenerator", "Program.cs"),
                Path.Combine("ReleaseNotesGenerator", "ReleaseNotesGenerator.csproj"),
                Path.Combine("ReleaseNotesGenerator", "resources", "simplePdfUA2.xmp"),
                Path.Combine("ReleaseNotesGenerator", "resources", "sRGB Color Space Profile.icm"),
                Path.Combine("ReleaseNotesGenerator", "resources", "wget-download-command.sh"),
                Path.Combine("nuget.config"),
                Path.Combine("README.md"),
                Path.Combine("ReleaseNotesGenerator.sln"),
            };

            var includeDirectories = new[] {
                Path.Combine("ReleaseNotesGenerator", "resources", "font"),
                Path.Combine("ReleaseNotesGenerator", "Utils"),
                Path.Combine("ReleaseNotesGenerator", "resources", "customhtml"),
                Path.Combine("ReleaseNotesGenerator", "resources", "images"),
                Path.Combine("ReleaseNotesGenerator", "resources", "codeSamples"),
            };

            // Add included individual files (if present)
            foreach (var rel in includeFiles) {
                var fullPath = Path.GetFullPath(Path.Combine(sourceDirName, rel));
                if (!File.Exists(fullPath)) {
                    continue;
                }

                AddFileToZip(archive, sourceDirName, fullPath, compressionLevel);
            }

            // Add everything under included directories (recursively)
            foreach (var relDir in includeDirectories) {
                var fullDir = Path.GetFullPath(Path.Combine(sourceDirName, relDir));
                if (!Directory.Exists(fullDir)) {
                    continue;
                }

                foreach (var file in Directory.EnumerateFiles(fullDir, "*", SearchOption.AllDirectories)) {
                    AddFileToZip(archive, sourceDirName, file, compressionLevel);
                }
            }
        }

        private static void AddFileToZip(ZipArchive archive, string rootDir, string fullFilePath, CompressionLevel compressionLevel) {
            var relativePath = Path.GetRelativePath(rootDir, fullFilePath);

            // Zip entry paths should be forward-slash separated to be consistent across platforms.
            var entryName = relativePath.Replace('\\', '/');

            Console.WriteLine("Adding file: " + fullFilePath);
            archive.CreateEntryFromFile(fullFilePath, entryName, compressionLevel);
        }
    }
}