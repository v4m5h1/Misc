Here’s the modified PowerShell script that copies files into folders instead of zipping them:

```powershell
param (
    [string]$SourceFolderPath,
    [string]$SaveFolderPath
)

function Create-FolderAndCopyFiles {
    param (
        [string]$DestinationFolderPath,
        [array]$FilesToCopy
    )

    # Create the destination folder if it doesn't exist
    if (-not (Test-Path $DestinationFolderPath)) {
        New-Item -Path $DestinationFolderPath -ItemType Directory | Out-Null
    }

    # Copy each file to the destination folder
    foreach ($file in $FilesToCopy) {
        $destinationFilePath = [System.IO.Path]::Combine($DestinationFolderPath, $file.Name)
        Copy-Item -Path $file.FullName -Destination $destinationFilePath
    }
}

$files = Get-ChildItem -Path $SourceFolderPath -Recurse -File
$totalSize = 0
$folderIndex = 1
$filesToCopy = @()
$folderName = Split-Path $SourceFolderPath -Leaf

foreach ($file in $files) {
    $totalSize += $file.Length
    $filesToCopy += $file

    if ($totalSize -ge 20MB) {
        $newFolderPath = [System.IO.Path]::Combine($SaveFolderPath, "$folderName-$folderIndex")
        Create-FolderAndCopyFiles -DestinationFolderPath $newFolderPath -FilesToCopy $filesToCopy

        $folderIndex++
        $totalSize = 0
        $filesToCopy = @()
    }
}

# Handle remaining files
if ($filesToCopy.Count -gt 0) {
    $newFolderPath = [System.IO.Path]::Combine($SaveFolderPath, "$folderName-$folderIndex")
    Create-FolderAndCopyFiles -DestinationFolderPath $newFolderPath -FilesToCopy $filesToCopy
}
```

### How the Modified Script Works:

1. **Parameters**:
   - `SourceFolderPath`: The path to the source folder.
   - `SaveFolderPath`: The path where the folders will be created and files will be copied.

2. **Script Logic**:
   - The script gets all files from the source folder recursively.
   - It accumulates files until the total size reaches or exceeds 20MB.
   - Once the 20MB threshold is reached, it creates a new folder with the name pattern `foldername-index` and copies the accumulated files into that folder.
   - The process repeats until all files are processed.

3. **Folder Creation and File Copying**:
   - The `Create-FolderAndCopyFiles` function creates a new folder and copies the specified files into it.

4. **Remaining Files**:
   - If there are any remaining files after the loop that didn’t reach 20MB, they are copied into the final folder.

### Example Usage:

```powershell
.\YourScript.ps1 -SourceFolderPath "C:\users\addagudu\downloads\od files\victor" -SaveFolderPath "C:\users\addagudu\downloads\outputfolders"
```

This will create folders in the `C:\users\addagudu\downloads\outputfolders` folder, named `victor-1`, `victor-2`, etc., and the files will be distributed among these folders according to the 20MB limit.
