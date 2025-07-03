import { BasePage } from '../base/base-page';
import { type Locator, type Page } from '@playwright/test';
import { UserInfo } from '../types/user.types';

export class SignupPage extends BasePage {
  readonly getEmailInput: Locator;
  readonly getPasswordInput: Locator;
  readonly getConfPasswordInput: Locator;
  readonly getQuestionDropdown: Locator;
  readonly getQuestionAnswerInput: Locator;
  readonly getRegisterButton: Locator;

  constructor(page: Page) {
    super(page);
    this.getEmailInput = page.locator('input#emailControl');
    this.getPasswordInput = page.locator('input#passwordControl');
    this.getConfPasswordInput = page.locator('input#repeatPasswordControl');
    this.getQuestionDropdown = page.locator('mat-select#mat-select-0');
    this.getQuestionAnswerInput = page.locator('input#securityAnswerControl');
    this.getRegisterButton = page.locator('button#registerButton');
  }

  async open() {
    await this.page.goto('/#/register');
  }

  async selectQuestion(value: string) {
    await this.getQuestionDropdown.waitFor({ state: 'visible' });
    await this.getQuestionDropdown.click();
    const option = this.page.getByText(value);
    await option.waitFor({ state: 'visible' });
    await option.click();

  }

  async registerUser(userInfo: UserInfo) {
    await this.getEmailInput.fill(userInfo.email);
    await this.getPasswordInput.fill(userInfo.password);
    await this.getConfPasswordInput.fill(userInfo.password);
    await this.selectQuestion(userInfo.question);
    await this.getQuestionAnswerInput.fill(userInfo.answer);
    await this.getRegisterButton.click();
  }
}