'use strict';

(function () {
  const MAX_NUMBER_TASKS = 100;

  const START_COUNT_CARD = 7;
  const MAX_COUNT_CARD = 20;

  const mainFiltersBlock = document.querySelector(`.main__filter`);
  mainFiltersBlock.innerHTML = ``;

  const filterTypes = [
    `All`,
    `Overdue`,
    `Today`,
    `Favorites`,
    `Repeating`,
    `Tags`,
    `Archive`
  ];

  const renderFilter = (filterType) => {
    const wrapperFilter = document.createElement(`div`);
    const randomTask = Math.round(Math.random() * MAX_NUMBER_TASKS);

    wrapperFilter.innerHTML = ({
      All: `
        <input
          type="radio"
          id="filter__all"
          class="filter__input visually-hidden"
          name="filter"
          checked
        />
        <label for="filter__all" class="filter__label">
          ALL <span class="filter__all-count">${randomTask}</span></label
        >
      `,
      Overdue: `
        <input
          type="radio"
          id="filter__overdue"
          class="filter__input visually-hidden"
          name="filter"
          disabled
        />
        <label for="filter__overdue" class="filter__label"
          >OVERDUE <span class="filter__overdue-count">${randomTask}</span></label
        >
      `,
      Today: `
        <input
          type="radio"
          id="filter__today"
          class="filter__input visually-hidden"
          name="filter"
          disabled
        />
        <label for="filter__today" class="filter__label"
          >TODAY <span class="filter__today-count">${randomTask}</span></label
        >
      `,
      Favorites: `
        <input
          type="radio"
          id="filter__favorites"
          class="filter__input visually-hidden"
          name="filter"
        />
        <label for="filter__favorites" class="filter__label"
          >FAVORITES <span class="filter__favorites-count">${randomTask}</span></label
        >
      `,
      Repeating: `
        <input
          type="radio"
          id="filter__repeating"
          class="filter__input visually-hidden"
          name="filter"
        />
        <label for="filter__repeating" class="filter__label"
          >Repeating <span class="filter__repeating-count">${randomTask}</span></label
        >
      `,
      Tags: `
        <input
          type="radio"
          id="filter__tags"
          class="filter__input visually-hidden"
          name="filter"
        />
        <label for="filter__tags" class="filter__label"
          >Tags <span class="filter__tags-count">${randomTask}</span></label
        >
      `,
      Archive: `
        <input
          type="radio"
          id="filter__archive"
          class="filter__input visually-hidden"
          name="filter"
        />
        <label for="filter__archive" class="filter__label"
          >ARCHIVE <span class="filter__archive-count">${randomTask}</span></label
        >
      `
    }[filterType]);

    wrapperFilter.addEventListener(`click`, () => {
      renderSeveralCard();
    });

    mainFiltersBlock.appendChild(wrapperFilter);
  };

  const boardTasksBlock = document.querySelector(`.board__tasks`);
  boardTasksBlock.innerHTML = ``;

  const renderCard = () => {
    const card = document.createElement(`article`);
    card.className = `card`;
    card.innerHTML = `
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit">
              edit
            </button>
            <button type="button" class="card__btn card__btn--archive">
              archive
            </button>
            <button type="button" class="card__btn card__btn--favorites card__btn--disabled">
              favorites
            </button>
          </div>
          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>
          <div class="card__textarea-wrap">
            <label>
              <textarea class="card__text" placeholder="Start typing your text here..." name="text"></textarea>
            </label>
          </div>
          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates"></div>
              <div class="card__hashtag">
                <div class="card__hashtag-list"></div>
                <label>
                  <input type="text" class="card__hashtag-input" name="hashtag-input" placeholder="Type new hashtag here">
                </label>
              </div>
            </div>
            <label class="card__img-wrap card__img-wrap--empty">
              <input type="file" class="card__img-input visually-hidden" name="img">
              <img src="img/add-photo.svg" alt="task picture" class="card__img">
            </label>
            <div class="card__colors-inner">
              <h3 class="card__colors-title">Color</h3>
              <div class="card__colors-wrap"></div>
            </div>
          </div>
        </div>
      </form>`;

    boardTasksBlock.appendChild(card);
  };

  const renderSeveralCard = (number = Math.round(Math.random() * MAX_COUNT_CARD)) => {
    boardTasksBlock.innerHTML = ``;

    for (let i = 0; i < number; i++) {
      renderCard();
    }
  };

  for (let i = 0, l = filterTypes.length; i < l; i++) {
    renderFilter(filterTypes[i]);
  }

  renderSeveralCard(START_COUNT_CARD);

}());
