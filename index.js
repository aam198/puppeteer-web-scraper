const puppeteer = require('puppeteer');


async function run() {
  // Launch a browser, to access pages and different elements on a page
  const browser = await puppeteer.launch();
  // Access a page
  const page = await browser.newPage();
  // which page to go to that you will be scraping, example temporary
  await page.goto('https://traversymedia.com');

  // Take a screenshot of the site/page, will overwrite
  await page.screenshot({ path: 'example.png', fullPage: true });
  await page.pdf({ path: 'example2.pdf', format: 'A4' });

  // Get entire HTML of a page
  // const html = await page.content();
  // console.log(html);

  // Evaluate the page object example
  const title = await page.evaluate( () => document.title);
  console.log(title);

  // Must have, close out the browser connection
  await browser.close();
}

// Run function
run();