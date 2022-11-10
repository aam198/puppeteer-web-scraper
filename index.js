const puppeteer = require('puppeteer');
// To save data to a file
const fs = require('fs');


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
  // const title = await page.evaluate( () => document.title);
  // console.log(title);

  // See all text on the page
  // const text = await page.evaluate (() => document.body.innerText);
  // console.log(text);

  //  Get all the links on a page
  // Array.from() method that will create an array from an iterable object, this instance is .querySelectorAll node list
  // the items in an array, takes 2 arguments, the second one is to grab the href element from <a>. 
  // const links = await page.evaluate(() => Array.from(document.querySelectorAll('a'), (e) => e.href));
  // console.log(links);

  // To grab the specific course info, titles, links, have to inspect the devtools to see which one we want to see
  // const courses = await page.evaluate(() => Array.from(document.querySelectorAll('#courses .card'), (e) => ({
  //   // Properties we want returned
  //   title: e.querySelector('.card-body h3').innerText,
  //   level: e.querySelector('.card-body .level').innerText,
  //   // To get the url
  //   url: e.querySelector('.card-footer a').href,
  //   // Getting text from the element
  //   promo: e.querySelector('.card-footer .promo-code .promo').innerText
  //   }))
  // );

  // Another Syntax instead of Array.from. 
  const courses = await page.$$eval('#courses .card', (elements) => elements.map(e => ({
    title: e.querySelector('.card-body h3').innerText,
    level: e.querySelector('.card-body .level').innerText,
   // To get the url
    url: e.querySelector('.card-footer a').href,
  // Getting text from the element
    promo: e.querySelector('.card-footer .promo-code .promo').innerText
  })))
  console.log(courses);

  // Save data to a JSON file with fs module, send in valid json by stringify
  fs.writeFile('courses.json', JSON.stringify(courses), (err) => {
    if (err) throw err;
    console.log('File Saved');
  })


  // Must have, close out the browser connection
  await browser.close();
}

// Run function
run();