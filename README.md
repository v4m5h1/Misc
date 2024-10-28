# Define paths for the two folders to compare
$folderPath1 = "C:\Path\To\Folder1"  # Replace with the path to the first folder
$folderPath2 = "C:\Path\To\Folder2"  # Replace with the path to the second folder

# Get the list of files in both folders
$folder1Files = Get-ChildItem -Path $folderPath1 -Recurse | Select-Object FullName, Name, LastWriteTime, Length
$folder2Files = Get-ChildItem -Path $folderPath2 -Recurse | Select-Object FullName, Name, LastWriteTime, Length

# Compare the files by name, LastWriteTime, and Length
$comparison = Compare-Object -ReferenceObject $folder1Files -DifferenceObject $folder2Files -Property Name, LastWriteTime, Length -IncludeEqual -ExcludeDifferent

# Filter out identical files
$onlyInFolder1 = $comparison | Where-Object { $_.SideIndicator -eq "<=" }
$onlyInFolder2 = $comparison | Where-Object { $_.SideIndicator -eq "=>" }

# Output the differences
Write-Output "Files only in $folderPath1:"
$onlyInFolder1 | ForEach-Object { Write-Output $_.Name }

Write-Output "`nFiles only in $folderPath2:"
$onlyInFolder2 | ForEach-Object { Write-Output $_.Name }

Write-Output "`nFiles that differ between folders:"
$comparison | Where-Object { $_.SideIndicator -ne "==" } | ForEach-Object {
    Write-Output "$($_.Name) - Difference detected (Size/Date mismatch)"
}
