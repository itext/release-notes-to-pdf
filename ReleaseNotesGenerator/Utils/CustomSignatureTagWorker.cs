using System;
using System.IO;
using iText.Forms.Form.Element;
using iText.Html2pdf.Attach;
using iText.Kernel.Font;
using iText.Layout;
using iText.Layout.Borders;
using iText.StyledXmlParser.Node;

namespace ReleaseNotesGenerator.Utils
{
    public class CustomSignatureTagWorker : ITagWorker
    {
        private SignatureFieldAppearance signatureFieldAppearance;

        public CustomSignatureTagWorker(IElementNode tag) {
            String signatureFieldId = tag.GetAttribute("id");
            signatureFieldAppearance = new SignatureFieldAppearance(signatureFieldId);
            var font = PdfFontFactory.CreateFont(Path.Combine(Directory.GetCurrentDirectory(), "resources",
                "font", "NotoSans-Regular.ttf"), PdfFontFactory.EmbeddingStrategy.FORCE_EMBEDDED);
            signatureFieldAppearance.SetFont(font);
            signatureFieldAppearance.SetFontSize(12);
            signatureFieldAppearance.SetContent("Signature field");
            signatureFieldAppearance.SetBorder(new SolidBorder(1));
            String width = tag.GetAttribute("width");
            signatureFieldAppearance.SetWidth(float.Parse(width));
            signatureFieldAppearance.GetAccessibilityProperties().SetAlternateDescription("Signature field");
            String height = tag.GetAttribute("height");
            signatureFieldAppearance.SetHeight(float.Parse(height));
            signatureFieldAppearance.SetInteractive(true);
        }
        
        public void ProcessEnd(IElementNode element, ProcessorContext context)
        {
            
        }

        public bool ProcessContent(string content, ProcessorContext context)
        {
            return false;
        }

        public bool ProcessTagChild(ITagWorker childTagWorker, ProcessorContext context)
        {
            return false;
        }

        public IPropertyContainer GetElementResult()
        {
            return signatureFieldAppearance;
        }
    }
}
