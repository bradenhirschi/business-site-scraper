import * as cheerio from 'cheerio';
const scrapeBusinessSite = async (url) => {
    let name = '';
    try {
        // Send a GET request to Google search using Fetch API
        const response = await fetch(`https://${url}`);
        if (!response.ok) {
            throw new Error('Failed to fetch page data');
        }
        // Get the HTML content from the response
        const html = await response.text();
        // Load HTML into cheerio
        const $ = cheerio.load(html);
        // Array to store promises for each async operation
        const promises = [];
        // Extract URLs from search results
        $('span.hero__title-content').each((index, element) => {
            const parseText = async () => {
                const innerText = await $(element).text();
                name = innerText;
            };
            promises.push(parseText());
        });
        // Wait for all promises to resolve
        await Promise.all(promises);
    }
    catch (error) {
        console.error('Failed to fetch page data: ', error);
    }
    return name;
};
export default scrapeBusinessSite;
