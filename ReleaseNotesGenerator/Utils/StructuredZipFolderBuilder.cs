using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;

namespace ReleaseNotesGenerator.Utils {
    /// <summary>
    /// Build a structured zip file from a directory
    /// While ignoring some directories and files
    /// </summary>
    public static class StructuredZipFolderBuilder {
        public static void StructuredZip(ZipArchive archive, string sourceDirName,
            CompressionLevel compressionLevel = CompressionLevel.Fastest) {
            var folders = new Stack<string>();

            folders.Push(sourceDirName);

            do {
                var currentFolder = folders.Pop();
                foreach (var file in Directory.GetFiles(currentFolder)) {
                    if (file.Contains("bin")
                        || file.Contains("obj")
                        || file.Contains(".git")
                        || file.Contains("kb.itextpdf.com")
                        || file.Contains(".vs")
                        || file.Contains(".pdf")
                        || file.Contains(".zip")
                        || file.Contains("ValidationExample")
                        || file.Contains(".idea")
                        || file.Contains(".user")) {
                        continue;
                    }

                    Console.WriteLine("Adding file: " + file);
                    archive.CreateEntryFromFile(file, file[(sourceDirName.Length + 1)..], compressionLevel);
                }

                foreach (var item in Directory.GetDirectories(currentFolder)) {
                    folders.Push(item);
                }
            } while (folders.Count > 0);
        }
    }
}