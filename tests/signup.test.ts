const Chance = require('chance');
const chance = new Chance();

import { test, expect } from '@playwright/test';
import { MainShopPage } from '../pages/main-page';
import { LoginPage } from '../pages/login-page';
import { SignupPage } from '../pages/signup-page';

test.describe('Test user sign_up flow', () => {

  test('main page opened and user can navigate to sign up', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    let mainPage = new MainShopPage(page);
    await mainPage.open();
    await mainPage.closeWlcmBannerIfPresent();

    let loginPage = new LoginPage(await mainPage.navigateToLogin());
    let signupPage = new SignupPage(await loginPage.navigateToSignUp());

    await expect(signupPage.getEmailInput).toBeEnabled();

    expect(await page.screenshot()).toMatchSnapshot('signupPage.png', {
      maxDiffPixelRatio: 0.01,
    });
  });

  test('user can fill signup form with correct data and register', async ({ page }) => {
    let signupPage = new SignupPage(page);

    let userInfo = {
      email: chance.email({ domain: 'nazartest.com' }),
      password: chance.string({ length: 8 }),
      question: "Mother's maiden name?",
      answer: "sdet"
    }

    await signupPage.open();
    await signupPage.closeWlcmBannerIfPresent();
    await signupPage.registerUser(userInfo);

    await expect(page.getByText('Registration completed successfully. You can now log in.')).toBeInViewport();

    expect(await page.screenshot()).toMatchSnapshot('registrationCompleted.png', {
      maxDiffPixelRatio: 0.01,
    });
  });
});
