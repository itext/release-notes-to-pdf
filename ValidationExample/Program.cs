using System;
using iText.Kernel.Pdf;
using iText.Signatures;
using iText.Signatures.Validation;
using iText.Signatures.Validation.Context;
using iText.Signatures.Validation.Report;

namespace ValidationExample {
    class Program {
        static void Main(string[] args) {
            var path = @"<path/to/signed/pdf>";
            var properties = GetSignatureValidationProperties();
            properties.AddOcspClient(new ValidationOcspClient());
            properties.AddCrlClient(new CrlClientOnline());

            var certificateRetriever = new IssuingCertificateRetriever();
            var validatorChainBuilder = new ValidatorChainBuilder();
            validatorChainBuilder.WithIssuingCertificateRetrieverFactory(
                () => certificateRetriever).WithSignatureValidationProperties(properties);
            ValidationReport report;
            using (var document = new PdfDocument(new PdfReader(path))) {
                var validator = validatorChainBuilder.BuildSignatureValidator(document);
                // Validate all signatures in the document.
                report = validator.ValidateSignatures();
            }

            Console.WriteLine(report.ToString());
        }

        private static SignatureValidationProperties GetSignatureValidationProperties() {
            var properties = new SignatureValidationProperties();
            properties.SetRevocationOnlineFetching(ValidatorContexts.All(), CertificateSources.All(), TimeBasedContexts
                 .All(), SignatureValidationProperties.OnlineFetching.ALWAYS_FETCH);
             properties.SetFreshness(ValidatorContexts.All(), CertificateSources.All(), TimeBasedContexts.Of(
                 TimeBasedContext.HISTORICAL), TimeSpan.FromDays(-5));
             properties.SetContinueAfterFailure(
                 ValidatorContexts.Of(ValidatorContext.OCSP_VALIDATOR, ValidatorContext.CRL_VALIDATOR),
                 CertificateSources.Of(CertificateSource.CRL_ISSUER, CertificateSource.OCSP_ISSUER, CertificateSource
                     .CERT_ISSUER), false);
            return properties;
        }
    }
}