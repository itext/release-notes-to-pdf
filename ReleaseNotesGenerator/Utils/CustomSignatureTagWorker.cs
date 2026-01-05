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
using System.Globalization;
using System.IO;
using iText.Forms.Form.Element;
using iText.Html2pdf.Attach;
using iText.Kernel.Font;
using iText.Layout;
using iText.Layout.Borders;
using iText.StyledXmlParser.Node;

namespace ReleaseNotesGenerator.Utils
{
    /// <summary>
    /// Converts a custom HTML tag (<c>&lt;signature-field&gt;</c>) into an iText
    /// <see cref="SignatureFieldAppearance"/> element.
    ///
    /// Expected attributes:
    /// <list type="bullet">
    /// <item><description><c>id</c> - the form field name/id</description></item>
    /// <item><description><c>width</c>, <c>height</c> - field size (points)</description></item>
    /// </list>
    /// </summary>
    public class CustomSignatureTagWorker : ITagWorker
    {
        private readonly SignatureFieldAppearance signatureFieldAppearance;

        /// <summary>
        /// Initializes a new tag worker for the custom <c>&lt;signature-field&gt;</c> tag and eagerly
        /// creates/configures the resulting <see cref="SignatureFieldAppearance"/>.
        /// </summary>
        /// <param name="tag">
        /// The parsed HTML element node representing <c>&lt;signature-field&gt;</c>.
        /// The constructor reads its attributes (<c>id</c>, <c>width</c>, <c>height</c>) to configure
        /// the signature field appearance.
        /// </param>
        /// <remarks>
        /// The element result is produced up-front in the constructor (see <see cref="GetElementResult"/>),
        /// so <see cref="ProcessEnd"/> is intentionally a no-op and inner content/children are rejected.
        ///
        /// The constructor also loads the font from the application resources folder and forces embedding
        /// to keep generated PDFs self-contained.
        /// </remarks>
        /// <exception cref="ArgumentException">
        /// Thrown when required attributes are missing/empty (e.g., <c>id</c>) or when <c>width</c>/<c>height</c>
        /// are not positive numbers (parsed using <see cref="CultureInfo.InvariantCulture"/>).
        /// </exception>
        public CustomSignatureTagWorker(IElementNode tag) {
            var signatureFieldId = tag.GetAttribute("id");
            if (string.IsNullOrWhiteSpace(signatureFieldId)) {
                throw new ArgumentException("signature-field tag must have a non-empty 'id' attribute.");
            }

            signatureFieldAppearance = new SignatureFieldAppearance(signatureFieldId);

            var resourcesRoot = Path.Combine(AppContext.BaseDirectory, "resources");
            var font = FontUtil.CreateNotoSans(resourcesRoot);
            
            signatureFieldAppearance.SetFont(font);
            signatureFieldAppearance.SetFontSize(12);
            signatureFieldAppearance.SetContent("Signature field");
            signatureFieldAppearance.SetBorder(new SolidBorder(1));
            signatureFieldAppearance.GetAccessibilityProperties().SetAlternateDescription("Signature field");
            signatureFieldAppearance.SetInteractive(true);

            var widthRaw = tag.GetAttribute("width");
            var heightRaw = tag.GetAttribute("height");

            if (!float.TryParse(widthRaw, NumberStyles.Float, CultureInfo.InvariantCulture, out var width) || width <= 0) {
                throw new ArgumentException("signature-field tag must have a positive numeric 'width' attribute.");
            }

            if (!float.TryParse(heightRaw, NumberStyles.Float, CultureInfo.InvariantCulture, out var height) || height <= 0) {
                throw new ArgumentException("signature-field tag must have a positive numeric 'height' attribute.");
            }

            signatureFieldAppearance.SetWidth(width);
            signatureFieldAppearance.SetHeight(height);
        }

        public void ProcessEnd(IElementNode element, ProcessorContext context)
        {
            // No-op: the element result is produced up-front in the constructor.
        }

        public bool ProcessContent(string content, ProcessorContext context)
        {
            // This custom tag does not accept inner text.
            return false;
        }

        public bool ProcessTagChild(ITagWorker childTagWorker, ProcessorContext context)
        {
            // This custom tag does not accept child tags.
            return false;
        }

        public IPropertyContainer GetElementResult()
        {
            return signatureFieldAppearance;
        }
    }
}
