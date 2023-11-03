import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Game, Player, Portfolio, User } from '../types/types';

interface GameState {
  fetching: boolean;
  games: Game[];
  currentGame: Game | undefined;
  newGame: Game | undefined;
  phoneNumberError:
    | {
        phoneNumber: string;
        message: string;
      }
    | undefined;
  gameBalance:
    | {
        publicGame: number;
        privateGame: number;
      }
    | undefined;
  currentPlayer: Player | undefined;
}

const initialState: GameState = {
  fetching: false,
  games: [],
  currentGame: undefined,
  newGame: undefined,
  phoneNumberError: undefined,
  gameBalance: undefined,
  currentPlayer: undefined,
};

export const gameSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    startFetching: state => {
      state.fetching = true;
    },
    getGames: (
      state,
      action: PayloadAction<{
        games: Game[];
        gameBalance: { publicGame: number; privateGame: number };
        user: User;
      }>,
    ) => {
      state.games = action.payload.games;
      state.gameBalance = action.payload.gameBalance;
      state.fetching = false;
    },
    getGame: (state, action: PayloadAction<{ game: Game; userId: string }>) => {
      state.currentGame = action.payload.game;
      state.currentPlayer = action.payload.game.players.find(
        item => item.userId === action.payload.userId,
      );
      state.fetching = false;
    },
    initNewGame: (state, action: PayloadAction<Game | undefined>) => {
      state.newGame = action.payload;
    },
    createGame: (state, action: PayloadAction<Game>) => {
      state.currentGame = action.payload;
      state.newGame = undefined;
      state.games = [...state.games, action.payload];
      state.fetching = false;
    },
    setCurrentGame: (state, action: PayloadAction<Game>) => {
      state.currentGame = action.payload;
    },
    openPosition: (
      state,
      action: PayloadAction<{ game: Game; userId: string }>,
    ) => {
      if (!state.currentGame) {
        return;
      }

      state.currentGame = action.payload.game;
      state.currentPlayer = action.payload.game.players.find(
        item => item.userId === action.payload.userId,
      );
      state.games;
    },
    setPhoneNumberError: (
      state,
      action: PayloadAction<{ message: string; data: string }>,
    ) => {
      state.phoneNumberError = {
        phoneNumber: action.payload.data,
        message: action.payload.message,
      };
      state.fetching = false;
    },

    Error: state => {
      state.fetching = false;
    },
  },
});

export const {
  startFetching,
  getGames,
  getGame,
  initNewGame,
  createGame,
  setCurrentGame,
  setPhoneNumberError,
  openPosition,
  Error,
} = gameSlice.actions;

export default gameSlice.reducer;
