import { BasePage } from './base-page';
import { HeaderComponent } from '../components/page-header';
import { SelectAddressPage } from './address-page';
import { type Locator, type Page } from '@playwright/test';


export class BasketPage extends BasePage {
  private getBasketItemNameLocator: string = 'mat-cell.cdk-column-product';
  private getBasketItemCountLocator: string = 'mat-cell.mat-column-quantity>span';
  readonly getBasketItem: Locator;
  readonly getCheckoutBtn: Locator;


  constructor(page: Page) {
    super(page);
    this.getBasketItem = page.locator('mat-row.cdk-row');
    this.getCheckoutBtn = page.locator('button#checkoutButton');
  }

  getHeaderComponent() : HeaderComponent {
    return new HeaderComponent(this.page);
  }

  getItemName(index: number) : Locator {
    return this.getBasketItem.nth(index).locator(this.getBasketItemNameLocator);
  }

  getItemCount(index: number) : Locator {
    return this.getBasketItem.nth(index).locator(this.getBasketItemCountLocator);
  }

  async open() {
    await this.page.goto('/#/basket');
  }

  async proceedToCheckout() : Promise<SelectAddressPage> {
    await this.getCheckoutBtn.click();

    return new SelectAddressPage(this.page);
  }
}