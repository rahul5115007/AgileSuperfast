import { test, expect } from '@playwright/test';

test('Should capture status code and headers for the visited page', async ({ page }) => {

  const url = 'http://energy.yuktisolutions.com/Account/Login';

  let statusCode: number | undefined;
  let responseHeaders: any;

  // Listen for the main page response
  page.on('response', async (response) => {
    if (response.url() === url) {
      statusCode = response.status();
      responseHeaders = response.headers();
    }
  });

  // Navigate to the page
  await page.goto(url);

  // Small wait to ensure response is captured
  await page.waitForLoadState('networkidle');

  // Print results
  console.log('---------- Response for:', url);
  console.log('---------- Status Code:', statusCode);
  console.log('---------- Headers:', responseHeaders);

  // Assertion (same as Cypress)
  expect(statusCode).toBe(200);

});