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

  // create locator for submission times. submission date/time has class 'age'
  const ageLocator: Locator = page.locator("span.age");
  console.log("Got %d ages", await ageLocator.count());

  await page.close(); // close browser once we've collected the submission ages
}

(async () => {
  await sortHackerNewsArticles();
})();
