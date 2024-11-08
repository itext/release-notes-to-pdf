using System.IO;
using HtmlAgilityPack;

namespace ReleaseNotesGenerator.Utils {
    /// <summary>
    /// Inject custom html temmplates into the html document
    /// </summary>
    public class CustomContentInjector {
        private readonly HtmlDocument htmlDocument;
        private readonly string resourceDirectory;

        public CustomContentInjector(HtmlDocument htmlDocument, string resourceDirectory) {
            this.htmlDocument = htmlDocument;
            this.resourceDirectory = resourceDirectory;
        }

        public void Inject(string fileName, string xpathDestination, int indexInXpath) {
            var path = Path.Combine(Directory.GetCurrentDirectory(), resourceDirectory, fileName);
            var node = HtmlNode.CreateNode(File.ReadAllText(path));
            htmlDocument.DocumentNode.SelectSingleNode(xpathDestination)?
                .ChildNodes.Insert(indexInXpath, node);
        }

        public void Inject(string fileName, string xpathDestination) {
            var path = Path.Combine(Directory.GetCurrentDirectory(), resourceDirectory, fileName);
            var node = HtmlNode.CreateNode(File.ReadAllText(path));
            htmlDocument.DocumentNode.SelectSingleNode(xpathDestination)?
                .ChildNodes.Append(node);
        }
    }
}