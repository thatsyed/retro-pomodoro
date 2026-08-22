import { test, expect } from '@playwright/test';

test.describe('Retro Pomodoro Workstation E2E Verification', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('renders 3-deck cockpit and header correctly', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Retro Pomodoro');
    await expect(page.locator('text=Tasks').first()).toBeVisible();
    await expect(page.locator('text=Cassette Player')).toBeVisible();
    await expect(page.locator('text=Reminders').first()).toBeVisible();
    await expect(page.locator('text=Ambient Sounds')).toBeVisible();
  });

  test('manages tasks: add, check off, and filter', async ({ page }) => {
    const taskInput = page.locator('#task-input');
    await taskInput.fill('Deep code review session');
    await page.locator('button:has-text("Add")').first().click();

    await expect(page.locator('text=Deep code review session')).toBeVisible();

    // Toggle completion
    const taskRow = page.locator('div:has-text("Deep code review session")').last();
    const checkbox = taskRow.locator('button[title="Mark completed"]');
    await checkbox.click();

    // Filter Active vs Done
    await page.getByRole('button', { name: /^Active/ }).click();
    await expect(page.locator('text=Deep code review session')).not.toBeVisible();

    await page.getByRole('button', { name: /^Done/ }).click();
    await expect(page.locator('text=Deep code review session')).toBeVisible();
  });

  test('controls Pomodoro timer and updates countdown & tab title', async ({ page }) => {
    const startButton = page.locator('button:has-text("Start")');
    await expect(startButton).toBeVisible();
    await startButton.click();

    // After start, should show Pause
    const pauseButton = page.locator('button:has-text("Pause")').first();
    await expect(pauseButton).toBeVisible();

    // Tab title should update
    await expect(page).toHaveTitle(/\[\d{2}:\d{2}\] Focus · Retro Pomodoro/);

    // Switch mode to Short Break
    await page.locator('button:has-text("Short Break")').first().click();
    await expect(page.locator('text=Short Break').first()).toBeVisible();
    await expect(page).toHaveTitle(/Short Break · Retro Pomodoro/);
  });

  test('controls Lo-Fi cassette tape deck', async ({ page }) => {
    const tapeSection = page.locator('.cassette-shell');
    await expect(tapeSection).toBeVisible();
    await expect(page.locator('text=Georgetown Cafe')).toBeVisible();

    // Click tape play button
    const tapePlayBtn = tapeSection.locator('button[title="Play tape"]');
    await tapePlayBtn.click();
    await expect(tapeSection.locator('text=Playing')).toBeVisible();
  });

  test('toggles reminders and theme presets', async ({ page }) => {
    // Toggle reminder
    const toggleBtn = page.getByRole('button', { name: 'Disable reminder' }).first();
    await toggleBtn.click();

    // Open settings: toggle CRT off, then switch theme to Minimal
    await page.locator('button[title="Settings"]').click();
    const dialog = page.locator('[data-slot="dialog-content"]');

    await dialog.locator('button[title*="Toggle CRT scanlines"]').click();
    await expect(page.locator('.crt-overlay')).not.toBeVisible();

    await dialog.getByRole('button', { name: 'Minimal' }).click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'minimal');
  });

  test('applies and persists the Minimal theme with independent CRT toggle', async ({ page }) => {
    // Switch theme via Settings
    await page.locator('button[title="Settings"]').click();
    const dialog = page.locator('[data-slot="dialog-content"]');
    await dialog.getByRole('button', { name: 'Minimal' }).click();
    await page.keyboard.press('Escape');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'minimal');

    // Persists across reload
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'minimal');

    // Timer still works under minimal theme
    await page.locator('button:has-text("Start")').click();
    await expect(page.locator('button:has-text("Pause")').first()).toBeVisible();

    // CRT toggle operates independently of theme (via Settings)
    await expect(page.locator('.crt-overlay')).toBeVisible();
    await page.locator('button[title="Settings"]').click();
    await page.locator('button[title*="Toggle CRT scanlines"]').click();
    await page.keyboard.press('Escape');
    await expect(page.locator('.crt-overlay')).not.toBeVisible();

    // Switching back to classic restores its palette
    await page.locator('button[title="Settings"]').click();
    await page.locator('[data-slot="dialog-content"]').getByRole('button', { name: 'Classic' }).click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'classic');
  });
});
