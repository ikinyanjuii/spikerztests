import { Page } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {}

  async goto(path: string) {
    await this.page.goto(path);
  }

  async clickTestId(id: string) {
    await this.page.getByTestId(id).click();
  }

  async typeTestId(id: string, value: string) {
    await this.page.getByTestId(id).fill(value);
  }
}
