import { type Locator, type Page } from '@playwright/test';
import { test } from './base-fixtures';

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

export function step(stepName?: string) {
  return function decorator(target: Function, context: ClassMethodDecoratorContext) {
    return function replacementMethod(this: any, ...args: any) {
      const name = `${stepName || (context.name as string)} (${this.constructor.name})`
      return test.step(name, async () => {
        return await target.call(this, ...args)
      })
    }
  }
}