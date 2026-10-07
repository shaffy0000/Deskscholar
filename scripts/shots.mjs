import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';

/**
 * Verification captures: top (navbar+hero) and bottom (footer) viewports per
 * route/width, plus optional full-page shots. Usage:
 *   node scripts/shots.mjs <tag> <routes> <WxH,...> [--full]
 */
const browser = await chromium.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true,
  args: ['--no-sandbox'],
});
const tag = process.argv[2] || 'after';
const routesArg = process.argv[3] || '/,/editions,/technology,/faq';
const widthsArg = process.argv[4] || '1440x900,1024x768,768x1024,390x844,320x700';
const full = process.argv.includes('--full');
mkdirSync(`screenshots/${tag}`, { recursive: true });

const routes = routesArg.split(',').map((r) => [r, r.replace(/^\//, '').replace(/[\/#].*$/, '') || 'home']);
const widths = widthsArg.split(',').map((s) => s.split('x').map(Number));

for (const [w, h] of widths) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  const overflow = [];
  for (const [route, rname] of routes) {
    await page.goto('http://localhost:5173' + route, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1200);
    await page.screenshot({ path: `screenshots/${tag}/${rname}-top-${w}.png` });
    const ow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    if (ow > 0) overflow.push(`${route}@${w}: ${ow}px`);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(600);
    await page.screenshot({ path: `screenshots/${tag}/${rname}-bottom-${w}.png` });
    if (full) {
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(400);
      await page.screenshot({ path: `screenshots/${tag}/${rname}-full-${w}.png`, fullPage: true });
    }
  }
  await ctx.close();
  if (overflow.length) console.log('OVERFLOW:', overflow.join('; '));
}
await browser.close();
console.log(tag + ' captured');
