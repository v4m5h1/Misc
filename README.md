using Microsoft.Graph;
using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

public class OneDriveService
{
    private readonly GraphServiceClient _graphClient;
    private readonly ILogger<OneDriveService> _logger;

    public OneDriveService(GraphServiceClient graphClient, ILogger<OneDriveService> logger)
    {
        _graphClient = graphClient;
        _logger = logger;
    }

    /// <summary>
    /// Retrieves the OneDrive size and file count for the user based on their email.
    /// </summary>
    /// <param name="email">The user's email address.</param>
    /// <param name="graphClient">The GraphServiceClient instance.</param>
    /// <returns>A tuple containing the OneDrive size in bytes and the file count.</returns>
    public async Task<(long size, int fileCount)> GetOneDriveStatsAsync(string email)
    {
        try
        {
            // Log the start of the process
            _logger.LogInformation($"Starting OneDrive data retrieval for user: {email}");

            // Retrieve the user based on the email
            var user = await _graphClient.Users[email].Request().GetAsync();

            if (user == null)
            {
                _logger.LogWarning($"No user found with email: {email}");
                throw new Exception($"User with email '{email}' not found.");
            }

            // Retrieve the user's OneDrive drive
            var drive = await _graphClient.Users[user.Id].Drive.Request().GetAsync();

            if (drive == null)
            {
                _logger.LogWarning($"No OneDrive found for user: {email}");
                throw new Exception($"OneDrive not found for user with email '{email}'.");
            }

            _logger.LogInformation($"Successfully retrieved OneDrive for user: {email}");

            // Retrieve the list of files from the user's OneDrive
            var items = await _graphClient.Users[user.Id].Drive.Root.Children.Request().GetAsync();

            long totalSize = 0;
            int fileCount = 0;

            // Calculate the total size and file count
            foreach (var item in items)
            {
                if (item.File != null) // Check if it's a file (not a folder)
                {
                    totalSize += item.Size ?? 0;
                    fileCount++;
                }
            }

            // Log the results
            _logger.LogInformation($"OneDrive size for {email}: {totalSize} bytes, File count: {fileCount}");

            // Return the size and file count as a tuple
            return (totalSize, fileCount);
        }
        catch (ServiceException ex)
        {
            // Handle Graph API errors
            _logger.LogError($"Error retrieving OneDrive stats for {email}: {ex.Message}");
            throw new Exception($"An error occurred while retrieving OneDrive stats for '{email}': {ex.Message}", ex);
        }
        catch (Exception ex)
        {
            // Handle any other errors
            _logger.LogError($"Unexpected error retrieving OneDrive stats for {email}: {ex.Message}");
            throw;
        }
    }
}




using Microsoft.Graph;
public class OneDriveService
{
    private readonly GraphServiceClient _graphClient;

    public OneDriveService(GraphServiceClient graphClient)
    {
        _graphClient = graphClient;
    }

    public async Task<(long size, int fileCount)> GetOneDriveStatsAsync(string url)
    {
        var drive = await _graphClient.Sites["root"].Drives.Request().GetAsync();
        var totalSize = 0L;
        var fileCount = 0;

        foreach (var item in drive)
        {
            totalSize += item.Size ?? 0;
            fileCount++;
        }

        return (totalSize, fileCount);
    }
}





[ApiController]
[Route("api/[controller]")]
public class ODFileAnalyzerController : ControllerBase
{
    private readonly CsvReaderService _csvReaderService;
    private readonly OneDriveService _oneDriveService;

    public ODFileAnalyzerController(CsvReaderService csvReaderService, OneDriveService oneDriveService)
    {
        _csvReaderService = csvReaderService;
        _oneDriveService = oneDriveService;
    }

    [HttpPost("analyze")]
    public async Task<IActionResult> AnalyzeCsv([FromBody] string filePath)
    {
        var urlRecords = _csvReaderService.ReadUrlsFromCsv(filePath);

        var result = new List<object>();

        foreach (var record in urlRecords)
        {
            var stats = await _oneDriveService.GetOneDriveStatsAsync(record.Url);
            result.Add(new { record.Url, stats.size, stats.fileCount });
        }

        return Ok(result);
    }
}
