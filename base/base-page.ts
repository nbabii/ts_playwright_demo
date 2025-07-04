import { type Locator, type Page } from '@playwright/test';
import { step } from './base-fixtures';

export abstract class BasePage {
  protected readonly page: Page;
  protected readonly getCloseBannerBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getCloseBannerBtn = page.getByLabel('Close Welcome Banner');
  }

  @step('Close welcome banner if present')
  async closeWlcmBannerIfPresent() {
    try {
      await this.getCloseBannerBtn.waitFor({ state: 'visible', timeout: 3000 });
    } catch {
      // Ignore if banner is not present
    }
    if (await this.getCloseBannerBtn.isVisible()) {
      await this.getCloseBannerBtn.click();
    }
  }
}