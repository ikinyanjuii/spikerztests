import { BasePage } from './base.page';
import { Page, expect } from '@playwright/test';

export class SocialConnectPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open() {
    await this.goto('https://demo.spikerz.com/social-connect/');
  }

  async connectToYoutube() {
    await this.page.getByRole('button', { name: /youtube/i }).click();
  }

  async assertLoaded() {
    await expect(this.page.getByTestId('social-connect-header')).toBeVisible();
  }
}
