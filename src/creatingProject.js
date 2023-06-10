import { selectTile, checkSelectedTile } from './home';

//create project factory
const projectFactory = (dataProject, projectName) => {
  const taskList = [];
  const taskNum = taskList.length;
  return { dataProject, projectName, taskList, taskNum };
};

const projectEvent = () => {
  const addProject = document.getElementById('addProject');
  addProject.addEventListener('click', showProjectForm);

  const cancel = document.querySelector('.projectCancelBtn');
  cancel.addEventListener('click', hideProjectForm);

  const submit = document.querySelector('.projectSubmitBtn');
  submit.addEventListener('click', addProjectInput);

  // const leftPanel = document.querySelector('.leftPanel');
  // leftPanel.addEventListener('click', checkSelectedTile);
};

// Retrieve defaultProjectList from local storage
const storedProjectList = localStorage.getItem('defaultProjectList');

// If defaultProjectList exists in local storage, assign it to defaultProjectList variable
// Otherwise, use an empty array as the default value
const defaultProjectList = storedProjectList
  ? JSON.parse(storedProjectList)
  : [];

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

//process data from add project
const addProjectInput = (e) => {
  e.preventDefault();
  const projectName = document.getElementById('projectInput').value;
  const dataProject = defaultProjectList.length;

  const newProject = projectFactory(dataProject, projectName);
  defaultProjectList.push(newProject);

  addProjectToDOM(dataProject, projectName);
  selectTile();
  hideProjectForm();

  saveToLocalStorage();
};

//save defaultProjectList to local storage
const saveToLocalStorage = () => {
  localStorage.setItem(
    'defaultProjectList',
    JSON.stringify(defaultProjectList)
  );
};

//create and add project to DOM
const addProjectToDOM = (dataProject, textInput) => {
  const projectList = document.querySelector('.projectList');

  const projectButton = document.createElement('button');
  projectButton.setAttribute('data-project-num', `${dataProject}`);
  projectButton.classList.add('tile', 'custom-project');
  projectList.appendChild(projectButton);

  //left panel of the project
  const leftProjectPanel = document.createElement('div');
  leftProjectPanel.classList.add('left-project-panel');
  projectButton.appendChild(leftProjectPanel);

  //list icon
  const listIcon = createIconRound('list');
  listIcon.classList.add('list');
  leftProjectPanel.appendChild(listIcon);

  //add project title
  const textSpan = document.createElement('span');
  textSpan.classList.add('project-name');
  textSpan.textContent = textInput;
  leftProjectPanel.appendChild(textSpan);

  //right panel of the project
  const rightProjectPanel = document.createElement('div');
  rightProjectPanel.classList.add('right-project-panel');
  projectButton.appendChild(rightProjectPanel);

  //'clear' icon
  const clearIcon = createIconRound('clear');
  clearIcon.classList.add('delete');
  rightProjectPanel.appendChild(clearIcon);
};

//create google round icon
const createIconRound = (name) => {
  let icon = document.createElement('i');
  icon.classList.add('material-icons-round');
  icon.textContent = name;
  return icon;
};

//display all projects in DOM
const populateProjects = () => {
  defaultProjectList.forEach((project) => {
    addProjectToDOM(project.dataProject, project.projectName);
  });
};

populateProjects();

export {
  projectFactory,
  projectEvent,
  defaultProjectList,
  hideProjectForm,
  createIconRound,
  saveToLocalStorage,
};
