Certainly! Here’s a PowerShell script that splits a large log file into smaller files, each with a size of 20MB:

```powershell
# Define the input file path
$inputFilePath = "C:\path\to\your\logfile.log"

# Define the output directory where the split files will be saved
$outputDirectory = "C:\path\to\output\directory"

# Define the desired file size for each split file (20MB)
$chunkSize = 20MB

# Create the output directory if it doesn't exist
if (-not (Test-Path $outputDirectory)) {
    New-Item -ItemType Directory -Path $outputDirectory
}

# Initialize variables
$bufferSize = 1MB  # Read in 1MB chunks
$fileNumber = 0
$bytesWritten = 0
$outputFileStream = $null

# Open the input file stream
$inputFileStream = [System.IO.File]::OpenRead($inputFilePath)

try {
    # Loop through the input file and split it into smaller files
    while ($true) {
        # Create a new output file if necessary
        if ($null -eq $outputFileStream -or $bytesWritten -ge $chunkSize) {
            if ($outputFileStream) {
                $outputFileStream.Close()
            }
            $fileNumber++
            $outputFileName = [System.IO.Path]::Combine($outputDirectory, "logfile_part_$fileNumber.log")
            $outputFileStream = [System.IO.File]::Create($outputFileName)
            $bytesWritten = 0
        }

        # Create a buffer to read data into
        $buffer = New-Object byte[] $bufferSize

        # Read data from the input file
        $bytesRead = $inputFileStream.Read($buffer, 0, $bufferSize)

        # Break the loop if we've reached the end of the input file
        if ($bytesRead -eq 0) {
            break
        }

        # Write data to the output file
        $outputFileStream.Write($buffer, 0, $bytesRead)
        $bytesWritten += $bytesRead
    }
} finally {
    # Close the file streams
    if ($inputFileStream) {
        $inputFileStream.Close()
    }
    if ($outputFileStream) {
        $outputFileStream.Close()
    }
}

Write-Host "Log file has been successfully split into smaller files."
```

### How the Script Works:
1. **Input and Output Paths**: Set the path of your input log file and the output directory where the smaller files will be stored.
2. **Chunk Size**: The script splits the file into 20MB chunks.
3. **Buffer Size**: The script reads the input file in 1MB chunks to avoid excessive memory usage.
4. **Splitting Logic**: The script loops through the input file, writing each chunk to a new file when the current file size reaches 20MB.

### How to Use the Script:
1. Copy the script to a `.ps1` file, e.g., `SplitLogFile.ps1`.
2. Update the `$inputFilePath` and `$outputDirectory` variables with your file paths.
3. Run the script in PowerShell.

This will create multiple files in the output directory, each containing 20MB of the original log file.
