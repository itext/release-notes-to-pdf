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
using HtmlAgilityPack;
using iText.Html2pdf;
using iText.Html2pdf.Attach.Impl;
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
using ReleaseNotesGenerator.Utils;
using System;
using System.CommandLine;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Text;
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
        private static string OutputDirectory = Path.Combine(AppContext.BaseDirectory, "out");
        private static readonly string MacProtectedName = Path.Combine(OutputDirectory, "release_notes_mac_protected.pdf");

        static void Main(string[] args)
        {
            ParseOptions(args);            
        }

        private static void GenerateDocument(ParseResult options)
        {
            if (options.GetValue<FileInfo>("--output") != null)
            {
                OutputDirectory = options.GetValue<FileInfo>("--output").FullName;
            }
            Directory.CreateDirectory(OutputDirectory);
            Version = ReleaseNotesDiscoveryUtil.GetReleaseProductVersions(ResourceRootPath)["itext-core"];
            FileName = Path.Combine(OutputDirectory, $"release_notes_{Version}.pdf");
            SigningReason = "Release notes for iText " + Version;
            PageToConvert = "release-itext-core-" + Version.Replace(".", "-") + ".html";

            Console.WriteLine($"Generating release notes for version {Version}...");

            string? licenseKey;
            while (true)
            {
                var licenseFileOption = options.GetValue<FileInfo>("--license");
                if (licenseFileOption == null)
                {
                    Console.Write("Please enter path to your iText license key:\n");
                    licenseKey = Console.ReadLine();
                }
                else
                {
                    licenseKey = licenseFileOption.FullName;
                    licenseFileOption = null; // Reset to avoid reusing the same option in case of invalid path
                }
                // Allow pasting paths wrapped in quotes, e.g. "C:\path\license.json"
                licenseKey = licenseKey?.Trim();
                if (!string.IsNullOrEmpty(licenseKey))
                {
                    if ((licenseKey.Length >= 2 && licenseKey[0] == '"' && licenseKey[^1] == '"'))
                    {
                        licenseKey = licenseKey.Substring(1, licenseKey.Length - 2);
                    }
                }

                if (!string.IsNullOrWhiteSpace(licenseKey) && File.Exists(licenseKey))
                {
                    Console.WriteLine("License key file found.");
                    break;
                }

                Console.WriteLine("License key file not found. Please enter a valid license key file path.");
            }

            LicenseKey.LoadLicenseFile(new FileInfo(licenseKey));
            GenerateMainPdfDocument(options);
        }

        private static void ParseOptions(string[] args)
        {
            Option<FileInfo> licenceFile = new Option<FileInfo> ("--license", "-l")
            {
                Description = "The licence file to use"
            };

            Option<FileInfo> outputFolder = new Option<FileInfo>("--output", "-o")
            {
                Description = "The output folder to use"
            };

            Option<bool> sign= new Option<Boolean>("--sign", "-s")
            {
                Description = "Enable signing of the output PDF"
            };

            Option<bool> noSign= new Option<Boolean>("--no-sign", "-n")
            {
                Description = "Disable signing of the output PDF"
            };

            RootCommand rootCommand = new RootCommand("Release doc creator");
            rootCommand.Options.Add(licenceFile);
            rootCommand.Options.Add(outputFolder);
            rootCommand.Options.Add(sign);
            rootCommand.Options.Add(noSign);

            rootCommand.SetAction((pr) => GenerateDocument(pr));

            rootCommand.Parse(args).Invoke();                        
        }

        private static void GenerateMainPdfDocument(ParseResult options) {
            var pdfDocument = CreateWtpdfDocument();
            AddMacProtectedVersion(pdfDocument);
            AddSourceCodeFiles(pdfDocument);

            GeneratePdfFromHtml(pdfDocument);
            var fileInfo = new FileInfo(FileName);
            Console.WriteLine("Generated release notes for version " + Version + " in " +
                              fileInfo.FullName);

            if (options.GetValue<Boolean>("--sign"))
            {
                SignDocument();
            }
            else if (!options.GetValue<Boolean>("--no-sign"))
            {
                var signPrompt = "Do you want to sign the document with a " + CountryUsedForSigning +
                                 " eID card? (y/n)";
                Console.WriteLine(signPrompt);
                var sign = Console.ReadLine();
                if (sign != null && sign.ToLower().Equals("y"))
                {
                    SignDocument();
                }
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
            var pdfDocument = new PdfADocument(new PdfWriter(FileName, writerProperties), PdfAConformance.PDF_A_4F, outputIntent);

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
            var pdfDocument = new PdfDocument(new PdfWriter(MacProtectedName, writerProperties));
            GeneratePdfFromHtml(pdfDocument);
            pdfDocument.Close();
        }


        private static void GeneratePdfFromHtml(PdfDocument pdfDocument) {
            var fontProvider = new BasicFontProvider(false, false, false);

            var fontsDir = Path.Combine(ResourceRootPath, "font");
            Directory.GetFiles(fontsDir, "*.*tf")
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
            //AddDynamicMarginsFootnotesAndWebPImage(document);
            document.Flush();

            var lcg = new LayeredCodeSamplesGenerator(pdfDocument, fontProvider, ResourceDirectory);
            lcg.AddCodeSample("vertical-text", "Vertical text example");

            // Update document info.
            var info = pdfDocument.GetDocumentInfo();
            info.SetTitle("Release notes for iText Core " + Version);
            info.SetAuthor("iText Software");
            info.SetSubject("Release notes for iText Core " + Version);
            info.SetKeywords("iText, release notes, pdf");

            // If you keep layered code samples, ensure they also read resources via ResourceRootPath (see note below).
            document.Close();
        }        
    }
}
