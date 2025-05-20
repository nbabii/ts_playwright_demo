import Chance from 'chance';
const chance = new Chance();

import { test, expect } from '../api-fixtures/signu-up-fixture';

import { LoginPage } from '../pages/login-page';


test.describe('Test item purchase flow', () => {

  test('user select available item, add it to basket and purchase', async ({ signUpUser, browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    const userInfo = {
      email: chance.email({ domain: 'nazartest.com' }),
      password: chance.string({ length: 8 }),
      question: "Mother's maiden name?",
      answer: "sdet"
    }

    const itemName = 'Carrot Juice';

    await signUpUser(userInfo);

    const loginPage = new LoginPage(page);
    await loginPage.open();

    await expect(loginPage.getLogInBtn).toBeDisabled();

    const mainPage = await loginPage.loginUser(userInfo);

    await mainPage.getHeaderComponent().searchItem(itemName);

    await mainPage.getProductItemComponent().addProductToBasket(itemName);
    
    // TODO open basket and proceed to checkout
  });
});
