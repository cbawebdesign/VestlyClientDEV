import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { Game } from '../types/types';

export const ERROR = 'ERROR';
export const AUTH = 'AUTH';
export const GET_GAMES = 'GET_GAMES';
export const CREATE_GAME = 'CREATE_GAME';
export const GET_GAME = 'GET_GAME';
export const STOCK_SYMBOL_SEARCH = 'STOCK_SYMBOL_SEARCH';
export const STOCK_SEARCH = 'STOCK_SEARCH';
export const GET_QUOTE = 'GET_QUOTE';
export const OPEN_POSITION = 'OPEN_POSITION';

export const sagaActions = {
  error: (payload: { message: string }) => ({
    type: ERROR,
    payload,
  }),
  auth: (payload: { user: FirebaseAuthTypes.User; accessToken: string }) => ({
    type: AUTH,
    payload,
  }),
  getGames: (payload: { userId: string }) => ({
    type: GET_GAMES,
    payload,
  }),
  getGame: (payload: { gameId: string }) => ({
    type: GET_GAME,
    payload,
  }),
  createGame: (payload: Game) => ({
    type: CREATE_GAME,
    payload,
  }),

  stockSymbolSearch: (payload: { input: string }) => ({
    type: STOCK_SYMBOL_SEARCH,
    payload,
  }),
  stockSearch: (payload: { input: string; type: string }) => ({
    type: STOCK_SEARCH,
    payload,
  }),
  getPurchaseQuote: (payload: { input: string }) => ({
    type: GET_QUOTE,
    payload,
  }),
  openPosition: (payload: { identifier: string; positionSize: string }) => ({
    type: OPEN_POSITION,
    payload,
  }),
};
