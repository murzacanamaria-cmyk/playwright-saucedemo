import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="checkout"]').click();
});

test('Happy path: complete checkout with valid details', async ({ page }) => {
  await page.locator('[data-test="firstName"]').fill('Ana');
  await page.locator('[data-test="lastName"]').fill('Test');
  await page.locator('[data-test="postalCode"]').fill('720001');
  await page.locator('[data-test="continue"]').click();

  await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Overview');
  await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText('Sauce Labs Backpack');

  await page.locator('[data-test="finish"]').click();
  await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
});

test('Negative: checkout without first name shows error', async ({ page }) => {
  await page.locator('[data-test="lastName"]').fill('Test');
  await page.locator('[data-test="postalCode"]').fill('720001');
  await page.locator('[data-test="continue"]').click();

  await expect(page.locator('[data-test="error"]')).toContainText('First Name is required');
});
