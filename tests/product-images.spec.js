import { test, expect } from '@playwright/test';

for (const user of ['standard_user', 'problem_user']) {
  test(`Product image matches product name (${user})`, async ({ page }) => {
    // Known bug: problem_user sees a placeholder image (sl-404) instead of the product photo
    test.fail(user === 'problem_user', 'Known bug: wrong product images for problem_user');

    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill(user);
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(/inventory/);

    const backpackImage = page.locator('img[alt="Sauce Labs Backpack"]');
    await expect(backpackImage).toHaveAttribute('src', /backpack/);
  });
}
