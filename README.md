
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
