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
using HtmlAgilityPack;

namespace ReleaseNotesGenerator.Utils {
    /// <summary>
    /// Injects HTML templates (stored under the resources directory) into an <see cref="HtmlDocument"/>.
    /// The injector is working-directory independent: paths are resolved relative to an absolute resource root.
    /// </summary>
    public class CustomContentInjector {
        private readonly HtmlDocument htmlDocument;
        private readonly string resourceRootPath;

        /// <summary>
        /// Creates a new injector that can insert HTML fragments into the provided <see cref="HtmlDocument"/>.
        /// </summary>
        /// <param name="htmlDocument">
        /// The target HTML document that will be modified in-place. Inserted nodes become part of this document.
        /// </param>
        /// <param name="resourceRootPath">
        /// Absolute path to the directory that serves as the root for HTML template files. All injected templates
        /// are resolved via <see cref="Path.Combine(string, string)"/> using this root and the provided relative path.
        /// </param>
        /// <exception cref="ArgumentNullException">
        /// Thrown if <paramref name="htmlDocument"/> or <paramref name="resourceRootPath"/> is <see langword="null"/>.
        /// </exception>
        public CustomContentInjector(HtmlDocument htmlDocument, string resourceRootPath) {
            this.htmlDocument = htmlDocument;
            this.resourceRootPath = resourceRootPath;
        }

        /// <summary>
        /// Reads an HTML template file and inserts it as a node into the destination element identified by XPath,
        /// at the specified child index.
        /// </summary>
        /// <param name="filePath">
        /// Path to the HTML template file relative to <c>resourceRootPath</c> or an absolute path.
        /// </param>
        /// <param name="xpathDestination">
        /// XPath selector that should match the destination node under which the template node will be inserted.
        /// </param>
        /// <param name="indexInXpath">
        /// Zero-based position in the destination node's <see cref="HtmlNode.ChildNodes"/> collection where the new node
        /// should be inserted.
        /// </param>
        /// <remarks>
        /// If <paramref name="xpathDestination"/> does not match any node, this method does nothing (due to null-propagation).
        /// <para/>
        /// This method will throw if the file cannot be read, if the HTML cannot be parsed into a node, or if
        /// <paramref name="indexInXpath"/> is out of range for the destination's child node collection.
        /// </remarks>
        /// <exception cref="ArgumentNullException">
        /// Thrown if any of the parameters are <see langword="null"/>.
        /// </exception>
        /// <exception cref="IOException">
        /// Thrown if the template file cannot be read.
        /// </exception>
        public void Inject(string filePath, string xpathDestination, int indexInXpath) {
            var path = Path.IsPathRooted(filePath) ? filePath
                : Path.Combine(resourceRootPath, filePath);
            var node = HtmlNode.CreateNode(File.ReadAllText(path));
            htmlDocument.DocumentNode.SelectSingleNode(xpathDestination)?
                .ChildNodes.Insert(indexInXpath, node);
        }

        /// <summary>
        /// Reads an HTML template file and appends it as the last child of the destination element identified by XPath.
        /// </summary>
        /// <param name="filePath">
        /// Path to the HTML template file relative to <c>resourceRootPath</c>.
        /// </param>
        /// <param name="xpathDestination">
        /// XPath selector that should match the destination node under which the template node will be appended.
        /// </param>
        /// <remarks>
        /// If <paramref name="xpathDestination"/> does not match any node, this method does nothing (due to null-propagation).
        /// <para/>
        /// This method will throw if the file cannot be read or if the HTML cannot be parsed into a node.
        /// </remarks>
        /// <exception cref="ArgumentNullException">
        /// Thrown if any of the parameters are <see langword="null"/>.
        /// </exception>
        /// <exception cref="IOException">
        /// Thrown if the template file cannot be read.
        /// </exception>
        public void Inject(string filePath, string xpathDestination) {
            var path = Path.Combine(resourceRootPath, filePath);
            var node = HtmlNode.CreateNode(File.ReadAllText(path));
            htmlDocument.DocumentNode.SelectSingleNode(xpathDestination)?
                .ChildNodes.Append(node);
        }
    }
}