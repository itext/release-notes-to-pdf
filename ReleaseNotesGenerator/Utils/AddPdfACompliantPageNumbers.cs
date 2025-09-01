using System;
using iText.Kernel.Font;
using iText.Kernel.Pdf;
using iText.Kernel.Pdf.Canvas;
using iText.Kernel.Pdf.Event;
using iText.Pdfa;

namespace ReleaseNotesGenerator.Utils {
    /// <summary>
    ///  This is an example of an event handler that adds a header and a footer to a PDF/A document.
    ///  We need to tag the number as an artifact instead of real content as The PDF/A standard says that footer contents are artifacts. 
    /// </summary>
    public class AddPdfACompliantPageNumbers : AbstractPdfDocumentEventHandler {
        private readonly PdfFont font;
        private int pages = 0;

        public AddPdfACompliantPageNumbers(PdfFont font) {
            this.font = font;
        }

        protected override void OnAcceptedEvent(AbstractPdfDocumentEvent @event) {
            var docEvent = (PdfDocumentEvent)@event;
            var page = docEvent.GetPage();
            var pageNum = docEvent.GetDocument().GetPageNumber(page);
            var canvas = new PdfCanvas(page);
            canvas.SetDrawingOnPage(true);
            canvas.BeginText();
            canvas.SetFontAndSize(font, 10);
            canvas.BeginMarkedContent(PdfName.Artifact);
            canvas.MoveText(550, 90);
            canvas.ShowText($"{pageNum}");
            canvas.EndText();
            canvas.Stroke();
            canvas.EndMarkedContent();
            canvas.Release();
        }

        public void SetPages(int numberOfPages) {
            pages = numberOfPages;
        }
    }
}