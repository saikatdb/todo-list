import { format } from 'date-fns';
import {
  defaultProjectList,
  createIconRound,
  saveToLocalStorage,
} from './creatingProject';

//create the task
export const taskFactory = (
  dataProject,
  dataTask,
  title,
  date,
  completed,
  important
) => {
  return { dataProject, dataTask, title, date, completed, important };
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

  let date = processDateInput(dateInput);

  let dataTask = currentProject.taskList.length;

  const newTask = taskFactory(
    currentDataProject,
    dataTask,
    title,
    date,
    false,
    false
  );

  currentProject.taskList.push(newTask);

  addTaskToDOM(currentDataProject, dataTask, title, date);

  saveToLocalStorage();

  hideTaskForm();
};

//add task to DOM
function addTaskToDOM(
  dataProject,
  dataTask,
  title,
  date,
  completed,
  important
) {
  const taskList = document.querySelector('.taskList');
  const task = document.createElement('li');

  //set task data number
  task.setAttribute('data-task-num', `${dataTask}`);
  task.setAttribute('data-project-num', `${dataProject}`);
  task.classList.add('task');
  taskList.appendChild(task);

  const leftTaskPanel = document.createElement('div');
  leftTaskPanel.classList.add('left-task-panel');
  task.appendChild(leftTaskPanel);

  const rightTaskPanel = document.createElement('div');
  rightTaskPanel.classList.add('right-task-panel');
  task.appendChild(rightTaskPanel);

  //unchecked icon
  const unchecked = createIconRound('radio_button_unchecked');
  unchecked.classList.add('unchecked');
  leftTaskPanel.appendChild(unchecked);

  //checked icon
  const checked = createIconRound('radio_button_checked');
  checked.classList.add('checked');

  //task title
  const taskContent = document.createElement('p');
  taskContent.classList.add('task-content');
  taskContent.textContent = title;
  leftTaskPanel.appendChild(taskContent);

  if (completed) {
    leftTaskPanel.replaceChild(checked, unchecked);
    taskContent.classList.toggle('line-through');
    taskContent.classList.toggle('fade');
  }

  const dueDate = document.createElement('p');
  dueDate.classList.add('due-date');
  dueDate.textContent = date;
  rightTaskPanel.appendChild(dueDate);

  //non important icon
  const starBorder = createIconRound('star_border');
  starBorder.classList.add('star-border');
  rightTaskPanel.appendChild(starBorder);

  //important icon
  const star = createIconRound('star');
  star.classList.add('important');

  if (important) {
    rightTaskPanel.replaceChild(star, starBorder);
  }

  //clear icon
  const clear = createIconRound('clear');
  clear.classList.add('clear');
  rightTaskPanel.appendChild(clear);
}

function processDateInput(dateInput) {
  let formattedDate;
  if (!dateInput) {
    formattedDate = 'No Due Date';
  } else {
    const dueDate = format(new Date(dateInput), 'MM/dd/yyyy');
    formattedDate = dueDate;
  }
  return formattedDate;
}

const removeAllProject = () => {
  localStorage.clear();
  saveToLocalStorage();
};

// removeAllTask();

export { hideTaskForm, taskEvent, addTaskToDOM, removeAllProject };
