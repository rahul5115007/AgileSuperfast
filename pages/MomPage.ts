import { BasePage } from './BasePage';
import { MomLocators } from '../locators/mom.locators';

export class MomPage extends BasePage {

  async createMom(projectName: string, title: string, agenda: string) {

    await this.click(MomLocators.momCreateDropdownLink);
    await this.click(MomLocators.momOptionLink);

    await this.click(MomLocators.momProjectByName(projectName));

    await this.fill(MomLocators.momTitleInput, title);
    await this.press(MomLocators.momTitleInput, 'Enter');

    await this.fill(MomLocators.momAgendaInput, agenda);
    await this.press(MomLocators.momAgendaInput, 'Enter');

    //await this.click(MomLocators.momPreviewButton);
  }
}
