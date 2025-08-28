using System.Collections.Generic;
using iText.Html2pdf.Attach;
using iText.Html2pdf.Attach.Impl;
using iText.StyledXmlParser.Node;

namespace ReleaseNotesGenerator.Utils {
    /// <summary>
    /// We need to override the default tag worker factory to provide custom tag workers for svg and h tags
    /// This is mainly related to PDF/UA support not 100% there for html2pdf
    /// </summary>
    public class CustomTagWorkerFactory : DefaultTagWorkerFactory {
        public override ITagWorker GetCustomTagWorker(IElementNode tag, ProcessorContext context) {
            if (tag.Name().Equals("signature-field"))
            {
                return new CustomSignatureTagWorker(tag);
            }
            return base.GetCustomTagWorker(tag, context);
        }
    }
}