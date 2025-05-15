import { type Locator, type Page } from '@playwright/test';

export abstract class BasePage {
  protected readonly page: Page;
  protected readonly getCloseBannerBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getCloseBannerBtn = page.getByLabel('Close Welcome Banner');
  }

  async closeWlcmBannerIfPresent() {
    try {
      await this.getCloseBannerBtn.waitFor({ state: 'visible', timeout: 3000 });
    } catch (e) {}
    if (await this.getCloseBannerBtn.isVisible()) {
      await this.getCloseBannerBtn.click();
    }
  }
}