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
using iText.Kernel.Pdf;
using iText.Signatures;
using iText.Signatures.Validation;
using iText.Signatures.Validation.Context;
using iText.Signatures.Validation.Report;

namespace ValidationExample {
    /// <summary>
    /// Small standalone example demonstrating how to validate signatures in a signed PDF using iText validation APIs.
    /// </summary>
    class Program {
        static void Main(string[] args) {
            var path = @"<path/to/signed/pdf>";

            var properties = GetSignatureValidationProperties();
            properties.AddOcspClient(new ValidationOcspClient());
            properties.AddCrlClient(new CrlClientOnline());

            var certificateRetriever = new IssuingCertificateRetriever();
            var validatorChainBuilder = new ValidatorChainBuilder()
                .WithIssuingCertificateRetrieverFactory(() => certificateRetriever)
                .WithSignatureValidationProperties(properties);

            ValidationReport report;
            using (var document = new PdfDocument(new PdfReader(path))) {
                var validator = validatorChainBuilder.BuildSignatureValidator(document);
                report = validator.ValidateSignatures();
            }

            Console.WriteLine(report.ToString());
        }

        private static SignatureValidationProperties GetSignatureValidationProperties() {
            var properties = new SignatureValidationProperties();

            properties.SetRevocationOnlineFetching(
                ValidatorContexts.All(),
                CertificateSources.All(),
                TimeBasedContexts.All(),
                SignatureValidationProperties.OnlineFetching.ALWAYS_FETCH);

            properties.SetFreshness(
                ValidatorContexts.All(),
                CertificateSources.All(),
                TimeBasedContexts.Of(TimeBasedContext.HISTORICAL),
                TimeSpan.FromDays(-5));

            properties.SetContinueAfterFailure(
                ValidatorContexts.Of(ValidatorContext.OCSP_VALIDATOR, ValidatorContext.CRL_VALIDATOR),
                CertificateSources.Of(
                    CertificateSource.CRL_ISSUER,
                    CertificateSource.OCSP_ISSUER,
                    CertificateSource.CERT_ISSUER),
                false);

            return properties;
        }
    }
}