using System.IO;
using iText.Forms.Fields;
using iText.Kernel.Pdf;
using iText.Kernel.Validation;
using iText.Layout.Tagging;
using iText.Signatures;

namespace ReleaseNotesGenerator.Utils {
    /// <summary>
    /// Custom PdfA compliant signer
    /// Need some minor tweaks to make signing UA compliant 
    /// </summary>
    public class CustomPdfSigner : PdfSigner {
        public CustomPdfSigner(PdfReader reader, Stream outputStream, StampingProperties properties) : base(reader,
            outputStream, properties) {
        }

        protected override PdfDocument InitDocument(PdfReader reader, PdfWriter writer,
            StampingProperties properties) {
            var initDocument = base.InitDocument(reader, writer, properties);
            initDocument.GetDiContainer().Register(typeof(ValidationContainer), new ValidationContainer());
            return initDocument;
        }

        protected override void ApplyAccessibilityProperties(PdfFormField formField,
            IAccessibleElement modelElement, PdfDocument pdfDocument) {
            formField.GetFirstFormAnnotation().Put(PdfName.Contents, new PdfString("Signature Block"));
            base.ApplyAccessibilityProperties(formField, modelElement, pdfDocument);
        }
    }
}