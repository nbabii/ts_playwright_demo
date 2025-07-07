import { BasePage, step } from '../base/base-page';
import { type Locator, type Page } from '@playwright/test';

export class ProductItemComponent extends BasePage {
  private getProductPriceLocator: string = '.item-price';
  readonly baseElement: Locator;

  constructor(page: Page) {
    super(page);
    this.baseElement = page.locator('div.mat-grid-tile-content');
  }

  private getProductItemByName(productName: string): Locator {
    return this.baseElement.filter({ hasText: productName });
  }

  @step('Get product item by name')
  async addProductToBasket(productName: string): Promise<void> {
    const productItem = this.getProductItemByName(productName);
    await productItem.waitFor({ state: 'visible' });
    await productItem.getByRole('button', { name: 'Add to Basket' }).click();
  }

  @step('Get product price')
  async getItemPrice(productName: string): Promise<number> {
    const productItem = this.getProductItemByName(productName);
    await productItem.waitFor({ state: 'visible' });
  const priceText = await productItem.locator(this.getProductPriceLocator).textContent();
  const numericPrice = parseFloat(priceText?.replace(/[^\d.]/g, '') || '0');
  
  return numericPrice;
  }
}