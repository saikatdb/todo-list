import { format } from 'date-fns';

//create the task
export const taskFactory = (
  dataProject,
  id,
  title,
  date,
  complete,
  important
) => {
  const dueDate = format(new Date(date), 'MM/dd/yyyy');
  return { dataProject, id, title, dueDate, complete, important };
};

const taskEvent = () => {
  const addTask = document.querySelector('#addTask');
  addTask.addEventListener('click', showTaskForm);

  const cancel = document.querySelector('.taskCancelBtn');
  cancel.addEventListener('click', hideTaskForm);
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

export { hideTaskForm, taskEvent };
