import { BasePage, step } from '../base/base-page';
import { HeaderComponent } from '../components/page-header';
import { ProductItemComponent } from '../components/product-item-box';
import { type Page } from '@playwright/test';


export class MainShopPage extends BasePage {

  constructor(page: Page) {
    super(page);
  }

  getHeaderComponent() : HeaderComponent {
    return new HeaderComponent(this.page);
  }

  getProductItemComponent() : ProductItemComponent {
    return new ProductItemComponent(this.page);
  }

  @step('Open main shop page')
  async open() {
    await this.page.goto('/');
  }

}