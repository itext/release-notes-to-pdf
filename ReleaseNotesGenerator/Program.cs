using System;
using System.Diagnostics;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Text;
using HtmlAgilityPack;
using iText.Commons.Utils;
using iText.Html2pdf;
using iText.Html2pdf.Resolver.Font;
using iText.Kernel.Font;
using iText.Kernel.Geom;
using iText.Kernel.Mac;
using iText.Kernel.Pdf;
using iText.Kernel.Pdf.Event;
using iText.Kernel.Pdf.Filespec;
using iText.Kernel.XMP;
using iText.Layout;
using iText.Layout.Borders;
using iText.Layout.Element;
using iText.Layout.Properties;
using iText.Licensing.Base;
using iText.Pdfa;
using iText.Svg.Converter;
using iText.Svg.Processors;
using iText.Svg.Processors.Impl;
using ReleaseNotesGenerator.Utils;
using Path = System.IO.Path;

namespace ReleaseNotesGenerator {
    internal static class Program {
        //Don't change these variables
        private const string ResourceDirectory = "resources";

        //You can change these variables 
        private const string Version = "9.1.0";
        private const string Password = "itext";
        private static readonly string FileName = $"release_notes_{Version}.pdf";
        private const string MacProtectedName = "release_notes_mac_protected.pdf";
        private const string HugeTableLayoutedName = "huge_table_layouted.pdf";
        private const int NumberOfCellsInHugeTable = 10000;
        private const string CountryToUseForSigning = "belgium"; //or portugal
        private const string PageToConvert = "release-itext-core-9-1.html";
        private const string SigningReason = "Release notes for iText " + Version;
        private const string SigningLocation = "Ghent (Belgium)";
        private const string SignatureFieldName = "signature_id";
        private const string SvgExampleFile = "happyAnniversary";


        static void Main(string[] args) {
            Console.WriteLine($"Generating release notes for version {Version}...");
            LicenseKey.LoadLicenseFile(new FileInfo("../../../resources/all-products.json"));
            GenerateMainPdfDocument();
        }

        private static void GenerateMainPdfDocument() {
            var pdfDocument = CreateWtpdfDocument();
            AddMacProtectedVersion(pdfDocument);
            AddSourceCodeFiles(pdfDocument);
            
            var tableLyoutingPrompt = "Do you want to create a PDF with huge table and attach it to release notes? (y/n)";
            Console.WriteLine(tableLyoutingPrompt);
            var layoutTable = Console.ReadLine();
            if (layoutTable != null && layoutTable.ToLower().Equals("y")) {
                Stopwatch sw = Stopwatch.StartNew();
                GenerateAndAttachPdfWithHugeTableToMeasurePerformance(pdfDocument);
                sw.Stop();
                Console.WriteLine("Generating a table with " + NumberOfCellsInHugeTable + " cells takes " + sw.ElapsedMilliseconds + " milliseconds.");
            }

            GeneratePdfFromHtmlAndSvg(pdfDocument);
            var fileInfo = new FileInfo(FileName);
            Console.WriteLine("Generated release notes for version " + Version + " in " +
                              fileInfo.FullName);
            var signPrompt = "Do you want to sign the document with a " + CountryToUseForSigning +
                             " eID card? (y/n)";
            Console.WriteLine(signPrompt);
            var sign = Console.ReadLine();
            if (sign != null && sign.ToLower().Equals("y")) {
                SignDocument();
            }
        }

