import { chromium } from 'playwright';

(async () => {
  console.log("Launching browser...");
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  console.log("Navigating to http://localhost:5173...");
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  
  // Wait for 2 seconds to allow any animations to settle
  await page.waitForTimeout(2000);
  
  console.log("Taking screenshot...");
  await page.screenshot({ path: 'screenshot.png', fullPage: true });
  
  console.log("Screenshot saved as screenshot.png in the project root.");
  await browser.close();
})();
