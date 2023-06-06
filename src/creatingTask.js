import { format } from 'date-fns';
import { defaultProjectList, createIconRound } from './creatingProject';

//create the task
export const taskFactory = (dataTask, title, date, complete, important) => {
  const dueDate = format(new Date(date), 'MM/dd/yyyy');
  return { dataTask, title, dueDate, complete, important };
};

const taskEvent = () => {
  const addTask = document.querySelector('#addTask');
  addTask.addEventListener('click', showTaskForm);

  const cancel = document.querySelector('.taskCancelBtn');
  cancel.addEventListener('click', hideTaskForm);

  const submit = document.querySelector('.taskSubmitBtn');
  submit.addEventListener('click', taskInput);
};

const hideTaskForm = () => {
  const taskForm = document.querySelector('#taskForm');
  const taskInput = document.querySelector('#taskInput');
  const taskDate = document.querySelector('#taskDate');

  taskInput.value = '';
  taskDate.value = '';
  taskForm.style.display = 'none';
};

const showTaskForm = () => {
  const taskForm = document.querySelector('#taskForm');
  taskForm.style.display = 'block';
  const taskInput = document.querySelector('#taskInput');
  taskInput.focus();
};

const findCurrentDataProject = () => {
  const selected = document.querySelector('.selected');
  return selected.dataset.projectNum;
};

const selectCurrentProject = (currentDataProject) => {
  return defaultProjectList[currentDataProject];
};

//process data from add task
const taskInput = (e) => {
  e.preventDefault();
  let title = document.getElementById('taskInput').value;
  let dateInput = document.getElementById('taskDate').value;

  let currentDataProject = findCurrentDataProject();
  let currentProject = selectCurrentProject(currentDataProject);

  let dataTask = currentProject.taskListArray.length;

  const newTask = taskFactory(dataTask, title, dateInput, false, false);

  defaultProjectList[currentDataProject].taskListArray.push(newTask);

  hideTaskForm();
};

//add task to DOM
// function addTaskToDOM(dataTask, title, date, completed, important) {
//   const taskList
// }

export { hideTaskForm, taskEvent };