        private static PdfDocument CreateWtpdfDocument() {
            var path = Path.Combine(Directory.GetCurrentDirectory(), ResourceDirectory, "sRGB Color Space Profile.icm");
            var outputIntent = new PdfOutputIntent(
                "Custom",
                "",
                "http://www.color.org",
                "sRGB IEC61964-2.1", File.Open(path, FileMode.Open, FileAccess.Read)
            );
            var writerProperties = new WriterProperties().SetPdfVersion(PdfVersion.PDF_2_0);
            var pdfDocument = new PdfADocument(new PdfWriter(FileName, writerProperties), PdfAConformance.PDF_A_4F,
                outputIntent);
            var xmpMeta = XMPMetaFactory.Parse(File.Open(Path.Combine(ResourceDirectory, "simplePdfUA2.xmp"),
                FileMode.Open, FileAccess.Read));

            pdfDocument.SetXmpMetadata(xmpMeta);
            pdfDocument.SetTagged();
            pdfDocument.GetCatalog().SetViewerPreferences(new PdfViewerPreferences().SetDisplayDocTitle(true));
            pdfDocument.GetCatalog().SetLang(new PdfString("en-US"));
            var info = pdfDocument.GetDocumentInfo();
            info.SetTitle("Release notes for iText " + Version);
            info.SetAuthor("iText Software");
            info.SetSubject("Release notes for iText " + Version);
            info.SetKeywords("iText, release notes, pdf");
            return pdfDocument;
        }

        private static void SignDocument() {
            var signedFileName = FileName.Replace(".pdf", "") + "-pkcs11-signed.pdf";
            new EIdSigner(ResourceDirectory, FileName, signedFileName, CountryToUseForSigning)
                .Sign(SignatureFieldName, SigningReason, SigningLocation);
            var fileInfo = new FileInfo(signedFileName);
            Console.WriteLine("Generated signed release notes for version " + Version + " in " + fileInfo.FullName);
        }

        private static void AddMacProtectedVersion(PdfDocument pdfDocument) {
            GenerateMacProtectedVersion();
            var macProtectedBytes = File.ReadAllBytes(MacProtectedName);
            const string macProtectedPdfTitle = "Release notes for iText " + Version + " (Mac protected).pdf";
            const string macProtectedPdfDescription =
                "This PDF is a protected version of the release notes for iText " +
                Version + " use the password '" + Password + "' to open it.";
            var spec = PdfFileSpec.CreateEmbeddedFileSpec(pdfDocument, macProtectedBytes, macProtectedPdfDescription,
                macProtectedPdfTitle, null, null, null);
            pdfDocument.AddFileAttachment(macProtectedPdfTitle, spec);
        }

