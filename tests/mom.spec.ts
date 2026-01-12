import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { MomPage } from '../pages/MomPage';
import { ExcelUtil } from '../utils/ExcelUtil';
import { MomData } from '../types/MomData';
import { readJson } from '../utils/TestDataUtil';

const loginData = readJson('testdata/login.json');
const testData = ExcelUtil.getData(
  'testdata/mom.xlsx',
  'CreateMOM'
) as MomData[];

for (const data of testData) {

  test(
    `@regression Create MOM | ${data.title}`,
    async ({ page }) => {

      test.skip(data.run !== 'Y', 'Row marked as NO');

      // Fail fast (best practice)
      if (!data.projectName || !data.title || !data.agenda) {
        throw new Error('Invalid Excel data row');
      }

      await page.goto('/');

      const login = new LoginPage(page);
      const mom = new MomPage(page);

      await login.login(loginData.email, loginData.password);

      await mom.createMom(
        data.projectName,
        data.title,
        data.agenda
      );

      
    }
  );
}

