import { call, put, all } from 'redux-saga/effects';
import deviceInfo from 'react-native-device-info';
import * as sagaActions from './actions';
import * as errorReducer from '../reducers/error';
import * as authReducer from '../reducers/auth';
import * as userReducer from '../reducers/user';
import * as gameReducer from '../reducers/games';
import * as CONFIG from '../config/constants';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { FetchResult, Game, User } from '../types/types';
import { sagaErrorHelper } from '../helpers/sagaHelper';

export interface Auth {
  type: typeof sagaActions.AUTH;
  payload: { user: FirebaseAuthTypes.User; accessToken: string };
}

const fetchAuth = (data: {
  user: FirebaseAuthTypes.User;
  accessToken: string;
}) =>
  fetch(`${CONFIG.API_HOST}/auth`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${data.accessToken}`,
      'Content-Type': 'application/json',
      'x-vestly-version': CONFIG.VERSTLY_VERSION.toString(),
      'x-app-version': deviceInfo.getVersion(),
      'x-device-brand': deviceInfo.getBrand(),
      'x-device-id': deviceInfo.getDeviceId(),
    },
    body: JSON.stringify({ data: data.user }),
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

export function* auth({ payload }: Auth) {
  try {
    yield put({
      type: authReducer.startFetching.type,
    });

    const result: FetchResult<{
      isNewUser: boolean;
      isNewRegistration: boolean;
      user: User;
      games: Game[];
      gameBalance: { publicGame: number; privateGame: number };
    }> = yield call(fetchAuth, payload);

    yield sagaErrorHelper(result, this);

    yield all([
      put({
        type: authReducer.auth.type,
        payload: payload.accessToken,
      }),
      put({
        type: userReducer.auth.type,
        payload: result.data,
      }),
      put({
        type: gameReducer.getGames.type,
        payload: result.data,
      }),
    ]);
  } catch (e) {
    console.log('Error', e);
    yield put({ type: e });
  }
}
