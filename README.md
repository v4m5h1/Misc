To resolve the error and correctly handle pagination with Microsoft Graph .NET SDK v5, you should use the `PageIterator` class. Here's how you can adjust your code:

```csharp
using Microsoft.Graph;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

static async Task<bool> CheckIsUserM365Member(GraphServiceClient graphClient, string groupId, User userObj)
{
    try
    {
        // Fetch the first page of users in the group
        var usersPage = await graphClient.Groups[groupId].Members.GraphUser.GetAsync();

        // Use PageIterator to handle pagination
        var pageIterator = PageIterator<User>
            .CreatePageIterator(
                graphClient,
                usersPage,
                user =>
                {
                    if (userObj.Id == user.Id)
                    {
                        return false; // Stop iterating if user is found
                    }
                    return true; // Continue iterating
                });

        await pageIterator.IterateAsync();

        // Check if the user was found during iteration
        return !pageIterator.State.HasMorePages;
    }
    catch (Exception ex)
    {
        Console.WriteLine($"An error occurred: {ex.Message}");
        return false;
    }
}
```

### Key Points:

1. **Use `PageIterator`**: This simplifies handling paginated responses by automatically iterating over pages.

2. **Stop Iteration**: The iterator stops when the specified condition is met (i.e., when the user is found).

3. **Error Handling**: Ensure exceptions are caught and logged.

This approach leverages the `PageIterator` class to manage pagination efficiently, avoiding manual handling of `NextPageRequest`.

Sources
[1] image.jpg https://pplx-res.cloudinary.com/image/upload/v1727914529/user_uploads/vigvcspfv/image.jpg
[2] image.jpg https://pplx-res.cloudinary.com/image/upload/v1727914102/user_uploads/ccvypgtch/image.jpg
[3] image.jpg https://pplx-res.cloudinary.com/image/upload/v1727913541/user_uploads/qxjpdcwgj/image.jpg
[4] pagination in MS.Graph 'groups' in SDK v5 - Microsoft Q&A https://learn.microsoft.com/en-us/answers/questions/1189597/pagination-in-ms-graph-groups-in-sdk-v5
[5] Practical Graph: All About Pagination and Fetching Data https://practical365.com/pagination-graph-sdk/
[6] Page through a collection using the Microsoft Graph SDKs https://learn.microsoft.com/id-id/graph/sdks/paging




To create a method that adds a user to an Office 365 group using the Microsoft Graph SDK, you’ll need to utilize the GraphServiceClient along with the user’s email and the group’s email. Below is an example implementation of such a method in C#.

Method Implementation

Here’s a method named AddUserToO365Group that accepts a GraphServiceClient, the user’s email, and the group’s email as parameters:

using Microsoft.Graph;
using System;
using System.Threading.Tasks;

public class O365GroupManager
{
    public static async Task<bool> AddUserToO365Group(GraphServiceClient graphClient, string userEmail, string groupEmail)
    {
        try
        {
            // Find the user by email
            var user = await graphClient.Users
                .Request()
                .Filter($"mail eq '{userEmail}'")
                .GetAsync();

            if (user.CurrentPage.Count == 0)
            {
                Console.WriteLine($"User with email {userEmail} not found.");
                return false;
            }

            // Get the group by email
            var group = await graphClient.Groups
                .Request()
                .Filter($"mail eq '{groupEmail}'")
                .GetAsync();

            if (group.CurrentPage.Count == 0)
            {
                Console.WriteLine($"Group with email {groupEmail} not found.");
                return false;
            }

            // Add user to the group
            var groupId = group.CurrentPage[0].Id;
            var userId = user.CurrentPage[0].Id;

            await graphClient.Groups[groupId].Members.References
                .Request()
                .AddAsync(new IdentitySet
                {
                    User = new Identity { Id = userId }
                });

            Console.WriteLine($"User {userEmail} added to group {groupEmail} successfully.");
            return true;
        }
        catch (ServiceException ex)
        {
            Console.WriteLine($"Error adding user to group: {ex.Message}");
            return false;
        }
    }
}

Explanation of the Code

	1.	GraphServiceClient: The method takes a GraphServiceClient instance, which is used to interact with the Microsoft Graph API.
	2.	Finding the User:
	•	It filters users by email using the Request() method with a filter query.
	•	If the user is not found, it logs an error message and returns false.
	3.	Finding the Group:
	•	Similar to finding the user, it filters groups by email.
	•	If the group is not found, it logs an error message and returns false.
	4.	Adding User to Group:
	•	The groupId and userId are extracted from the results.
	•	The method uses the AddAsync method to add the user to the group’s members.
	•	A success message is logged if the operation is successful.
	5.	Error Handling:
	•	If any error occurs during the process, it catches the ServiceException and logs the error message, returning false.

Usage Example

You can call this method from anywhere in your application where you have access to the GraphServiceClient, like this:

var graphClient = new GraphServiceClient(/* Authentication provider */);
string userEmail = "user@example.com";
string groupEmail = "group@example.com";

bool result = await O365GroupManager.AddUserToO365Group(graphClient, userEmail, groupEmail);
if (result)
{
    Console.WriteLine("User successfully added to the group.");
}
else
{
    Console.WriteLine("Failed to add user to the group.");
}

Additional Notes

	•	Ensure you have the necessary permissions to add users to groups in Azure AD (typically Group.ReadWrite.All).
	•	Handle authentication for GraphServiceClient appropriately in your application context, using an authentication provider (like Azure AD v2.0) to acquire tokens.
	•	You may need to modify the using directives at the top of the file based on your project structure and the SDK version you are using.
