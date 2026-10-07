import { chromium } from 'playwright-core';

const browser = await chromium.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true,
  args: ['--no-sandbox'],
});

const results = [];
const ok = (name, cond, extra = '') => results.push(`${cond ? 'PASS' : 'FAIL'} — ${name}${extra ? ` (${extra})` : ''}`);

// ---------- 1. pricing sweep across routes ----------
const routes = ['/', '/editions', '/technology', '/schools', '/journey', '/team', '/contact', '/faq', '/privacy', '/terms'];
const moneyRe = /PKR|Rs\.?\s?\d|\$\s?\d|USD|per month|£\s?\d|€\s?\d/i;
for (const route of routes) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto('http://localhost:5173' + route, { waitUntil: 'networkidle' });
  const text = await page.evaluate(() => document.body.innerText);
  const hits = text.split('\n').filter((l) => moneyRe.test(l));
  ok(`no monetary figures on ${route}`, hits.length === 0, hits.slice(0, 3).join(' | '));
  // JSON-LD sweep
  const ld = await page.evaluate(() =>
    Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map((s) => s.textContent).join(' '),
  );
  ok(`no monetary figures in JSON-LD on ${route}`, !moneyRe.test(ld));
  await ctx.close();
}

// ---------- 2. header geometry + sticky at all widths ----------
for (const [w, h, expectedH] of [[1440, 900, 72], [1024, 768, 72], [768, 1024, 60], [390, 844, 60], [320, 700, 60]]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h } });
  const page = await ctx.newPage();
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  const geom = await page.evaluate(() => {
    const header = document.querySelector('header');
    const nav = document.querySelector('[data-testid="main-nav"]');
    return { headerH: header.getBoundingClientRect().height, navH: nav.getBoundingClientRect().height };
  });
  ok(`header height @${w}px`, Math.abs(geom.headerH - expectedH) <= 1, `${geom.headerH}px vs ${expectedH}px`);
  // sticky after scroll
  await page.evaluate(() => window.scrollTo(0, 1200));
  await page.waitForTimeout(400);
  const sticky = await page.evaluate(() => {
    const header = document.querySelector('header');
    const r = header.getBoundingClientRect();
    return { top: r.top, height: r.height };
  });
  ok(`header sticky @${w}px`, Math.abs(sticky.top) < 1.5 && Math.abs(sticky.height - geom.headerH) < 1.5, `top=${sticky.top} h=${sticky.height}`);
  // overflow
  const ow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  ok(`no horizontal overflow home @${w}px`, ow <= 0, `${ow}px`);
  await ctx.close();
}

// ---------- 3. navbar + hero together (desktop) ----------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  const align = await page.evaluate(() => {
    const nav = document.querySelector('[data-testid="main-nav"]').getBoundingClientRect();
    const hero = document.querySelector('.hx-inner').getBoundingClientRect();
    const pb = document.querySelector('.pb-inner').getBoundingClientRect();
    return { navL: nav.left, navR: nav.right, heroL: hero.left, heroR: hero.right, pbL: pb.left, pbR: pb.right };
  });
  ok('nav container aligns with hero + problem grid', Math.abs(align.navL - align.heroL) < 1 && Math.abs(align.navL - align.pbL) < 1 && Math.abs(align.navR - align.heroR) < 1, JSON.stringify(align));
  // desktop nav visible links
  const links = await page.evaluate(() =>
    Array.from(document.querySelectorAll('[data-testid="main-nav"] a, [data-testid="main-nav"] button')).map((el) => ({ t: el.textContent.trim().slice(0, 24), vis: el.offsetParent !== null })),
  );
  ok('desktop nav shows Product/Editions/Our story/FAQ/CTA', ['Product', 'Editions', 'Our story', 'FAQ', 'Join the waitlist'].every((n) => links.some((l) => l.t === n && l.vis)), JSON.stringify(links.filter(l=>l.vis).map(l=>l.t)));
  await ctx.close();
}

// ---------- 4. product dropdown: click, Escape, outside click ----------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: /Product/ }).click();
  ok('product panel opens on click', await page.locator('[data-testid="product-panel"]').isVisible());
  const panelLinks = await page.locator('[data-testid="product-panel"] a').allTextContents();
  ok('panel has planned experience/technology/schools only', panelLinks.length === 3, panelLinks.join('|').replace(/\s+/g, ' ').slice(0, 120));
  await page.keyboard.press('Escape');
  ok('Escape closes panel', !(await page.locator('[data-testid="product-panel"]').isVisible()));
  ok('focus restored to Product control', await page.evaluate(() => document.activeElement?.textContent?.includes('Product')));
  await page.getByRole('button', { name: /Product/ }).click();
  await page.mouse.click(700, 500);
  ok('outside click closes panel', !(await page.locator('[data-testid="product-panel"]').isVisible()));
  // keyboard open
  await page.getByRole('button', { name: /Product/ }).focus();
  await page.keyboard.press('Enter');
  ok('keyboard opens panel', await page.locator('[data-testid="product-panel"]').isVisible());
  await ctx.close();
}

