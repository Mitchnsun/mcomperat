import { expect, test } from '@playwright/test';

test('clicking a tag filters experiences', async ({ page }) => {
  await page.goto('/');

  await page.getByTestId('tag-pill-TypeScript').first().click();
  await expect(page.getByRole('status')).toBeVisible();

  const dimmedCount = await page.locator('[data-exp-id].opacity-45').count();
  expect(dimmedCount).toBeGreaterThan(0);
});

test('clearing filter restores full experience list', async ({ page }) => {
  await page.goto('/');

  await page.getByTestId('tag-pill-TypeScript').first().click();
  await page.getByTestId('filter-clear-btn').click();

  await expect(page.getByRole('status')).toBeHidden();
  await expect(page.locator('[data-exp-id].opacity-45')).toHaveCount(0);
});
