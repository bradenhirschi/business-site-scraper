import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const google = require('google')

google.resultsPerPage = 25;
let nextCounter = 0

google('site:.business.site', (err: any, res: any) => {
  if (err) console.error(err)

  res.$('div.BNeawe.UPmit.AP7Wnd.lRVwie').each((index: any, element: any) => {
            console.log(index, ' ', res.$(element).text());
        });

  console.log(res.next);

  if (nextCounter < 4) {
    nextCounter += 1
    if (res.next) res.next()
  }
})