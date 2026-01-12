import { BasePage } from './BasePage';
import { LoginLocators } from '../locators/login.locators';

export class LoginPage extends BasePage {
  async login(email: string, password: string) {
    await this.fill(LoginLocators.emailInput, email);
    await this.fill(LoginLocators.passwordInput, password);
    await this.click(LoginLocators.submitButton);
  }
}
