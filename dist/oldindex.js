import * as cheerio from 'cheerio';
async function scrapeWebsites(domainExtension) {
    // URL to start scraping from
    const url = `https://www.google.com/search?q=site:*.${domainExtension}&num=100`;
    try {
        // Send a GET request to Google search using Fetch API
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch search results');
        }
        // Get the HTML content from the response
        const html = await response.text();
        // console.log(html);
        // Load HTML into cheerio
        const $ = cheerio.load(html);
        // Extract URLs from search results
        $('div.BNeawe.UPmit.AP7Wnd.lRVwie').each((index, element) => {
            console.log($(element).text());
        });
    }
    catch (error) {
        console.error('Failed to fetch search results:', error);
    }
}
// Call the function with the desired domain extension
scrapeWebsites('business.site');
