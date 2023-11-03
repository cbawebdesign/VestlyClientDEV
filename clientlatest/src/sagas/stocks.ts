import { all, call, put, select } from 'redux-saga/effects';
import * as sagaActions from './actions';
import * as stocksReducer from '../reducers/stocks';
import * as gamesReducer from '../reducers/games';
import * as CONFIG from '../config/constants';
import { FetchResult, Game, Portfolio, Quote } from '../types/types';
import { sagaErrorHelper } from '../helpers/sagaHelper';

export interface StockSearch {
  type: typeof sagaActions.STOCK_SEARCH;
  payload: { input: string; type: string };
}

export interface GetPurchaseQuote {
  type: typeof sagaActions.GET_QUOTE;
  payload: { input: string };
}

export interface PurchaseStock {
  type: typeof sagaActions.OPEN_POSITION;
  payload: { identifier: string; positionSize: string };
}

const fetchLastTradingDate = (data: { type: string; accessToken: string }) =>
  fetch(`${CONFIG.API_HOST}/get-last-trading-date/${data.type}`, {
    method: 'get',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${data.accessToken}`,
    },
  })
    .then(async response => {
      const result = await response.json();
      if (response.ok) {
        return result;
      }

      return { status: response.status, message: result.message };
    })
    .catch(error => ({
      status: 503,
      message: error,
    }));

const fetchStockSymbolSearch = (data: { input: string }) =>
  fetch(`https://ticker-2e1ica8b9.now.sh/keyword/${data.input}`, {
    method: 'get',
    headers: {
      Accept: 'application/json',
    },
  })
    .then(async response => {
      const result = await response.json();
      if (response.ok) {
        return result;
      }

      return { status: response.status, message: result.message };
    })
    .catch(error => ({
      status: 503,
      message: error,
    }));

const fetchGetPurchaseQuote = (data: { input: string; accessToken: string }) =>
  fetch(`${CONFIG.API_HOST}/get-purchase-quote`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${data.accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data: data.input }),
  })
    .then(async response => {
      const result = await response.json();
      if (response.ok) {
        return result;
      }

      return { status: response.status, message: result.message };
    })
    .catch(error => ({
      status: 503,
      message: error,
    }));

const fetchOpenPosition = (data: {
  identifier: string;
  gameId: string;
  positionSize: string;
  accessToken: string;
}) =>
  fetch(`${CONFIG.API_HOST}/open-position`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${data.accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: {
        identifier: data.identifier,
        gameId: data.gameId,
        positionSize: data.positionSize,
      },
    }),
  })
    .then(async response => {
      const result = await response.json();
      if (response.ok) {
        return result;
      }

      return { status: response.status, message: result.message };
    })
    .catch(error => ({
      status: 503,
      message: error,
    }));

const fetchStockSearch = (data: {
  input: string;
  precision: string;
  type: string;
  startTime: string;
  endTime: string;
}) =>
  fetch(
    `https://superquotes.xignite.com/xSuperQuotes.json/GetChartBars?IdentifierType=Symbol&Identifier=${data.input}&StartTime=${data.startTime}&EndTime=${data.endTime}&Precision=${data.precision}&Period=${data.units}&AdjustmentMethod=All&IncludeExtended=False&_Token=${CONFIG.XNITE_TOKEN}`,
    {
      method: 'get',
      headers: {
        Accept: 'application/json',
      },
    },
  )
    .then(async response => {
      const result = await response.json();
      if (response.ok) {
        return result;
      }

      return { status: response.status, message: result.message };
    })
    .catch(error => ({
      status: 503,
      message: error,
    }));

export function* stockSymbolSearch({ payload }: StockSearch) {
  try {
    yield put({
      type: stocksReducer.startFetching.type,
    });

    const result: { symbol: string; name: string } = yield call(
      fetchStockSymbolSearch,
      payload,
    );

    yield put({
      type: stocksReducer.searchSymbol.type,
      payload: result,
    });
  } catch (e) {
    console.log('Error', e);
    yield put({ type: e });
  }
}

