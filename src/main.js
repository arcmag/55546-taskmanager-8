import {renderSeveralCard, START_COUNT_CARD} from './card';
import {FilterType, renderFilter} from './filter';

for (let i = 0, l = FilterType.length; i < l; i++) {
  renderFilter(FilterType[i]);
}

renderSeveralCard(START_COUNT_CARD);
