import * as cheerio from 'cheerio';
const scrapeSearchResults = async (keywords) => {
    let fetchUrl = 'https://www.google.com/search?q=site:*.business.site';
    const returnUrls = [];
    for (let keyword of keywords) {
        fetchUrl += `+${keyword}`;
    }
    try {
        // Send a GET request to Google search using Fetch API
        const response = await fetch(fetchUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch search results');
        }
        // Get the HTML content from the response
        const html = await response.text();
        // Load HTML into cheerio
        const $ = cheerio.load(html);
        // Extract URLs from search results
        $('div.BNeawe.UPmit.AP7Wnd.lRVwie').each((index, element) => {
            const parseUrls = async () => {
                const url = await $(element).text();
                returnUrls.push(url);
            };
            parseUrls();
        });
    }
    catch (error) {
        console.error('Failed to fetch search results:', error);
    }
    return returnUrls;
};
export default scrapeSearchResults;
