import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  protected locator(selector?: string): Locator {
  if (!selector) {
    throw new Error('Locator selector is undefined. Check your locators file.');
  }
  return this.page.locator(selector);
}


  async click(selector: string) {
    const element = this.locator(selector);
    await expect(element).toBeVisible();
    await element.click();
  }

  async fill(selector: string, value: string) {
    const element = this.locator(selector);
    await expect(element).toBeVisible();
    await element.fill(value);
  }

  async press(selector: string, key: string) {
    const element = this.locator(selector);
    await expect(element).toBeVisible();
    await element.press(key);
  }

  async isVisible(selector: string): Promise<boolean> {
    return await this.locator(selector).isVisible();
  }

  async getText(selector: string): Promise<string> {
    return await this.locator(selector).innerText();
  }
}
