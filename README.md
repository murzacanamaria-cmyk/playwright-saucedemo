# Playwright Tests – Sauce Demo

![Playwright Tests](https://github.com/murzacanamaria-cmyk/playwright-saucedemo/actions/workflows/playwright.yml/badge.svg)

Automated UI tests for [Sauce Demo](https://www.saucedemo.com), a demo e-commerce site, written with **Playwright** and run automatically with **GitHub Actions** on every push.

## What is tested

| Test | Type | Expected result |
|---|---|---|
| Login and add backpack to cart | Happy path | User lands on the products page, cart badge shows 1, cart contains "Sauce Labs Backpack" |
| Wrong password | Negative | Error: "Username and password do not match" |
| Empty username | Negative | Error: "Username is required" |
| Locked out user | Negative | Error: user is locked out |

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
- Debugging a false positive caused by checking the page before it finished loading (flaky test)
- Running tests automatically in a CI/CD pipeline
