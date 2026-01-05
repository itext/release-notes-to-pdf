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
using iText.Html2pdf.Attach;
using iText.Html2pdf.Attach.Impl.Tags;
using iText.Kernel.Pdf.Tagging;
using iText.Layout;
using iText.Layout.Element;
using iText.Layout.Tagging;
using iText.StyledXmlParser.Node;

namespace ReleaseNotesGenerator.Utils
{
    /// <summary>
    /// Custom Img tag worker that marks every produced image as an Artifact in the tagging structure,
    /// so it is ignored by assistive technologies (PDF/UA hygiene for decorative images).
    /// </summary>
    public class ArtifactImgTagWorker : ImgTagWorker
    {
        public ArtifactImgTagWorker(IElementNode element, ProcessorContext context)
            : base(element, context)
        {
        }

        /// <summary>
        /// Retrieves the resulting element after processing the Img tag.
        /// If the resulting element is an image and has no alternate description,
        /// it marks the image as an artifact, ensuring it is ignored by assistive technologies
        /// for improved accessibility compliance (PDF/UA). This is done because sourced html/css contain
        /// atlassian confluence images that are not relevant for accessibility.
        /// </summary>
        /// <returns>The property container representing the processed element or null if the element is not supported.</returns>
        public override IPropertyContainer GetElementResult()
        {
            var result = base.GetElementResult();

            if (result is Image image)
            {
                var alt = image.GetAccessibilityProperties().GetAlternateDescription();
                if (string.IsNullOrWhiteSpace(alt))
                {
                    image.GetAccessibilityProperties().SetRole(StandardRoles.ARTIFACT);
                }
            }

            return result;
        }
    }
}