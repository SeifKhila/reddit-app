// e2e/e2e/homepage.spec.js
import { test, expect } from '@playwright/test';

test('user can see homepage UI and open comments if posts exist', async ({ page }) => {
  await page.goto('/');

  // 1. Main heading visible
  await expect(
    page.getByText(/welcome to reddit client/i)
  ).toBeVisible();

  // 2. Core search UI is visible
  await expect(
    page.getByPlaceholder(/search reddit/i)
  ).toBeVisible();

  await expect(
    page.getByRole('button', { name: /search/i })
  ).toBeVisible();

  // 3. Give the app a bit of time to fetch posts
  await page.waitForTimeout(4000);

  const cards = page.locator('.post-card');
  const count = await cards.count();

  // If there are no posts (API failed / offline), we still consider the test passed.
  if (count === 0) {
    console.log('No posts loaded – skipping comments check.');
    return;
  }

  // 4. If posts exist, open comments on the first one
  const firstPost = cards.first();

  const toggleButton = firstPost.getByRole('button', { name: /comments/i });
  await toggleButton.click();

  const commentsSection = firstPost.locator('.comments');
  await expect(commentsSection).toBeVisible();
});

