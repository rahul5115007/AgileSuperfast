import { Page } from '@playwright/test';
import os from 'os';
import fs from 'fs';
import path from 'path';

interface StepReport {
  Step: number;
  Title: string;
  Input?: any;
  Page: string;
  Page_Url: string;
  Expected_Result: string;
  Actual_Result: string;
  Remarks?: string;
  Element_Status?: string;
  Screenshot_Base64String?: string;
  Execution_Time: number;
}

interface TestReport {
  Project_Key: string;
  User_Key: string;
  Dated: string;
  Environment: string;
  Java: string;
  Selenium: string;
  OS: string;
  Host: string;
  IP: string;
  Browser: string;
  Execution_Time: number;
  Tasks: StepReport[][];
}

export class JsonReportManager {
  private page: Page;
  private report: TestReport;
  private currentStep = 1;
  private totalExecutionTime = 0;

  constructor(page: Page, browserName: string) {
    this.page = page;

    this.report = {
      Project_Key: '31090f01-1c52-483f-b7b8-28923f621041',
      User_Key: 'f3d55475-ef17-42f0-8ff2-4e5136ea25fa',
      Dated: new Date().toISOString(),
      Environment: 'Staging',
      Java: 'TypeScript',
      Selenium: 'Automation',
      OS: os.platform(),
      Host: os.hostname(),
      IP: this.getIPAddress(),
      Browser: browserName,
      Execution_Time: 0,
      Tasks: [[]]
    };
  }

  private getIPAddress(): string {
    const nets = os.networkInterfaces();
    for (const name of Object.keys(nets)) {
      for (const net of nets[name] || []) {
        if (net.family === 'IPv4' && !net.internal) {
          return net.address;
        }
      }
    }
    return 'NA';
  }

  async addStep(step: Omit<StepReport, 'Step' | 'Execution_Time' | 'Screenshot_Base64String'>) {
    const start = Date.now();

    let screenshotBase64: string | undefined;
    try {
      const buffer = await this.page.screenshot();
      screenshotBase64 = `data:image/png;base64,${buffer.toString('base64')}`;
    } catch {
      screenshotBase64 = undefined;
    }

    const end = Date.now();
    const executionTime = (end - start) / 1000;
    this.totalExecutionTime += executionTime;

    const stepReport: StepReport = {
      Step: this.currentStep,
      Title: step.Title,
      Input: step.Input,
      Page: step.Page,
      Page_Url: step.Page_Url,
      Expected_Result: step.Expected_Result,
      Actual_Result: step.Actual_Result,
      Remarks: step.Remarks,
      Element_Status: step.Element_Status,
      Screenshot_Base64String: screenshotBase64,
      Execution_Time: executionTime
    };

    this.report.Tasks[0].push(stepReport);
    this.currentStep++;
  }

  finalize() {
    this.report.Execution_Time = this.totalExecutionTime;
  }

  saveReport(fileName: string) {
    this.finalize();

    const reportDir = path.join(process.cwd(), 'reports');
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir);
    }

    const filePath = path.join(reportDir, fileName);
    fs.writeFileSync(filePath, JSON.stringify(this.report, null, 2), 'utf-8');

    console.log(`📄 JSON Report generated: ${filePath}`);
  }
}
