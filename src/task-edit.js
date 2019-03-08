import {createElement} from './util';

const COLORS_LIST = [
  `black`,
  `yellow`,
  `blue`,
  `green`,
  `pink`
];

const MONTHS_LIST = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`
];

class TaskEdit {
  constructor(data) {
    this._id = data.id;

    this._title = data.title;
    this._dueDate = data.dueDate;
    this._date = new Date(data.dueDate);
    this._tags = data.tags;
    this._picture = data.picture;
    this._repeatingDays = data.repeatingDays;
    this._color = data.color;

    this._element = null;
    this._onSubmit = null;
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();

    if (typeof this._onSubmit === `function`) {
      this._onSubmit();
    }
  }

  _isRepeated() {
    return Object.values(this._repeatingDays).some((it) => it);
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  get element() {
    return this._element;
  }

  get template() {

    const tagsString = [...this._tags].map((it) => {
      return `
        <span class="card__hashtag-inner">
          <input type="hidden" name="hashtag" value="${it}" class="card__hashtag-hidden-input">
          <button type="button" class="card__hashtag-name">#${it}</button>
          <button type="button" class="card__hashtag-delete"> delete</button>
        </span>`.trim();
    }).join(``);

    const weekDaysString = Object.keys(this._repeatingDays).map((it) => {
      return `
        <input
          class="visually-hidden card__repeat-day-input"
          type="checkbox"
          id="repeat-${it}-${this._id}"
          name="repeat"
          value="${it}" ${!this._repeatingDays[it] ? `` : `checked`}/>
        <label class="card__repeat-day" for="repeat-mo-${this._id}">${it}</label>`.trim();
    }).join(``);

    const colorsString = COLORS_LIST.map((it) => {
      return `
        <input
          type="radio"
          id="color-${it}-${this._id}"
          class="card__color-input
          card__color-input--${it}
          visually-hidden"
          name="color"
          value="${it}" ${it !== this._color ? `` : `checked`}/>
        <label for="color-${it}-${this._id}" class="card__color card__color--${it}">${it}</label>`.trim();
    }).join(``);

    return `
    <article class="card card--edit card--blue ${this._isRepeated() ? `card--repeat` : ``}">
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit">edit</button>
            <button type="button" class="card__btn card__btn--archive">archive</button>
            <button type="button" class="card__btn card__btn--favorites card__btn--disabled">favorites</button>
          </div>

          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <label>
              <textarea class="card__text" placeholder="Start typing your text here..." name="text">${this._title}</textarea>
            </label>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <button class="card__date-deadline-toggle" type="button">
                  date: <span class="card__date-status">${this._isRepeated() ? `yes` : `no`}</span>
                </button>

                <fieldset class="card__date-deadline" disabled>
                  <label class="card__input-deadline-wrap">
                    <input class="card__date" type="text" placeholder="${this._date.getDate() - 1} ${MONTHS_LIST[this._date.getMonth()]}" name="date" />
                  </label>

                  <label class="card__input-deadline-wrap">
                    <input class="card__time" type="text" placeholder="${this._date.getHours()}:${this._date.getMinutes()} PM" name="time" />
                  </label>
                </fieldset>

                <button class="card__repeat-toggle" type="button">
                  repeat: <span class="card__repeat-status">${this._isRepeated() ? `yes` : `no`}</span>
                </button>

                <fieldset class="card__repeat-days" disabled>
                  <div class="card__repeat-days-inner">
                    ${weekDaysString}
                  </div>
                </fieldset>
              </div>

              <div class="card__hashtag">
                <div class="card__hashtag-list">
                  ${tagsString}
                </div>

                <label>
                  <input type="text" class="card__hashtag-input" name="hashtag-input" placeholder="Type new hashtag here" />
                </label>
              </div>
            </div>

            <label class="card__img-wrap card__img-wrap--empty">
              <input type="file" class="card__img-input visually-hidden" name="img" />
            </label>

            <div class="card__colors-inner">
              <h3 class="card__colors-title">Color</h3>
              <div class="card__colors-wrap">
                ${colorsString}
              </div>
            </div>
          </div>

          <div class="card__status-btns">
            <button class="card__save" type="submit">save</button>
            <button class="card__delete" type="button">delete</button>
          </div>
        </div>
      </form>
    </article>`.trim();
  }

  cache() {
    this._form = this._element.querySelector(`.card__form`);
  }

  render() {
    this._element = createElement(this.template);
    this.cache();
    this.bind();
    return this._element;
  }

  unrender() {
    this.unbind();
    this._form = null;
    this._element = null;
  }

  bind() {
    this._eventSubmit = this._onSubmitButtonClick.bind(this);
    this._form.addEventListener(`submit`, this._eventSubmit);
  }

  unbind() {
    this._form.removeEventListener(`submit`, this._eventSubmit);
    this._eventSubmit = null;
    // Удаление обработчиков
  }

}

export {TaskEdit};
