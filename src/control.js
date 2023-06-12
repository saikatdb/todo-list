import {
  defaultProjectList,
  populateProjects,
  saveToLocalStorage,
} from './creatingProject';
import {
  displayAllTasks,
  checkSelectedTile,
  displayProjectTasks,
} from './home';

//PROJECT
//delete project
const deleteProject = () => {
  //Event delegation to handle the delete event on the project list container
  const projectList = document.querySelector('.projectList');
  projectList.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete')) {
      let target = event.target.closest('.tile');
      let targetData = target.dataset.projectNum;

      //delete the project from defaultProjectList
      defaultProjectList.splice(targetData, 1);
      sortProjectData();
      saveToLocalStorage();
      console.log(defaultProjectList);

      projectList.textContent = '';
      populateProjects();

      //if deleted project was selected add selected class to allTasks
      const allTasks = document.getElementById('allTasks');
      allTasks.classList.add('selected');
      checkSelectedTile();
    }
  });
};

//after project is deleted, sort project data number
function sortProjectData() {
  for (let i = 0; i < defaultProjectList.length; i++) {
    defaultProjectList[i].dataProject = i;
  }
}

//TASK
//delete task
function deleteTask() {
  const taskList = document.querySelector('.taskList');
  //event delegation
  taskList.addEventListener('click', (event) => {
    if (event.target.classList.contains('clear')) {
      const task = event.target.closest('.task');
      const taskData = task.dataset.taskNum;
      const projectData = task.dataset.projectNum;

      defaultProjectList[projectData].taskList.splice(taskData, 1);
      sortTaskData(projectData);
      saveToLocalStorage();
      console.log(defaultProjectList);
      displayProjectTasks(projectData);
    }
  });
}

//after task is deleted, sort tasks data number
function sortTaskData(projectData) {
  for (let i = 0; i < defaultProjectList[projectData].taskList.length; i++) {
    defaultProjectList[projectData].taskList[i].dataTask = i;
  }
}

//all task event except for delete
function taskControlEvent() {
  const taskList = document.querySelector('.taskList');
  taskList.addEventListener('click', (event) => {
    const task = event.target.closest('.task');
    const taskData = task.dataset.taskNum;
    const projectData = task.dataset.projectNum;

    //to check unchecked task
    if (event.target.classList.contains('unchecked')) {
      defaultProjectList[projectData].taskList[taskData].completed = true;
      displayProjectTasks(projectData);
    }

    //to uncheck checked task
    if (event.target.classList.contains('checked')) {
      defaultProjectList[projectData].taskList[taskData].completed = false;
      displayProjectTasks(projectData);
    }

    //to make task important
    if (event.target.classList.contains('star-border')) {
      defaultProjectList[projectData].taskList[taskData].important = true;
      displayProjectTasks(projectData);
    }

    // to make task unimportant
    if (event.target.classList.contains('important')) {
      defaultProjectList[projectData].taskList[taskData].important = false;
      displayProjectTasks(projectData);
    }

    saveToLocalStorage();
  });
}

export { deleteProject, deleteTask, taskControlEvent };
