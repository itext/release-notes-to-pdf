using iText.Html2pdf.Attach;
using iText.Html2pdf.Attach.Impl.Tags;
using iText.Layout.Tagging;
using iText.StyledXmlParser.Node;

namespace ReleaseNotesGenerator.Utils {
    /// <summary>
    /// Custom svg worker to set the alternate description for the svg element
    /// </summary>
    public class SvgWorker : SvgTagWorker {
        public SvgWorker(IElementNode element, ProcessorContext context) : base(element, context) {
        }

        public override void ProcessEnd(IElementNode element, ProcessorContext context) {
            base.ProcessEnd(element, context);
            var elementResult = GetElementResult();
            if (elementResult is IAccessibleElement ae) {
                ae.GetAccessibilityProperties().SetAlternateDescription(element.GetAttribute("aria-description"));
            }
        }
    }
}