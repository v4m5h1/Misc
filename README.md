using System.Collections.Generic;
using System.Globalization;
using System.IO;
using CsvHelper;
using CsvHelper.Configuration;

public class CsvModel
{
    public int Id { get; set; }
    public string Name { get; set; }
}

public void SaveCsv(List<CsvModel> records, string filePath)
{
    // Configure CsvHelper to append data and avoid writing headers if the file exists
    var config = new CsvConfiguration(CultureInfo.InvariantCulture)
    {
        HasHeaderRecord = !File.Exists(filePath) // Write header only if the file does not exist
    };

    using (var stream = new FileStream(filePath, FileMode.Append, FileAccess.Write))
    using (var writer = new StreamWriter(stream))
    using (var csv = new CsvWriter(writer, config))
    {
        csv.WriteRecords(records);
    }
}
