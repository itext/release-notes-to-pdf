using System;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Text;
using HtmlAgilityPack;
using iText.Html2pdf;
using iText.Html2pdf.Attach.Impl;
using iText.Kernel.Font;
using iText.Kernel.Geom;
using iText.Kernel.Mac;
using iText.Kernel.Pdf;
using iText.Kernel.Pdf.Event;
using iText.Kernel.Pdf.Filespec;
using iText.Kernel.Validation;
using iText.Kernel.XMP;
using iText.Layout.Tagging;
using iText.Licensing.Base;
using iText.Pdfa;
using iText.Pdfua.Checkers;
using iText.StyledXmlParser.Resolver.Font;
using iText.Test.Pdfa;
using ReleaseNotesGenerator.Utils;
using Path = System.IO.Path;

namespace ReleaseNotesGenerator {
    internal static class Program {
        //Don't change these variables
        private const string ResourceDirectory = "resources";

        //You can change these variables 
        private const string Version = "9.2.0";
        private const string Password = "itext";
        private static readonly string FileName = $"release_notes_{Version}.pdf";
        private const string MacProtectedName = "release_notes_mac_protected.pdf";
        private const CountrySigning CountryUsedForSigning = CountrySigning.BELGIUM;

        private const string PageToConvert = "release-itext-core-9-2-0.html";
        private const string SigningReason = "Release notes for iText " + Version;
        private const string SigningLocation = "Ghent (Belgium)";
        private const string SignatureFieldName = "signature_id";


        static void Main(string[] args) {
            Console.WriteLine($"Generating release notes for version {Version}...");
            //Prompt the user for the license key

            string? licenseKey = null;
            while (true) {
                Console.Write("Please enter path to your iText license key:\n");
                licenseKey = Console.ReadLine();
                if (File.Exists(licenseKey)) {
                    Console.WriteLine("License key file found.");
                    break;
                }

                Console.WriteLine("License key file not found. Please enter a valid license key file path.");
            }


            LicenseKey.LoadLicenseFile(new FileInfo(licenseKey));
            GenerateMainPdfDocument();
            CheckPdfCompliance();
        }

        private static void GenerateMainPdfDocument() {
            var pdfDocument = CreateWtpdfDocument();
            AddMacProtectedVersion(pdfDocument);
            AddSourceCodeFiles(pdfDocument);

            GeneratePdfFromHtml(pdfDocument);
            var fileInfo = new FileInfo(FileName);
            Console.WriteLine("Generated release notes for version " + Version + " in " +
                              fileInfo.FullName);
            var signPrompt = "Do you want to sign the document with a " + CountryUsedForSigning +
                             " eID card? (y/n)";
            Console.WriteLine(signPrompt);
            var sign = Console.ReadLine();
            if (sign != null && sign.ToLower().Equals("y")) {
                SignDocument();
            }
        }

        private static void CheckPdfCompliance() {
            // CustomVeraPdfValidator will be removed after
            // TODO DEVSIX-9041 pdfTest: Allow specify conformance to check in VeraPdfValidator
            var result = new VeraPdfValidator().Validate(FileName);
            if (!string.IsNullOrEmpty(result)) {
                Console.WriteLine(result);
                throw new Exception("Validation failed");
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
            pdfDocument.GetDiContainer().Register(typeof(ProhibitedTagRelationsResolver),
                new ProhibitedTagRelationsResolver(pdfDocument));

            var container = pdfDocument.GetDiContainer().GetInstance<ValidationContainer>();
            container.AddChecker(new PdfUA2Checker(pdfDocument));

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
            new EIdSigner(ResourceDirectory, FileName, signedFileName, CountryUsedForSigning)
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

        /// <summary>
        /// By default everything in the resources directory is added to a zip file,
        /// additionally the README.md file is added as plain attachment at base level of the pdf document so its easie
        /// to find the build instructions
        /// </summary>
        /// <param name="document"></param>
        /// <exception cref="Exception"></exception>
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
        }


        private static void GenerateMacProtectedVersion() {
            var passWordBytes = Encoding.UTF8.GetBytes(Password);
            var writerProperties = new WriterProperties().SetPdfVersion(PdfVersion.PDF_2_0)
                .SetStandardEncryption(passWordBytes, passWordBytes, 0,
                    EncryptionConstants.ENCRYPTION_AES_256,
                    new MacProperties(MacProperties.MacDigestAlgorithm.SHA_256));
            var pdfDocument = new PdfDocument(new PdfWriter(MacProtectedName, writerProperties));
            GeneratePdfFromHtml(pdfDocument);
            pdfDocument.Close();
        }


        private static void GeneratePdfFromHtml(PdfDocument pdfDocument) {
            var fontProvider = new BasicFontProvider(false, false, false);
            var baseDirectorySite = Path.Combine(Directory.GetCurrentDirectory(), ResourceDirectory, "kb.itextpdf.com",
                "itext");
            Directory.GetFiles(Path.Combine(ResourceDirectory, "font"), "*.ttf")
                .ToList().ForEach(file => fontProvider.AddFont(file));

            var outlineHandler = OutlineHandler.CreateStandardHandler();
            var converterProperties = new ConverterProperties()
                .SetBaseUri(baseDirectorySite)
                .SetImmediateFlush(false)
                .SetOutlineHandler(outlineHandler)
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
            customContentInjector.Inject("customhtml/footer.html", "//body", 0);
            customContentInjector.Inject("customhtml/logo.html", "//body", 1);
            customContentInjector.Inject("customhtml/custom_content_after_logo.html", "//body", 2);
            customContentInjector.Inject("customhtml/custom_content_at_end.html", "//body");
            // We need full html before post processing
            new TocAndBookMarkGenerator(htmDocument, pdfDocument).AddTocAndBookMark();
            htmlProcessor.PostCustomContentProcess();

            var document =
                HtmlConverter.ConvertToDocument(htmDocument.DocumentNode.OuterHtml, pdfDocument, converterProperties);
            document.Flush();

            var lcg = new LayeredCodeSamplesGenerator(pdfDocument, fontProvider, ResourceDirectory);
            lcg.AddCodeSample("sample1", "Signature validation example");
            pagNumberHandler.SetPages(pdfDocument.GetNumberOfPages());
            
            document.Close();
            pdfDocument.Close();
        }
    }
}
