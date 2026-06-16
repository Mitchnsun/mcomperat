import { expect, test } from '@playwright/test';

test('changing theme applies data-theme', async ({ page }) => {
  await page.goto('/');

  await page.getByTestId('theme-btn-clean').click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'clean');
});

test('changing language shows EN content', async ({ page }) => {
  await page.goto('/fr');

  await page.getByTestId('lang-btn-en').click();
  await expect(page.getByTestId('person-title')).toContainText('Senior Frontend Engineer');
});
