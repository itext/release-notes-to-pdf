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
using System.Linq;
using iText.Bouncycastle.X509;
using iText.Bouncycastleconnector;
using iText.Commons.Bouncycastle;
using iText.Commons.Bouncycastle.Cert;
using iText.Forms.Fields.Properties;
using iText.Forms.Form.Element;
using iText.IO.Image;
using iText.Kernel.Crypto;
using iText.Kernel.Pdf;
using iText.Kernel.Validation;
using iText.Signatures;
using iText.Signatures.Cms;
using Path = System.IO.Path;

namespace ReleaseNotesGenerator.Utils {
    /// <summary>
    /// Signs an existing PDF using an eID card exposed via a PKCS#11 module.
    ///
    /// Implementation notes:
    /// <list type="bullet">
    /// <item><description>Uses <see cref="Pkcs11Signature"/> to talk to the PKCS#11 module.</description></item>
    /// <item><description>Looks up slot/token by model string (country-specific).</description></item>
    /// <item><description>Chooses a certificate by label (country-specific).</description></item>
    /// <item><description>Uses iText <see cref="PdfSigner"/> to produce a detached CMS signature.</description></item>
    /// </list>
    /// </summary>
    public class EIdSigner {
        
        private readonly struct EidRelatedConfig {
            public string Pkcs11ModulePath { get; }
            public string CertificateLabel { get; }
            public string TokenModel { get; }

            public EidRelatedConfig(string pkcs11ModulePath, string certificateLabel, string tokenModel) {
                Pkcs11ModulePath = pkcs11ModulePath ?? throw new ArgumentNullException(nameof(pkcs11ModulePath));
                CertificateLabel = certificateLabel ?? throw new ArgumentNullException(nameof(certificateLabel));
                TokenModel = tokenModel ?? throw new ArgumentNullException(nameof(tokenModel));
            }
        }
        
        private static readonly IReadOnlyDictionary<CountrySigning, EidRelatedConfig> EidRelatedConfigs =
            new Dictionary<CountrySigning, EidRelatedConfig> {
                {
                    CountrySigning.Portugal,
                    new EidRelatedConfig(
                        @"C:\Windows\System32\pteidpkcs11.dll",
                        "CITIZEN SIGNATURE CERTIFICATE",
                        "Portuguese eID N")
                }, {
                    CountrySigning.Belgium,
                    new EidRelatedConfig(
                        @"C:\Program Files (x86)\Belgium Identity Card\FireFox Plugin Manifests\beid_ff_pkcs11_64.dll",
                        "Signature",
                        "Belgium eID")
                }
            };

        private readonly string resourceDirectory;
        private readonly string fileName;
        private readonly string fileToSign;
        private readonly CountrySigning countryToUseForSigning;
        private readonly IBouncyCastleFactory FACTORY = BouncyCastleFactoryCreator.GetFactory();

        /// <summary>
        /// Creates a signer that will read an input PDF and produce a signed output PDF using a country-specific eID PKCS#11 module.
        /// </summary>
        /// <param name="resourceDirectory">
        /// Base directory that contains signing resources (e.g. <c>images/signature.png</c> and <c>font/NotoSans-Regular.ttf</c>).
        /// </param>
        /// <param name="fileName">Path to the input PDF to be signed.</param>
        /// <param name="fileToSign">Path where the signed PDF will be written.</param>
        /// <param name="countryToUseForSigning">
        /// The country profile that defines which PKCS#11 module, token model and certificate label to use.
        /// </param>
        public EIdSigner(string resourceDirectory, string fileName, string fileToSign, CountrySigning countryToUseForSigning) {
            this.resourceDirectory = resourceDirectory;
            this.fileName = fileName;
            this.fileToSign = fileToSign;
            this.countryToUseForSigning = countryToUseForSigning;
        }
        
