import { isEqual, format, parseISO, parse, isValid } from 'date-fns';
import { enGB } from 'date-fns/locale';
import { defaultProjectList } from './creatingProject';
import { addTaskToDOM } from './creatingTask';

const homeEvent = () => {
  const leftPanel = document.querySelector('.leftPanel');
  leftPanel.addEventListener('click', checkSelectedTile);
};

//add 'selected' class to the clicked project
const selectTile = () => {
  const tiles = document.querySelectorAll('.tile');
  tiles.forEach((tile) => {
    tile.addEventListener('click', () => {
      const selected = document.querySelector('.selected');
      selected.classList.remove('selected');
      tile.classList.add('selected');
    });
  });
};

//check which project tile is selected
function checkSelectedTile() {
  const defaultProject = document.querySelectorAll('.default-project');
  const customProject = document.querySelectorAll('.custom-project');
  selectTile();

  //check if any default project is selected
  defaultProject.forEach((project) => {
    if (project.classList.contains('selected')) {
      hideAddTask();
      updateDefaultTitle();
      const selected = document.querySelector('.selected');

      //check to see which default project is selected
      if (selected.matches('#allTasks')) {
        displayAllTasks();
      }
      if (selected.matches('#important')) {
        displayImportant();
      }
      if (selected.matches('#completed')) {
        displayCompleted();
      }
      if (selected.matches('#today')) {
        displayToday();
      }
    }
  });

  //check if any custom project is selected
  customProject.forEach((project) => {
    if (project.classList.contains('selected')) {
      const projectData = project.dataset.projectNum;

      showAddTask();
      updateCustomTitle();
      displayProjectTasks(projectData);
    }
  });
}

//hide add task button
function hideAddTask() {
  const addTask = document.querySelector('#addTask');
  addTask.style.display = 'none';
}

//show add task button
function showAddTask() {
  const addTask = document.querySelector('#addTask');
  addTask.style.display = 'block';
}

//change title if any default project is selected
function updateDefaultTitle() {
  const currentProject = document.querySelector('.current-project');
  const selectedProject = document.querySelector('.selected');
  currentProject.textContent = selectedProject.textContent;
}

//change title if any custom project is selected
function updateCustomTitle() {
  const currentProject = document.querySelector('.current-project');
  const selectedProject = document.querySelector('.selected');
  const projectName =
    selectedProject.querySelector('.project-name').textContent;

  currentProject.textContent = projectName;
}

//clear all tasks from DOM
function clearTaskFromDOM() {
  const taskList = document.querySelector('.taskList');
  taskList.textContent = '';
}

//display all tasks in a project
function displayProjectTasks(projectData) {
  clearTaskFromDOM();

  defaultProjectList[projectData].taskList.forEach((task) => {
    addTaskToDOM(
      task.dataProject,
      task.dataTask,
      task.title,
      task.date,
      task.completed,
      task.important
    );
  });
}

//display all tasks in dom
function displayAllTasks() {
  clearTaskFromDOM();
  defaultProjectList.forEach((project) => {
    project.taskList.forEach((task) => {
      addTaskToDOM(
        task.dataProject,
        task.dataTask,
        task.title,
        task.date,
        task.completed,
        task.important
      );
    });
  });
}

//display important task
function displayImportant() {
  clearTaskFromDOM();
  defaultProjectList.forEach((project) => {
    project.taskList.forEach((task) => {
      if (task.important) {
        addTaskToDOM(
          task.dataProject,
          task.dataTask,
          task.title,
          task.date,
          task.completed,
          task.important
        );
      } else {
        return;
      }
    });
  });
}

//display completed task
function displayCompleted() {
  clearTaskFromDOM();
  defaultProjectList.forEach((project) => {
    project.taskList.forEach((task) => {
      if (task.completed) {
        addTaskToDOM(
          task.dataProject,
          task.dataTask,
          task.title,
          task.date,
          task.completed,
          task.important
        );
      } else {
        return;
      }
    });
  });
}

function displayToday() {
  clearTaskFromDOM();
  const today = format(new Date(), 'MM/dd/yyyy');
  defaultProjectList.forEach((project) => {
    project.taskList.forEach((task) => {
      let date = task.date;
      if (today == date) {
        addTaskToDOM(
          task.dataProject,
          task.dataTask,
          task.title,
          task.date,
          task.completed,
          task.important
        );
      }
    });
  });
}

export {
  selectTile,
  checkSelectedTile,
  homeEvent,
  displayAllTasks,
  displayProjectTasks,
};
