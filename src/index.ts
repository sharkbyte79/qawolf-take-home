// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
// const { chromium } = require("playwright");
import { chromium, Browser, BrowserContext, Page, Locator } from 'playwright';

// Descriptive wrapper for the info we'll scrape from each article listing
// This only requires getting the ages/submission times for comparison, but we'll include
// the title as well for logging purposes
interface ArticleData {
    title: string; // title of the article
    timestamp: number; // timestamp for the article submission
}

export default async function sortHackerNewsArticles(
    page: Page,
    numSubmissions: number
): Promise<boolean> { // Returning a boolean to make this testable

    // NOTE: We can let the tester handle launching browsers instead of doing it manually
    // launch browser
    // const browser: Browser = await chromium.launch({ headless: false }); // headless=true to spawn browser in the background
    // const context: BrowserContext = await browser.newContext();
    // const page: Page = await context.newPage();

    // go to Hacker News
    const link: string = 'https://news.ycombinator.com/newest';
    await page.goto(link);

    console.log('Went to link: %s', link);

    // for exactly the first 100, we'll need to check the first few pages
    let articles: ArticleData[] = [];

    // create locator for submission times. submission date/time has class 'age'
    while (articles.length < numSubmissions) {
        const articlesLoc: Locator = await page.locator('.athing'); // prefer locator to something like waitForSelector
        for (const article of await articlesLoc.all()) {
            const title: string = await article
                .locator('.titleline a')
                .first()
                .innerText();

            const subDate: string =
                (await article
                    .locator('+ tr')
                    .locator('.age')
                    .getAttribute('title')) ?? '';

            const timestamp: number = parseInt(subDate.split(' ')[1]); // the submission age contains a UNIX timestamp, more useful for direct comparison

            articles.push({ title, timestamp });

            if (articles.length >= 100) {
                break;
            }
        }

        // navigate to next page
        await page.getByRole('link', { name: 'More', exact: true }).click();
        console.log('Navigated to next page');
    }

    await page.close(); // close browser once we've collected the submission dates

    // Check that the timestamps are arranged all in descending order
    return articles.slice(1).every((article, idx) => {
        // each article[idx] is compared to the article "behind" it
        return article.timestamp <= articles[idx].timestamp;
    });
}

// (async () => {
//     await sortHackerNewsArticles(100);
// })();
