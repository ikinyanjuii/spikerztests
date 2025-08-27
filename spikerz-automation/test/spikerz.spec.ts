import { test, expect } from '@playwright/test';

test('Spikerz Social Connect - YouTube', async ({ page }) => {
  // Load env vars
  const USERNAME = process.env.SPIKERZ_USERNAME!;
  const PASSWORD = process.env.SPIKERZ_PASSWORD!;
  const GOOGLE_EMAIL = process.env.GOOGLE_EMAIL!;
  const GOOGLE_PASSWORD = process.env.GOOGLE_PASSWORD!;

  // Step 1: Login to Spikerz Dev UI
  await page.goto('https://demo.spikerz.com/');
  await page.fill('input[name="username"]', USERNAME);
  await page.fill('input[name="password"]', PASSWORD);
  await page.click('button[type="submit"]');

  // Verify login success (check dashboard or redirect)
  await expect(page).toHaveURL(/dashboard/);

  // Step 2: Navigate to Social Connect Page
  await page.goto('/social-connect/');
  await page.click('text=YouTube');

  // Step 3: Approve Google Login popup
  const popup = await page.waitForEvent('popup');
  await popup.fill('input[type="email"]', GOOGLE_EMAIL);
  await popup.click('#identifierNext');
  await popup.waitForTimeout(2000);

  await popup.fill('input[type="password"]', GOOGLE_PASSWORD);
  await popup.click('#passwordNext');

  // Step 4: Click Continue & Select Permissions to Proceed
  await popup.waitForSelector('button:has-text("Continue")', { timeout: 10000 });
  await popup.click('button:has-text("Continue")');

  // Permissions check Google OAuth page
  await popup.click('button:has-text("Allow")');

  // Step 5: Verify connection and proceed 
  await expect(page.locator('text=Connected successfully')).toBeVisible();
});
