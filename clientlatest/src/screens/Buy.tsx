import {
  Dimensions,
  View,
  ViewStyle,
  FlatList,
  Keyboard,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import TextInput from '../views/forms/TextInput';
import MainView from '../views/containers/MainView';
import { PRIMARY_COLOR } from '../config/constants';
import { useDispatch, useSelector } from 'react-redux';
import { sagaActions } from '../sagas/actions';
import CandleStickChart from '../views/charts/CandleStickChart';
import { RootState } from '../config/store';
import { pixelSizeHorizontal, pixelSizeVertical } from '../config/utils';
import { ChartBar } from '../types/types';
import StockSymbolItem from '../views/listItems/StockSymbolItem';
import { ActivityIndicator } from 'react-native-paper';
import BuyView from '../views/BuyView';

const size = Dimensions.get('screen').width - pixelSizeHorizontal(75);

const Buy = () => {
  const dispatch = useDispatch();
  const stocksSlice = useSelector((state: RootState) => state.stocks);

  const [activePeriod, setActivePeriod] = useState('1D');

  const candles = stocksSlice.ticker?.chartBars;

  const handleTickerSearch = React.useCallback(
    (text: string) =>
      dispatch(
        sagaActions.stockSymbolSearch({
          input: text,
        }),
      ),
    [dispatch],
  );

  const handlePeriodSelect = React.useCallback(
    (item: string) => {
      if (!stocksSlice.ticker) {
        return;
      }

      dispatch(
        sagaActions.stockSearch({
          input: stocksSlice.ticker.identifier,
          type: item,
        }),
      );

      setActivePeriod(item);
    },
    [dispatch, stocksSlice.ticker],
  );

  const handleStockSymbolPress = React.useCallback(
    (item: string) => {
      Keyboard.dismiss();

      dispatch(
        sagaActions.stockSearch({
          input: item,
          type: activePeriod,
        }),
      );
    },
    [dispatch, activePeriod],
  );

  const handleGetQuotePress = React.useCallback(() => {
    if (!stocksSlice.ticker) {
      return;
    }

    dispatch(
      sagaActions.getPurchaseQuote({ input: stocksSlice.ticker.identifier }),
    );
  }, [dispatch, stocksSlice.ticker]);

  const renderItem = ({ item, index }) => (
    <StockSymbolItem item={item} onPress={handleStockSymbolPress} />
  );

  return (
    <>
      <MainView>
        <View style={style.inputView}>
          <TextInput
            placeholder="Enter ticker symbol/name"
            onChangeText={handleTickerSearch}
            autoCapitalize="characters"
          />
        </View>
        {stocksSlice.fetching && (
          <ActivityIndicator animating={true} color={PRIMARY_COLOR} />
        )}
        {stocksSlice.tickers.length > 0 && (
          <FlatList
            data={stocksSlice.tickers}
            renderItem={renderItem}
            keyExtractor={item => item.symbol}
            keyboardShouldPersistTaps="always"
          />
        )}

        {stocksSlice.tickers.length === 0 && stocksSlice.ticker && (
          <ScrollView>
            <View style={style.tickerView}>
              <View style={style.chartView}>
                <CandleStickChart
                  {...{
                    size,
                    candles: candles as ChartBar[],
                    identifier: stocksSlice.ticker.identifier,
                    onPeriodSelect: handlePeriodSelect,
                    activePeriod,
                  }}
                />
              </View>
            </View>
          </ScrollView>
        )}
      </MainView>
      {stocksSlice.ticker && <BuyView onGetQuotePress={handleGetQuotePress} />}
    </>
  );
};

const style: {
  inputView: ViewStyle;
  input: ViewStyle;
  tickerView: ViewStyle;
  chartView: ViewStyle;
} = {
  inputView: {
    marginBottom: pixelSizeVertical(12.5),
  },
  input: {
    backgroundColor: '#FFF',
  },
  tickerView: {},
  chartView: {},
};

export default Buy;
