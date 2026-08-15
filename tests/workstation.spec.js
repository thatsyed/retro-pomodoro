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
    await expect(page.locator('text=I Don\'t Understand A Thing')).toBeVisible();

    // Click tape play button
    const tapePlayBtn = tapeSection.locator('button[title="Play tape"]');
    await tapePlayBtn.click();
    await expect(tapeSection.locator('text=Playing')).toBeVisible();
  });

  test('toggles reminders and theme presets', async ({ page }) => {
    // Toggle reminder
    const toggleBtn = page.getByRole('button', { name: 'Disable reminder' }).first();
    await toggleBtn.click();

    // Theme selector
    const themeSelect = page.locator('select');
    await themeSelect.selectOption('amber');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'amber');

    // CRT Toggle
    const crtBtn = page.locator('button:has-text("CRT:")');
    await crtBtn.click();
    await expect(page.locator('.crt-overlay')).not.toBeVisible();
  });
});
