import { test, expect } from '@playwright/test';

test('Create MOM flow', async ({ page }) => {

  // Open application
  await page.goto('http://pms-staging.yuktisolutions.com');

  // Login
  await page.locator('input[name="Input.Email"]').fill('rahul.joshi@yuktisolutions.com');
  await page.locator('input[name="Input.Password"]').fill('Yspl2009@');
  await page.locator('#login-submit').click();

  console.log('creating MOM through Create new MOM');
  console.log('Click on + Create icon');

  // Click on Create dropdown (2nd occurrence)
  await page.locator('(//a[@id="dropdownMenuButton1"])[2]').click();

  // Click on MOM option (with access handling)
  try {
    await page.locator('(//a[@onclick="project.Choose(\'meeting\');"])[1]').click();
  } catch {
    console.log('Current User does not have access to Minutes of Meetings');
    return;
  }

  // Select Project
  console.log('Selecting a project');
  await page.getByRole('heading', { name: 'Abhishek Sir Project Review' }).click();

  // Fill MOM
  console.log('Now filling MOM');

  // Rename Agenda (Title)
  await page.locator('#Title').fill('Selenium Agenda');
  await page.locator('#Title').press('Enter');

  // Input Agenda task
  await page.locator('#Name').fill('MOM Task One 1212122134');
  await page.locator('#Name').press('Enter');

  

});
