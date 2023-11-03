import { call, put, select } from 'redux-saga/effects';
import * as sagaActions from './actions';
import * as gameReducer from '../reducers/games';
import * as CONFIG from '../config/constants';
import { FetchResult, Game, User } from '../types/types';
import { sagaErrorHelper } from '../helpers/sagaHelper';

export interface GetGames {
  type: typeof sagaActions.CREATE_GAME;
  payload: { userId: string };
}

export interface GetGame {
  type: typeof sagaActions.GET_GAME;
  payload: { gameId: string };
}

export interface CreateGame {
  type: typeof sagaActions.CREATE_GAME;
  payload: Game;
}

const fetchGetGames = (data: { userId: string; accessToken: string }) =>
  fetch(`${CONFIG.API_HOST}/get-games/${data.userId}`, {
    method: 'get',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${data.accessToken}`,
      'Content-Type': 'application/json',
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

const fetchGetGame = (data: { gameId: string; accessToken: string }) =>
  fetch(`${CONFIG.API_HOST}/get-game/${data.gameId}`, {
    method: 'get',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${data.accessToken}`,
      'Content-Type': 'application/json',
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

const fetchCreateGame = (data: { game: Game; accessToken: string }) =>
  fetch(`${CONFIG.API_HOST}/create-game`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${data.accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data: data.game }),
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

export function* getGames({ payload }: GetGames) {
  const accessToken: string = yield select(state => state.auth.accessToken);

  try {
    yield put({
      type: gameReducer.startFetching.type,
    });

    const result: FetchResult<{
      games: Game[];
    }> = yield call(fetchGetGames, { ...payload, accessToken });

    yield sagaErrorHelper(result, this);

    yield put({
      type: gameReducer.getGames.type,
      payload: result.data.games,
    });
  } catch (e) {
    console.log('Error', e);
    yield put({ type: e });
  }
}

export function* getGame({ payload }: GetGame) {
  const accessToken: string = yield select(state => state.auth.accessToken);
  const currentGame: Game | undefined = yield select(
    state => state.games.currentGame,
  );
  const user: User | undefined = yield select(state => state.user.user);

  if (payload.gameId === currentGame?._id) {
    return;
  }

  try {
    yield put({
      type: gameReducer.startFetching.type,
    });

    const result: FetchResult<{
      game: Game;
    }> = yield call(fetchGetGame, { ...payload, accessToken });

    yield sagaErrorHelper(result, this);

    yield put({
      type: gameReducer.getGame.type,
      payload: { game: result.data.game, userId: user?._id },
    });
  } catch (e) {
    console.log('Error', e);
    yield put({ type: e });
  }
}

export function* createGame({ payload }: CreateGame) {
  const accessToken: string = yield select(state => state.auth.accessToken);

  try {
    yield put({
      type: gameReducer.startFetching.type,
    });

    const result: FetchResult<{
      game: Game;
    }> = yield call(fetchCreateGame, { game: payload, accessToken });

    if (result.message) {
      yield put({
        type: gameReducer.setPhoneNumberError.type,
        payload: result,
      });

      return;
    }

    yield sagaErrorHelper(result, this);

    yield put({
      type: gameReducer.createGame.type,
      payload: result.data.game,
    });
  } catch (e) {
    console.log('Error', e);
    yield put({ type: e });
  }
}
