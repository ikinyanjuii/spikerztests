import { test } from '@playwright/test';
import { LoginPage } from '../src/pages/login.page';
import { SocialConnectPage } from '../src/pages/socialConnect.page';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

test.use({
  httpCredentials: {
    username: process.env.HTTP_USERNAME!,
    password: process.env.HTTP_PASSWORD!
  }
  });

test('connect to YouTube via social connect page', async ({ page }) => {
  const login = new LoginPage(page);
  const social = new SocialConnectPage(page);

  await login.open();
  await login.login(process.env.UI_USER!, process.env.UI_PASS!);
  await social.open();
  await social.assertLoaded();
  await social.connectToYoutube();
});
