import { test, expect } from '@playwright/test';

test.describe('Retro Pomodoro Workstation E2E Verification', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('renders 3-deck cockpit and header correctly', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('RETRO POMODORO // v2.0');
    await expect(page.locator('text=TASKS // TODO')).toBeVisible();
    await expect(page.locator('text=LO-FI TAPE DECK')).toBeVisible();
    await expect(page.locator('text=REMINDERS')).toBeVisible();
    await expect(page.locator('text=AMBIENT SOUNDSCAPES')).toBeVisible();
  });

  test('manages tasks: add, check off, and filter', async ({ page }) => {
    const taskInput = page.locator('#task-input');
    await taskInput.fill('Deep code review session');
    await page.locator('button:has-text("ADD")').click();

    await expect(page.locator('text=Deep code review session')).toBeVisible();

    // Toggle completion
    const taskRow = page.locator('div:has-text("Deep code review session")').last();
    const checkbox = taskRow.locator('button[title="Mark completed"]');
    await checkbox.click();

    // Filter Active vs Completed
    await page.locator('button:has-text("active")').click();
    await expect(page.locator('text=Deep code review session')).not.toBeVisible();

    await page.locator('button:has-text("completed")').click();
    await expect(page.locator('text=Deep code review session')).toBeVisible();
  });

  test('controls Pomodoro timer and updates countdown & tab title', async ({ page }) => {
    const startButton = page.locator('button:has-text("START")');
    await expect(startButton).toBeVisible();
    await startButton.click();

    // After start, should show PAUSE
    const pauseButton = page.locator('button:has-text("PAUSE")').first();
    await expect(pauseButton).toBeVisible();

    // Tab title should update
    await expect(page).toHaveTitle(/\[\d{2}:\d{2}\] Focus \/\/ Retro Pomodoro/);

    // Switch mode to SHORT BREAK
    await page.locator('button:has-text("SHORT BREAK")').click();
    await expect(page.locator('text=SHORT BREAK').first()).toBeVisible();
    await expect(page).toHaveTitle(/Short Break \/\/ Retro Pomodoro/);
  });

  test('controls Lo-Fi cassette tape deck', async ({ page }) => {
    const tapeSection = page.locator('.cassette-shell');
    await expect(tapeSection).toBeVisible();
    await expect(page.locator('text=I Don\'t Understand A Thing')).toBeVisible();

    // Click tape play button
    const tapePlayBtn = tapeSection.locator('button[title="Play Tape"]');
    await tapePlayBtn.click();
    await expect(tapeSection.locator('text=PLAYING')).toBeVisible();
  });

  test('toggles reminders and theme presets', async ({ page }) => {
    // Toggle reminder
    const toggleBtn = page.getByRole('button', { name: 'Disable Reminder' }).first();
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
