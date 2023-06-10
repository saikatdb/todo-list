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
    }
  });

  customProject.forEach((project) => {
    if (project.classList.contains('selected')) {
      showAddTask();
      updateCustomTitle();
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

function updateCustomTitle() {
  const currentProject = document.querySelector('.current-project');
  const selectedProject = document.querySelector('.selected');
  const projectName =
    selectedProject.querySelector('.project-name').textContent;

  currentProject.textContent = projectName;
}

checkSelectedTile();
homeEvent();

export { selectTile, checkSelectedTile };
