import { format } from 'date-fns';
import { defaultProjectList, createIconRound } from './creatingProject';

//create the task
export const taskFactory = (dataTask, title, date, completed, important) => {
  const dueDate = format(new Date(date), 'MM/dd/yyyy');
  return { dataTask, title, dueDate, completed, important };
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

  console.log(currentProject.taskList.length);

  let dataTask = currentProject.taskList.length;

  const newTask = taskFactory(dataTask, title, dateInput, false, false);

  defaultProjectList[currentDataProject].taskList.push(newTask);

  // addTaskToDOM(dataTask, title, dateInput);

  hideTaskForm();
};

//add task to DOM
function addTaskToDOM(dataTask, title, date, completed, important) {
  const taskList = document.querySelector('.taskList');
  const task = document.createElement('li');

  task.setAttribute('data-task-num', `${dataTask}`);
  taskList.appendChild(task);

  const leftTaskPanel = document.createElement('div');
  leftTaskPanel.classList.add('left-task-panel');
  task.appendChild(leftTaskPanel);

  const rightTaskPanel = document.createElement('div');
  rightTaskPanel.classList.add('right-task-panel');
  task.appendChild(rightTaskPanel);

  const unchecked = createIconRound('radio_button_unchecked');
  unchecked.classList.add('unchecked');
  leftTaskPanel.appendChild(unchecked);

  const checked = createIconRound('radio_button_checked');
  checked.classList.add('checked');

  const taskContent = document.createElement('p');
  taskContent.classList.add('task-content');
  taskContent.textContent = title;
  leftTaskPanel.appendChild(taskContent);

  if (completed) {
    leftTaskPanel.replaceChild(checked, unchecked);
    taskContent.classList.add('lie-through', 'fade');
  }

  const dueDate = document.createElement('p');
  dueDate.classList.add('due-date');
  dueDate.textContent = date;
  rightTaskPanel.appendChild(dueDate);

  const starBorder = createIconRound('star_border');
  starBorder.classList.add('star-border');
  rightTaskPanel.appendChild(starBorder);

  const star = createIconRound('star');
  star.classList.add('important');

  if (important) {
    rightTaskPanel.replaceChild(star, starBorder);
  }

  const clear = createIconRound('clear');
  clear.classList.add('clear');
  rightTaskPanel.appendChild(clear);
}

export { hideTaskForm, taskEvent };
