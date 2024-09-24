const mainUrl = process.env.APP_MAIN_API_URL

export const fetchSiteUrls = async () => {
  try {
    const response = await fetch(`${mainUrl}/getSiteUrls`);
    if (!response.ok) {
      throw new Error('Failed to fetch site URLs');
    }
    const data = await response.json();
    return data.sites;
  } catch (error) {
    console.error('Error fetching site URLs:', error);
    return [];
  }
};