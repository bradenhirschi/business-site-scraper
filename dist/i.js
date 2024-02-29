import * as cheerio from 'cheerio';
const scrapeBusinessSite = async (url) => {
    let phoneNumbers = [];
    try {
        const response = await fetch(`https://${url}`);
        if (!response.ok) {
            throw new Error('Failed to fetch page data');
        }
        const html = await response.text();
        const $ = cheerio.load(html);
        // Extract phone numbers
        $('ul.R7Di0e li').each((index, element) => {
            const parseText = async () => {
                const innerText = await $(element).text();
                phoneNumbers.push(innerText);
            };
            parseText();
        });
    }
    catch (error) {
        console.error('Failed to fetch page data: ', error);
    }
    return { phoneNumbers, name };
};
export default scrapeBusinessSite;
