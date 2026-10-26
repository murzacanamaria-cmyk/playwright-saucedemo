# Playwright Tests – Sauce Demo

![Playwright Tests](https://github.com/murzacanamaria-cmyk/playwright-saucedemo/actions/workflows/playwright.yml/badge.svg)

Automated UI tests for [Sauce Demo](https://www.saucedemo.com), a demo e-commerce site, written with **Playwright** and run automatically with **GitHub Actions** on every push.

## What is tested

| Area | Test | Type | Expected result |
|---|---|---|---|
| Login | Login and add backpack to cart | Happy path | Products page opens, cart badge shows 1, cart contains "Sauce Labs Backpack" |
| Login | Wrong password | Negative | Error: "Username and password do not match" |
| Login | Empty username | Negative | Error: "Username is required" |
| Login | Locked out user | Negative | Error: user is locked out |
| Checkout | Complete checkout with valid details | Happy path | Overview shows the product, order ends with "Thank you for your order!" |
| Checkout | Checkout without first name | Negative | Error: "First Name is required" |
| Products | Product image matches product name (standard_user) | Happy path | Backpack image is the real product photo |
| Products | Product image matches product name (problem_user) | Known bug | Placeholder image shown; marked with `test.fail` so the pipeline stays green |

## Known bugs found
- **problem_user sees wrong product images** – the app shows a placeholder image (`sl-404`) instead of the product photo. Detected automatically and tracked as a known bug with `test.fail`.

## Tech stack
- Playwright (JavaScript)
- Node.js
- GitHub Actions (CI/CD) – tests run on Chromium, Firefox and WebKit

## How to run locally
```bash
npm install
npx playwright install
npx playwright test
npx playwright show-report
```

## What I learned
- Recording tests with Playwright codegen and adding assertions (`expect`)
- Reusing common steps with `test.beforeEach` (the shared "Given")
- Debugging a false positive caused by checking the page before it finished loading (flaky test)
- Detecting a real bug and handling it as a known bug in the pipeline
- Running tests automatically in a CI/CD pipeline
