import {
  projectEvent,
  defaultProjectList,
  hideProjectForm,
  populateProjects,
} from './creatingProject';

import { taskEvent, hideTaskForm } from './creatingTask';

import { selectTile, checkSelectedTile, homeEvent } from './home';
import { deleteProject } from './control';
import './style.css';

projectEvent();
taskEvent();
console.log(defaultProjectList);
populateProjects();

selectTile();
checkSelectedTile();
homeEvent();
deleteProject();

hideProjectForm();
hideTaskForm();
