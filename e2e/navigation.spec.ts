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
  const expId = await targetCard.getAttribute('data-exp-id');
  if (!expId) {
    throw new Error('Unable to resolve experience id from target card');
  }

  // The IntersectionObserver uses rootMargin '-15% 0px -50% 0px', so the card
  // must appear in the upper 35% of the main container to be detected as active.
  // Scrolling to 20% from the top of the card puts it well within that zone.
  await page.evaluate((id) => {
    const container = document.querySelector('main') as HTMLElement | null;
    const card = document.getElementById(id) as HTMLElement | null;
    if (!container || !card) return;
    container.scrollTop = Math.max(0, card.offsetTop - container.clientHeight * 0.2);
  }, expId);

  await expect(page.getByTestId(`sidebar-exp-btn-${expId}`)).toHaveAttribute('aria-current', 'true');
});
