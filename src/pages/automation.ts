import { chromium } from '@playwright/test';

export async function runAutomation(testName: string) {
  console.log(`Running automation: ${testName}`);

  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    await page.goto('https://demo.spikerz.com/');
    // Extend this to run based on testName
  } finally {
    await browser.close();
  }
}
