import { BasePage } from '../base/base-page';
import { type Locator, type Page } from '@playwright/test';
import { UserInfo } from '../types/user.types';
import { step } from '../base/base-fixtures';

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

  @step('Open signup page')
  async open() {
    await this.page.goto('/#/register');
  }

  @step('Select security question')
  async selectQuestion(value: string) {
    await this.getQuestionDropdown.waitFor({ state: 'visible' });
    await this.getQuestionDropdown.click();
    const option = this.page.getByText(value);
    await option.waitFor({ state: 'visible' });
    await option.click();
  }

  @step('Register user')
  async registerUser(userInfo: UserInfo) {
    await this.getEmailInput.fill(userInfo.email);
    await this.getPasswordInput.fill(userInfo.password);
    await this.getConfPasswordInput.fill(userInfo.password);
    await this.selectQuestion(userInfo.question);
    await this.getQuestionAnswerInput.fill(userInfo.answer);
    await this.getRegisterButton.click();
  }
}