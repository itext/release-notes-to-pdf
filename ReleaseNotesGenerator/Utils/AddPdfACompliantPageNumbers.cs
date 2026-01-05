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
using iText.Kernel.Font;
using iText.Kernel.Pdf;
using iText.Kernel.Pdf.Canvas;
using iText.Kernel.Pdf.Event;

namespace ReleaseNotesGenerator.Utils {
    /// <summary>
    /// PDF/UA, PDF/A compliant page numbering event handler.
    /// Page numbers are marked as <see cref="PdfName.Artifact"/> because headers/footers are considered artifacts
    /// (they should not pollute the document's logical structure, especially for tagged/PDF/UA output).
    /// </summary>
    public class AddPdfACompliantPageNumbers : AbstractPdfDocumentEventHandler {
        private readonly PdfFont font;

        /// <summary>
        /// Creates a new page-numbering handler that draws the page number using the provided font.
        /// </summary>
        /// <param name="font">
        /// The <see cref="PdfFont"/> to use when writing the page number text.
        /// The font should be embedded/available in the resulting PDF to remain PDF/A compliant.
        /// </param>
        public AddPdfACompliantPageNumbers(PdfFont font) {
            this.font = font;
        }

        /// <summary>
        /// Handles an accepted PDF document event by stamping the current page number onto the page content stream.
        /// </summary>
        /// <param name="event">
        /// The incoming event instance. Expected to be a <see cref="PdfDocumentEvent"/> for a specific page.
        /// </param>
        /// <remarks>
        /// The page number is written as marked content with the <see cref="PdfName.Artifact"/> role so it is treated
        /// as an artifact (header/footer) and does not affect the document's logical structure.
        ///
        /// Placement is done using absolute coordinates (<c>MoveText(550, 90)</c>) and a fixed font size (10pt).
        /// Adjust these values if your page size, margins, or desired alignment differ.
        /// </remarks>
        protected override void OnAcceptedEvent(AbstractPdfDocumentEvent @event) {
            var docEvent = (PdfDocumentEvent)@event;
            var page = docEvent.GetPage();
            var pageNum = docEvent.GetDocument().GetPageNumber(page);

            var canvas = new PdfCanvas(page);
            canvas.SetDrawingOnPage(true);

            canvas.BeginMarkedContent(PdfName.Artifact);
            canvas.BeginText();
            canvas.SetFontAndSize(font, 10);
            canvas.MoveText(550, 90);
            canvas.ShowText($"{pageNum}");
            canvas.EndText();
            canvas.EndMarkedContent();

            canvas.Release();
        }
    }
}