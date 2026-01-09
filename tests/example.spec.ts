import { test, expect } from '@playwright/test';

const loginScenarios = [
  {
    name: 'Valid login',
    username: 'rahul.joshi@yuktisolutions.com',
    password: 'Yspl2009@',
    rememberMe: true,
    expected: 'success',
  },
  {
    name: 'Invalid username',
    username: 'invalid@test.com',
    password: 'Valid@123',
    rememberMe: false,
    expected: 'error',
  },
  {
    name: 'Invalid password',
    username: 'validuser@test.com',
    password: 'Wrong@123',
    rememberMe: false,
    expected: 'error',
  },
  {
    name: 'Empty username and password',
    username: '',
    password: '',
    rememberMe: false,
    expected: 'validation',
  },
];

test.describe('PMS Login Scenarios', () => {

  for (const scenario of loginScenarios) {

    test(scenario.name, async ({ page }) => {
      await page.goto(
        'http://pms-staging.yuktisolutions.com/Identity/Account/Login?ReturnUrl=%2F'
      );

      if (scenario.username) {
        await page.fill('input[name="Input.Email"]', scenario.username);
      }

      if (scenario.password) {
        await page.fill('input[name="Input.Password"]', scenario.password);
      }

      if (scenario.rememberMe) {
        await page.check('input[name="Input.RememberMe"]');
      }

      await page.click('button[type="submit"]');

      if (scenario.expected === 'success') {
        await expect(page).not.toHaveURL(/Login/);
      }

      if (scenario.expected === 'error') {
        await expect(
          page.locator('.validation-summary-errors')
        ).toBeVisible();
      }

      if (scenario.expected === 'validation') {
        await expect(
          page.locator('input[name="Input.Email"]')
        ).toHaveAttribute('aria-invalid', 'true');
      }
    });

  }
});
