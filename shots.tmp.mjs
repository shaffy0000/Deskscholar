import { chromium } from 'playwright-core';
const browser = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', headless: true, args: ['--no-sandbox'] });
const tag = process.argv[2] || 'before';
const routes = tag === 'before2' ? [['/', 'home'], ['/editions', 'editions']] : [['/', 'home'], ['/editions', 'editions']];
for (const [w, h, name] of [[1440, 900, 'desktop'], [390, 844, 'mobile'], [320, 700, 'narrow']]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  for (const [route, rname] of routes) {
    await page.goto('http://localhost:5173' + route, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: `screenshots/${tag}-${rname}-${name}.png` });
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(700);
    await page.screenshot({ path: `screenshots/${tag}-${rname}-${name}-bottom.png` });
  }
  await ctx.close();
}
await browser.close();
console.log(tag + ' captured');