// ---------- 5. FAQ route via navbar ----------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.locator('[data-testid="main-nav"] a', { hasText: 'FAQ' }).first().click();
  await page.waitForURL('**/faq');
  await page.waitForSelector('details summary', { timeout: 15000 });
  const h1 = await page.locator('h1').first().innerText();
  ok('navbar FAQ reaches /faq', /Frequently asked/i.test(h1), h1.replace(/\n/g, ' '));
  const summaries = await page.locator('details summary').count();
  ok('FAQ page lists questions', summaries >= 10, `${summaries} items`);
  // footer link too
  const footerFaq = await page.locator('footer a[href="/faq"]').count();
  ok('footer FAQ link points to /faq', footerFaq >= 1);
  await ctx.close();
}

// ---------- 6. homepage composition ----------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  ok('home has no comparison table', (await page.locator('table.cmp-table, .cmp-module').count()) === 0);
  ok('home has no FAQ section', (await page.locator('section#faq').count()) === 0);
  ok('home has no old features grid', (await page.locator('#features-grid').count()) === 0);
  const order = await page.evaluate(() =>
    Array.from(document.querySelectorAll('main section')).map((s) => s.id || s.className.split(' ')[0]),
  );
  ok('home sections in planned order', JSON.stringify(order).includes('planned-experience') && JSON.stringify(order).includes('editions-preview'), order.join(' > '));
  // problem section is image-led
  const pbImg = await page.locator('.pb-media img').getAttribute('src');
  ok('problem section uses approved product asset', /deskscholar/.test(pbImg || ''), pbImg);
  ok('problem observations are rule-separated (no cards)', (await page.locator('.pb-points li').count()) === 3 && (await page.locator('.pb-points .rounded-\\[10px\\]').count()) === 0);
  // spotlight interactions
  const radios = page.locator('.es-control [role="radio"]');
  ok('spotlight has 3 edition controls', (await radios.count()) === 3);
  await radios.nth(2).click();
  const name = await page.locator('.es-name').innerText();
  ok('spotlight selection updates copy', /Independent/.test(name), name);
  const onShot = await page.locator('.es-shot[data-on="true"] img').getAttribute('alt');
  ok('spotlight selection updates visual', /normal room lighting/i.test(onShot || ''), onShot);
  // standard radiogroup semantics: arrows move relative to the selected radio
  await page.locator('.es-shot[data-on="true"]');
  await page.locator('.es-control [role="radio"][aria-checked="true"]').focus();
  await page.keyboard.press('ArrowRight');
  ok('spotlight arrow keys work (wrap from Independent to Connect)', /Connect/.test(await page.locator('.es-name').innerText()), await page.locator('.es-name').innerText());
  await page.keyboard.press('ArrowRight');
  ok('spotlight arrow keys cycle (Connect to Hybrid)', /Hybrid/.test(await page.locator('.es-name').innerText()));
  const exploreHref = await page.locator('.es-explore').getAttribute('href');
  ok('explore link targets /editions section', /\/editions#/.test(exploreHref || ''), exploreHref);
  // walkthrough
  const wtTabs = page.locator('.wt-tab');
  ok('walkthrough has 3 steps', (await wtTabs.count()) === 3);
  await wtTabs.nth(2).click();
  ok('walkthrough step changes data-step', (await page.locator('.wt').getAttribute('data-step')) === '2');
  const sheet = await page.locator('.wt-sheet-q').innerText();
  ok('worksheet uses verified ¼ + ¼ example', sheet.includes('¼ + ¼'), sheet.replace(/\s+/g, ' '));
  const projVisible = await page.locator('.wt[data-step="2"] .wt-guid-eq').isVisible();
  ok('guidance appears on step 3', projVisible);
  ok('scene labelled simulated/planned', /Simulated/i.test(await page.locator('.wt-panel-tag').innerText()));
  await ctx.close();
}

