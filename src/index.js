import {
  projectEvent,
  hideProjectForm,
  populateProjects,
} from './creatingProject';
import { taskEvent, hideTaskForm } from './creatingTask';
import { selectTile, checkSelectedTile, homeEvent } from './home';
import {
  deleteProject,
  deleteTask,
  taskControlEvent,
  formControl,
} from './control';
import './style.css';

projectEvent();
taskEvent();
populateProjects();

selectTile();
checkSelectedTile();
homeEvent();
deleteProject();
deleteTask();
taskControlEvent();

hideProjectForm();
hideTaskForm();

formControl();
