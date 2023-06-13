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

import { processDateInput } from './creatingTask';

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
      checkSelectedTile();
    }

    //to uncheck checked task
    if (event.target.classList.contains('checked')) {
      defaultProjectList[projectData].taskList[taskData].completed = false;
      displayProjectTasks(projectData);
      checkSelectedTile();
    }

    //to make task important
    if (event.target.classList.contains('star-border')) {
      defaultProjectList[projectData].taskList[taskData].important = true;
      displayProjectTasks(projectData);
      checkSelectedTile();
    }

    // to make task unimportant
    if (event.target.classList.contains('important')) {
      defaultProjectList[projectData].taskList[taskData].important = false;
      displayProjectTasks(projectData);
      checkSelectedTile();
    }

    //to change date after task is created
    if (event.target.classList.contains('due-date')) {
      const datePick = document.createElement('input');
      datePick.setAttribute('type', 'date');
      datePick.setAttribute('id', 'new-due-date');

      const rightTaskPanel = event.target.closest('.right-task-panel');
      const dueDate = rightTaskPanel.querySelector('.due-date');
      rightTaskPanel.replaceChild(datePick, dueDate);

      datePick.addEventListener('input', () => {
        const dateInput = processDateInput(datePick.value);
        defaultProjectList[projectData].taskList[taskData].date = dateInput;

        saveToLocalStorage();

        displayProjectTasks(projectData);
      });
    }

    saveToLocalStorage();
  });
}

export { deleteProject, deleteTask, taskControlEvent };
