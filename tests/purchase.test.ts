import Chance from 'chance';
const chance = new Chance();

import { test, expect } from '../api-fixtures/signu-up-fixture';

import { LoginPage } from '../pages/login-page';
import { UserInfo } from '../types/user.types';


test.describe('E2E: User item purchase flow', () => {

  test('should allow user to add items to basket, and purchase', async ({ signUpUser, browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    const userInfo: UserInfo = {
      email: chance.email({ domain: 'nazartest.com' }),
      password: chance.string({ length: 8 }),
      question: "Mother's maiden name?",
      answer: "sdet"
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

    await basketPage.proceedToCheckout();
    // TODO address and checkout
  });
});
