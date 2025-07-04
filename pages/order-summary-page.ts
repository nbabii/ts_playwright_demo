import { BasePage, step } from '../base/base-page';
import { HeaderComponent } from '../components/page-header';
import { type Page } from '@playwright/test';


export class OrderSummaryPage extends BasePage {

  constructor(page: Page) {
    super(page);
  }

  getHeaderComponent() : HeaderComponent {
    return new HeaderComponent(this.page);
  }

  @step('Open order summary page')
  async open() {
    await this.page.goto('/#/order-summary');
  }
}