import {renderSeveralCard} from './card';

const MAX_NUMBER_TASKS = 100;

const mainFiltersBlock = document.querySelector(`.main__filter`);
mainFiltersBlock.innerHTML = ``;

const FilterType = [
  `ALL`,
  `OVERDUE`,
  `TODAY`,
  `FAVORITES`,
  `REPEATING`,
  `TAGS`,
  `ARCHIVE`
];

const FilterTemplate = {
  ALL: (randomNumberTask) => `
    <input
      type="radio"
      id="filter__all"
      class="filter__input visually-hidden"
      name="filter"
      checked
    />
    <label for="filter__all" class="filter__label">
      ALL <span class="filter__all-count">${randomNumberTask}</span></label
    >
  `,
  OVERDUE: (randomNumberTask) => `
    <input
      type="radio"
      id="filter__overdue"
      class="filter__input visually-hidden"
      name="filter"
      disabled
    />
    <label for="filter__overdue" class="filter__label"
      >OVERDUE <span class="filter__overdue-count">${randomNumberTask}</span></label
    >
  `,
  TODAY: (randomNumberTask) => `
    <input
      type="radio"
      id="filter__today"
      class="filter__input visually-hidden"
      name="filter"
      disabled
    />
    <label for="filter__today" class="filter__label"
      >TODAY <span class="filter__today-count">${randomNumberTask}</span></label
    >
  `,
  FAVORITES: (randomNumberTask) => `
    <input
      type="radio"
      id="filter__favorites"
      class="filter__input visually-hidden"
      name="filter"
    />
    <label for="filter__favorites" class="filter__label"
      >FAVORITES <span class="filter__favorites-count">${randomNumberTask}</span></label
    >
  `,
  REPEATING: (randomNumberTask) => `
    <input
      type="radio"
      id="filter__repeating"
      class="filter__input visually-hidden"
      name="filter"
    />
    <label for="filter__repeating" class="filter__label"
      >Repeating <span class="filter__repeating-count">${randomNumberTask}</span></label
    >
  `,
  TAGS: (randomNumberTask) => `
    <input
      type="radio"
      id="filter__tags"
      class="filter__input visually-hidden"
      name="filter"
    />
    <label for="filter__tags" class="filter__label"
      >Tags <span class="filter__tags-count">${randomNumberTask}</span></label
    >
  `,
  ARCHIVE: (randomNumberTask) => `
    <input
      type="radio"
      id="filter__archive"
      class="filter__input visually-hidden"
      name="filter"
    />
    <label for="filter__archive" class="filter__label"
      >ARCHIVE <span class="filter__archive-count">${randomNumberTask}</span></label
    >
  `
};

const getFilterTemplate = (filterType) => {
  const randomNumberTask = Math.round(Math.random() * MAX_NUMBER_TASKS);

  return FilterTemplate[filterType](randomNumberTask);
};

const renderFilter = (filterType) => {
  const wrapperFilter = document.createElement(`div`);
  wrapperFilter.innerHTML = getFilterTemplate(filterType);

  wrapperFilter.addEventListener(`click`, () => {
    renderSeveralCard();
  });

  mainFiltersBlock.appendChild(wrapperFilter);
};

export {FilterType, renderFilter};
