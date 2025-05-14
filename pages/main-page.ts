import { BasePage } from './base-page';
import { type Locator, type Page } from '@playwright/test';

export class MainShopPage extends BasePage {
  readonly getLoginMenuBtn: Locator;
  readonly getLoginBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.getLoginMenuBtn = page.locator('#navbarAccount');
    this.getLoginBtn = page.locator('#navbarLoginButton');

  }

  async open() {
    await this.page.goto('/');
  }

  async navigateToLogin() : Promise<Page> {
    await this.getLoginMenuBtn.click();
    await this.getLoginBtn.click();

    return this.page;
  }
}