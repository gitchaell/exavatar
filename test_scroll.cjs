const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 }
  });
  await page.goto('http://localhost:4322/playground?set=builder');

  // Try to find age input
  const ageVisible = await page.locator('select[name="age"]').isVisible();
  console.log("Is Age visible on mobile?", ageVisible);

  await browser.close();
})();
