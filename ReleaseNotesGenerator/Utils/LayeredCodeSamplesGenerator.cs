using System.Drawing;
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
    /// Generates a layer from code samples which are toggled on and off
    /// By default we will show java code samples.
    /// </summary>
    public class LayeredCodeSamplesGenerator {
        private readonly PdfDocument pdfDocument;
        private readonly FontProvider fontProvider;
        private readonly string ResourceDirectory;

        public LayeredCodeSamplesGenerator(PdfDocument document, FontProvider fontProvider, string resourceDirectory) {
            this.pdfDocument = document;
            this.fontProvider = fontProvider;
            ResourceDirectory = resourceDirectory;
        }

        public void AddCodeSample(string name, string title) {
            var page = pdfDocument.AddNewPage();
            var pageRectangle = page.GetPageSize();
            //Apply a4 page margins
            pageRectangle.ApplyMargins(36, 36, 36, 36, false);
            AddLayer(page, pageRectangle, title, name, true);
            AddLayer(page, pageRectangle, title, name, false);
        }

        private void AddLayer(PdfPage page, Rectangle pageRectangle, string title, string name, bool isJava) {
            var canvas = new Canvas(page, pageRectangle);
            var pdfLayer = new PdfLayer(title + (isJava ? " (java)" : " (C#)"), pdfDocument);
            pdfLayer.SetOn(isJava);
            canvas.GetPdfCanvas().BeginLayer(pdfLayer);
            var sharpCode = File.ReadAllText(Path.Combine(Directory.GetCurrentDirectory(),
                ResourceDirectory,
                "codeSamples", name + "-" + (isJava ? "java" : "sharp") + ".html"));

            var converterProperties = new ConverterProperties().SetFontProvider(fontProvider);
            converterProperties.SetTagWorkerFactory(new CustomTagWorkerFactory());
            var elements = HtmlConverter.ConvertToElements(sharpCode, converterProperties);
            foreach (var element in elements) {
                if (element is IBlockElement blockElement) {
                    canvas.Add(blockElement);
                }
            }

            canvas.GetPdfCanvas().EndLayer();
            canvas.Flush();
            canvas.Close();
        }
    }
}