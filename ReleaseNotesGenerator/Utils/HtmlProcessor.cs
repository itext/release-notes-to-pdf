using System.Linq;
using HtmlAgilityPack;

namespace ReleaseNotesGenerator.Utils {
    /// <summary>
    /// Process the html document to remove unwanted nodes and add custom attributes
    /// And also resolve relative links and add alt attribute to images which  don't have it  
    /// </summary>
    public class HtmlProcessor {
        private readonly HtmlDocument htmlDocument;

        public HtmlProcessor(HtmlDocument htmlDocument) {
            this.htmlDocument = htmlDocument;
        }

        public void PreCustomContentProcess() {
            RemoveUnwantedNodes();
        }

        public void PostCustomContentProcess() {
            //Add alt attribute to images to avoid accessibility issues
            foreach (var selectNode in htmlDocument.DocumentNode.SelectNodes("//img")) {
                if (selectNode.GetAttributeValue("alt", "") == "") {
                    selectNode.SetAttributeValue("alt", "Image");
                }
            }

            //Add alt attribute to images to avoid accessibility issues
            foreach (var selectNode in htmlDocument.DocumentNode.SelectNodes("//svg")) {
                if (selectNode.GetAttributeValue("alt", "") == "") {
                    selectNode.SetAttributeValue("alt", "Image");
                }
            }

            //Resolve relative links
            foreach (var selectNode in htmlDocument.DocumentNode.SelectNodes("//a")) {
                var href = selectNode.GetAttributeValue("href", "");
                if (!href.StartsWith("http") && !href.StartsWith("#")) {
                    selectNode.SetAttributeValue("href", "https://kb.itextpdf.com/itext/" + href.Replace(".html", ""));
                }
            }
        }

        private void RemoveUnwantedNodes() {
            htmlDocument.DocumentNode
                .Descendants()
                .ToList() //avoiding InvalidOperationException
                .Where(IsUnWantedNode)
                .Select(p => p.XPath)
                .ToList()
                .ForEach(p => htmlDocument.DocumentNode.SelectSingleNode(p)?.Remove());
        }

        private bool IsUnWantedNode(HtmlNode node) {
            if (node.Name == "header" && node.GetAttributeValue("class", "") != "article-header") {
                return true;
            }

            switch (node.Name) {
                case "footer":
                case "script":
                case "nav":
                case "link" when node.GetAttributeValue("rel", "") == "stylesheet":
                    return true;
            }

            if (node.Name == "button" && node.GetAttributeValue("class", "") ==
                "vp-a11y-skip-trigger vp-js-a11y-navigation-toggle") {
                return true;
            }

            if (node.Name == "div" && node.GetAttributeValue("class", "") == "vp-error-log") {
                return true;
            }

            if (node.Name == "div" && node.GetAttributeValue("class", "").Contains("table-overlay")) {
                return true;
            }

            if (node.Name == "vp-a11y-skip-controller") {
                return true;
            }

            return false;
        }
    }
}