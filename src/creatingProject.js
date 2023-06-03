import { selectTile } from './home';

//create project factory
const projectFactory = (dataProject, projectName) => {
  const taskList = [];
  const taskNum = taskList.length;
  return { dataProject, projectName, taskList, taskNum };
};

const createEvent = () => {
  const addProject = document.getElementById('addProject');
  addProject.addEventListener('click', showProjectForm);

  const cancel = document.querySelector('.projectCancelBtn');
  cancel.addEventListener('click', hideProjectForm);

  const submit = document.querySelector('.projectSubmitBtn');
  submit.addEventListener('click', addProjectInput);
};

const defaultProjectList = [];

const hideProjectForm = () => {
  document.querySelector('#projectForm').style.display = 'none';
  const projectInput = document.querySelector('#projectInput');

  projectInput.value = '';
};

const showProjectForm = () => {
  document.querySelector('#projectForm').style.display = 'block';
  //focus on input field
  document.getElementById('projectInput').focus();
};

const addProjectInput = (e) => {
  e.preventDefault();
  const projectName = document.getElementById('projectInput').value;
  const dataProject = defaultProjectList.length;

  const newProject = projectFactory(dataProject, projectName);
  defaultProjectList.push(newProject);

  addProjectToDOM(dataProject, projectName);
  selectTile();
  hideProjectForm();
};

const addProjectToDOM = (dataProject, textInput) => {
  const projectList = document.querySelector('.projectList');

  const projectButton = document.createElement('button');
  projectButton.setAttribute('data-project-num', `${dataProject}`);
  projectButton.classList.add('tile');
  projectList.appendChild(projectButton);

  //left panel of the project
  const leftProjectPanel = document.createElement('div');
  leftProjectPanel.classList.add('left-project-panel');
  projectButton.appendChild(leftProjectPanel);

  const listIcon = createIconRound('list');
  leftProjectPanel.appendChild(listIcon);

  //add project title
  const textSpan = document.createElement('span');
  textSpan.classList.add('data-project-name');
  textSpan.textContent = textInput;
  leftProjectPanel.appendChild(textSpan);

  //right panel of the project
  const rightProjectPanel = document.createElement('div');
  rightProjectPanel.classList.add('right-project-panel');
  projectButton.appendChild(rightProjectPanel);

  //'clear' icon
  const clearIcon = createIconRound('clear');
  rightProjectPanel.appendChild(clearIcon);
};

const createIconRound = (name) => {
  let icon = document.createElement('i');
  icon.classList.add('material-icons-round');
  icon.textContent = name;
  return icon;
};

hideProjectForm();

export { projectFactory, createEvent, defaultProjectList };