        private static void AddSourceCodeFiles(PdfDocument document) {
            const string sourceCodeZipFolder = "./source-code.zip";
            const string fileTitle = "source-code.zip";
            const string fileDescription = "This zip file contains the source code to recreate this pdf.";
            const string readmeTitle = "README.md";
            const string readmeDescription =
                "This is the readme file, it contains information on how to build the project";


            //remove the zip file
            if (File.Exists(sourceCodeZipFolder)) {
                File.Delete(sourceCodeZipFolder);
            }

           
            //If executed from the bin folder, we need to go up 4 levels to get to the project directory
            var projectDirectory =
                Directory.GetParent(Directory.GetCurrentDirectory())?.Parent?.Parent?.Parent?.FullName;
           
            // If executed from the project directory, have to go up 1 level
            if (projectDirectory == null) {
                projectDirectory = Directory.GetParent(Directory.GetCurrentDirectory())?.FullName;
            }
           
            Console.WriteLine(projectDirectory);

            using (var zip = ZipFile.Open("./source-code.zip", ZipArchiveMode.Create)) {
                if (projectDirectory == null) {
                    throw new Exception("Could not find the project directory");
                }

                StructuredZipFolderBuilder.StructuredZip(zip, projectDirectory);
            }

            var readmeMd = File.ReadAllBytes(Path.Combine(projectDirectory, "README.md"));
            var readmeSpec = PdfFileSpec.CreateEmbeddedFileSpec(document, readmeMd, readmeDescription, readmeTitle,
                null, null, null);
            document.AddFileAttachment("README.md", readmeSpec);


            var fileBytes = File.ReadAllBytes(sourceCodeZipFolder);
            var spec = PdfFileSpec.CreateEmbeddedFileSpec(document, fileBytes, fileDescription, fileTitle + "x", null,
                null, PdfName.Data);
            document.AddFileAttachment(fileTitle, spec);
            
            // Add svg files and css stylesheet.
            const string svgOverview = "./resources/svg/svgOverview.svg";
            const string svgOverviewTitle = "svgOverview.svg";
            const string svgOverviewDescription = "This SVG file contains a list describing some of the features " +
                                                  "for converting SVG to PDF using iText.";
            var svgOverviewBytes = File.ReadAllBytes(svgOverview);

            var svgOverviewSpec = PdfFileSpec.CreateEmbeddedFileSpec(document, svgOverviewBytes, svgOverviewDescription,
                svgOverviewTitle, null, null, PdfName.Data);
            document.AddFileAttachment(svgOverviewTitle, svgOverviewSpec);

            string svgExample = $"./resources/svg/{SvgExampleFile}.svg";
            const string svgExampleTitle = "svgExample.svg";
            const string svgExampleDescription = "This SVG file contains an example of the main capabilities of " +
                                                 "iText for converting SVG to PDF.";
            var svgExampleBytes = File.ReadAllBytes(svgExample);
            var svgExampleSpec = PdfFileSpec.CreateEmbeddedFileSpec(document, svgExampleBytes, svgExampleDescription,
                svgExampleTitle, null, null, PdfName.Data);
            document.AddFileAttachment(svgExampleTitle, svgExampleSpec);

            const string cssStyle = "./resources/svg/svgStyle.css";
            const string cssStyleTitle = "svgStyle.css";
            const string cssStyleDescription = "This CSS file is used as embedded stylesheet while converting SVG to PDF.";
            var cssStyleBytes = File.ReadAllBytes(cssStyle);
            var cssStyleSpec = PdfFileSpec.CreateEmbeddedFileSpec(document, cssStyleBytes, cssStyleDescription,
                cssStyleTitle, null, null, PdfName.Data);
            document.AddFileAttachment(cssStyleTitle, cssStyleSpec);
        }


        private static void GenerateMacProtectedVersion() {
            var passWordBytes = Encoding.UTF8.GetBytes(Password);
            var writerProperties = new WriterProperties().SetPdfVersion(PdfVersion.PDF_2_0)
                .SetStandardEncryption(passWordBytes, passWordBytes, 0,
                    EncryptionConstants.ENCRYPTION_AES_256,
                    new MacProperties(MacProperties.MacDigestAlgorithm.SHA_256));
            var pdfDocument = new PdfDocument(new PdfWriter(MacProtectedName, writerProperties));
            GeneratePdfFromHtmlAndSvg(pdfDocument);
            pdfDocument.Close();
        }


