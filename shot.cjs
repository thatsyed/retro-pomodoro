const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  // minimal
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.addInitScript(() => localStorage.setItem('rp_theme', JSON.stringify('minimal')));
    await page.goto('http://localhost:4173/');
    await page.waitForTimeout(800);
    await page.screenshot({ path: `test-results/minimal-desktop.png`, fullPage: false });
    await page.close();
  }
  // classic
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.addInitScript(() => localStorage.setItem('rp_theme', JSON.stringify('classic')));
    await page.goto('http://localhost:4173/');
    await page.waitForTimeout(800);
    await page.screenshot({ path: `test-results/classic-desktop.png`, fullPage: false });
    await page.close();
  }
  await browser.close();
})();
