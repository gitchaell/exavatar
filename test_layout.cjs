const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 }
  });
  await page.goto('http://localhost:4322/playground?set=builder');

  const els = await page.locator('.grid-box.col-\\[2\\/12\\]').all();
  for (let i = 0; i < els.length; i++) {
    const el = els[i];
    const box = await el.boundingBox();
    const className = await el.getAttribute('class');
    console.log(`Element ${i} box:`, box, `classes: ${className}`);
  }

  await browser.close();
})();