        private static void GeneratePdfFromHtmlAndSvg(PdfDocument pdfDocument) {
            var fontProvider = new DefaultFontProvider(false, false, false);
            var baseDirectorySite = Path.Combine(Directory.GetCurrentDirectory(), ResourceDirectory, "kb.itextpdf.com",
                "itext");
            Directory.GetFiles(Path.Combine(ResourceDirectory, "font"), "*.ttf")
                .ToList().ForEach(file => fontProvider.AddFont(file));
            var converterProperties = new ConverterProperties()
                .SetBaseUri(baseDirectorySite)
                .SetImmediateFlush(false)
                .SetTagWorkerFactory(new CustomTagWorkerFactory())
                .SetFontProvider(fontProvider);

            var html = File.ReadAllText(Path.Combine(baseDirectorySite, PageToConvert));

            var font = PdfFontFactory.CreateFont(Path.Combine(Directory.GetCurrentDirectory(), ResourceDirectory,
                "font", "NotoSans-Regular.ttf"));
            var pagNumberHandler = new AddPdfACompliantPageNumbers(font);
            pdfDocument.AddEventHandler(PdfDocumentEvent.END_PAGE, pagNumberHandler);
            var htmDocument = new HtmlDocument();
            htmDocument.LoadHtml(html);

            var htmlProcessor = new HtmlProcessor(htmDocument);
            htmlProcessor.PreCustomContentProcess();
            var customContentInjector = new CustomContentInjector(htmDocument, ResourceDirectory);

            customContentInjector.Inject("customhtml/custom_style.html", "//head", 0);
            customContentInjector.Inject("customhtml/logo.html", "//body", 1);
            customContentInjector.Inject($"customhtml/{SvgExampleFile}.html", "//body//div");
            customContentInjector.Inject("customhtml/custom_content_after_logo.html", "//body", 2);
            customContentInjector.Inject("customhtml/custom_content_at_end.html", "//body");
            htmlProcessor.PostCustomContentProcess();
            new TocAndBookMarkGenerator(htmDocument, pdfDocument).AddTocAndBookMark();


            var document =
                HtmlConverter.ConvertToDocument(htmDocument.DocumentNode.OuterHtml, pdfDocument, converterProperties);
            document.Flush();

            // Convert SVG to PDF
            PdfPage page = pdfDocument.AddNewPage(PageSize.A4);
            ISvgConverterProperties properties = new SvgConverterProperties()
                .SetFontProvider(fontProvider)
                .SetBaseUri(Path.Combine(ResourceDirectory, "svg"));
            SvgConverter.DrawOnPage(FileUtil.GetInputStreamForFile(Path.Combine(Directory.GetCurrentDirectory(), 
                ResourceDirectory, "svg/svgOverview.svg")), page, properties);

            var lcg = new LayeredCodeSamplesGenerator(pdfDocument, fontProvider, ResourceDirectory);
            lcg.AddCodeSample("sample1", "Signature validation example");
            pagNumberHandler.SetPages(pdfDocument.GetNumberOfPages());

            if (pdfDocument.GetStructTreeRoot() != null) {
                StructTreePostProcessor.Traverse(pdfDocument.GetStructTreeRoot());
            }

            TraverseOutlines(pdfDocument);
            pdfDocument.Close();
        }

        private static void GenerateAndAttachPdfWithHugeTableToMeasurePerformance(PdfDocument pdfDocument)
        {
            PdfDocument hugeTablePdf = new PdfDocument(new PdfWriter(HugeTableLayoutedName));
            hugeTablePdf.SetTagged();
            Document document = new Document(hugeTablePdf);
            Table table = new Table(5);
            table.UseAllAvailableWidth();
            table.SetBorderCollapse(BorderCollapsePropertyValue.COLLAPSE);
            for (int i = 0; i < NumberOfCellsInHugeTable; i++) {
                Cell cell = new Cell();
                cell.Add(new Paragraph("Hello"));
                cell.SetBorder(new SolidBorder(1));
                table.AddCell(cell);
            }

            document.Add(table);
            document.Close();
            hugeTablePdf.Close();
            
            var hugeTablePdfBytes = File.ReadAllBytes(HugeTableLayoutedName);
            const string hugeTablePdfTitle = "Pdf with layouted huge table to measure performance.pdf";
            const string hugeTablePdfDescription =
                "This PDF consists of huge table which was created by iText to measure performance improvement.";
            var spec = PdfFileSpec.CreateEmbeddedFileSpec(pdfDocument, hugeTablePdfBytes, hugeTablePdfDescription,
                hugeTablePdfTitle, null, null, null);
            pdfDocument.AddFileAttachment(hugeTablePdfTitle, spec);
        }

        /// <summary>
        /// For each outline in the document, we Add the SD entry to satisfy the PDF/UA2 conformance.
        /// </summary>
        /// <param name="pdfDocument">The Pdf document</param>
        private static void TraverseOutlines(PdfDocument pdfDocument) {
            var catalog = pdfDocument.GetCatalog().GetPdfObject();
            var outlines = catalog.GetAsDictionary(PdfName.Outlines);


            var current = outlines.GetAsDictionary(PdfName.First);
            while (current != null) {
                var action = current.GetAsDictionary(PdfName.A);
                action.Put(PdfName.SD, new PdfArray());
                current = current.GetAsDictionary(PdfName.Next);
            }
        }
    }
}