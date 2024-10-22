# Define input and output CSV file paths
$inputCSV = "C:\path\to\input.csv"
$outputCSV = "C:\path\to\output.csv"

# Import CSV with emails (assumes the CSV has a column named 'Email')
$emails = Import-Csv -Path $inputCSV

# Create an empty array to store results
$results = @()

# Loop through each email and perform some action
foreach ($row in $emails) {
    $email = $row.Email

    # Perform some action on each email (replace this with actual logic)
    $output = "Action output for $email"  # Example action output

    # Add email and output to results array
    $results += [pscustomobject]@{
        Email  = $email
        Output = $output
    }
}

# Export the results to a new CSV
$results | Export-Csv -Path $outputCSV -NoTypeInformation

# Notify the user that the script is done
Write-Host "Script completed. Results saved to $outputCSV."
