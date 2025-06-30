import { BasePage } from './base-page';
import { HeaderComponent } from '../components/page-header';
import { type Locator, type Page } from '@playwright/test';
import { MainShopPage } from './main-page';
import { SignupPage } from './signup-page';
import { UserInfo } from '../types/user.types';

export class LoginPage extends BasePage {
  readonly getRegisterBtn: Locator;
  readonly getEmailInput: Locator;
  readonly getPasswordInput: Locator;
  readonly getLogInBtn: Locator;
  readonly getErrorMsg: Locator;

  constructor(page: Page) {
    super(page);
    this.getRegisterBtn = page.locator('div#newCustomerLink');
    this.getEmailInput = page.locator('input#email');
    this.getPasswordInput = page.locator('input#password');
    this.getLogInBtn = page.locator('button#loginButton');
    this.getErrorMsg = page.locator('.error');
  }

  getHeaderComponent() : HeaderComponent {
    return new HeaderComponent(this.page);
  }

  async open() {
    await this.page.goto('/#/login');
    await this.closeWlcmBannerIfPresent();
  }

  async loginUser(userInfo: UserInfo) : Promise<MainShopPage> {
    await this.getEmailInput.fill(userInfo.email);
    await this.getPasswordInput.fill(userInfo.password);
    await this.getLogInBtn.click();

    return new MainShopPage(this.page);
  }

  async navigateToSignUp() : Promise<SignupPage> {
    await this.getRegisterBtn.click();

    return new SignupPage(this.page);
  }

  async getErrorMsgText() : Promise<string> {
    return await this.getErrorMsg.innerText();
  }
}