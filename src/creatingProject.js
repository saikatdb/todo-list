//create project factory
const projectFactory = (dataProject, projectName) => {
  const taskList = [];
  const taskNum = taskList.length;
  return { dataProject, projectName, taskList, taskNum };
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

const addProjectInput = () => {
  const projectName = document.getElementById('projectInput').value;
  const dataProject = defaultProjectList.length;

  const newProject = projectFactory(dataProject, projectName);
  defaultProjectList.push(newProject);
  console.log(newProject);
};

const createEvent = () => {
  const addProject = document.getElementById('addProject');
  addProject.addEventListener('click', showProjectForm);

  const cancel = document.querySelector('.projectCancelBtn');
  cancel.addEventListener('click', hideProjectForm);

  const submit = document.querySelector('.projectSubmitBtn');
  submit.addEventListener('click', addProjectInput);
};

hideProjectForm();

export { projectFactory, createEvent };
