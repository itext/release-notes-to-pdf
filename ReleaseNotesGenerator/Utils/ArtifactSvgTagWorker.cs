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
using iText.StyledXmlParser.Node;

namespace ReleaseNotesGenerator.Utils
{
    /// <summary>
    /// Custom Svg tag worker that marks every produced inline SVG as an Artifact in the tagging structure,
    /// so it is ignored by assistive technologies (useful for decorative SVGs).
    /// </summary>
    public class ArtifactSvgTagWorker : SvgTagWorker
    {
        public ArtifactSvgTagWorker(IElementNode element, ProcessorContext context)
            : base(element, context)
        {
        }

        /// <summary>
        /// Overrides the base method to retrieve the processed element result while ensuring
        /// that SVGs without alternate descriptions are marked as artifacts in the tagging structure.
        /// This helps decorative SVG elements to be ignored by assistive technologies.
        /// This is done because sourced html/css contain atlassian confluence images
        /// that are not relevant for accessibility.
        /// </summary>
        /// <returns>
        /// An <see cref="IPropertyContainer"/> instance representing the processed SVG element.
        /// If the result is an image and lacks an alternate description, it is marked as an artifact.
        /// </returns>
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