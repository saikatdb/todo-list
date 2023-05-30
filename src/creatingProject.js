//create project factory
const projectFactory = (title) => {
  const taskList = [];
  const taskNum = taskList.length;
  return { title, taskList, taskNum };
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

hideProjectForm();

export { projectFactory, hideProjectForm };
