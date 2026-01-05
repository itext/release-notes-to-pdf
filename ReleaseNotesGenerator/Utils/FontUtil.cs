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
using System.IO;
using iText.Kernel.Font;

namespace ReleaseNotesGenerator.Utils
{
    /// <summary>
    /// Utility class for font-related operations.
    /// </summary>
    public static class FontUtil
    {
        /// <summary>
        /// Creates a PdfFont instance of the NotoSans-Regular font with an embedded font strategy.
        /// </summary>
        /// <param name="resourcesRoot">The root directory containing the resources folder where the font file is located.</param>
        /// <returns>A PdfFont object representing the NotoSans-Regular font.</returns>
        public static PdfFont CreateNotoSans(string resourcesRoot)
        {
            var fontPath = Path.Combine(resourcesRoot, "font", "NotoSans-Regular.ttf");
            return PdfFontFactory.CreateFont(fontPath, PdfFontFactory.EmbeddingStrategy.FORCE_EMBEDDED);
        }
    }
}