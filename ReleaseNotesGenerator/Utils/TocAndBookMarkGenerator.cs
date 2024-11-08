using System;
using HtmlAgilityPack;
using iText.Kernel.Pdf;
using iText.Kernel.Pdf.Action;
using iText.Kernel.Pdf.Navigation;

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

        public void AddTocAndBookMark() {
            var tableOfContentsTitle = "Table of Contents";
            var tocTitleNode = new HtmlNode(HtmlNodeType.Element, htmDocument, -1) {
                Name = "h2",
                InnerHtml = tableOfContentsTitle
            };
            htmDocument.DocumentNode.SelectSingleNode("//body")?.ChildNodes.Insert(3, tocTitleNode);
            var tocTableNode = new HtmlNode(HtmlNodeType.Element, htmDocument, -1) {
                Name = "ul"
            };
            tocTableNode.SetAttributeValue("class", "page-break-me");

            var bookMarks = pdfDocument.GetOutlines(false);
            bookMarks.SetTitle("Bookmarks");

            //Get all h1 nodes and add a class to them
            var nodesThatShouldBeInTocAndBookMarks = htmDocument.DocumentNode.SelectNodes("//h2");
            foreach (var h1Node in nodesThatShouldBeInTocAndBookMarks) {
                if (h1Node.InnerText == tableOfContentsTitle) {
                    continue;
                }

                var tdNode = new HtmlNode(HtmlNodeType.Element, htmDocument, -1) {
                    Name = "li"
                };
                var aNode = new HtmlNode(HtmlNodeType.Element, htmDocument, -1) {
                    Name = "a"
                };
                if (string.IsNullOrEmpty(h1Node.Id)) {
                    h1Node.Id = Guid.NewGuid().ToString();
                }

                aNode.Attributes.Append("href", "#" + h1Node.Id);
                aNode.InnerHtml = h1Node.InnerText;
                tdNode.ChildNodes.Append(aNode);
                tocTableNode.ChildNodes.Append(tdNode);

                var outline = bookMarks.AddOutline(h1Node.InnerText);
                outline.AddAction(PdfAction.CreateGoTo(h1Node.Id));
            }

            htmDocument.DocumentNode.SelectSingleNode("//body")?.ChildNodes.Insert(4, tocTableNode);
        }
    }
}