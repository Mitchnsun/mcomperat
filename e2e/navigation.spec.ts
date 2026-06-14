import { expect, test } from '@playwright/test';

test('clicking a sidebar experience scrolls to the matching card', async ({ page }) => {
  await page.goto('/');

  const firstButton = page.locator('[data-testid^="sidebar-exp-btn-"]').first();
  const testId = await firstButton.getAttribute('data-testid');
  const expId = testId?.replace('sidebar-exp-btn-', '');
  if (!expId) {
    throw new Error('Unable to resolve sidebar experience id');
  }

  await firstButton.click();
  await expect(page.locator(`[data-exp-id="${expId}"]`)).toBeInViewport();
});

test('scrolling updates the active sidebar experience', async ({ page }) => {
  await page.goto('/');

  const targetCard = page.locator('[data-exp-id]').nth(3);
  await targetCard.scrollIntoViewIfNeeded();

  const expId = await targetCard.getAttribute('data-exp-id');
  if (!expId) {
    throw new Error('Unable to resolve experience id from target card');
  }

  await expect(page.getByTestId(`sidebar-exp-btn-${expId}`)).toHaveAttribute('aria-current', 'true');
});
