using System;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using NUnit.Framework;

namespace ReleaseNotesGenerator.Utils
{
    // CustomVeraPdfValidator will be removed after
    // TODO DEVSIX-9041 pdfTest: Allow specify conformance to check in VeraPdfValidator
    public class CustomVeraPdfValidator
    {
        private const String CLI_COMMAND = "java -classpath \"<libPath>\\*\" -Dfile.encoding=UTF8 " +
                                           "-XX:+IgnoreUnrecognizedVMOptions -Dapp.name=\"VeraPDF validation GUI\" " +
                                           "-Dapp.repo=\"<libPath>\" -Dapp.home=\"../\" " +
                                           "-Dbasedir=\"\" org.verapdf.apps.GreenfieldCliWrapper --addlogs ";

        public void Validate(String dest, String flavour) {
            Process p = new Process();
            String currentCommand = CLI_COMMAND.Replace("<libPath>",
                TestContext.CurrentContext.TestDirectory + "\\lib\\VeraPdf");
            currentCommand += $"-f {flavour} ";

            p.StartInfo = new ProcessStartInfo("cmd", "/c" + currentCommand + dest);
            p.StartInfo.RedirectStandardOutput = true;
            p.StartInfo.RedirectStandardError = true;
            p.StartInfo.UseShellExecute = false;
            p.StartInfo.CreateNoWindow = true;
            p.StartInfo.StandardOutputEncoding = Encoding.UTF8;
            p.StartInfo.StandardErrorEncoding = Encoding.UTF8;
            p.Start();

            HandleOutputAndWriteReport(p, dest, flavour);
            p.WaitForExit();
            Console.WriteLine($"Validation {flavour} finished with exit code: {p.ExitCode}");
        }

        private void HandleOutputAndWriteReport(Process p, String dest, String flavour) {
            StringBuilder standardOutput = new StringBuilder();
            StringBuilder standardError = new StringBuilder();

            while (!p.HasExited) {
                standardOutput.Append(p.StandardOutput.ReadToEnd());
                standardError.Append(p.StandardError.ReadToEnd());
            }

            String stdErrOutput = standardError.ToString();
            /* If JAVA_TOOL_OPTIONS env var is defined JVM will always print its value to stderr. We filter this line
               in order to catch other valuable error output. */
            string javaToolOptionsWarn = "Picked up JAVA_TOOL_OPTIONS: ";
            stdErrOutput = String.Join("\n",
                stdErrOutput
                    .Split('\n').Where(s => !s.StartsWith(javaToolOptionsWarn))
            );
            
            if (stdErrOutput.Length != 0)
            {
                Console.WriteLine($"Errors during validation:\n{stdErrOutput}");
            }

            string reportPath = TestContext.CurrentContext.TestDirectory + "\\" + dest.Replace(".pdf", $"_{flavour}.xml");
            File.WriteAllText(reportPath, standardOutput.ToString());
            Console.WriteLine($"Validation report: {reportPath}");
        }
    }
}