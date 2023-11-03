import { takeEvery } from 'redux-saga/effects';
import * as sagaActions from './actions';
import { auth } from './auth';
import { createGame, getGame, getGames } from './games';
import {
  getPurchaseQuote,
  openPosition,
  stockSearch,
  stockSymbolSearch,
} from './stocks';

export default function* rootSaga() {
  yield takeEvery(sagaActions.AUTH, auth);
  yield takeEvery(sagaActions.GET_GAMES, getGames);
  yield takeEvery(sagaActions.GET_GAME, getGame);
  yield takeEvery(sagaActions.CREATE_GAME, createGame);
  yield takeEvery(sagaActions.STOCK_SYMBOL_SEARCH, stockSymbolSearch);
  yield takeEvery(sagaActions.STOCK_SEARCH, stockSearch);
  yield takeEvery(sagaActions.GET_QUOTE, getPurchaseQuote);
  yield takeEvery(sagaActions.OPEN_POSITION, openPosition);
}
