const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 }
  });
  await page.goto('http://localhost:4322/playground');

  console.log('Initially, Builder.Age is present?', await page.locator('select[name="age"]').isVisible());

  // Change set to builder
  await page.selectOption('select[name="set"]', 'builder');

  // Wait a bit
  await page.waitForTimeout(1000);

  console.log('After selecting builder, Builder.Age is present?', await page.locator('select[name="age"]').isVisible());

  await browser.close();
})();
