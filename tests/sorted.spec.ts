// A full and separate tester for this use case is most likely overkill,
// but I'd like to demonstrate I know the framework.
import { test, expect } from '@playwright/test';
import sortHackerNewsArticles from '../src';

test('latest 100 hacker news articles are sorted', async ({ page }) => {
    expect(await sortHackerNewsArticles(page, 100)).toBe(true);
});
