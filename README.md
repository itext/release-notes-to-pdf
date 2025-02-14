# How to run this project from source code.

1. `cd` to `ReleaseNotesGenerator/resources`
2. Change the url in the `wget-download-command.sh` script to the desired version
3. execute this script `./wget-download-command.sh`
4. Change back again to the folder where `ReleaseNotesGenerator.csproj` is located
4. Run with `dotnet run`

# How to recreate the pdf with from the PDF document.

1. Extract the embedded `source-code.zipx` (This is just a zip file but some pdf processors don't allow downloading of
   those )
2. Change file name to `source-code.zip`
3. Extract zip archive
4. Follow the steps from `How to run this project from source code.`

```text
    sourcecode //source folder
        README.md //file
        ReleaseNotesGenerator //folder
            Program.cs //file
```

2. Execute steps from `run this project from source code`

# verapdf verification for PDF/A4

```xml
<?xml version="1.0" encoding="utf-8"?>
<report>
  <buildInformation>
    <releaseDetails id="core" version="1.26.5" buildDate="2025-01-10T12:08:00+03:00"></releaseDetails>
    <releaseDetails id="validation-model" version="1.26.5" buildDate="2025-01-10T12:10:00+03:00"></releaseDetails>
    <releaseDetails id="gui" version="1.26.5" buildDate="2025-01-10T12:43:00+03:00"></releaseDetails>
  </buildInformation>
  <jobs>
    <job>
      <item size="6184181">
        <name>C:\Users\Admin\Downloads\release_notes_9.1.0-pkcs11-signed.pdf</name>
      </item>
      <validationReport jobEndStatus="normal" profileName="PDF/A-4F validation profile" statement="PDF file is compliant with Validation Profile requirements." isCompliant="true">
        <details passedRules="108" failedRules="0" passedChecks="47109" failedChecks="0"></details>
      </validationReport>
      <duration start="1739546673785" finish="1739546674346">00:00:00.561</duration>
    </job>
  </jobs>
  <batchSummary totalJobs="1" failedToParse="0" encrypted="0" outOfMemory="0" veraExceptions="0">
    <validationReports compliant="1" nonCompliant="0" failedJobs="0">1</validationReports>
    <featureReports failedJobs="0">0</featureReports>
    <repairReports failedJobs="0">0</repairReports>
    <duration start="1739546673773" finish="1739546674350">00:00:00.577</duration>
  </batchSummary>
</report>

```