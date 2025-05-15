const Chance = require('chance');
const chance = new Chance();

import { test, expect } from '../api-fixtures/signu-up-fixture';

import { LoginPage } from '../pages/login-page';


test.describe('Test user log in flow', () => {

  test('user can login with existed valid credentials', async ({ signUpUser, browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    let userInfo = {
      email: chance.email({ domain: 'nazartest.com' }),
      password: chance.string({ length: 8 }),
      question: "Mother's maiden name?",
      answer: "sdet"
    }

    console.log(userInfo);

    await signUpUser(userInfo);

    let loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.closeWlcmBannerIfPresent();

    await expect(loginPage.getLogInBtn).toBeDisabled();

    let mainPage = await loginPage.loginUser(userInfo);

    expect(await mainPage.getHeaderComponent().isUserLoggedIn()).toBeTruthy();
    
  });
});
