const puppeteer = require('puppeteer');


async function run() {
  // Launch a browser, to access pages and different elements on a page
  const browser = await puppeteer.launch();
}

// Run function
run();