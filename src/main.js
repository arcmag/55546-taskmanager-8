import {renderCardsList, createCardsList, START_COUNT_CARD} from './card';
import {renderFiltersList} from './filter';

renderFiltersList();

renderCardsList(createCardsList(START_COUNT_CARD));
