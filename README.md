### Report: OneDrive File Count Extraction Solution – Progress and Challenges

#### Overview
The objective of this solution is to extract the OneDrive file count for individual users programmatically. However, due to various technical challenges and limitations encountered during the implementation, the solution remains incomplete. Below is a detailed account of the steps taken, roadblocks faced, and current status.

#### 1. **PowerShell Implementation**
   - **Initial Approach**: We began with PowerShell, leveraging its support for interacting with SharePoint Online (SPO) and OneDrive (OD).
   - **Challenges**: While PowerShell can retrieve overall OneDrive storage usage, accessing individual items within a user's OneDrive requires additional modules (e.g., PnP.PowerShell).
   - **Issue**: Some of these modules were not installed on the system, and due to time constraints, I was unable to install or configure them properly.

#### 2. **Graph API with PowerShell**
   - **Next Approach**: I attempted to use the Microsoft Graph API via PowerShell, which theoretically supports fine-grained access to OneDrive files and folders.
   - **Challenges**: Similar to the previous step, necessary modules for Graph API integration were missing, and installing them became a roadblock.
   - **Issue**: Time restrictions prevented resolving this missing module issue, halting further progress in this approach.

#### 3. **C# with Microsoft Graph API**
   - **Current Status**: The next attempt was made using C# and the Microsoft Graph SDK (v5.6.1).
   - **Progress**: Authentication with SharePoint Online via the existing `SPO.OD.Modules` was successfully established, enabling access to OneDrive.
   - **Challenges**: Despite successful authentication, the Graph SDK (v5.6.1) lacks an implementation for retrieving the root folder of a user’s OneDrive, which is crucial for obtaining file count data.
   - **Issue**: Without access to the root folder, this approach is incomplete.

#### 4. **Report Endpoint via C#**
   - **New Discovery**: During research, I found a potential solution by accessing a report endpoint in Graph API that could provide the needed data.
   - **Challenges**: To request this report, the Azure AD application used for authentication requires the `Reports.Read.All` or `Reports.All.View` permission.
   - **Issue**: According to my research and current permissions, no Azure application within the environment has the required permission for this level of access. A new application with elevated privileges would need to be created and granted these permissions.

#### 5. **Collaboration with Microsoft Support**
   - **Action Taken**: I consulted with Microsoft Support Engineers, seeking alternative solutions or a fix for the issues encountered with the SDK and Graph API.
   - **Outcome**: They confirmed the current limitations of the SDK and the need for the `Reports.Read.All` permission to access the reporting endpoint.

#### 6. **CSOM as a Potential Solution**
   - **Next Step**: Given the limitations of PowerShell, Graph API, and C#, the Client-Side Object Model (CSOM) appears to be the most viable solution for this task.
   - **Plan**: CSOM can programmatically access OneDrive and retrieve file counts at a more granular level, potentially bypassing some of the limitations faced with the other approaches.

#### 7. **Manual Export from SharePoint Admin Center**
   - **Temporary Workaround**: The SharePoint Admin Center allows exporting a comprehensive report of OneDrive storage usage and file counts for users.
   - **Limitations**: However, this report is not real-time. It is typically delayed by 24 to 48 hours, making it unsuitable for scenarios where up-to-date data is critical.

---

### Conclusion
The process of extracting OneDrive file counts for individual users remains incomplete due to a combination of missing PowerShell modules, Graph API limitations in the SDK, and the lack of required permissions for accessing the reporting endpoint.

#### Next Steps:
1. Investigate and implement the solution using **CSOM** as the primary method to retrieve OneDrive file counts.
2. **Request the necessary Azure permissions** for `Reports.Read.All` or explore the feasibility of creating a new Azure AD app with the appropriate access rights.
3. As a temporary measure, use the **manual export from the SharePoint Admin Center**, understanding the delay in data synchronization.

This report outlines the challenges faced, lessons learned, and the path forward to complete the OneDrive file count extraction solution.
