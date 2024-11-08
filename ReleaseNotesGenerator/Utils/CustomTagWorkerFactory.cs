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
        private static readonly HashSet<string> HTags = new HashSet<string> {
            "h1", "h2", "h3", "h4", "h5", "h6"
        };

        public override ITagWorker GetCustomTagWorker(IElementNode tag, ProcessorContext context) {
            if (tag.Name() == "svg") {
                return new SvgWorker(tag, context);
            }

            return HTags.Contains(tag.Name())
                ? new CustomHTagWorker(tag, context)
                : base.GetCustomTagWorker(tag, context);
        }
    }
}