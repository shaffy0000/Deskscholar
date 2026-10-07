import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';

/** Driven-state stills for the five corrective sections + navbar/footer/menu. */
const browser = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', headless: true, args: ['--no-sandbox'] });
const tag = process.argv[2] || 'after';
mkdirSync(`screenshots/${tag}`, { recursive: true });

const shots = [
  ['/', null, 'home-1-navbar-hero'],
  ['/', '#problem-section', 'home-2-problem'],
  ['/', '#planned-experience', 'home-3-demo'],
  ['/', '#editions-preview', 'home-4-spotlight'],
  ['/', 'footer', 'home-6-footer'],
  ['/editions', '.ed-cmp', 'editions-2-explorer'],
  ['/faq', null, 'faq-1-top'],
];

for (const [w, h] of [[1440, 900], [390, 844]]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  for (const [route, sel, name] of shots) {
    await page.goto('http://localhost:5173' + route, { waitUntil: 'networkidle' });
    await page.waitForTimeout(900);
    if (!sel) { await page.screenshot({ path: `screenshots/${tag}/${name}-${w}.png` }); continue; }
    const el = page.locator(sel).first();
    if (await el.count()) {
      if (name === 'home-3-demo') { await page.locator('.wt-tab').nth(2).click(); await page.waitForTimeout(500); }
      if (name === 'home-4-spotlight') { await page.locator('.es-control [role="radio"]').nth(1).click(); await page.waitForTimeout(600); }
      if (name === 'editions-2-explorer') { await page.locator('.cmx-cat').nth(1).click(); await page.waitForTimeout(400); }
      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(450);
      await el.screenshot({ path: `screenshots/${tag}/${name}-${w}.png` }).catch(async () => page.screenshot({ path: `screenshots/${tag}/${name}-${w}.png` }));
    }
  }
  if (w === 390) {
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
    await page.locator('[data-testid="mobile-nav-open"]').click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: `screenshots/${tag}/home-7-mobile-menu-${w}.png` });
  } else {
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
    await page.getByRole('button', { name: /Product/ }).click();
    await page.waitForTimeout(400);
    await page.screenshot({ path: `screenshots/${tag}/home-8-product-dropdown-${w}.png`, clip: { x: 0, y: 0, width: 760, height: 460 } });
  }
  await ctx.close();
}
await browser.close();
console.log(tag + ' section shots captured');
