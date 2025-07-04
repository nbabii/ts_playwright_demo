import { BasePage, step } from '../base/base-page';
import { HeaderComponent } from '../components/page-header';
import { type Locator, type Page } from '@playwright/test';
import { UserAddress } from '../types/user.types';
import { SelectDeliveryPage } from './delivery-page';


export class SelectAddressPage extends BasePage {
  private getSelectAddressRadio: string = 'mat-row:has-text("NAME") mat-radio-button';
  readonly getAddNewAddressBtn: Locator;
  readonly getCountryInput: Locator;
  readonly getNameInput: Locator;
  readonly getMobileInput: Locator;
  readonly getZipCodeInput: Locator;
  readonly getAddressTextarea: Locator;
  readonly getCityInput: Locator;
  readonly getStateInput: Locator;
  readonly getSubmitButton: Locator;
  readonly getContinueButton: Locator;

  constructor(page: Page) {
    super(page);
    this.getAddNewAddressBtn = page.getByRole('button', { name: 'Add a New Address' });
    this.getCountryInput = page.locator('input#mat-input-4');
    this.getNameInput = page.locator('input#mat-input-5');
    this.getMobileInput = page.locator('input#mat-input-6');
    this.getZipCodeInput = page.locator('input#mat-input-7');
    this.getAddressTextarea = page.locator('textarea#address');
    this.getCityInput = page.locator('input#mat-input-9');
    this.getStateInput = page.locator('input#mat-input-10');
    this.getSubmitButton = page.locator('button#submitButton');
    this.getContinueButton = page.getByRole('button', { name: 'Proceed to payment selection' });
  }

  getHeaderComponent() : HeaderComponent {
    return new HeaderComponent(this.page);
  }

  @step('Open address selection page')
  async open() {
    await this.page.goto('/#/address/select');
  }

  @step('Add new address')
  async addNewAddress(address: UserAddress) {
    await this.getAddNewAddressBtn.click();
    await this.getCountryInput.fill(address.country);
    await this.getNameInput.fill(address.name);
    await this.getMobileInput.fill(address.mobile.toString());
    await this.getZipCodeInput.fill(address.zip);
    await this.getAddressTextarea.fill(address.address);
    await this.getCityInput.fill(address.city);
    await this.getStateInput.fill(address.state);
    await this.getSubmitButton.click();
  }

  @step('Select address by name and continue')
  async selectAddressByNameAndContinue(name: string): Promise<SelectDeliveryPage> {
    await this.page.locator(this.getSelectAddressRadio.replace('NAME', name)).click();
    await this.getContinueButton.click();

    return new SelectDeliveryPage(this.page);
  }
}