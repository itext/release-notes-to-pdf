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
using iText.Html2pdf.Attach.Impl;
using iText.Html2pdf.Html;
using iText.StyledXmlParser.Node;

namespace ReleaseNotesGenerator.Utils {
    /// <summary>
    /// We need to override the default tag worker factory to provide custom tag workers for svg and h tags
    /// This is mainly related to PDF/UA support not 100% there for html2pdf
    /// </summary>
    public class CustomTagWorkerFactory : DefaultTagWorkerFactory {
        public override ITagWorker GetCustomTagWorker(IElementNode tag, ProcessorContext context) {
            if (tag.Name().Equals("signature-field"))
            {
                return new CustomSignatureTagWorker(tag);
            }
            // We mark all images and svg as artifacts because release notes pdf is using some atlassian confluence
            // html/styles that have some utility images and svgs which are not relevant for accessibility
            if (tag.Name().Equals(TagConstants.IMG))
            {
                return new ArtifactImgTagWorker(tag, context);
            }
            if (tag.Name().Equals(TagConstants.SVG))
            {
                return new ArtifactSvgTagWorker(tag, context);
            }
            return base.GetCustomTagWorker(tag, context);
        }
    }
}