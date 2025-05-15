const Chance = require('chance');
const chance = new Chance();

import { test, expect } from '../api-fixtures/signu-up-fixture';

import { LoginPage } from '../pages/login-page';


test.describe('Test user log in flow', () => {

  test.only('main page opened and user can navigate to sign up', async ({ signUpUser, browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    let userInfo = {
      email: chance.email({ domain: 'nazartest.com' }),
      password: chance.string({ length: 8 }),
      question: "Mother's maiden name?",
      answer: "sdet"
    }

    const user = await signUpUser(userInfo);

    let loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.closeWlcmBannerIfPresent();
    
    await page.waitForTimeout(5000)
  });
});
