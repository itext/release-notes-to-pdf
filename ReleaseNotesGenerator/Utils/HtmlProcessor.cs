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
using System.Linq;
using HtmlAgilityPack;

namespace ReleaseNotesGenerator.Utils {
    /// <summary>
    /// Represents a utility for processing HTML documents.
    /// Provides methods for pre-processing and manipulating HTML content
    /// to prepare it for further transformations or processing workflows.
    /// </summary>
    public class HtmlProcessor
    {
        private readonly HtmlDocument htmlDocument;

        /// <summary>
        /// Represents a utility for processing HTML documents.
        /// Provides methods for pre-processing and manipulating HTML content
        /// before further transformations or usage. This class is initialized
        /// with an instance of an HTML document, which serves as the basis
        /// for all operations performed by the instance.
        /// </summary>
        public HtmlProcessor(HtmlDocument htmlDocument)
        {
            this.htmlDocument = htmlDocument;
        }

        /// <summary>
        /// Performs pre-processing on an HTML document.
        /// This method removes any unwanted nodes from the HTML document,
        /// preparing it for further operations or transformations.
        /// </summary>
        public void PreProcess()
        {
            RemoveUnwantedNodes();
            InsertIdForContributorsTable();
        }
        
        private void InsertIdForContributorsTable()
        {
            var h2 = htmlDocument.DocumentNode.SelectSingleNode("//h2[@id='ReleaseiTextCore9.5.0-Contributors']");
            if (h2 == null)
            {
                throw new InvalidOperationException("Target h2 not found.");
            }
            var table = h2.SelectSingleNode("ancestor::table[1]");
            if (table == null)
            {
                throw new InvalidOperationException("Ancestor table not found.");
            }
            table.SetAttributeValue("id", "contributorsTable");
        }

        /// <summary>
        /// Removes unwanted nodes from the HTML document based on specific criteria.
        /// This method identifies and removes HTML nodes that are considered unnecessary
        /// for the final output, such as navigation elements, scripts, and layout components.
        /// The operation is performed by first collecting all nodes matching the unwanted
        /// criteria to avoid modifying the collection during iteration.
        /// Nodes eligible for removal include:
        /// - Headers not marked as the main article header.
        /// - Footer elements.
        /// - Script elements.
        /// - Navigation elements.
        /// - Stylesheet links.
        /// - Buttons with specific accessibility-related classes.
        /// - Div elements with a specific error log class or containing certain overlay classes.
        /// - Other project-specific unwanted nodes.
        /// The filter conditions are implemented in the <c>IsUnwantedNode</c> method.
        /// </summary>
        private void RemoveUnwantedNodes() {
            htmlDocument.DocumentNode
                .Descendants()
                .ToList() //avoiding InvalidOperationException
                .Where(IsUnwantedNode)
                .Select(p => p.XPath)
                .ToList()
                .ForEach(p => htmlDocument.DocumentNode.SelectSingleNode(p)?.Remove());
        }
        
        private static bool IsUnwantedNode(HtmlNode node) {
            // Keep only the main article header; remove other headers.
            if (string.Equals(node.Name, "header", StringComparison.Ordinal) &&
                !string.Equals(node.GetAttributeValue("class", ""), "article-header", StringComparison.Ordinal)) {
                return true;
            }

            if (string.Equals(node.Name, "footer", StringComparison.Ordinal) ||
                string.Equals(node.Name, "script", StringComparison.Ordinal) ||
                string.Equals(node.Name, "nav", StringComparison.Ordinal)) {
                return true;
            }

            if (string.Equals(node.Name, "link", StringComparison.Ordinal) &&
                string.Equals(node.GetAttributeValue("rel", ""), "stylesheet", StringComparison.Ordinal)) {
                return true;
            }

            // class="..." comparisons should be token-based (order-insensitive and tolerant to extra classes)
            if (string.Equals(node.Name, "button", StringComparison.Ordinal) &&
                HasClass(node, "vp-a11y-skip-trigger") &&
                HasClass(node, "vp-js-a11y-navigation-toggle")) {
                return true;
            }

            if (string.Equals(node.Name, "div", StringComparison.Ordinal) && HasClass(node, "vp-error-log")) {
                return true;
            }

            if (string.Equals(node.Name, "div", StringComparison.Ordinal) && HasClassContaining(node, "table-overlay")) {
                return true;
            }

            if (string.Equals(node.Name, "vp-a11y-skip-controller", StringComparison.Ordinal)) {
                return true;
            }

            return false;
        }

        /// <summary>
        /// Determines whether the specified HTML node contains a specific CSS class.
        /// This method checks the "class" attribute of the node and verifies if it includes the given class name.
        /// The comparison is case-sensitive and adheres to HTML tokenization rules for class names.
        /// </summary>
        /// <param name="node">The HTML node to be examined. Represents an element of the DOM structure.</param>
        /// <param name="className">The CSS class name to check within the "class" attribute of the node. Must be a single, non-empty class name.</param>
        /// <returns>True if the specified class exists in the node's "class" attribute; otherwise, false.</returns>
        private static bool HasClass(HtmlNode node, string className)
        {
            var classes = node.GetAttributeValue("class", "");
            if (string.IsNullOrWhiteSpace(classes)) {
                return false;
            }

            // Split on whitespace, ignore empties. This matches HTML's class token semantics.
            return classes
                .Split((char[])null, StringSplitOptions.RemoveEmptyEntries)
                .Any(c => string.Equals(c, className, StringComparison.Ordinal));
        }

        /// <summary>
        /// Determines if the specified HTML node has a class attribute containing
        /// a substring that matches the provided class fragment.
        /// This method checks the node's class list, which is tokenized, for a partial
        /// match with the given fragment. It is case-sensitive and performs an ordinal
        /// string comparison.
        /// </summary>
        /// <param name="node">The HTML node to evaluate. This should not be null.</param>
        /// <param name="classFragment">A substring to search for within the node's class attribute.</param>
        /// <returns>
        /// <c>true</c> if the class attribute contains a token that includes the specified
        /// class fragment; otherwise, <c>false</c>. Returns <c>false</c> if the node's
        /// class attribute is empty or undefined.
        /// </returns>
        private static bool HasClassContaining(HtmlNode node, string classFragment)
        {
            var classes = node.GetAttributeValue("class", "");
            if (string.IsNullOrWhiteSpace(classes)) {
                return false;
            }

            return classes
                .Split((char[])null, StringSplitOptions.RemoveEmptyEntries)
                .Any(c => c.IndexOf(classFragment, StringComparison.Ordinal) >= 0);
        }

    }
}