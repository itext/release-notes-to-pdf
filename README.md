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
<report>
   <buildInformation>
      <releaseDetails id="core" version="1.26.1" buildDate="2024-05-16T16:30:00+02:00"/>
      <releaseDetails id="validation-model" version="1.26.1" buildDate="2024-05-16T18:13:00+02:00"/>
      <releaseDetails id="gui" version="1.26.2" buildDate="2024-05-19T13:33:00+02:00"/>
   </buildInformation>
   <jobs>
      <job>
         <item size="4010404">
            <name>
               D:\other\ReleaseNotesGenerator\ReleaseNotesGenerator\bin\Debug\net8.0\release_notes_9.0.0.pdf
            </name>
         </item>
         <validationReport jobEndStatus="normal" profileName="PDF/UA-2 + Tagged PDF validation profile" statement="PDF file is compliant with Validation Profile requirements." isCompliant="true">
            <details passedRules="1744" failedRules="0" passedChecks="58589" failedChecks="0"/>
         </validationReport>
         <duration start="1731931966000" finish="1731931966298">00:00:00.298</duration>
      </job>
   </jobs>
   <batchSummary totalJobs="1" failedToParse="0" encrypted="0" outOfMemory="0" veraExceptions="0">
      <validationReports compliant="1" nonCompliant="0" failedJobs="0">1</validationReports>
      <featureReports failedJobs="0">0</featureReports>
      <repairReports failedJobs="0">0</repairReports>
      <duration start="1731931965996" finish="1731931966304">00:00:00.308</duration>
   </batchSummary>
</report>
```

```xml
This XML file does not appear to have any style information associated with it. The document tree is shown below.
<report>
    <buildInformation>
        <releaseDetails id="core" version="1.26.1" buildDate="2024-05-16T16:30:00+02:00"/>
        <releaseDetails id="validation-model" version="1.26.1" buildDate="2024-05-16T18:13:00+02:00"/>
        <releaseDetails id="gui" version="1.26.2" buildDate="2024-05-19T13:33:00+02:00"/>
    </buildInformation>
    <jobs>
        <job>
            <item size="4010404">
                <name>
                    D:\other\ReleaseNotesGenerator\ReleaseNotesGenerator\bin\Debug\net8.0\release_notes_9.0.0.pdf
                </name>
            </item>
            <validationReport jobEndStatus="normal" profileName="PDF/A-4F validation profile"
                              statement="PDF file is compliant with Validation Profile requirements."
                              isCompliant="true">
                <details passedRules="108" failedRules="0" passedChecks="26598" failedChecks="0"/>
            </validationReport>
            <duration start="1731931881493" finish="1731931881751">00:00:00.258</duration>
        </job>
    </jobs>
    <batchSummary totalJobs="1" failedToParse="0" encrypted="0" outOfMemory="0" veraExceptions="0">
        <validationReports compliant="1" nonCompliant="0" failedJobs="0">1</validationReports>
        <featureReports failedJobs="0">0</featureReports>
        <repairReports failedJobs="0">0</repairReports>
        <duration start="1731931881489" finish="1731931881757">00:00:00.268</duration>
    </batchSummary>
</report>
```