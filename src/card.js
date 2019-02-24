
const START_COUNT_CARD = 7;
const MAX_COUNT_CARD = 20;

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

export {renderSeveralCard, START_COUNT_CARD};
