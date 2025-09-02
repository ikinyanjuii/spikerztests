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
  //await page.goto('https://accounts.google.com/signin/oauth/v2/consentsummary?authuser=0&part=AJi8hAMolWjnuD40oF62d0e_70V3NpGOQo3nI7ysLMgbGhe_ccTyJYaCqJN6Qx0DtnnMlQ9aJV2jFUwaV5KnJ6_u6hO3ucN6sra2ydqtusmeABARWhrZz8M656Okf4XZ1clQtbSc1652sLT6Q8F0DUN3OGUA3FBf9Wm9lvA8VCJoUXtKhmy1euoWucMVHAo-2NiULwrliW8CS33EqKZPk3q6JJgl7O7M9dwPX2G-jJ4lljOZaBmyI4iKlSEFCNZ7iTxbPqlMcn41ILsQS4ZoyHgvxmOWKbkXS85nEpBOFJKKf_4bXRU3QeVQpBWV0IZV2JWiXtHtlSzFQmn3R-uDQivkCLnPYzIhfSTZO_DHYeiv-40WK7mm_rjNcCtM6KeQfh3XmKnRQFnSM2NiKGbIFzYt3IvdAUNV0IcLZhsUGs0aFZWZ460YN6lmjTQqqgyHExRVYsvCkwQyoNodSLtLJz4csc0nMk82_w&flowName=GeneralOAuthFlow&hl=en-GB&as=S-586934589%3A1756748160671316&client_id=663572898128-k2e78ptrsk3b2k9knvpvnppaoqbdsufe.apps.googleusercontent.com&rapt=AEjHL4PWQxZLqkFXkqy0jQcYh6Y49ay1AqmtriDzdSXqYykLbSnb391n2-WSSrKk115qnixU0z2V41hirqh0b7iYBVf-FZu0e6ePLRpQu8GUIWQM1Qmg1iE&pageId=none');
  await page.getByRole('checkbox', { name: 'Select all' }).check();
  //Check Select All 
  await page.getByRole('button', { name: 'Continue' }).click();
  //Back to landing
  await page.goto('https://demo.spikerz.com/social-connect/youtube?scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.force-ssl+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.readonly&workspaceId=1&username=ellesse&platform=instagram&id=17841445325350983');
  await page.goto('https://demo.spikerz.com/social-connect/youtube?scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.force-ssl+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.readonly&workspaceId=1&username=ellesse&platform=instagram&id=17841445325350983');
  // Close browser after test
  await page.close();
});
