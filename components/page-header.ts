import { BasePage } from '../pages/base-page';
import { type Locator, type Page } from '@playwright/test';
import { LoginPage } from '../pages/login-page';

export class HeaderComponent extends BasePage {
  readonly getAccountMenuBtn: Locator;
  readonly getLoginBtn: Locator;
  readonly getLogoutBtn: Locator;
  readonly getSearchBtn: Locator;
  readonly getSearchInput: Locator;

  constructor(page: Page) {
    super(page);
    this.getAccountMenuBtn = page.locator('button#navbarAccount');
    this.getLoginBtn = page.locator('button#navbarLoginButton');
    this.getLogoutBtn = page.locator('button#navbarLogoutButton');
    this.getSearchBtn = page.locator('mat-icon.mat-search_icon-search');
    this.getSearchInput = page.locator('input#mat-input-1');
  }

  async navigateToLogin() : Promise<LoginPage> {
    await this.getAccountMenuBtn.click();
    await this.getLoginBtn.click();

    return new LoginPage(this.page);
  }

  async isUserLoggedIn() : Promise<boolean> {
    await this.getAccountMenuBtn.click();
    await this.getLogoutBtn.waitFor({ state: 'visible' });
    const isLoggedIn = await this.getLoginBtn.isHidden()
        && await this.getLogoutBtn.isVisible();
    
    return isLoggedIn;
  }

  async searchItem(itemName: string) {
    await this.getSearchBtn.click();
    await this.getSearchInput.fill(itemName);
    await this.getSearchInput.press('Enter');
  }
}