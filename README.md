public async Task<(long totalSize, int fileCount)> GetTotalFileSizeAndCount(GraphServiceClient graphClient, string userEmail)
{
    var user = await graphClient.Users[userEmail].Request().GetAsync();
    if (user == null) return (0, 0);

    var drive = await graphClient.Users[user.Id].Drive.Request().GetAsync();
    if (drive == null) return (0, 0);

    long totalSize = 0;
    int fileCount = 0;
    string nextLink = "root/children";

    while (!string.IsNullOrEmpty(nextLink))
    {
        var items = await graphClient.Drives[drive.Id].Items[nextLink].Request().GetAsync();
        
        foreach (var item in items)
        {
            if (item.File != null)
            {
                totalSize += item.Size ?? 0;
                fileCount++;
            }
            else if (item.Folder != null)
            {
                // Recursively process the folder
                var folderResult = await GetFolderSizeAndCount(graphClient, drive.Id, item.Id);
                totalSize += folderResult.totalSize;
                fileCount += folderResult.fileCount;
            }
        }

        nextLink = items.AdditionalData.ContainsKey("@odata.nextLink") ? 
                   items.AdditionalData["@odata.nextLink"].ToString() : 
                   null;
    }

    return (totalSize, fileCount);
}

private async Task<(long totalSize, int fileCount)> GetFolderSizeAndCount(GraphServiceClient graphClient, string driveId, string folderId)
{
    long totalSize = 0;
    int fileCount = 0;
    string nextLink = $"{folderId}/children";

    while (!string.IsNullOrEmpty(nextLink))
    {
        var items = await graphClient.Drives[driveId].Items[nextLink].Request().GetAsync();

        foreach (var item in items)
        {
            if (item.File != null)
            {
                totalSize += item.Size ?? 0;
                fileCount++;
            }
            else if (item.Folder != null)
            {
                // Recursively process subfolders
                var subfolderResult = await GetFolderSizeAndCount(graphClient, driveId, item.Id);
                totalSize += subfolderResult.totalSize;
                fileCount += subfolderResult.fileCount;
            }
        }

        nextLink = items.AdditionalData.ContainsKey("@odata.nextLink") ? 
                   items.AdditionalData["@odata.nextLink"].ToString() : 
                   null;
    }

    return (totalSize, fileCount);
}
