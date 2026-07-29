const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 }
  });
  await page.goto('http://localhost:4322/playground?set=builder');

  // wait 1 sec to let grid pattern kick in
  await page.waitForTimeout(1000);

  await page.screenshot({ path: 'mobile3.png', fullPage: true });

  await browser.close();
})();
