import { step } from '../base/base-fixtures';
import { BasePage } from '../base/base-page';
import { type Locator, type Page } from '@playwright/test';

export class ProductItemComponent extends BasePage {
  readonly baseElement: Locator;

  constructor(page: Page) {
    super(page);
    this.baseElement = page.locator('div.mat-grid-tile-content');
  }

  @step('Get product item by name')
  async addProductToBasket(productName: string): Promise<void> {
    const productItem = this.baseElement
      .filter({ hasText: productName });

    await productItem.waitFor({ state: 'visible' });

    await productItem.getByRole('button', { name: 'Add to Basket' }).click();
  }
}