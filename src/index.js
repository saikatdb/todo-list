import {
  projectEvent,
  defaultProjectList,
  hideProjectForm,
  populateProjects,
} from './creatingProject';

import { taskEvent, hideTaskForm, removeAllProject } from './creatingTask';

import { selectTile, checkSelectedTile, homeEvent } from './home';
import { deleteProject, deleteTask, taskControlEvent } from './control';
import './style.css';

projectEvent();
taskEvent();
populateProjects();

selectTile();
checkSelectedTile();
homeEvent();
deleteProject();
// removeAllTask();
deleteTask();
taskControlEvent();

hideProjectForm();
hideTaskForm();
