using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using iText.Bouncycastle.X509;
using iText.Commons.Bouncycastle.Cert;
using iText.Forms.Fields.Properties;
using iText.Forms.Form.Element;
using iText.IO.Image;
using iText.Kernel.Crypto;
using iText.Kernel.Font;
using iText.Kernel.Geom;
using iText.Kernel.Pdf;
using iText.Signatures;
using Path = System.IO.Path;

namespace ReleaseNotesGenerator.Utils {
    /// <summary>
    ///  Example implementation of signing a pdf with an eID card
    /// Currently only supports Belgium and Portugal
    /// Should be tweakable to support other countries take a look where the EIDRelatedConfigs are used
    /// And adapt it to your country specific settings
    /// </summary>
    public class EIdSigner {
        private static readonly Dictionary<string, Tuple<string, string, string>> EidRelatedConfigs =
            new Dictionary<string, Tuple<string, string, string>> {
                {
                    "portugal", new Tuple<string, string, string>(@"C:\Windows\System32\pteidpkcs11.dll",
                        "CITIZEN SIGNATURE CERTIFICATE", "Portuguese eID N")
                }, {
                    "belgium", new Tuple<string, string, string>(
                        @"C:\Program Files (x86)\Belgium Identity Card\FireFox Plugin Manifests\beid_ff_pkcs11_64.dll",
                        "Signature", "Belgium eID")
                }
            };

        private readonly string resourceDirectory;
        private readonly string fileName;
        private readonly string fileToSign;
        private readonly string countryToUseForSigning;

        public EIdSigner(string resourceDirectory, string fileName, string fileToSign, string countryToUseForSigning) {
            this.resourceDirectory = resourceDirectory;
            this.fileName = fileName;
            this.fileToSign = fileToSign;
            this.countryToUseForSigning = countryToUseForSigning;
        }


        public void Sign(int pageNumber, int xCoordinate, int yCoordinate, string reason, string location) {
            using var signature = new Pkcs11Signature(EidRelatedConfigs[countryToUseForSigning].Item1);
            using var pdfReader = new PdfReader(fileName);
            using var result = File.Create(fileToSign);
            // list available slots
            var slots = signature.GetAvailbaleSlots();
            // select the slot containing a Belgian eId card

            var slot = slots.FirstOrDefault(s =>
                EidRelatedConfigs[countryToUseForSigning].Item3.Equals(s.TokenModel));
            if (slot == null) {
                throw new Exception("No eId card available.");
            }
            // setting the pin here is not needed, and it will be asked interactievely anyhow for signing

            //list available keys
            var keys = signature.GetCertificatesWithPrivateKeys(slot);

            // On a Belgian eId card there are two keys available
            // which both can produce a valid digital signature.
            // But one is designated for authentication purposes and the other for digital signatures.  
            // The keys and their certificate are labelled as such
            //
            // here we search for the key to sign with
            var key = keys.FindLast(k =>
                k.CertificateLabel.Equals(EidRelatedConfigs[countryToUseForSigning].Item2));
            if (key == null) {
                throw new Exception("No valid key found.");
            }

            // Select the key and certificate to be used
            signature.SelectSigningKeyAndCertificate(key);

            var pdfSigner = new CustomPdfSigner(pdfReader, result, new StampingProperties().UseAppendMode());
            IX509Certificate[] certificateWrappers =
                signature.GetChain().Select(e => new X509CertificateBC(e)).ToArray();

            signature.SetDigestAlgorithmName(DigestAlgorithms.SHA256);

            var signerProperties = new SignerProperties();

            signerProperties.SetFieldName("signature");
            pdfSigner.SetSignerProperties(signerProperties);

            var imageData = ImageDataFactory.Create(Path.Combine(Directory.GetCurrentDirectory(),
                resourceDirectory, "images", "signature.png"));


            signerProperties.SetLocation(location)
                .SetReason(reason);
            var appearanceText = new SignedAppearanceText();
            var signatureAppearance =
                new SignatureFieldAppearance(SignerProperties.IGNORED_ID)
                    .SetContent(appearanceText, imageData);

            signatureAppearance.GetAccessibilityProperties().SetAlternateDescription("Signature block");
            var font = PdfFontFactory.CreateFont(Path.Combine(Directory.GetCurrentDirectory(), resourceDirectory,
                "font", "NotoSans-Regular.ttf"));
            signatureAppearance.SetFont(font);
            signerProperties.SetPageNumber(pageNumber)
                .SetPageRect(new Rectangle(xCoordinate, yCoordinate, 400, 200))
                .SetSignatureAppearance(signatureAppearance);

            pdfSigner.SignDetached(signature, certificateWrappers, null, null, null, 1024 * 10,
                PdfSigner.CryptoStandard.CMS);
        }
    }
}