import { BasePage } from '../base/base-page';
import { HeaderComponent } from '../components/page-header';
import { type Page, type Locator } from '@playwright/test';


export class OrderCompletePage extends BasePage {
  readonly getOrderCompleteMsg: Locator;

  constructor(page: Page) {
    super(page);
    this.getOrderCompleteMsg = page.locator('.order-completion-header h1');
  }

  getHeaderComponent() : HeaderComponent {
    return new HeaderComponent(this.page);
  }
}
