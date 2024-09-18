```csharp
public class UserGroup
{
    public int Id { get; set; }
    public string UserGroupName { get; set; }
    public string UserGroupEmail { get; set; }
    public bool IsInternalSystem { get; set; }
    public bool IsActive { get; set; }
}

public UserGroup[] GetActiveInternalUserGroups()
{
    string connectionString = "Your_Connection_String_Here";
    List<UserGroup> userGroups = new List<UserGroup>();

    using (SqlConnection connection = new SqlConnection(connectionString))
    {
        string query = @"SELECT id, usergroupname, usergroupemail, isinternalsystem, isactive 
                         FROM spositedownloadusergroup 
                         WHERE isinternalsystem = 1 AND isactive = 1";

        using (SqlCommand command = new SqlCommand(query, connection))
        {
            connection.Open();
            using (SqlDataReader reader = command.ExecuteReader())
            {
                while (reader.Read())
                {
                    userGroups.Add(new UserGroup
                    {
                        Id = reader.GetInt32(0),
                        UserGroupName = reader.GetString(1),
                        UserGroupEmail = reader.GetString(2),
                        IsInternalSystem = reader.GetBoolean(3),
                        IsActive = reader.GetBoolean(4)
                    });
                }
            }
        }
    }

    return userGroups.ToArray();
}

```
