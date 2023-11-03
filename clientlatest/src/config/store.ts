import { configureStore } from '@reduxjs/toolkit';
import error from '../reducers/error';
import auth from '../reducers/auth';
import user from '../reducers/user';
import games from '../reducers/games';
import stocks from '../reducers/stocks';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import rootSaga from '../sagas/index';

const sagaMiddleware = createSagaMiddleware();

const middleware =
  process.env.NODE_ENV === 'development'
    ? [sagaMiddleware, logger]
    : [sagaMiddleware];

const store = configureStore({
  reducer: {
    error,
    auth,
    user,
    games,
    stocks,
  },
  middleware,
});

sagaMiddleware.run(rootSaga);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
