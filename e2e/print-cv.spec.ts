import { expect, test } from '@playwright/test';

for (const locale of ['fr', 'en'] as const) {
  test(`/${locale}/print responds 200 and renders the sidebar + a sheet`, async ({ page }) => {
    const response = await page.goto(`/${locale}/print`);

    expect(response?.status()).toBe(200);
    await expect(page.getByTestId('print-sidebar')).toBeVisible();
    await expect(page.getByTestId('print-sheet')).toBeVisible();
  });
}

test('selecting a language updates the previewed sheet', async ({ page }) => {
  await page.goto('/fr/print');

  await page.getByTestId('lang-btn-en').click();
  await expect(page).toHaveURL(/\/en\/print$/);
  await expect(page.getByTestId('print-sheet')).toContainText('Senior Frontend Engineer');
});
