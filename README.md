
### Clean Up Permissions on Migrated & Validated Sites

#### Story (the Narrative)
As a developer, I need to clean up permissions on all migrated and validated SharePoint sites by removing the development team from the owners' access and assigning business users as the new site owners. This is to ensure the proper delegation of ownership and compliance with business policies post-migration.

#### Acceptance Criteria/Test (the What)
- Identify all SharePoint sites that have been migrated and validated.
- Remove the development team from the site owners' group for each of the identified sites.
- Assign designated business users as site owners for each validated site.
- Verify that the permission changes are successfully applied to each site.
- Provide confirmation to stakeholders that the clean-up process has been completed.

#### Dependencies/Constraints
- Access to SharePoint Admin permissions to modify site ownership.
- List of designated business users to assign as site owners.
- Coordination with business teams to ensure the correct users are assigned as owners.

#### Technical Details
- **Technology:** SharePoint Admin Center, PowerShell, or Graph API to manage permissions.
- **Process:** 
  - Retrieve the list of sites that were migrated and validated.
  - Execute the necessary commands to update site ownership.
  - Ensure changes are properly propagated across all site collections.
- **Security:** Ensure that no unnecessary permissions are retained by the development team after ownership transfer.

### Steps to Implement

1. **Retrieve Site Information:**
   - Obtain the list of all migrated and validated SharePoint sites.

2. **Remove Development Team Permissions:**
   - Use SharePoint Admin Center, PowerShell, or Graph API to remove the development team from the owners' group.

3. **Assign Business Users as Owners:**
   - Assign designated business users as the new site owners for each site.
   - Verify ownership assignments to confirm changes.

4. **Validate and Document Changes:**
   - Confirm that permission changes have taken effect by verifying the new ownership settings.
   - Provide a report to stakeholders documenting the completion of the permission clean-up process.

This story ensures that after the migration and validation process, ownership of the sites is properly handed off to business users while ensuring the development team no longer has owner access.
