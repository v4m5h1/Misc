export const validateForm = (data) => {
  const errors = {};
  if (!data.siteURL) {
    errors.siteURL = "Site URL is required.";
  } else if (!/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(data.siteURL)) {
    errors.siteURL = "Invalid URL format.";
  }

  // More validations based on form requirements
  if (!data.selection) {
    errors.selection = "Selection is required.";
  }

  return errors;
};