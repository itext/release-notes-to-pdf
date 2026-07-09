/*
    This file is part of the iText (R) project.
    Copyright (c) 1998-2026 Apryse Group NV
    Authors: Apryse Software.

    This program is offered under a commercial and under the AGPL license.
    For commercial licensing, contact us at https://itextpdf.com/sales.  For AGPL licensing, see below.

    AGPL licensing:
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Text;
using HtmlAgilityPack;
using iText.Html2pdf;
using iText.Html2pdf.Attach.Impl;
using iText.IO.Image;
using iText.Kernel.Colors;
using iText.Kernel.Mac;
using iText.Kernel.Pdf;
using iText.Kernel.Pdf.Event;
using iText.Kernel.Pdf.Filespec;
using iText.Kernel.Validation;
using iText.Kernel.XMP;
using iText.Layout;
using iText.Layout.Borders;
using iText.Layout.Element;
using iText.Layout.Properties;
using iText.Layout.Properties.Margins;
using iText.Layout.Tagging;
using iText.Licensing.Base;
using iText.Pdfa;
using iText.Pdfua.Checkers;
using iText.StyledXmlParser.Resolver.Font;
using ReleaseNotesGenerator.Utils;
using Path = System.IO.Path;

namespace ReleaseNotesGenerator {
    internal static class Program {
        // Don't change these variables.
        private const string ResourceDirectory = "resources";

        private static string Version;
        private static string FileName;
        private static string PageToConvert;
        private static string SigningReason;

        // You can change these variables.
        private const string Password = "itext";
        private const CountrySigning CountryUsedForSigning = CountrySigning.Belgium;

        private const string SigningLocation = "Ghent (Belgium)";
        private const string SignatureFieldName = "signature_id";

        private static readonly string ResourceRootPath = Path.Combine(AppContext.BaseDirectory, ResourceDirectory);
        private static readonly string OutputDirectory = Path.Combine(AppContext.BaseDirectory, "out");
        private static readonly string MacProtectedName = Path.Combine(OutputDirectory, "release_notes_mac_protected.pdf");

        static void Main(string[] args) {
            Directory.CreateDirectory(OutputDirectory);
            Version = ReleaseNotesDiscoveryUtil.GetReleaseProductVersions(ResourceRootPath)["itext-core"];
            FileName = Path.Combine(OutputDirectory, $"release_notes_{Version}.pdf");
            SigningReason = "Release notes for iText " + Version;
            PageToConvert = "release-itext-core-" + Version.Replace(".", "-") + ".html";
            
            Console.WriteLine($"Generating release notes for version {Version}...");

            string? licenseKey;
            while (true) {
                Console.Write("Please enter path to your iText license key:\n");
                licenseKey = Console.ReadLine();
                
                // Allow pasting paths wrapped in quotes, e.g. "C:\path\license.json"
                licenseKey = licenseKey?.Trim();
                if (!string.IsNullOrEmpty(licenseKey)) {
                    if ((licenseKey.Length >= 2 && licenseKey[0] == '"' && licenseKey[^1] == '"')) {
                        licenseKey = licenseKey.Substring(1, licenseKey.Length - 2);
                    }
                }

                if (!string.IsNullOrWhiteSpace(licenseKey) && File.Exists(licenseKey)) {
                    Console.WriteLine("License key file found.");
                    break;
                }

                Console.WriteLine("License key file not found. Please enter a valid license key file path.");
            }

            LicenseKey.LoadLicenseFile(new FileInfo(licenseKey));
            GenerateMainPdfDocument();
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

        private static PdfDocument CreateWtpdfDocument() {
            var iccPath = Path.Combine(ResourceRootPath, "sRGB Color Space Profile.icm");
            using var iccStream = File.Open(iccPath, FileMode.Open, FileAccess.Read);
            var outputIntent = new PdfOutputIntent(
                "Custom",
                "",
                "http://www.color.org",
                "sRGB IEC61964-2.1", iccStream
            );
            var writerProperties = new WriterProperties().SetPdfVersion(PdfVersion.PDF_2_0);
            var pdfDocument = new UniqueHandlerInstancePdfADocument(new PdfWriter(FileName, writerProperties), PdfAConformance.PDF_A_4F, outputIntent);

            using var xmpStream = File.Open(Path.Combine(ResourceRootPath, "simplePdfUA2.xmp"), FileMode.Open, FileAccess.Read);
            var xmpMeta = XMPMetaFactory.Parse(xmpStream);

            pdfDocument.GetDiContainer().Register(typeof(ProhibitedTagRelationsResolver), new ProhibitedTagRelationsResolver(pdfDocument));

            var container = pdfDocument.GetDiContainer().GetInstance<ValidationContainer>();
            container.AddChecker(new PdfUA2Checker(pdfDocument));

            pdfDocument.SetXmpMetadata(xmpMeta);
            pdfDocument.SetTagged();
            pdfDocument.GetCatalog().SetViewerPreferences(new PdfViewerPreferences().SetDisplayDocTitle(true));
            pdfDocument.GetCatalog().SetLang(new PdfString("en-US"));

            return pdfDocument;
        }

        private static void SignDocument() {
            var signedFileName = FileName.Replace(".pdf", "") + "-pkcs11-signed.pdf";
            new EIdSigner(ResourceRootPath, FileName, signedFileName, CountryUsedForSigning)
                .Sign(SignatureFieldName, SigningReason, SigningLocation);

            var fileInfo = new FileInfo(signedFileName);
            Console.WriteLine("Generated signed release notes for version " + Version + " in " + fileInfo.FullName);
        }

        private static void AddMacProtectedVersion(PdfDocument pdfDocument) {
            GenerateMacProtectedVersion();
            var macProtectedBytes = File.ReadAllBytes(MacProtectedName);
            string macProtectedPdfTitle = "Release notes for iText " + Version + " (Mac protected).pdf";
            string macProtectedPdfDescription =
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
            var sourceCodeZipFile = Path.Combine(OutputDirectory, "source-code.zipx");
            const string fileTitle = "source-code.zipx";
            const string fileDescription = "This zip file contains the source code to recreate this pdf.";
            const string readmeTitle = "README.md";
            const string readmeDescription = "Build instructions for the project.";

            if (File.Exists(sourceCodeZipFile)) {
                File.Delete(sourceCodeZipFile);
            }

            // Deterministic & working-dir independent project root discovery:
            // assume executable is in ReleaseNotesGenerator/bin/... and walk upwards until we find the solution README.md.
            var projectRoot = FindProjectRoot(AppContext.BaseDirectory)
                              ?? throw new Exception("Could not find project root (README.md not found while walking up directories).");

            using (var zip = ZipFile.Open(sourceCodeZipFile, ZipArchiveMode.Create)) {
                StructuredZipFolderBuilder.StructuredZip(zip, projectRoot);
            }

            var readmeMd = File.ReadAllBytes(Path.Combine(projectRoot, "README.md"));
            var readmeSpec = PdfFileSpec.CreateEmbeddedFileSpec(document, readmeMd, readmeDescription, readmeTitle, null, null, null);
            document.AddFileAttachment(readmeTitle, readmeSpec);

            var fileBytes = File.ReadAllBytes(sourceCodeZipFile);
            var spec = PdfFileSpec.CreateEmbeddedFileSpec(document, fileBytes, fileDescription, fileTitle, null, null, PdfName.Data);
            document.AddFileAttachment(fileTitle, spec);
        }
        
        private static string? FindProjectRoot(string startDirectory) {
            var dir = new DirectoryInfo(startDirectory);
            while (dir != null) {
                if (File.Exists(Path.Combine(dir.FullName, "README.md"))) {
                    return dir.FullName;
                }
                dir = dir.Parent;
            }
            return null;
        }

        private static void GenerateMacProtectedVersion() {
            var passWordBytes = Encoding.UTF8.GetBytes(Password);
            var writerProperties = new WriterProperties().SetPdfVersion(PdfVersion.PDF_2_0)
                .SetStandardEncryption(passWordBytes, passWordBytes, 0,
                    EncryptionConstants.ENCRYPTION_AES_256,
                    new MacProperties(MacProperties.MacDigestAlgorithm.SHA_256));
            var pdfDocument = new UniqueHandlerInstancePdfDocument(new PdfWriter(MacProtectedName, writerProperties));
            GeneratePdfFromHtml(pdfDocument);
            pdfDocument.Close();
        }


        private static void GeneratePdfFromHtml(PdfDocument pdfDocument) {
            var fontProvider = new BasicFontProvider(false, false, false);

            var fontsDir = Path.Combine(ResourceRootPath, "font");
            Directory.GetFiles(fontsDir, "*.ttf")
                .OrderBy(p => p, StringComparer.Ordinal)
                .ToList()
                .ForEach(file => fontProvider.AddFont(file));

            var baseDirectorySite = Path.Combine(ResourceRootPath, "kb.itextpdf.com", "itext");

            var outlineHandler = OutlineHandler.CreateStandardHandler();
            var converterProperties = new ConverterProperties()
                .SetBaseUri(baseDirectorySite)
                .SetImmediateFlush(false)
                .SetOutlineHandler(outlineHandler)
                .SetTagWorkerFactory(new CustomTagWorkerFactory())
                .SetFontProvider(fontProvider);

            var html = File.ReadAllText(Path.Combine(baseDirectorySite, PageToConvert));

            var font = Utils.FontUtil.CreateNotoSans(ResourceRootPath);
            var pageNumberHandler = new AddPdfACompliantPageNumbers(font);
            pdfDocument.AddEventHandler(PdfDocumentEvent.END_PAGE, pageNumberHandler);

            var htmlDocument = new HtmlDocument();
            htmlDocument.LoadHtml(html);

            var htmlProcessor = new HtmlProcessor(htmlDocument);
            htmlProcessor.PreProcess(Version);

            var customContentInjector = new CustomContentInjector(htmlDocument, ResourceRootPath);
            var pathToCustomStyle = ReleaseNotesDiscoveryUtil.ReplaceVersionPlaceholdersInCustomStyle(ResourceRootPath);
            customContentInjector.Inject(pathToCustomStyle, "//head", 0);
            customContentInjector.Inject("customhtml/footer.html", "//body", 0);
            customContentInjector.Inject("customhtml/logo.html", "//body", 1);
            customContentInjector.Inject("customhtml/custom_content_after_logo.html", "//body", 2);
            customContentInjector.Inject("customhtml/custom_content_at_end.html", "//body");

            // We need full html before post-processing.
            new TocAndBookMarkGenerator(htmlDocument, pdfDocument).AddTocAndBookmarks();
            htmlProcessor.PostProcess();

            var document = HtmlConverter.ConvertToDocument(htmlDocument.DocumentNode.OuterHtml, pdfDocument, converterProperties);
            AddDynamicMarginsFootnotesAndWebPImage(document);
            document.Flush();

            var lcg = new LayeredCodeSamplesGenerator(pdfDocument, fontProvider, ResourceDirectory);
            lcg.AddCodeSample("footnotes-sample", "Footnotes example");

            // Update document info.
            var info = pdfDocument.GetDocumentInfo();
            info.SetTitle("Release notes for iText Core " + Version);
            info.SetAuthor("iText Software");
            info.SetSubject("Release notes for iText Core " + Version);
            info.SetKeywords("iText, release notes, pdf");

            // If you keep layered code samples, ensure they also read resources via ResourceRootPath (see note below).
            document.Close();
        }

        private static void AddDynamicMarginsFootnotesAndWebPImage(Document document) {
            document.Add(new SectionBreak(new PageMarginBoxes(new List<PageMarginContent>() {
                new PageMarginContent(MarginBoxName.TOP, TopMarginContent()),
                new PageMarginContent(MarginBoxName.LEFT, LeftMarginContent()),
                new PageMarginContent(MarginBoxName.RIGHT, RightMarginContent()),
                new PageMarginContent(MarginBoxName.BOTTOM, 160),
            })));

            Style footnotesContainerStyle = new Style()
                .SetBorderTop(new SolidBorder(ColorConstants.LIGHT_GRAY, 1))
                .SetBackgroundColor(new DeviceRgb(250, 250, 250))
                .SetPaddingTop(8);

            FootnotesProperties footnotesProperties = new FootnotesProperties()
                .SetFootnoteNumberingType(FootnoteNumberingType.DECIMAL)
                .SetFootnoteNumberingConfig(FootnoteNumberingConfig.PER_PAGE)
                .SetFootnotesContainerStyle(footnotesContainerStyle);

            document.SetFootnotesProperties(footnotesProperties);

            document.Add(new Paragraph("WebP images in PDF documents")
                .SetFontSize(20)
                .SetFontColor(new DeviceRgb(60, 60, 150))
                .SetMarginBottom(20)
                .SetMarginTop(15)
                .SetTextAlignment(TextAlignment.CENTER));

            document.SetFont(Utils.FontUtil.CreateNotoSans(ResourceRootPath));
            Paragraph p1 = new Paragraph()
                .Add("To enable WebP")
                .Add(new FootnoteAnchor(new Footnote("WebP is a modern image format that provides superior " +
                                                     "lossless and lossy compression for images on the web. " +
                                                     "Using WebP, webmasters and web developers can create " +
                                                     "smaller, richer images that make the web faster.")))
                .Add(" image support in your PDF, " + 
                     "you must first include the official iText WebP module in your project. " +
                     "In .NET, simply add the following NuGet")
                .Add(new FootnoteAnchor(new Footnote("NuGet is the package manager for .NET.")))
                .Add(" package reference to your project file " +
                     "(or use the Package Manager Console):")
                .SetMarginBottom(15);
            Paragraph p2 = new Paragraph()
                .Add(new Text("<PackageReference Include=\"itext.webp-image-support\" Version=\"9.7.0\" />")
                    .SetFontColor(new DeviceRgb(1, 65, 103)))
                .SetBackgroundColor(new DeviceRgb(255, 240, 233))
                .SetBorderRadius(new BorderRadius(5))
                .SetMarginBottom(15);
            Paragraph p3 = new Paragraph()
                .Add("In Java, the same result is achieved by adding the following Maven dependency " +
                     "to your pom.xml – the artifact is hosted on Maven Central")
                .Add(new FootnoteAnchor(new Footnote("The Maven Central Repository is the default remote repository " +
                                                     "used by Maven to download project dependencies for Java.")))
                .Add(" and is automatically resolved by your build tool:")
                .SetMarginBottom(15);
            Paragraph p4 = new Paragraph()
                    .Add(new Text("<dependency>\n" +
                                  "\u00a0 \u00a0 \u00a0 \u00a0 <<groupId>com.itextpdf</groupId>\n" +
                                  "\u00a0 \u00a0 \u00a0 \u00a0 <<artifactId>webp-image-support</artifactId>\n" +
                                  "\u00a0 \u00a0 \u00a0 \u00a0 <<version>9.7.0</version>\n" +
                                  "</dependency>")
                        .SetFontColor(new DeviceRgb(1, 65, 103)))
                    .SetBackgroundColor(new DeviceRgb(255, 240, 233))
                    .SetBorderRadius(new BorderRadius(5))
                    .SetMarginBottom(15);
            Paragraph p5 = new Paragraph()
                .Add("Once this dependency is in place, you can seamlessly embed WebP images " +
                     "into your PDF documents using the standard ImageDataFactory, " +
                     "and iText will automatically handle the decoding and rendering.")
                .SetMarginBottom(30);

            Image webpImage = new Image(ImageDataFactory.Create(Path.Combine(ResourceRootPath, "images/logo.webp")));
            webpImage.GetAccessibilityProperties().SetActualText("iText logo in WebP format");
            webpImage.SetHorizontalAlignment(HorizontalAlignment.CENTER).SetWidth(200);

            document.Add(p1).Add(p2).Add(p3).Add(p4).Add(p5).Add(webpImage);
        }

        private static Div TopMarginContent() {
            return new Div()
                    .Add(new Paragraph("iText by Apryse")
                            .SetFontColor(new DeviceRgb(255, 158, 183))
                            .SetFontSize(16)
                            .SetTextAlignment(TextAlignment.CENTER)
                            .SetMargin(0))
                    .SetBackgroundColor(new DeviceRgb(250, 223, 231))
                    .SetHeight(50)
                    .SetVerticalAlignment(VerticalAlignment.MIDDLE)
                    .SetBorderBottom(new SolidBorder(new DeviceRgb(255, 180, 204), 4));
        }

        private static Div LeftMarginContent() {
            return new Div()
                    .Add(new Paragraph("iText by Apryse")
                            .SetFontColor(new DeviceRgb(20, 130, 100))
                            .SetFontSize(11)
                            .SetTextAlignment(TextAlignment.CENTER)
                            .SetMargin(0)
                            .SetRotationAngle(Math.PI / 2))
                    .SetBackgroundColor(new DeviceRgb(225, 250, 240))
                    .SetVerticalAlignment(VerticalAlignment.MIDDLE)
                    .SetPaddingLeft(6)
                    .SetPaddingRight(6)
                    .SetBorderRight(new SolidBorder(new DeviceRgb(140, 255, 200), 5));
        }

        private static Div RightMarginContent() {
            return new Div()
                    .Add(new Paragraph("iText by Apryse")
                            .SetFontColor(new DeviceRgb(180, 110, 0))
                            .SetFontSize(11)
                            .SetTextAlignment(TextAlignment.CENTER)
                            .SetMargin(0)
                            .SetRotationAngle(-Math.PI / 2))
                    .SetBackgroundColor(new DeviceRgb(255, 245, 225))
                    .SetVerticalAlignment(VerticalAlignment.MIDDLE)
                    .SetPaddingLeft(6)
                    .SetPaddingRight(6)
                    .SetBorderLeft(new SolidBorder(new DeviceRgb(255, 220, 140), 5));
        }
    }
}
