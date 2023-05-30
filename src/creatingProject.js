//create project factory
const projectFactory = (title) => {
  const taskList = [];
  const taskNum = taskList.length;
  return { title, taskList, taskNum };
};

const hideProjectForm = () => {
  document.querySelector('#projectForm').style.display = 'none';
};

const showProjectForm = () => {
  document.querySelector('#projectForm').style.display = 'block';
};

hideProjectForm();

export { projectFactory, hideProjectForm };
