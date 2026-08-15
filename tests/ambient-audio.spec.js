import { test, expect } from '@playwright/test';

test.describe('Ambient Sounds Deck', () => {
  test('renders only White noise and Rain with direct Play/Pause buttons', async ({ page }) => {
    await page.goto('/');

    const ambientHeading = page.locator('text=Ambient Sounds');
    await expect(ambientHeading).toBeVisible();

    // Check channels: only White noise and Rain
    await expect(page.locator('text=White noise')).toBeVisible();
    await expect(page.locator('text=Rain')).toBeVisible();
    await expect(page.locator('text=Vinyl crackle')).not.toBeVisible();
    await expect(page.locator('text=Cafe background')).not.toBeVisible();

    // Check Play buttons on ambient channels
    const rainPlayBtn = page.locator('button[title="Play Rain"]');
    await expect(rainPlayBtn).toBeVisible();
    await rainPlayBtn.click();

    // Should now show Pause button
    const rainPauseBtn = page.locator('button[title="Pause Rain"]');
    await expect(rainPauseBtn).toBeVisible();
    await rainPauseBtn.click();

    // Should return to Play button
    await expect(page.locator('button[title="Play Rain"]')).toBeVisible();
  });
});
