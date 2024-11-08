using iText.Html2pdf.Attach;
using iText.Html2pdf.Attach.Impl.Tags;
using iText.Layout;
using iText.Layout.Element;
using iText.StyledXmlParser.Node;

namespace ReleaseNotesGenerator.Utils {
    /// <summary>
    /// Currently we need to set the role of the paragraph to neutral
    /// Because the pdf 2.0 spec doesn't allow for paragraphs to be direct children of a Hn element
    /// </summary>
    public class CustomHTagWorker : HTagWorker {
        public CustomHTagWorker(IElementNode element, ProcessorContext context) : base(element, context) {
        }

        public override IPropertyContainer GetElementResult() {
            var elementResult = base.GetElementResult();
            if (!(elementResult is Div divResult)) {
                return elementResult;
            }

            foreach (var child in divResult.GetChildren()) {
                if (child is Paragraph paragraph) {
                    paragraph.SetNeutralRole();
                }
            }

            return elementResult;
        }
    }
}