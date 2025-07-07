import Chance from 'chance';
const chance = new Chance();

import { test, expect } from '../api-fixtures/signup-fixture';

import { LoginPage } from '../pages/login-page';


test.describe('E2E: User log in flow', () => {

  test('should allow user to login with existed valid credentials', async ({ signUpUser, page }) => {
    const userInfo = {
      email: chance.email({ domain: 'nazartest.com' }),
      password: chance.string({ length: 8 }),
      question: "Mother's maiden name?",
      answer: "sdet"
    }

    await signUpUser(userInfo);

    const loginPage = new LoginPage(page);
    await loginPage.open();

    await expect(loginPage.getLogInBtn).toBeDisabled();

    const mainPage = await loginPage.loginUser(userInfo);

    expect(await mainPage.getHeaderComponent().isUserLoggedIn()).toBeTruthy();

  });

  test('should NOT allow user to login with incorrect credentials',
    { tag: '@negative' },
    async ({ signUpUser, page }) => {

      const userInfo = {
        email: chance.email({ domain: 'nazartest.com' }),
        password: chance.string({ length: 8 }),
        question: "Mother's maiden name?",
        answer: "sdet"
      }

      await signUpUser(userInfo);

      const loginPage = new LoginPage(page);
      await loginPage.open();

      userInfo.password += '1';

      await loginPage.loginUser(userInfo);

      expect(await loginPage.getErrorMsgText(), "Login error message should be visible").toContain('Invalid email or password');
  });
});
