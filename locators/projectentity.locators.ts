export const Projectentitylocators = {

  // Create MOM
  elem_projectlist: '(//a[@id="dropdownMenuButton1"])[2]',
  momOptionLink: '(//a[@onclick="project.Choose(\'meeting\');"])[1]',

  // Project selection
  momProjectByName: (projectName: string) =>
    `//h3[text()="${projectName}"]`,

  // MOM form
  momTitleInput: '#Title',
  momAgendaInput: '#Name',

  // Actions
  momPreviewButton:
    'a[onclick="meeting.Preview(\'2517cdc5-1880-4780-91ca-e97a64a7e78b\')"]'
};