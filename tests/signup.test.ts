import Chance from 'chance';
const chance = new Chance();

import { test, expect } from '@playwright/test';
import { MainShopPage } from '../pages/main-page';
import { SignupPage } from '../pages/signup-page';

test.describe('Test user sign_up flow', () => {

  test('main page opened and user can navigate to sign up', async ({ page }) => {
    const mainPage = new MainShopPage(page);
    await mainPage.open();
    await mainPage.closeWlcmBannerIfPresent();

    const loginPage = await mainPage.getHeaderComponent().navigateToLogin();
    const signupPage = await loginPage.navigateToSignUp();

    await expect(signupPage.getEmailInput).toBeEnabled();

    await expect(page).toHaveScreenshot('signupPage.png', {
      maxDiffPixelRatio: 0.07,
      timeout: 5000
    });
  });

  test('user can fill signup form with correct data and register', async ({ page }) => {
    const signupPage = new SignupPage(page);

    const userInfo = {
      email: chance.email({ domain: 'nazartest.com' }),
      password: chance.string({ length: 8 }),
      question: "Mother's maiden name?",
      answer: "sdet"
    }

    await signupPage.open();
    await signupPage.closeWlcmBannerIfPresent();
    await signupPage.registerUser(userInfo);

    await expect(page.getByText('Registration completed successfully. You can now log in.')).toBeInViewport();

    await expect(page).toHaveScreenshot('registrationCompleted.png', {
      maxDiffPixelRatio: 0.07,
      timeout: 5000
    });
  });
});
