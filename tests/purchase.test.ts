import Chance from 'chance';
const chance = new Chance();

import { test, expect } from '../api-fixtures/signup-fixture';

import { LoginPage } from '../pages/login-page';
import { UserAddress, UserInfo } from '../types/user.types';
import { DeliveryType } from '../types/enums';


test.describe('E2E: User item purchase flow', () => {

  test('should allow user to add items to basket, and purchase', async ({ signUpUser, page }) => {
    const userInfo: UserInfo = {
      email: chance.email({ domain: 'nazartest.com' }),
      password: chance.string({ length: 8 }),
      question: "Mother's maiden name?",
      answer: "sdet"
    }

    const userAddress: UserAddress = {
      country: 'USA',
      name: chance.name(),
      mobile: chance.phone({ country: "us", formatted: false }),
      zip: chance.zip(),
      address: chance.address(),
      city: chance.city(),
      state: chance.state()
    }

    const item1Name = 'Carrot Juice (1000ml)';
    const item2Name = 'Fruit Press';

    await signUpUser(userInfo);

    const loginPage = new LoginPage(page);
    await loginPage.open();

    await expect(loginPage.getLogInBtn).toBeDisabled();

    const mainPage = await loginPage.loginUser(userInfo);
    await mainPage.getHeaderComponent().searchItem(item1Name);
    await mainPage.getProductItemComponent().addProductToBasket(item1Name);

    await expect(mainPage.getHeaderComponent().getBasketItemsCount).toHaveText('1');

    await mainPage.getHeaderComponent().closeSearch();
    await mainPage.getHeaderComponent().searchItem(item2Name);
    await mainPage.getProductItemComponent().addProductToBasket(item2Name);

    await expect(mainPage.getHeaderComponent().getBasketItemsCount).toHaveText('2');
    
    const basketPage = await mainPage.getHeaderComponent().navigateToBasket();

    await expect(basketPage.getBasketItem).toHaveCount(2);

    await expect(basketPage.getItemName(0)).toHaveText(item1Name);
    await expect(basketPage.getItemName(1)).toHaveText(item2Name);
    await expect(basketPage.getItemCount(0)).toHaveText('1');
    await expect(basketPage.getItemCount(1)).toHaveText('1');

    const selectAddressPage = await basketPage.proceedToCheckout();
    await selectAddressPage.addNewAddress(userAddress);
    
    const selectDeliveryPage = await selectAddressPage.selectAddressByNameAndContinue(userAddress.name);
    await selectDeliveryPage.selectDeliveryByTypeAndContinue(DeliveryType.FAST);
    // TODO payment selection, page is not implemented yet
  });
});
