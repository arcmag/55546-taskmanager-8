import {getRandomInt, createDataTasksList, createTasksList, renderTasksList} from './util';

const MAX_NUMBER_TASKS = 100;
const MIN_NUMBER_TASKS = 0;

const MAX_COUNT_CARD = 20;

const mainFiltersBlock = document.querySelector(`.main__filter`);
mainFiltersBlock.innerHTML = ``;

const boardTasksBlock = document.querySelector(`.board__tasks`);

const FILTERS_TYPES = [
  `add`,
  `overdue`,
  `today`,
  `favorites`,
  `repeating`,
  `tags`,
  `archive`
];

const createFilterTemplate = (type, numberTask) => `
    <input
      type="radio"
      id="filter__${type}"
      class="filter__input visually-hidden"
      name="filter"
      checked
    />
    <label for="filter__${type}" class="filter__label">
      ${type.toUpperCase()} <span class="filter__${type}-count">${numberTask}</span></label
    >
  `;

const getFilterTemplate = (filterType) => createFilterTemplate(filterType, getRandomInt(MIN_NUMBER_TASKS, MAX_NUMBER_TASKS));

const renderFilter = (filterType) => {
  const wrapperFilter = document.createElement(`div`);
  wrapperFilter.innerHTML = getFilterTemplate(filterType);

  wrapperFilter.addEventListener(`click`, () => {
    boardTasksBlock.innerHTML = ``;

    const dataTasksList = createDataTasksList(getRandomInt(0, MAX_COUNT_CARD));
    const tasksList = createTasksList(dataTasksList);

    renderTasksList(boardTasksBlock, tasksList);
  });

  mainFiltersBlock.appendChild(wrapperFilter);
};

const renderFiltersList = () => {
  FILTERS_TYPES.forEach((it) => {
    renderFilter(it);
  });
};

export {renderFiltersList};
