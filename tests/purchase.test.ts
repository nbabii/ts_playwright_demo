import Chance from 'chance';
const chance = new Chance();

import { test, expect } from '../api-fixtures/signup-fixture';

import { LoginPage } from '../pages/login-page';
import { PaymentCard, UserAddress, UserInfo } from '../types/user.types';
import { DeliveryType } from '../types/enums';


test.describe('E2E: User item purchase flow', () => {

  test('should allow user to add items to basket, and purchase', async ({ signUpUser, page }) => {
    const item1Name: string = 'Carrot Juice (1000ml)';
    const item2Name: string = 'Fruit Press';
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
    const cardInfo: PaymentCard = {
      name: chance.name(),
      number: chance.cc({ type: 'mc' }),
      expirationMonth: chance.integer({ min: 1, max: 12 }).toString(),
      expirationYear: chance.year({ min: 2080, max: 2090 }).toString()
    }

    await signUpUser(userInfo);

    const loginPage = new LoginPage(page);
    await loginPage.open();

    await expect(loginPage.getLogInBtn).toBeDisabled();

    const mainPage = await loginPage.loginUser(userInfo);
    await mainPage.getHeaderComponent().searchItem(item1Name);
    await mainPage.getProductItemComponent().addProductToBasket(item1Name);

    await expect(mainPage.getHeaderComponent().getBasketItemsCount).toHaveText('1');
    const item1Price: number = await mainPage.getProductItemComponent().getItemPrice(item1Name);

    await mainPage.getHeaderComponent().closeSearch();
    await mainPage.getHeaderComponent().searchItem(item2Name);
    await mainPage.getProductItemComponent().addProductToBasket(item2Name);

    await expect(mainPage.getHeaderComponent().getBasketItemsCount).toHaveText('2');
    const item2Price: number = await mainPage.getProductItemComponent().getItemPrice(item2Name);

    const basketPage = await mainPage.getHeaderComponent().navigateToBasket();

    await expect(basketPage.getBasketItem).toHaveCount(2);

    await expect(basketPage.getItemName(0)).toHaveText(item1Name);
    await expect(basketPage.getItemName(1)).toHaveText(item2Name);
    await expect(basketPage.getItemCount(0)).toHaveText('1');
    await expect(basketPage.getItemCount(1)).toHaveText('1');

    const selectAddressPage = await basketPage.proceedToCheckout();
    await selectAddressPage.addNewAddress(userAddress);

    const selectDeliveryPage = await selectAddressPage.selectAddressByNameAndContinue(userAddress.name);
    const paymentOptionsPage = await selectDeliveryPage.selectDeliveryByTypeAndContinue(DeliveryType.FAST);

    await paymentOptionsPage.addNewCard(cardInfo);
    const orderSummaryPage = await paymentOptionsPage.selectPaymentAndContinue(cardInfo.name);

    await expect(orderSummaryPage.getDeliveryInfoCard).toContainText(userAddress.address);
    await expect(orderSummaryPage.getDeliveryInfoCard).toContainText(userAddress.city);
    await expect(orderSummaryPage.getDeliveryInfoCard).toContainText(userAddress.state);
    await expect(orderSummaryPage.getDeliveryInfoCard).toContainText(userAddress.zip);
    await expect(orderSummaryPage.getDeliveryInfoCard).toContainText(userAddress.mobile);

    await expect(orderSummaryPage.getPaymentInfoCard).toContainText(cardInfo.name);
    await expect(orderSummaryPage.getPaymentInfoCard).toContainText(cardInfo.number.slice(-4));

    const itemsPrice: number = item1Price + item2Price;
    const totalPrice: number = itemsPrice + 0.50;
    await expect(orderSummaryPage.getItemsOrderSummaryCard).toHaveText(`${itemsPrice.toFixed(2)}¤`);
    await expect(orderSummaryPage.getDeliveryOrderSummaryCard).toHaveText("0.50¤");
    await expect(orderSummaryPage.getPromotionOrderSummaryCard).toHaveText("0.00¤");
    await expect(orderSummaryPage.getTotalPriceOrderSummaryCard).toHaveText(`${totalPrice.toFixed(2)}¤`);

    const orderCompletePage = await orderSummaryPage.completeOrder();

    await expect(orderCompletePage.getOrderCompleteMsg).toHaveText('Thank you for your purchase!');
  });
});
