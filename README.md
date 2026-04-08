### Release notes PDF generation
This a README.md for the iText release notes PDF and the generation tool used to create it. The release notes PDF is no ordinary PDF! 
It conforms to PDF/UA-2 and PDF/A-4F, and is created with the help of pdfHTML.

### Release notes PDF attachments
When the output PDF is generated, the tool automatically embeds several attachments into the PDF file: 
* `README.md` - this README file.
* `source-code.zipx` - the archive with source code. This is just a usual zip archive, the extension is changed to `.zipx` because
some PDF processors forbid saving `.zip` attachments.
* `Release notes for iText x.y.z (Mac protected).pdf`- a version of the same PDF file encrypted with MAC-protection. 
The password is `itext`. 

### Explore and run the release notes PDF creation tool source code yourself!

Follow these steps:
1. Either clone the repository from https://github.com/itext/release-notes-to-pdf
or extract the source code right from the release-notes-PDF attachments (see attachments description above).  
2. `cd` to `ReleaseNotesGenerator/resources`.
3. Change the url in the `wget-download-command.sh` script to the desired version.
4. Execute this script `./wget-download-command.sh`.
5. Change back again to the folder where `ReleaseNotesGenerator.csproj` is located.
6. Run with `dotnet run`.

### Validation
You can validate the PDF/UA and PDF/A conformance e.g. using [veraPDF tool](https://verapdf.org/).  