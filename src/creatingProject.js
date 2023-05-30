//create project factory
const projectFactory = (title) => {
  const taskList = [];
  const taskNum = taskList.length;
  return { title, taskList, taskNum };
};

const hideProjectForm = () => {
  document.querySelector('#projectForm').style.display = 'none';
};

const 

hideProjectForm();

export { projectFactory, hideProjectForm };
