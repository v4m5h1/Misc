export const validateForm = ({ siteUrl, assetType, downloadLocation }, availableUrls) => {
  const errors = {};

  // Site URL validation
  if (!siteUrl) {
    errors.siteUrl = 'Site URL is required.';
  } else if (!availableUrls.some(url => url.siteUrl === siteUrl)) {
    errors.siteUrl = 'Site URL is not valid.';
  }

  // Asset Type validation
  if (!assetType) {
    errors.assetType = 'Asset type is required.';
  } else if (assetType !== 'Site' && !downloadLocation) {
    errors.downloadLocation = 'Download location is required for the selected asset type.';
  }

  return errors;
};

