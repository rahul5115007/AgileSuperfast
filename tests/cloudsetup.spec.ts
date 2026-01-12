//Cloud setup
import { test, expect } from '@playwright/test';

test('Should create a cloud through Wizard only', async ({ page }) => {

  // Visit Login Page
  await page.goto('http://energy.yuktisolutions.com/Account/Login');

  // Login
  await page.fill('#UserName', 'rahul');
  await page.fill('#Password', 'Yspl2009@');
  await page.locator('input[type="submit"]').first().click();

  // Verify Dashboard Loaded
  await expect(page).toHaveURL(/Dashboard/);

  // Click Cloud Setup
  await page.getByRole('button', { name: 'Cloud Setup' }).click();

  // Click Cloud List
  await page.getByText('Cloud List').click();

  // Click Add New (Wizard)
  await page.getByText('Add New (Wizard)').click();

  // Fill Company Name
  await page.getByText('Company Name').fill('LensKart');

  // Fill Address
  await page.getByText('Address').fill('Janakpuri West New Delhi');

  // Select Country
  await page.getByText('Country').click();
  await page.getByRole('option', { name: 'India' }).click();

  // Contact Person
  await page.getByText('Contact Person').fill('Mahavish');

  // Zip / Postal Code
  await page.getByText('Zip/Postal Code').selectOption('110045');

});
