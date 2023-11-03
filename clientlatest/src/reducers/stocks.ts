import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChartBar, Quote } from '../types/types';
import { getChartLocaleDateString } from '../config/utils';

interface StocksState {
  fetching: boolean;
  ticker:
    | {
        identifier: string;
        chartBars: ChartBar[];
      }
    | undefined;
  tickers: { symbol: string; name: string }[];
  quote: Quote | undefined;
}

const initialState: StocksState = {
  fetching: false,
  ticker: undefined,
  tickers: [],
  quote: undefined,
};

export const stocksSlice = createSlice({
  name: 'stocks',
  initialState,
  reducers: {
    startFetching: state => {
      state.fetching = true;
    },
    searchSymbol: (
      state,
      action: PayloadAction<
        {
          symbol: string;
          name: string;
        }[]
      >,
    ) => {
      state.tickers = action.payload;
      state.fetching = false;
    },
    searchTicker: (
      state,
      action: PayloadAction<{
        identifier: string;
        chartBars: ChartBar[];
        type: string;
      }>,
    ) => {
      state.ticker = {
        ...action.payload,
        chartBars: action.payload.chartBars.map(item => ({
          ...item,
          StartDateTime: getChartLocaleDateString(
            action.payload.type,
            item.StartDateTime,
          ),
          EndDateTime: getChartLocaleDateString(
            action.payload.type,
            item.EndDateTime,
            !item.StartDateTime,
          ),
        })),
      };

      state.fetching = false;
    },
    getPurchaseQuote: (state, action: PayloadAction<Quote | undefined>) => {
      state.quote = action.payload;
      state.fetching = false;
    },
    resetTickers: state => {
      state.tickers = [];
    },
    Error: state => {
      state.fetching = false;
    },
  },
});

export const {
  startFetching,
  searchSymbol,
  searchTicker,
  getPurchaseQuote,
  resetTickers,
  Error,
} = stocksSlice.actions;

export default stocksSlice.reducer;
