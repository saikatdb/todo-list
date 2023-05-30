import { taskFactory } from './creatingTask';
import { createEvent } from './creatingProject';
import './style.css';

let task1 = taskFactory('finished project', '2023, 10, 5', 'no', 'important');
console.log(task1);
createEvent();
