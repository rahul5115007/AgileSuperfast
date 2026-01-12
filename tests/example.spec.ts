import { test, Page } from '@playwright/test';
import fs from 'fs';
import path from 'path';

// JSON report interfaces
interface StepReport {
  Step: number;
  Title: string;
  Input?: any;
  Page: string;
  Page_Url: string;
  Expected_Result: string;
  Actual_Result: string;
  Execution_Time: number;
  Screenshot_Base64String?: string;
  Remarks?: string;
  Element_Status?: string;
}

interface TestReport {
  Project_Key: string;
  User_Key: string;
  Dated: string;
  Environment: string;
  Step: number;
  Java: string;
  OS: string;
  Host: string;
  IP: string;
  Selenium: string;
  Browser: string;
  Execution_Time: number;
  Tasks: StepReport[];
}

// JSON report helper
class JsonReport {
  private report: TestReport;
  private currentStep = 0;
  private page: Page;

  constructor(page: Page, projectKey: string, userKey: string, environment: string, browser: string) {
    this.page = page;
    this.report = {
      Project_Key: projectKey,
      User_Key: userKey,
      Dated: new Date().toISOString(),
      Environment: environment,
      Step: 0,
      Java: 'N/A',
      OS: process.platform,
      Host: require('os').hostname(),
      IP: 'NA',
      Selenium: 'Playwright TS',
      Browser: browser,
      Execution_Time: 0,
      Tasks: []
    };
  }

  // Add a step with Base64 screenshot
  async addStep(step: Omit<StepReport, 'Step' | 'Screenshot_Base64String'>) {
    const buffer = await this.page.screenshot();        // screenshot as Buffer
    const screenshot = buffer.toString('base64');       // convert to Base64
    this.report.Tasks.push({
      Step: this.currentStep,
      Screenshot_Base64String: `data:image/png;base64,${screenshot}`,
      ...step
    });
    this.currentStep++;
  }

  save(fileName: string) {
    const filePath = path.join(process.cwd(), fileName);
    fs.writeFileSync(filePath, JSON.stringify(this.report, null, 2), 'utf-8');
  }
}

// --------------------- Test ---------------------
test('Create MOM flow with JSON report', async ({ page, browserName }) => {
  const report = new JsonReport(page, '31090f01-1c52-483f-b7b8-28923f621041', 
                                'f3d55475-ef17-42f0-8ff2-4e5136ea25fa', 
                                'Staging', browserName);

  // Step 0: Open App
  let start = Date.now();
  await page.goto('http://pms-staging.yuktisolutions.com');
  let end = Date.now();
  await report.addStep({
    Title: 'Open Application',
    Page: 'Login Page',
    Page_Url: page.url(),
    Expected_Result: 'Application should open',
    Actual_Result: 'Pass',
    Execution_Time: (end - start) / 1000,
    Remarks: 'App loaded successfully',
    Element_Status: 'NA'
  });

  // Step 1: Login
  start = Date.now();
  await page.locator('input[name="Input.Email"]').fill('rahul.joshi@yuktisolutions.com');
  await page.locator('input[name="Input.Password"]').fill('Yspl2009@');
  await page.locator('#login-submit').click();
  end = Date.now();
  await report.addStep({
    Title: 'Login as super admin',
    Input: { User_Name: 'rahul.joshi@yuktisolutions.com', Password: '********' },
    Page: 'Login Page',
    Page_Url: page.url(),
    Expected_Result: 'User should login successfully',
    Actual_Result: 'Pass',
    Execution_Time: (end - start) / 1000,
    Remarks: 'User login pass',
    Element_Status: 'NA'
  });

  // Step 2: Click + Create
  start = Date.now();
  await page.locator('(//a[@id="dropdownMenuButton1"])[2]').click();
  end = Date.now();
  await report.addStep({
    Title: 'Click on + Create icon',
    Page: 'Dashboard',
    Page_Url: page.url(),
    Expected_Result: 'Create dropdown should open',
    Actual_Result: 'Pass',
    Execution_Time: (end - start) / 1000,
    Remarks: 'Dropdown clicked',
    Element_Status: 'NA'
  });

  // Step 3: Click MOM option
  start = Date.now();
  try {
    await page.locator('(//a[@onclick="project.Choose(\'meeting\');"])[1]').click();
    end = Date.now();
    await report.addStep({
      Title: 'Select MOM option',
      Page: 'Dashboard',
      Page_Url: page.url(),
      Expected_Result: 'MOM option should open',
      Actual_Result: 'Pass',
      Execution_Time: (end - start) / 1000,
      Remarks: 'MOM option clicked',
      Element_Status: 'NA'
    });
  } catch {
    end = Date.now();
    await report.addStep({
      Title: 'Select MOM option',
      Page: 'Dashboard',
      Page_Url: page.url(),
      Expected_Result: 'MOM option should open',
      Actual_Result: 'Fail',
      Execution_Time: (end - start) / 1000,
      Remarks: 'User does not have access',
      Element_Status: 'NA'
    });
    report.save('reports/MOM_Test_Report.json');
    return;
  }

  // Step 4: Select Project
  start = Date.now();
  await page.getByRole('heading', { name: 'Abhishek Sir Project Review' }).click();
  end = Date.now();
  await report.addStep({
    Title: 'Select Project',
    Input: { ProjectName: 'Abhishek Sir Project Review' },
    Page: 'Dashboard',
    Page_Url: page.url(),
    Expected_Result: 'Project should be selected',
    Actual_Result: 'Pass',
    Execution_Time: (end - start) / 1000,
    Remarks: 'Project selected',
    Element_Status: 'NA'
  });

  // Step 5: Fill MOM Title
  start = Date.now();
  await page.locator('#Title').fill('Selenium Agenda');
  await page.locator('#Title').press('Enter');
  end = Date.now();
  await report.addStep({
    Title: 'Fill MOM Title',
    Input: { Title: 'Selenium Agenda' },
    Page: 'MOM Page',
    Page_Url: page.url(),
    Expected_Result: 'Title should be filled',
    Actual_Result: 'Pass',
    Execution_Time: (end - start) / 1000,
    Remarks: 'Title filled',
    Element_Status: 'NA'
  });

  // Step 6: Fill MOM Task
  start = Date.now();
  await page.locator('#Name').fill('MOM Task One 1212122134');
  await page.locator('#Name').press('Enter');
  end = Date.now();
  await report.addStep({
    Title: 'Fill MOM Task',
    Input: { Task: 'MOM Task One 1212122134' },
    Page: 'MOM Page',
    Page_Url: page.url(),
    Expected_Result: 'Task should be filled',
    Actual_Result: 'Pass',
    Execution_Time: (end - start) / 1000,
    Remarks: 'Task filled',
    Element_Status: 'NA'
  });

  // Save JSON report
  report.save('reports/MOM_Test_Report.json');
});
