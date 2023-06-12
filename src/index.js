import {
  projectEvent,
  defaultProjectList,
  hideProjectForm,
  populateProjects,
} from './creatingProject';

import { taskEvent, hideTaskForm, removeAllProject } from './creatingTask';

import { selectTile, checkSelectedTile, homeEvent } from './home';
import { deleteProject, deleteTask } from './control';
import './style.css';

projectEvent();
taskEvent();
console.log(defaultProjectList);
populateProjects();

selectTile();
checkSelectedTile();
homeEvent();
deleteProject();
// removeAllTask();
deleteTask();

hideProjectForm();
hideTaskForm();
