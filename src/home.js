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

function checkSelectedTile() {
  const defaultProject = document.querySelectorAll('.default-project');
  const customProject = document.querySelectorAll('.custom-project');

  defaultProject.forEach((project) => {
    if (project.classList.contains('selected')) {
      hideAddTask();
      console.log('hello');
    }
  });

  customProject.forEach((project) => {
    if (project.classList.contains('selected')) {
      showAddTask();
      console.log('yo');
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

checkSelectedTile();

export { selectTile, checkSelectedTile };
