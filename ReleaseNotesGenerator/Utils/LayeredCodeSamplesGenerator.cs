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
using iText.Html2pdf;
using iText.Kernel.Pdf;
using iText.Kernel.Pdf.Layer;
using iText.Layout;
using iText.Layout.Element;
using iText.Layout.Font;
using Rectangle = iText.Kernel.Geom.Rectangle;

namespace ReleaseNotesGenerator.Utils {
    /// <summary>
    /// Generates a layer from code samples which are toggled on and off.
    /// By default we will show java code samples.
    /// </summary>
    public class LayeredCodeSamplesGenerator {
        private const float DefaultMarginPoints = 36f;

        private readonly PdfDocument _pdfDocument;
        private readonly FontProvider _fontProvider;
        private readonly string _resourceDirectory;
        private readonly ConverterProperties _converterProperties;

        /// <summary>
        /// Provides functionality for generating layered code sample content in a PDF document.
        /// Each code sample is added as a separate layer that can be toggled,
        /// with support for both Java and C# versions by default.
        /// </summary>
        public LayeredCodeSamplesGenerator(PdfDocument document, FontProvider fontProvider, string resourceDirectory)
        {
            _pdfDocument = document ?? throw new ArgumentNullException(nameof(document));
            _fontProvider = fontProvider ?? throw new ArgumentNullException(nameof(fontProvider));
            _resourceDirectory = resourceDirectory ?? throw new ArgumentNullException(nameof(resourceDirectory));

            _converterProperties = new ConverterProperties()
                .SetFontProvider(_fontProvider)
                .SetTagWorkerFactory(new CustomTagWorkerFactory());
        }

        /// <summary>
        /// Adds a code sample as layered content to a PDF document, with separate layers
        /// for Java and C# code samples. The layers can be toggled, and Java code is displayed by default.
        /// </summary>
        /// <param name="name">The base name of the code sample file without the language-specific suffix.
        /// The method expects file paths in the format 'name-java.html' or 'name-sharp.html'.</param>
        /// <param name="title">The title of the layer in the PDF document. The title is appended with
        /// the language type (e.g., ' (java)' or ' (C#)').</param>
        public void AddCodeSample(string name, string title)
        {
            if (string.IsNullOrWhiteSpace(name))
                throw new ArgumentException("Code sample name must be provided.", nameof(name));
            if (string.IsNullOrWhiteSpace(title))
                throw new ArgumentException("Code sample title must be provided.", nameof(title));

            var page = _pdfDocument.AddNewPage();
            var pageSize = page.GetPageSize();

            var contentRect = new Rectangle(
                pageSize.GetLeft() + DefaultMarginPoints,
                pageSize.GetBottom() + DefaultMarginPoints,
                pageSize.GetWidth() - 2 * DefaultMarginPoints,
                pageSize.GetHeight() - 2 * DefaultMarginPoints
            );

            AddLayer(page, contentRect, title, name, isJava: true);
            AddLayer(page, contentRect, title, name, isJava: false);
        }

        /// <summary>
        /// Adds a new toggleable content layer to the specified PDF page.
        /// The layer displays either Java or C# code samples based on the provided flag.
        /// </summary>
        private void AddLayer(PdfPage page, Rectangle pageRectangle, string title, string name, bool isJava)
        {
            if (page == null) throw new ArgumentNullException(nameof(page));
            if (pageRectangle == null) throw new ArgumentNullException(nameof(pageRectangle));

            var layerTitle = title + (isJava ? " (java)" : " (C#)");
            var pdfLayer = new PdfLayer(layerTitle, _pdfDocument);
            pdfLayer.SetOn(isJava);

            var filePath = Path.Combine(
                AppContext.BaseDirectory,
                _resourceDirectory,
                "codeSamples",
                $"{name}-{(isJava ? "java" : "sharp")}.html"
            );

            string html;
            try {
                html = File.ReadAllText(filePath);
            } catch (Exception ex) when (ex is IOException || ex is UnauthorizedAccessException) {
                throw new IOException($"Failed to read code sample HTML from '{filePath}'.", ex);
            }

            using var canvas = new Canvas(page, pageRectangle);

            canvas.GetPdfCanvas().BeginLayer(pdfLayer);
            try {
                var elements = HtmlConverter.ConvertToElements(html, _converterProperties);
                foreach (var element in elements) {
                    if (element is IBlockElement blockElement) {
                        canvas.Add(blockElement);
                    }
                }
            }
            finally {
                canvas.GetPdfCanvas().EndLayer();
            }

            canvas.Flush();
        }
    }
}