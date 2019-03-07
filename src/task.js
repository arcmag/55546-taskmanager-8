import {util} from './util';

class Task {
  constructor(data) {
    this._title = data.title;
    this._dueDate = data.dueDate;
    this._tags = data.tags;
    this._picture = data.picture;
    this._repeatingDays = data.repeatingDays;

    this._element = null;
    this._state = {
      // Состояние компонента
    };

    this._onEdit = null;
  }

  _isRepeated() {
    return Object.values(this._repeatingDays).some((it) => it === true);
  }

  _onEditButtonClick() {
    if (typeof this._onEdit === `function`) {
      this._onEdit();
    }
  }

  get element() {
    return this._element;
  }

  set onEdit(fn) {
    this._onEdit = fn;
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
          id="repeat-${it}-5"
          name="repeat"
          value="${it}" ${!this._repeatingDays[it] ? `` : `checked`}/>
        <label class="card__repeat-day" for="repeat-mo-5">${it}</label>`.trim();
    }).join(``);

    const colorsString = `black yellow blue green pink`.split(` `).map((it) => {
      return `
        <input
          type="radio"
          id="color-${it}-5"
          class="card__color-input
          card__color-input--${it}
          visually-hidden"
          name="color"
          value="${it}" ${it !== `green` ? `` : `checked`}/>
        <label for="color-${it}-5" class="card__color card__color--${it}">${it}</label>`.trim();
    }).join(``);

    return `
    <article class="card card--blue ${this._isRepeated() ? `card--repeat` : ``}">
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
                  date: <span class="card__date-status">no</span>
                </button>

                <fieldset class="card__date-deadline" disabled>
                  <label class="card__input-deadline-wrap">
                    <input class="card__date" type="text" placeholder="23 September" name="date" />
                  </label>

                  <label class="card__input-deadline-wrap">
                    <input class="card__time" type="text" placeholder="11:15 PM" name="time" />
                  </label>
                </fieldset>

                <button class="card__repeat-toggle" type="button">
                  repeat: <span class="card__repeat-status">no</span>
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
    this._btnEdit = this._element.querySelector(`.card__btn--edit`);
  }

  bind() {
    this._btnEdit.addEventListener(`click`, this._onEditButtonClick.bind(this));
  }

  render() {
    this._element = util.createElement(this.template);
    this.cache();
    this.bind();
    return this._element;
  }

  unbind() {
    this._btnEdit.removeEventListener(`click`, this._onEditButtonClick.bind(this));
  }

  unrender() {
    this.unbind();
    this._element = null;
  }

}

export {Task};
