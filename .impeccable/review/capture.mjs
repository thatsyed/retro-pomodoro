import { chromium } from '@playwright/test';
import fs from 'node:fs';

const out = '.impeccable/review';
fs.mkdirSync(out, { recursive: true });

const browser = await chromium.launch();
for (const [name, viewport] of [['desktop', { width: 1440, height: 900 }], ['mobile', { width: 390, height: 844 }]]) {
  const page = await browser.newPage({ viewport });
  await page.addInitScript(() => localStorage.setItem('rp_theme', JSON.stringify('minimal')));
  await page.goto('http://localhost:4173', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${out}/${name}.png` });
  await page.close();
}
await browser.close();
console.log('captured');
