import { put, cancel } from 'redux-saga/effects';
import * as authReducer from '../reducers/auth';
import * as errorReducer from '../reducers/error';
import { Task } from 'redux-saga';

export function* sagaErrorHelper(
  result: {
    status?: number;
    message?: string;
    messages?: {
      id: string;
      type: string;
      title: string;
      message: string;
      buttons: {
        label: string;
        action: string;
        analytics: string;
      }[];
    }[];
  },
  saga: Task,
) {
  if (result.status && result.status === 401) {
    yield put({
      type: authReducer.logout.type,
    });

    yield cancel(saga);
  } else if (result.status && result.status > 401) {
    yield put({
      type: errorReducer.Error.type,
      payload: result.message || result.messages,
    });
    yield put({
      type: authReducer.Error.type,
    });

    yield cancel(saga);
  }
}
