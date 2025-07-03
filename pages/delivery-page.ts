import { BasePage } from '../base/base-page';
import { HeaderComponent } from '../components/page-header';
import { type Locator, type Page } from '@playwright/test';
import { PaymentOptionsPage } from './payment-page';
import { step } from '../base/base-fixtures';


export class SelectDeliveryPage extends BasePage {
  private getSelectDeliveryRadio: string = 'mat-row:has-text("DELIVERY") mat-radio-button';
  readonly getContinueButton: Locator;

  constructor(page: Page) {
    super(page);
    this.getContinueButton = page.getByRole('button', { name: 'Proceed to delivery method selection' });
  }

  getHeaderComponent() : HeaderComponent {
    return new HeaderComponent(this.page);
  }

  @step('Open delivery method page')
  async open() {
    await this.page.goto('/#/delivery-method');
  }

  @step('Select delivery by type and continue')
  async selectDeliveryByTypeAndContinue(type: string): Promise<PaymentOptionsPage> {
    await this.page.locator(this.getSelectDeliveryRadio.replace('DELIVERY', type)).click();
    await this.getContinueButton.click();

    return new PaymentOptionsPage(this.page);
  }
}