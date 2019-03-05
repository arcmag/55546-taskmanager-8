import {renderSeveralCard} from './card';

const MAX_NUMBER_TASKS = 100;

const mainFiltersBlock = document.querySelector(`.main__filter`);
mainFiltersBlock.innerHTML = ``;

const FilterType = [
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

const getFilterTemplate = (filterType) => {
  const randomNumberTask = Math.round(Math.random() * MAX_NUMBER_TASKS);

  return createFilterTemplate(filterType, randomNumberTask);
};

const renderFilter = (filterType) => {
  const wrapperFilter = document.createElement(`div`);
  wrapperFilter.innerHTML = getFilterTemplate(filterType);

  wrapperFilter.addEventListener(`click`, () => {
    renderSeveralCard();
  });

  mainFiltersBlock.appendChild(wrapperFilter);
};

const renderFiltersList = () => {
  FilterType.forEach((it) => {
    renderFilter(it);
  });
};

export {renderFiltersList};
