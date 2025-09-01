using System;
using System.IO;
using System.Text;
using HtmlAgilityPack;
using iText.Kernel.Pdf;
using iText.Kernel.Pdf.Action;

namespace ReleaseNotesGenerator.Utils {
    /// <summary>
    /// Generate Table of Contents and Bookmarks for the PDF
    /// </summary>
    public class TocAndBookMarkGenerator {
        private readonly HtmlDocument htmDocument;
        private readonly PdfDocument pdfDocument;

        public TocAndBookMarkGenerator(HtmlDocument htmDocument, PdfDocument pdfDocument) {
            this.htmDocument = htmDocument;
            this.pdfDocument = pdfDocument;
        }

        public void AddTocAndBookMark()
        {
            StringBuilder tocStyles = new StringBuilder();
            var tocElements = htmDocument.DocumentNode.SelectNodes("//h2 | //h1 | //h3 | //h4");

            foreach (HtmlNode elem in tocElements)
            {
                string id = elem.GetAttributeValue("id", Guid.NewGuid().ToString());
                elem.SetAttributeValue("id", id);

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
            tocTableNode.SetAttributeValue("style", "width: 100%; border: none; border-collapse: collapse; page-break-after: always;");

            var bookMarks = pdfDocument.GetOutlines(false);
            bookMarks.SetTitle("Bookmarks");

            foreach (var h2Node in tocElements)
            {
                if (h2Node.InnerText == tableOfContentsTitle)
                {
                    continue;
                }

                if (string.IsNullOrEmpty(h2Node.Id))
                {
                    h2Node.Id = Guid.NewGuid().ToString();
                }

                var tocRow = new HtmlNode(HtmlNodeType.Element, htmDocument, -1) { Name = "tr" };
                tocRow.SetAttributeValue("data-toc-id", h2Node.Id);
                tocRow.SetAttributeValue("style", "border: none;");

                var titleCell = new HtmlNode(HtmlNodeType.Element, htmDocument, -1) { Name = "td" };
                titleCell.SetAttributeValue("style", "border: none;");

                var titleLink =
                    new HtmlNode(HtmlNodeType.Element, htmDocument, -1) { Name = "a", InnerHtml = h2Node.InnerText };
                titleLink.SetAttributeValue("href", "#" + h2Node.Id);
                if ("h3".Equals(h2Node.Name) || "h4".Equals(h2Node.Name))
                {
                    titleLink.SetAttributeValue("style", "padding-left: 30pt;");
                }

                titleCell.AppendChild(titleLink);
                tocRow.AppendChild(titleCell);

                var pageCell = new HtmlNode(HtmlNodeType.Element, htmDocument, -1) { Name = "td" };
                pageCell.SetAttributeValue("style", "border: none; text-align: right;");

                var pageLink = new HtmlNode(HtmlNodeType.Element, htmDocument, -1) { Name = "a" };
                pageLink.SetAttributeValue("href", "#" + h2Node.Id);

                var pageRef = new HtmlNode(HtmlNodeType.Element, htmDocument, -1) { Name = "span" };
                pageRef.SetAttributeValue("class", "toc-page-ref");

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
