Here’s a PowerShell script that will accomplish the task:

```powershell
param (
    [string]$SourceFolderPath,
    [string]$SaveFolderPath
)

function Create-Zip {
    param (
        [string]$ZipFilePath,
        [string]$FilesToZip
    )

    $shellApplication = New-Object -ComObject shell.application
    $zipFile = $shellApplication.NameSpace($ZipFilePath)

    foreach ($file in $FilesToZip) {
        $zipFile.CopyHere($file.FullName)
        Start-Sleep -Milliseconds 500  # To give the shell enough time to process the file copy
    }
}

$files = Get-ChildItem -Path $SourceFolderPath -Recurse -File
$totalSize = 0
$zipIndex = 1
$filesToZip = @()
$folderName = Split-Path $SourceFolderPath -Leaf

foreach ($file in $files) {
    $totalSize += $file.Length
    $filesToZip += $file

    if ($totalSize -ge 20MB) {
        $zipFileName = "$SaveFolderPath\$folderName-$zipIndex.zip"
        $zipFilePath = [System.IO.Path]::Combine($SaveFolderPath, "$folderName-$zipIndex.zip")

        # Create an empty zip file
        Add-Type -AssemblyName System.IO.Compression.FileSystem
        [System.IO.Compression.ZipFile]::Open($zipFilePath, 'Create').Dispose()

        # Add files to the zip
        Create-Zip -ZipFilePath $zipFilePath -FilesToZip $filesToZip

        $zipIndex++
        $totalSize = 0
        $filesToZip = @()
    }
}

# Handle remaining files
if ($filesToZip.Count -gt 0) {
    $zipFileName = "$SaveFolderPath\$folderName-$zipIndex.zip"
    $zipFilePath = [System.IO.Path]::Combine($SaveFolderPath, "$folderName-$zipIndex.zip")

    # Create an empty zip file
    Add-Type -AssemblyName System.IO.Compression.FileSystem
    [System.IO.Compression.ZipFile]::Open($zipFilePath, 'Create').Dispose()

    # Add files to the zip
    Create-Zip -ZipFilePath $zipFilePath -FilesToZip $filesToZip
}
```

### How the Script Works:

1. **Parameters**:
   - `SourceFolderPath`: The path to the source folder.
   - `SaveFolderPath`: The path where the zip files will be saved.

2. **Script Logic**:
   - The script gets all files from the source folder recursively.
   - It then accumulates files until the total size reaches or exceeds 20MB.
   - Once the 20MB threshold is reached, it creates a new zip file with the name pattern `foldername-index.zip`.
   - It then starts accumulating files for the next zip, and this process continues until all files are processed.

3. **Zip File Creation**:
   - The `Create-Zip` function creates and adds files to a zip archive.

4. **Remaining Files**:
   - If there are any remaining files after the loop that didn’t reach 20MB, they are zipped into the final zip file.

### Example Usage:

```powershell
.\YourScript.ps1 -SourceFolderPath "C:\users\addagudu\downloads\od files\victor" -SaveFolderPath "C:\users\addagudu\downloads\zipfiles"
```

This will create zip files in the `C:\users\addagudu\downloads\zipfiles` folder, named `victor-1.zip`, `victor-2.zip`, etc.
