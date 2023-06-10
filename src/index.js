import {
  projectEvent,
  defaultProjectList,
  hideProjectForm,
} from './creatingProject';

import { taskEvent, hideTaskForm } from './creatingTask';

import { selectTile, checkSelectedTile, homeEvent } from './home';
import './style.css';

projectEvent();
taskEvent();
console.log(defaultProjectList);

selectTile();
checkSelectedTile();
homeEvent();

hideProjectForm();
hideTaskForm();
