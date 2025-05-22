// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
// const { chromium } = require("playwright");
import { chromium, Browser, BrowserContext, Page, Locator } from "playwright";

async function sortHackerNewsArticles(): Promise<void> {
  // launch browser
  const browser: Browser = await chromium.launch({ headless: false}); // headless to spawn browser in the background
  const context: BrowserContext = await browser.newContext();
  const page: Page = await context.newPage();

  // go to Hacker News
  const link: string = "https://news.ycombinator.com/newest";
  await page.goto(link);

  console.log("Went to link: %s", link);

  // for exactly the first 100, we'll need to check the first few pages
  const agesLocators: Locator[] = [];

  // create locator for submission times. submission date/time has class 'age'
  while (agesLocators.length < 100) {
    const ageLocator: Locator = page.locator(".age"); // prefer locator to something like waitForSelector
    agesLocators.push(...await ageLocator.all()); 

    console.log(agesLocators.length)

    // navigate to next page
    await page.locator(".morelink").click();
    // console.log("Navigated to next page")
  }

  // keep the first 100 results
  const firstHundredAgeLocators: Locator[] = agesLocators.slice(0,100);
  console.log(firstHundredAgeLocators);

  await page.close(); // close browser once we've collected the submission ages
}

(async () => {
  await sortHackerNewsArticles();
})();
