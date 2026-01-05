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
using System.Text;
using HtmlAgilityPack;
using iText.Html2pdf.Html;
using iText.Kernel.Pdf;
using iText.StyledXmlParser;

namespace ReleaseNotesGenerator.Utils {
    /// <summary>
    /// Generates a Table of Contents (TOC) inside the HTML by:
    /// <list type="bullet">
    /// <item><description>Ensuring headings have stable IDs</description></item>
    /// <item><description>Injecting CSS using <c>target-counter(..., page)</c> to show the page number of each heading</description></item>
    /// <item><description>Inserting a TOC table early in the body</description></item>
    /// </list>
    ///
    /// Important: despite the name, this class currently does not create per-heading PDF outline entries
    /// (bookmarks). It only sets the outline root title.
    /// </summary>
    public class TocAndBookMarkGenerator {
        private readonly HtmlDocument htmDocument;
        private readonly PdfDocument pdfDocument;

        /// <summary>
        /// Initializes a new instance of the <see cref="TocAndBookMarkGenerator"/> class.
        /// </summary>
        /// <param name="htmDocument">
        /// The HTML document that will be modified in-place (IDs, injected TOC nodes, and injected CSS).
        /// </param>
        /// <param name="pdfDocument">
        /// The target PDF document used for outline (bookmark) metadata updates.
        /// </param>
        public TocAndBookMarkGenerator(HtmlDocument htmDocument, PdfDocument pdfDocument) {
            this.htmDocument = htmDocument;
            this.pdfDocument = pdfDocument;
        }

        /// <summary>
        /// Adds a Table of Contents to the HTML and applies minimal PDF outline metadata.
        /// </summary>
        /// <remarks>
        /// <para>
        /// This method searches the HTML for headings (<c>h1</c>–<c>h4</c>), ensures each has an <c>id</c>,
        /// and inserts a TOC title and a TOC table near the top of the <c>&lt;body&gt;</c>.
        /// </para>
        /// <para>
        /// The TOC page numbers are not calculated by this code directly; instead, it injects CSS rules that use
        /// <c>target-counter(..., page)</c> so the HTML-to-PDF renderer can resolve page numbers during layout.
        /// </para>
        /// </remarks>
        public void AddTocAndBookmarks()
        {
            var tocElements = htmDocument.DocumentNode.SelectNodes("//h2 | //h1 | //h3 | //h4");
            if (tocElements == null || tocElements.Count == 0) {
                return;
            }

            var tocStyles = new StringBuilder();

            foreach (var elem in tocElements) {
                var id = elem.GetAttributeValue(AttributeConstants.ID, Guid.NewGuid().ToString());
                elem.SetAttributeValue(AttributeConstants.ID, id);

                tocStyles.Append("*[data-toc-id=\"")
                    .Append(id)
                    .Append("\"] .toc-page-ref::after {\ncontent: target-counter(\"#")
                    .Append(id)
                    .Append("\", page) \n }\n");
            }

            var tableOfContentsTitle = "Table of Contents";

            var tocTitleNode =
                new HtmlNode(HtmlNodeType.Element, htmDocument, -1) { Name = "h2", InnerHtml = tableOfContentsTitle };
            htmDocument.DocumentNode.SelectSingleNode("//body")?.ChildNodes.Insert(3, tocTitleNode);

            var tocTableNode = new HtmlNode(HtmlNodeType.Element, htmDocument, -1) { Name = "table" };
            tocTableNode.SetAttributeValue(TagConstants.STYLE, "width: 100%; border: none; border-collapse: collapse; page-break-after: always;");

            var outlinesRoot = pdfDocument.GetOutlines(false);
            outlinesRoot.SetTitle("Bookmarks");

            foreach (var node in tocElements) {
                if (node.InnerText == tableOfContentsTitle) {
                    continue;
                }

                if (string.IsNullOrEmpty(node.Id)) {
                    node.Id = Guid.NewGuid().ToString();
                }

                var tocRow = new HtmlNode(HtmlNodeType.Element, htmDocument, -1) { Name = "tr" };
                tocRow.SetAttributeValue("data-toc-id", node.Id);
                tocRow.SetAttributeValue(TagConstants.STYLE, "border: none;");

                var titleCell = new HtmlNode(HtmlNodeType.Element, htmDocument, -1) { Name = "td" };
                titleCell.SetAttributeValue(TagConstants.STYLE, "border: none;");

                var titleLink = new HtmlNode(HtmlNodeType.Element, htmDocument, -1) { Name = "a", InnerHtml = node.InnerText };
                titleLink.SetAttributeValue(AttributeConstants.HREF, "#" + node.Id);

                if (TagConstants.H3.Equals(node.Name) || "h4".Equals(node.Name)) {
                    titleLink.SetAttributeValue(TagConstants.STYLE, "padding-left: 30pt;");
                }

                titleCell.AppendChild(titleLink);
                tocRow.AppendChild(titleCell);

                var pageCell = new HtmlNode(HtmlNodeType.Element, htmDocument, -1) { Name = TagConstants.TD };
                pageCell.SetAttributeValue(TagConstants.STYLE, "border: none; text-align: right;");

                var pageLink = new HtmlNode(HtmlNodeType.Element, htmDocument, -1) { Name = TagConstants.A };
                pageLink.SetAttributeValue(AttributeConstants.HREF, "#" + node.Id);

                var pageRef = new HtmlNode(HtmlNodeType.Element, htmDocument, -1) { Name = TagConstants.SPAN };
                pageRef.SetAttributeValue(CommonAttributeConstants.CLASS, "toc-page-ref");

                pageLink.AppendChild(pageRef);
                pageCell.AppendChild(pageLink);
                tocRow.AppendChild(pageCell);

                tocTableNode.AppendChild(tocRow);
            }

            htmDocument.DocumentNode.SelectSingleNode("//body")?.ChildNodes.Insert(4, tocTableNode);
            htmDocument.DocumentNode.SelectSingleNode("//head")
                ?.ChildNodes.Insert(0, HtmlNode.CreateNode("<style>\n\n " + tocStyles + "</style>"));
        }
    }
}