        /// <summary>
        /// Signs the configured input PDF and writes a detached CMS signature into the specified signature field.
        /// </summary>
        /// <param name="fieldName">Name of the existing signature field to fill.</param>
        /// <param name="reason">Human-readable signing reason to embed into the signature appearance/metadata.</param>
        /// <param name="location">Human-readable signing location to embed into the signature appearance/metadata.</param>
        /// <exception cref="Exception">Thrown when no eID token matching the configured country profile is available.</exception>
        /// <exception cref="Exception">Thrown when no signing certificate/key matching the configured label is found on the token.</exception>
        /// <remarks>
        /// The PIN is not set programmatically; the PKCS#11 provider is expected to prompt for it interactively when needed.
        /// The signing operation is performed in append mode to preserve existing content and signatures.
        /// </remarks>
        public void Sign(string fieldName, string reason, string location) {
            using var signature = new Pkcs11Signature(EidRelatedConfigs[countryToUseForSigning].Pkcs11ModulePath);
            using var pdfReader = new PdfReader(fileName);
            using var result = File.Create(fileToSign);

            var slot = FindSlot(signature);
            var key = FindSigningKey(signature, slot);

            signature.SelectSigningKeyAndCertificate(key);

            var pdfSigner = new PdfSigner(pdfReader, result, new StampingProperties().UseAppendMode());
            pdfSigner.GetDocument().GetDiContainer().Register(typeof(ValidationContainer), new ValidationContainer());

            var certificateWrappers = BuildCertificateWrappers(signature);

            signature.SetDigestAlgorithmName(DigestAlgorithms.SHA256);

            var signerProperties = new SignerProperties();
            signerProperties.SetFieldName(fieldName);
            signerProperties.SetLocation(location).SetReason(reason);
            signerProperties.SetSignatureAppearance(BuildAppearance());

            pdfSigner.SetSignerProperties(signerProperties);

            var estimatedSize = EstimateSignatureSize(signature, key, certificateWrappers);

            pdfSigner.SignDetached(signature, certificateWrappers, null, null, null,
                estimatedSize, PdfSigner.CryptoStandard.CMS);
        }

        /// <summary>
        /// Locates the PKCS#11 slot that corresponds to the configured country profile.
        /// </summary>
        /// <param name="signature">Active PKCS#11 signature provider used to enumerate slots/tokens.</param>
        /// <returns>
        /// The slot whose token model matches the expected model string for <see cref="countryToUseForSigning"/>.
        /// </returns>
        /// <exception cref="Exception">Thrown when no matching eID card/token is available in any slot.</exception>
        /// <remarks>
        /// Matching is done against <c>SlotInfo.TokenModel</c> (as exposed by the PKCS#11 module), which is
        /// typically vendor/country specific.
        /// </remarks>
        private Pkcs11Signature.SlotInfo FindSlot(Pkcs11Signature signature) {
            // list available slots
            var slots = signature.GetAvailableSlots();

            // Find the slot whose token model matches the configured country profile.
            var slot = slots.FirstOrDefault(s =>
                EidRelatedConfigs[countryToUseForSigning].TokenModel.Equals(s.TokenModel));
            if (slot == null) {
                throw new InvalidOperationException("No eId card available.");
            }

            return slot;
        }

        /// <summary>
        /// Finds the certificate + private key entry to use for signing within a given PKCS#11 slot.
        /// </summary>
        /// <param name="signature">Active PKCS#11 signature provider used to enumerate keys/certificates.</param>
        /// <param name="slot">The slot (token) on which to search for signing credentials.</param>
        /// <returns>The matching key entry (certificate and associated private key handle).</returns>
        /// <exception cref="Exception">Thrown when no certificate/key with the expected label is found.</exception>
        /// <remarks>
        /// This method does not set a PIN; the underlying provider is expected to request it when an operation requires login.
        /// The selection is based on a country-specific certificate label configured in <c>EidRelatedConfigs</c>.
        /// </remarks>
        private Pkcs11Signature.Pkcs11KeyInfo FindSigningKey(Pkcs11Signature signature, Pkcs11Signature.SlotInfo slot) {
            // setting the pin here is not needed, and it will be asked interactievely anyhow for signing

            // list available keys
            var keys = signature.GetCertificatesWithPrivateKeys(slot);

            // Here we search for the key to sign with (label is country-specific).
            var key = keys.FindLast(k =>
                k.CertificateLabel.Equals(EidRelatedConfigs[countryToUseForSigning].CertificateLabel));
            if (key == null) {
                throw new InvalidOperationException("No valid key found.");
            }

            return key;
        }

