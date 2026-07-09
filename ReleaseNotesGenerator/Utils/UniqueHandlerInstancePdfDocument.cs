using System.Collections.Generic;
using iText.Commons.Actions;
using iText.Commons.Internal.Runtime;
using iText.Commons.Utils;
using iText.Kernel.Pdf;
using iText.Kernel.Pdf.Event;
using iText.Pdfa;

namespace ReleaseNotesGenerator.Utils
{
    public class UniqueHandlerInstancePdfDocument : PdfDocument {
        private readonly ICollection<IEventHandler> documentHandlers =
            (ICollection<IEventHandler>)new LinkedHashSet<IEventHandler>();
        public UniqueHandlerInstancePdfDocument(PdfWriter pdfWriter) : base(pdfWriter) {
        }

        public override void AddEventHandler(string type, AbstractPdfDocumentEventHandler handler)
        {
            handler.AddType(type);
            foreach (var documentHandler in documentHandlers)
            {
                if (documentHandler.GetType() == handler.GetType()) 
                {
                    return;
                }
            }
            this.documentHandlers.Add((IEventHandler) handler);
        }

        public override void DispatchEvent(AbstractPdfDocumentEvent @event)
        {
            @event.SetDocument(this);
            foreach (IEventHandler eventHandler in new LinkedHashSet<IEventHandler>(this.documentHandlers))
                eventHandler.OnEvent((IEvent) @event);
        }

        public override bool HasEventHandler(AbstractPdfDocumentEventHandler handler)
        { 
            return this.documentHandlers.Contains((IEventHandler) handler);
        }

        public override void RemoveEventHandler(AbstractPdfDocumentEventHandler handler)
        {
            this.documentHandlers.RemoveIf(h => h.GetType() == handler.GetType());
        }

        public override void RemoveAllHandlers()
        {
            this.documentHandlers.Clear();
        }
    }
}