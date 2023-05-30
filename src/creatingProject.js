//create project factory
const projectFactory = (projectName) => {
  const taskList = [];
  const taskNum = taskList.length;
  return { projectName, taskList, taskNum };
};

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

const createEvent = () => {
  const addProject = document.getElementById('addProject');
  addProject.addEventListener('click', showProjectForm);

  const cancel = document.querySelector('.projectCancelBtn');
  cancel.addEventListener('click', hideProjectForm);
};

hideProjectForm();

export { projectFactory, createEvent };
