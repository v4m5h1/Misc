```powershell
function Test-URL {
    param (
        [Parameter(Mandatory=$true)]
        [string]$URL
    )

    try {
        $response = Invoke-WebRequest -Uri $URL -Method Head -UseBasicParsing -TimeoutSec 30
        $statusCode = $response.StatusCode
        $statusDescription = $response.StatusDescription
        
        if ($statusCode -eq 200) {
            Write-Host "OK - $URL is accessible (Status: $statusCode $statusDescription)" -ForegroundColor Green
        } else {
            Write-Host "WARNING - $URL returned status code $statusCode $statusDescription" -ForegroundColor Yellow
        }
    } catch {
        Write-Host "ERROR - Failed to access $URL: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Example usage:
$urls = @(
    "https://www.google.com",
    "https://www.example.com",
    "https://nonexistent.domain.com"
)

foreach ($url in $urls) {
    Test-URL -URL $url
}

```
