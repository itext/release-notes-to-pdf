using System;
using iText.Kernel.Pdf;
using iText.Kernel.Pdf.Tagging;

namespace ReleaseNotesGenerator {
    /// <summary>
    /// Some additional processing of the structure tree. To make sure that we are compliant with the PDF/UA standard.
    /// </summary>
    internal static class StructTreePostProcessor {
        public static void Traverse(IStructureNode node) {
            if (node == null) {
                return;
            }

            if (node is PdfStructElem str) {
                bool hasLang = str.GetPdfObject().ContainsKey(PdfName.Lang);
                if (hasLang) {
                    var lang = str.GetPdfObject().GetAsName(PdfName.Lang);
                    if (lang == null) {
                        str.GetPdfObject().Remove(PdfName.Lang);
                        str.SetModified();
                    }
                }
            }


            if (!(node is PdfMcrNumber) && !(node is PdfObjRef) && !(node is PdfMcrDictionary)) {
                foreach (var kid in node.GetKids()) {
                    Traverse(kid);
                }
            }
        }
    }
}