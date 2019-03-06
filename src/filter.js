import {util} from './util';
import {renderCardsList, createCardsList, MAX_COUNT_CARD} from './card';

const MAX_NUMBER_TASKS = 100;
const MIN_NUMBER_TASKS = 0;

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

const getFilterTemplate = (filterType) => createFilterTemplate(filterType, util.getRandomInt(MIN_NUMBER_TASKS, MAX_NUMBER_TASKS));

const renderFilter = (filterType) => {
  const wrapperFilter = document.createElement(`div`);
  wrapperFilter.innerHTML = getFilterTemplate(filterType);

  wrapperFilter.addEventListener(`click`, () => {
    boardTasksBlock.innerHTML = ``;
    renderCardsList(createCardsList(util.getRandomInt(0, MAX_COUNT_CARD)));
  });

  mainFiltersBlock.appendChild(wrapperFilter);
};

const renderFiltersList = () => {
  FILTERS_TYPES.forEach((it) => {
    renderFilter(it);
  });
};

export {renderFiltersList};
