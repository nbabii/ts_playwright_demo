import { BasePage, step } from '../base/base-page';
import { HeaderComponent } from '../components/page-header';
import { type Locator, type Page } from '@playwright/test';
import { PaymentCard } from '../types/user.types';
import { OrderSummaryPage } from './order-summary-page';


export class PaymentOptionsPage extends BasePage {
  private getSelectPaymentRadio: string = 'mat-row:has-text("PAYMENT") mat-radio-button';
  readonly getAddCardButton: Locator;
  readonly getCardNameInput: Locator;
  readonly getCardNumberInput: Locator;
  readonly getCardExpMonthSelect: Locator;
  readonly getCardExpYearSelect: Locator;
  readonly getSubmitButton: Locator
  readonly getContinueButton: Locator

  constructor(page: Page) {
    super(page);
    this.getAddCardButton = page.getByRole('button', { name: 'Add a credit or debit card' });
    this.getCardNameInput = page.getByRole('textbox', { name: 'Name' });
    this.getCardNumberInput = page.getByRole('spinbutton', { name: 'Card Number' });
    this.getCardExpMonthSelect = page.getByLabel('Expiry Month');
    this.getCardExpYearSelect = page.getByLabel('Expiry Year');
    this.getSubmitButton = page.getByRole('button', { name: 'Submit' });
    this.getContinueButton = page.getByRole('button', { name: 'Proceed to review' });
  }

  getHeaderComponent() : HeaderComponent {
    return new HeaderComponent(this.page);
  }

  @step('Open payment options page')
  async open() {
    await this.page.goto('/#/payment/shop');
  }

  @step('Add new payment card')
  async addNewCard(cardInfo: PaymentCard) {
    await this.getAddCardButton.click();
    await this.getCardNameInput.fill(cardInfo.name);
    await this.getCardNumberInput.fill(cardInfo.number);
    await this.getCardExpMonthSelect.selectOption(cardInfo.expirationMonth);
    await this.getCardExpYearSelect.selectOption(cardInfo.expirationYear);
    await this.getSubmitButton.click();
  }

  @step('Select payment method and continue')
  async selectPaymentAndContinue(name: string): Promise<OrderSummaryPage> {
    await this.page.locator(this.getSelectPaymentRadio.replace('PAYMENT', name)).click();
    await this.getContinueButton.click();

    return new PaymentOptionsPage(this.page);
  }
}