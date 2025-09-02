import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

test.use({
  httpCredentials: {
    username: process.env.HTTP_USERNAME!,
    password: process.env.HTTP_PASSWORD!
  }
});

test('basic auth login', async ({ page }) => {
  // Open Landing Page
  await page.goto('https://demo.spikerz.com/');
  
  // Go to Social Connect
  await page.goto('https://demo.spikerz.com/social-connect/');
  
  // Click on Youtube Button 
  await page.getByText('Youtube').click();
  
  // Google Login
  await page.locator('app-google-and-youtube-login').getByRole('button').click();
  await page.getByRole('textbox', { name: 'Email or phone' }).fill(process.env.GOOGLE_EMAIL!);
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).fill(process.env.GOOGLE_PASSWORD!);
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('checkbox', { name: 'Select all' }).check();
  
  //Check Select All 
  await page.getByRole('button', { name: 'Continue' }).click();
  
  //Back to Spikerz Landing Social Page
  await page.goto('https://demo.spikerz.com/social-connect/youtube?scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.force-ssl+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.readonly&workspaceId=1&username=ellesse&platform=instagram&id=17841445325350983');
  await page.goto('https://demo.spikerz.com/social-connect/youtube?scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.force-ssl+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.readonly&workspaceId=1&username=ellesse&platform=instagram&id=17841445325350983');
  
  // Close browser after test
  await page.close();

});