        /// <summary>
        /// Builds the certificate chain in the wrapper format expected by iText signing APIs.
        /// </summary>
        /// <param name="signature">Active PKCS#11 signature provider used to read the certificate chain.</param>
        /// <returns>
        /// The token-provided certificate chain converted to iText <see cref="IX509Certificate"/> wrappers.
        /// </returns>
        /// <remarks>
        /// iText expects its own certificate abstraction (<see cref="IX509Certificate"/>). The PKCS#11 provider
        /// returns a native/BC representation, which is wrapped via <see cref="X509CertificateBC"/>.
        /// </remarks>
        private IX509Certificate[] BuildCertificateWrappers(Pkcs11Signature signature) {
            return signature.GetChain()
                .Select(e => new X509CertificateBC(e))
                .ToArray();
        }

        /// <summary>
        /// Creates the visual signature appearance (image + text + font) used by the signature field.
        /// </summary>
        /// <returns>A configured <see cref="SignatureFieldAppearance"/> instance.</returns>
        /// <exception cref="IOException">
        /// Thrown when the appearance resources (signature image or font) cannot be read from <see cref="resourceDirectory"/>.
        /// </exception>
        /// <remarks>
        /// Expects these files to exist under <see cref="resourceDirectory"/>:
        /// <list type="bullet">
        /// <item><description><c>images/signature.png</c></description></item>
        /// <item><description><c>font/NotoSans-Regular.ttf</c></description></item>
        /// </list>
        /// </remarks>
        private SignatureFieldAppearance BuildAppearance() {
            var imageData = ImageDataFactory.Create(Path.Combine(resourceDirectory, "images", "signature.png"));

            var appearanceText = new SignedAppearanceText();
            var signatureAppearance =
                new SignatureFieldAppearance(SignerProperties.IGNORED_ID)
                    .SetContent(appearanceText, imageData);

            signatureAppearance.GetAccessibilityProperties().SetAlternateDescription("Signature block");

            var font = FontUtil.CreateNotoSans(resourceDirectory);
            signatureAppearance.SetFont(font);

            return signatureAppearance;
        }

        /// <summary>
        /// Estimates the size (in bytes) required for the detached CMS signature container.
        /// </summary>
        /// <param name="signature">Active PKCS#11 signature provider used to determine the digest algorithm.</param>
        /// <param name="key">Selected signing credential (used to inject the signing certificate into the estimate).</param>
        /// <param name="certificateWrappers">Certificate chain to be embedded into the CMS container.</param>
        /// <returns>
        /// An estimated size used by iText to reserve space in the PDF for the signature contents.
        /// </returns>
        /// <remarks>
        /// iText requires reserving a byte range for the signature before actually computing it. This method creates
        /// a temporary <see cref="CMSContainer"/> configured similarly to the real signature to obtain a reasonable estimate.
        /// </remarks>
        private int EstimateSignatureSize(Pkcs11Signature signature,
            Pkcs11Signature.Pkcs11KeyInfo key,
            IX509Certificate[] certificateWrappers) {

            // create a temp cms container to calculate the size of the signature
            var cmsContainer = new CMSContainer();
            cmsContainer.AddCertificates(certificateWrappers);

            cmsContainer.GetSignerInfo().SetSigningCertificateAndAddToSignedAttributes(
                FACTORY.CreateX509Certificate(key.Certificate.GetEncoded()),
                DigestAlgorithms.GetAllowedDigest(signature.GetDigestAlgorithmName()));

            cmsContainer.GetSignerInfo().SetDigestAlgorithm(
                new AlgorithmIdentifier(DigestAlgorithms.GetAllowedDigest(signature.GetDigestAlgorithmName())));

            return (int)cmsContainer.GetSizeEstimation();
        }
    }
}