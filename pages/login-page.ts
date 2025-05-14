import { BasePage } from './base-page';
import { type Locator, type Page } from '@playwright/test';

export class LoginPage extends BasePage {
  readonly getRegisterBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.getRegisterBtn = page.locator('div#newCustomerLink');
  }

  async open() {
    await this.page.goto('/#/login');
  }

  async navigateToSignUp() : Promise<Page> {
    await this.getRegisterBtn.click();

    return this.page;
  }
}