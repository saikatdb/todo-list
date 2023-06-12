import {
  defaultProjectList,
  populateProjects,
  saveToLocalStorage,
} from './creatingProject';
import { displayAllTasks, checkSelectedTile } from './home';

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

export { deleteProject };
