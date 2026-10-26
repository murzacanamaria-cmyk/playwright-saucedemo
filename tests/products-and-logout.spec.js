import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await expect(page).toHaveURL(/inventory/);
});

test('Sort products by price: low to high', async ({ page }) => {
  await page.locator('[data-test="product-sort-container"]').selectOption('lohi');

  const priceTexts = await page.locator('[data-test="inventory-item-price"]').allTextContents();
  const prices = priceTexts.map(text => parseFloat(text.replace('$', '')));
  const sortedPrices = [...prices].sort((a, b) => a - b);

  expect(prices).toEqual(sortedPrices);
});

test('Logout returns user to the login page', async ({ page }) => {
  await page.locator('#react-burger-menu-btn').click();
  await page.locator('[data-test="logout-sidebar-link"]').click();

  await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  await expect(page).not.toHaveURL(/inventory/);
});