// ---------- 7. /editions explorer ----------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto('http://localhost:5173/editions', { waitUntil: 'networkidle' });
  const cats = page.locator('.cmx-cat');
  ok('explorer has 5 categories', (await cats.count()) === 5, await cats.allTextContents().then((t) => t.join('|')));
  const cols = page.locator('.cmx-col');
  ok('all three editions shown together', (await cols.count()) === 3);
  await cats.nth(1).click();
  const heading = await page.locator('.cmx-heading').innerText();
  ok('category switch updates stage', /leaves the room/i.test(heading), heading);
  const diagrams = await page.locator('.cmx-diagram svg').count();
  ok('diagrams render per cell', diagrams === 3, `${diagrams}`);
  await cats.nth(0).focus();
  await page.keyboard.press('ArrowRight');
  ok('explorer keyboard works', (await page.locator('.cmx-cat[aria-selected="true"]').innerText()) === 'Privacy');
  const cmxText = (await page.locator('.cmx').innerText()).toLowerCase();
  ok('no pricing-plan ribbons', !/best value|most popular|recommended/i.test(cmxText));
  const plain = page.locator('.cmx-plain');
  ok('plain summary disclosure exists and is closed', (await plain.count()) === 1 && !(await page.locator('.cmx-plain').evaluate((d) => d.open)));
  // subscription block removed from edition blocks
  ok('edition blocks have no pricing box', (await page.locator('.ed-sub').count()) === 0);
  const subFacts = await page.locator('.ed-fact', { hasText: 'Subscription' }).count();
  ok('subscription fact preserved (non-price)', subFacts === 3, `${subFacts}`);
  // anchor not covered by sticky header
  await page.goto('http://localhost:5173/editions#independent', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  const covered = await page.evaluate(() => {
    const el = document.getElementById('independent');
    const header = document.querySelector('header').getBoundingClientRect();
    return el.getBoundingClientRect().top < header.bottom - 1;
  });
  ok('anchor target not covered by sticky header', !covered);
  await ctx.close();
}

// ---------- 8. footer ----------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  const socials = await page.evaluate(() =>
    Array.from(document.querySelectorAll('footer nav[aria-label="Contact and social"] a')).map((a) => ({
      href: a.getAttribute('href'),
      label: a.getAttribute('aria-label') || a.textContent.trim(),
    })),
  );
  const need = ['https://www.linkedin.com/company/desk-scholar/', 'https://www.instagram.com/desk.scholar/', 'https://www.youtube.com/channel/UCp5X3aAfk8fM2NGXqf9YOpg', 'mailto:info@deskscholar.com'];
  ok('social links restored with real destinations', need.every((n) => socials.some((s) => s.href === n)), JSON.stringify(socials.map((s) => s.href)));
  ok('social icons have accessible names', socials.filter((s) => s.href.startsWith('http')).every((s) => s.label && s.label.length > 1));
  ok('no placeholder # links in footer', (await page.locator('footer a[href="#"]').count()) === 0);
  ok('no repeated waitlist button in footer', (await page.locator('footer a', { hasText: /join the waitlist/i }).count()) === 0);
  const footerText = await page.locator('footer').innerText();
  ok('no FYP wording in footer', !/final-year|FYP/i.test(footerText));
  // internal footer links resolve to real routes
  const hrefs = await page.evaluate(() => Array.from(document.querySelectorAll('footer a')).map((a) => a.getAttribute('href')));
  const internal = [...new Set(hrefs.filter((h) => h && h.startsWith('/') && !h.includes('#')))];
  let dead = [];
  for (const href of internal) {
    const r = await page.request.get('http://localhost:5173' + href);
    if (!r.ok()) dead.push(href);
  }
  ok('all internal footer links resolve', dead.length === 0, dead.join(','));
  // bottom-row gap: distance between link grid bottom and bottom row top should be small
  const gap = await page.evaluate(() => {
    const grid = document.querySelector('footer .grid').getBoundingClientRect();
    const bottom = document.querySelector('footer .grid + div').getBoundingClientRect();
    return bottom.top - grid.bottom;
  });
  ok('no large empty band before bottom row', gap >= -1 && gap <= 2, `${gap}px`);
  await ctx.close();
}

// ---------- 9. overflow sweep on all routes / widths ----------
for (const [w, h] of [[320, 700], [390, 844], [768, 1024], [1024, 768], [1440, 900]]) {
  for (const route of ['/', '/editions', '/technology', '/faq']) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h } });
    const page = await ctx.newPage();
    await page.goto('http://localhost:5173' + route, { waitUntil: 'networkidle' });
    const ow = await page.evaluate(() => {
      const de = document.documentElement;
      const worst = Array.from(document.querySelectorAll('body *')).filter((el) => el.getBoundingClientRect().right > de.clientWidth + 1 && getComputedStyle(el).position !== 'fixed').slice(0, 3).map((el) => el.tagName + '.' + String(el.className).slice(0, 30));
      return { ow: de.scrollWidth - de.clientWidth, worst };
    });
    ok(`no overflow ${route} @${w}`, ow.ow <= 0, `${ow.ow}px ${ow.worst.join(' | ')}`);
    await ctx.close();
  }
}

// ---------- 10. section spacing rhythm (home, desktop) ----------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  const gaps = await page.evaluate(() => {
    const secs = Array.from(document.querySelectorAll('main section'));
    return secs.map((s) => ({ id: s.id || s.className.split(' ')[0], h: Math.round(s.getBoundingClientRect().height) }));
  });
  console.log('SECTION HEIGHTS:', JSON.stringify(gaps));
  await ctx.close();
}

await browser.close();
console.log(results.join('\n'));
const failed = results.filter((r) => r.startsWith('FAIL'));
console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
process.exit(failed.length ? 1 : 0);
