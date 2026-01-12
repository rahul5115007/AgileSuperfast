import fs from 'fs';
import path from 'path';

export interface StepReport {
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

export interface TestReport {
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

export class JsonReport {
  private report: TestReport;
  private currentStep = 0;

  constructor(projectKey: string, userKey: string, environment: string, browser: string) {
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

  addStep(step: StepReport) {
    step.Step = this.currentStep;
    this.report.Tasks.push(step);
    this.currentStep++;
  }

  save(fileName: string) {
    const filePath = path.join(process.cwd(), fileName);
    fs.writeFileSync(filePath, JSON.stringify(this.report, null, 2), 'utf-8');
  }
}
