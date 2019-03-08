import {createRandomTask} from './data';
import {renderTask, createTask} from './util';
import {renderFiltersList} from './filter';

renderFiltersList();

const tasksContainer = document.querySelector(`.board__tasks`);

tasksContainer.innerHTML = ``;
renderTask(tasksContainer, createTask(createRandomTask()));
