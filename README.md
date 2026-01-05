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

# verapdf verification for PDF/UA2 and PDF/A4

```xml
<?xml version="1.0" encoding="utf-8"?>
<report>
   <buildInformation>
      <releaseDetails id="core" version="1.28.2" buildDate="2025-07-15T16:07:00+02:00"></releaseDetails>
      <releaseDetails id="validation-model" version="1.28.2" buildDate="2025-07-15T16:12:00+02:00"></releaseDetails>
   </buildInformation>
   <jobs>
      <job>
         <item size="3581970">
            <name>D:\development\itext\release-notes-to-pdf\ReleaseNotesGenerator\bin\Debug\net8.0\out\release_notes_9.4.0.pdf</name>
         </item>
         <validationReport jobEndStatus="normal" profileName="PDF/A-4F validation profile" statement="PDF file is compliant with Validation Profile requirements." isCompliant="true">
            <details passedRules="109" failedRules="0" passedChecks="34319" failedChecks="0"></details>
         </validationReport>
         <validationReport jobEndStatus="normal" profileName="PDF/UA-2 + Tagged PDF validation profile" statement="PDF file is compliant with Validation Profile requirements." isCompliant="true">
            <details passedRules="1723" failedRules="0" passedChecks="76204" failedChecks="0"></details>
         </validationReport>
         <duration start="1767701576605" finish="1767701578081">00:00:01.476</duration>
      </job>
   </jobs>
   <batchSummary totalJobs="1" failedToParse="0" encrypted="0" outOfMemory="0" veraExceptions="0">
      <validationReports compliant="1" nonCompliant="0" failedJobs="0">1</validationReports>
      <featureReports failedJobs="0">0</featureReports>
      <repairReports failedJobs="0">0</repairReports>
      <duration start="1767701576396" finish="1767701578108">00:00:01.712</duration>
   </batchSummary>
</report>
```