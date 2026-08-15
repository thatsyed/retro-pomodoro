import { test, expect } from '@playwright/test';

test.describe('Timer Pause behavior', () => {
  test('pausing the timer preserves remaining time and does not reset to full duration', async ({ page }) => {
    await page.goto('/');

    // Verify initial state is 25:00
    const timerDisplay = page.locator('.font-vt323');
    await expect(timerDisplay).toHaveText('25:00');

    // Click Start
    const startButton = page.locator('button:has-text("Start")');
    await startButton.click();

    // Wait for timer to count down at least 2 seconds
    await page.waitForTimeout(2200);

    // Grab the time displayed before pausing
    const textWhileRunning = (await timerDisplay.innerText()).trim();
    expect(textWhileRunning).not.toBe('25:00');

    // Click Pause
    const pauseButton = page.locator('button:has-text("Pause")').first();
    await pauseButton.click();

    // Ensure it shows Start button again
    await expect(page.locator('button:has-text("Start")')).toBeVisible();

    // Check displayed time immediately after pause and after a short wait
    const textAfterPause = (await timerDisplay.innerText()).trim();
    expect(textAfterPause).not.toBe('25:00');
    expect(textAfterPause).toBe(textWhileRunning);

    // Wait a bit while paused to verify it stays paused
    await page.waitForTimeout(1500);
    const textAfterWaitWhilePaused = (await timerDisplay.innerText()).trim();
    expect(textAfterWaitWhilePaused).toBe(textAfterPause);

    // Resume timer
    await page.locator('button:has-text("Start")').click();
    await page.waitForTimeout(1500);
    const textAfterResume = (await timerDisplay.innerText()).trim();
    expect(textAfterResume).not.toBe('25:00');
    expect(textAfterResume).not.toBe(textAfterPause);
  });
});
