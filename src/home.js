import { defaultProjectList } from './creatingProject';
import { addTaskToDOM } from './creatingTask';

const homeEvent = () => {
  const leftPanel = document.querySelector('.leftPanel');
  leftPanel.addEventListener('click', checkSelectedTile);
};

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

  defaultProject.forEach((project) => {
    if (project.classList.contains('selected')) {
      hideAddTask();
      updateDefaultTitle();
      displayAllTasks();
    }
  });

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

function clearContent() {
  const taskList = document.querySelector('.taskList');
  taskList.textContent = '';
}

//display all tasks in a project
function displayProjectTasks(projectData) {
  clearContent();

  defaultProjectList[projectData].taskList.forEach((task) => {
    addTaskToDOM(
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
  const taskList = document.querySelector('.taskList');
  taskList.textContent = '';
  defaultProjectList.forEach((project) => {
    project.taskList.forEach((task) => {
      addTaskToDOM(
        task.dataTask,
        task.title,
        task.date,
        task.completed,
        task.important
      );
    });
  });
}

export { selectTile, checkSelectedTile, homeEvent };
