import { BUSINESS_TYPES } from './businessTypes.js';
import { CITIES } from './cities.js';
import scrapeBusinessSite from './scrapeBusinessSite.js';
import scrapeSearchResults from './scrapeSearchResults.js';
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const main = async () => {
  const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_API_KEY!);

  for (let city of CITIES) {
    for (let businessType of BUSINESS_TYPES) {
      console.log(`Processing ${businessType} businesses in ${city.city}, ${city.state}`);
      const urls = await scrapeSearchResults([city.city, city.state, businessType]);

      for (let url of urls) {
        const { name, phoneNumbers } = await scrapeBusinessSite(url);

        const { error } = await supabase
          .from('business_sites')
          .insert({ name, url, city: city.city, state: city.state, business_type: businessType, phone_numbers: phoneNumbers });
        if (error) console.error(error);
      }
    }
  }
};

main();
