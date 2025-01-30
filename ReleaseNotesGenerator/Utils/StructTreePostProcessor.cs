using System;
using iText.Commons.Utils;
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

                if (StandardRoles.FORM.Equals(str.GetRole().GetValue())) {
                    PdfDictionary f = (PdfDictionary)str.GetK();
                    Console.WriteLine();
                    PdfDictionary signature = f.GetAsDictionary(PdfName.Obj);
                    signature.Put(PdfName.Contents, new PdfString("Signature"));
                    str.SetModified();
                    signature.SetModified();
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