export function* stockSearch({ payload }: StockSearch) {
  const accessToken: string = yield select(state => state.auth.accessToken);

  try {
    yield all([
      put({
        type: stocksReducer.startFetching.type,
      }),
      put({
        type: stocksReducer.resetTickers.type,
      }),
    ]);

    let startTime = '';
    let endTime = '';

    const tradingDataResult: FetchResult<{
      startDate: string;
      precision: string;
      units: string;
    }> = yield call(fetchLastTradingDate, {
      type: payload.type,
      accessToken,
    });

    yield sagaErrorHelper(tradingDataResult, this);

    startTime = tradingDataResult.data.startDate;
    endTime = new Date(Date.now()).toLocaleString('en-US');

    const payloadObject = {
      ...payload,
      precision: tradingDataResult.data.precision,
      units: tradingDataResult.data.units,
      startTime,
      endTime,
    };

    const result: any = yield call(fetchStockSearch, payloadObject);

    yield sagaErrorHelper(result, this);

    const slicedChartBarsArray = result.ChartBars.slice(
      result.ChartBars.length - 20,
      result.ChartBars.length,
    );

    const chartBars = new Array(20)
      .fill({ EndDateTime: '' })
      .map((_, index: number) => {
        if (index < slicedChartBarsArray.length) {
          return slicedChartBarsArray[index];
        } else {
          const times = [
            '9:40 AM',
            '9:40 AM',
            '9:40 AM',
            '9:40 AM',
            '9:40 AM',
            '11:40 AM',
            '11:40 AM',
            '11:40 AM',
            '11:40 AM',
            '11:40 AM',
            '1:40 PM',
            '1:40 PM',
            '1:40 PM',
            '1:40 PM',
            '1:40 PM',
            '3:40 PM',
            '3:40 PM',
            '3:40 PM',
            '3:40 PM',
            '3:40 PM',
          ];
          return { EndDateTime: times[index] };
        }
      });

    yield put({
      type: stocksReducer.searchTicker.type,
      payload: {
        identifier: result.Identifier,
        chartBars: chartBars,
        type: payload.type,
      },
    });
  } catch (e) {
    console.log('Error', e);
    yield put({ type: e });
  }
}

export function* getPurchaseQuote({ payload }: GetPurchaseQuote) {
  const accessToken: string = yield select(state => state.auth.accessToken);

  try {
    yield put({
      type: stocksReducer.startFetching.type,
    });

    const result: FetchResult<{
      quote: Quote;
    }> = yield call(fetchGetPurchaseQuote, {
      ...payload,
      accessToken,
    });

    yield sagaErrorHelper(result, this);

    yield put({
      type: stocksReducer.getPurchaseQuote.type,
      payload: result.data.quote,
    });
  } catch (e) {
    console.log('Error', e);
    yield put({ type: e });
  }
}

export function* openPosition({ payload }: PurchaseStock) {
  const accessToken: string = yield select(state => state.auth.accessToken);
  const currentGame: Game = yield select(state => state.games.currentGame);
  const user: Game = yield select(state => state.user.user);

  try {
    yield put({
      type: stocksReducer.startFetching.type,
    });

    const result: FetchResult<{
      game: Game;
    }> = yield call(fetchOpenPosition, {
      identifier: payload.identifier,
      positionSize: payload.positionSize,
      gameId: currentGame._id as string,
      accessToken,
    });

    yield sagaErrorHelper(result, this);

    yield all([
      put({
        type: gamesReducer.openPosition.type,
        payload: { game: result.data.game, userId: user._id },
      }),
      put({
        type: stocksReducer.getPurchaseQuote.type,
        payload: undefined,
      }),
    ]);
  } catch (e) {
    console.log('Error', e);
    yield put({ type: e });
  }
}
