import { BasePage, step } from '../base/base-page';
import { HeaderComponent } from '../components/page-header';
import { type Page, type Locator } from '@playwright/test';
import { OrderCompletePage } from './order-complete-page';


export class OrderSummaryPage extends BasePage {
  readonly getDeliveryInfoCard: Locator;
  readonly getPaymentInfoCard: Locator;
  readonly getItemsOrderSummaryCard: Locator;
  readonly getDeliveryOrderSummaryCard: Locator;
  readonly getPromotionOrderSummaryCard: Locator;
  readonly getTotalPriceOrderSummaryCard: Locator;
  readonly getPlaceOrderBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.getDeliveryInfoCard = page.locator('div[fxlayoutgap] > mat-card').nth(0);
    this.getPaymentInfoCard = page.locator('div[fxlayoutgap] > mat-card').nth(1);
    this.getItemsOrderSummaryCard = page.locator('mat-card[fxflexfill] .mat-row td:nth-child(2)').nth(0);
    this.getDeliveryOrderSummaryCard = page.locator('mat-card[fxflexfill] .mat-row td:nth-child(2)').nth(1);
    this.getPromotionOrderSummaryCard = page.locator('mat-card[fxflexfill] .mat-row td:nth-child(2)').nth(2);
    this.getTotalPriceOrderSummaryCard = page.locator('mat-card[fxflexfill] .mat-row td:nth-child(2)').nth(3);
    this.getPlaceOrderBtn = page.getByRole('button', { name: 'Complete your purchase' });
  }

  getHeaderComponent() : HeaderComponent {
    return new HeaderComponent(this.page);
  }

  @step('Open order summary page')
  async open() {
    await this.page.goto('/#/order-summary');
  }

  @step('Complete the order')
  async completeOrder() : Promise<OrderCompletePage> {
    await this.getPlaceOrderBtn.click();

    return new OrderCompletePage(this.page);
  }
}
