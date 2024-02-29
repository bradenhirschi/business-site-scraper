import * as cheerio from 'cheerio';

const scrapeBusinessSite = async (url: string) => {
  let phoneNumbers: string[] = [];
  let name: string = '';

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
    const promises: Promise<void>[] = [];

    // Business name
    $('span.hero__title-content').each((index: any, element: any) => {
      const getBusinessName = async () => {
        const innerText = await $(element).text();
        name = innerText;
      };

      promises.push(getBusinessName());
    });

    // Phone numbers
    $('ul.R7Di0e li').each((index: any, element: any) => {
      const getPhoneNumbers = async () => {
        const innerText = await $(element).text();
        phoneNumbers.push(innerText);
      };

      promises.push(getPhoneNumbers());
    })

    // Wait for all promises to resolve
    await Promise.all(promises);
  } catch (error) {
    console.error('Failed to fetch page data: ', error);
  }

  return { name, phoneNumbers };
};

export default scrapeBusinessSite;
