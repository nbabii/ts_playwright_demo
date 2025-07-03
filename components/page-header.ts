import { BasePage } from '../base/base-page';
import { type Locator, type Page } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { BasketPage } from '../pages/basket-page';
import { step } from '../base/base-fixtures';

export class HeaderComponent extends BasePage {
  readonly getAccountMenuBtn: Locator;
  readonly getLoginBtn: Locator;
  readonly getLogoutBtn: Locator;
  readonly getSearchBtn: Locator;
  readonly getSearchInput: Locator;
  readonly getCloseSearch: Locator;
  readonly getBasketBtn: Locator;
  readonly getBasketItemsCount: Locator;

  constructor(page: Page) {
    super(page);
    this.getAccountMenuBtn = page.locator('button#navbarAccount');
    this.getLoginBtn = page.locator('button#navbarLoginButton');
    this.getLogoutBtn = page.locator('button#navbarLogoutButton');
    this.getSearchBtn = page.locator('mat-icon.mat-search_icon-search');
    this.getSearchInput = page.locator('input#mat-input-1');
    this.getCloseSearch = page.locator('app-mat-search-bar .mat-search_icon-close');
    this.getBasketBtn = page.locator('button[routerlink="/basket"]');
    this.getBasketItemsCount = this.getBasketBtn.locator('span.warn-notification');
  }

  @step('Navigate to login page from header')
  async navigateToLogin() : Promise<LoginPage> {
    await this.getAccountMenuBtn.click();
    await this.getLoginBtn.click();

    return new LoginPage(this.page);
  }

  @step('Check if user is logged in from header')
  async isUserLoggedIn() : Promise<boolean> {
    await this.getAccountMenuBtn.click();
    await this.getLogoutBtn.waitFor({ state: 'visible' });
    const isLoggedIn = await this.getLoginBtn.isHidden()
        && await this.getLogoutBtn.isVisible();
    
    return isLoggedIn;
  }

  @step('Search for item from header')
  async searchItem(itemName: string) {
    await this.getSearchBtn.click();
    await this.getSearchInput.fill(itemName);
    await this.getSearchInput.press('Enter');
  }

  @step('Close search bar from header')
  async closeSearch() {
    await this.getCloseSearch.click();
    await this.getSearchBtn.waitFor({ state: 'visible', timeout: 2000 });
  }

  @step('Navigate to basket from header')
  async navigateToBasket() : Promise<BasketPage> {
    await this.getBasketBtn.click();
    
    return new BasketPage(this.page);
  }
}