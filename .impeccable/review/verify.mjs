import { chromium } from '@playwright/test';
const browser = await chromium.launch();
const cases = [
  ['minimal-desktop', {w:1440,h:900}, 'minimal', false],
  ['minimal-mobile', {w:390,h:844}, 'minimal', false],
  ['minimal-mobile-full', {w:390,h:844}, 'minimal', true],
  ['classic-desktop', {w:1440,h:900}, 'classic', false],
  ['classic-mobile', {w:390,h:844}, 'classic', false],
  ['classic-mobile-full', {w:390,h:844}, 'classic', true],
];
for (const [name, vp, theme, full] of cases) {
  const page = await browser.newPage({ viewport: { width: vp.w, height: vp.h } });
  await page.addInitScript((t) => localStorage.setItem('rp_theme', JSON.stringify(t)), theme);
  await page.goto('http://127.0.0.1:4173', { waitUntil:'networkidle' });
  await page.waitForTimeout(600);
  await page.screenshot({ path: `.impeccable/review/${name}.png`, fullPage: full });
  const info = await page.evaluate(() => {
    const main = document.querySelector('main');
    const secs = [...main.children].map(c => c.getBoundingClientRect().height.toFixed(1));
    return { mainScrollH: main.scrollHeight, mainClientH: main.clientHeight, secs, gtr: getComputedStyle(main).gridTemplateRows, display: getComputedStyle(main).display };
  });
  console.log(name, JSON.stringify(info));
  await page.close();
}
await browser.close();
console.log('done');
