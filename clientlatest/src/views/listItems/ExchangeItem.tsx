import { View, Text, Dimensions, ViewStyle, TextStyle } from 'react-native';
import React from 'react';
import { scaleLinear } from 'd3-scale';
import { pixelSizeHorizontal, pixelSizeVertical } from '../../config/utils';
import CandleStickChart from '../charts/CandleStickChart';

const cardSize = Dimensions.get('window').width - pixelSizeHorizontal(50);
const chartSize = cardSize - pixelSizeVertical(30 + 12);

interface ExchangeItemProps {
  item: { title: string };
}

const getData = () => {
  const dataArray = [];

  return dataArray;
};

const DATA: {
  date: string;
  data: {
    '1. open': string;
    '2. high': string;
    '3. low': string;
    '4. close': string;
    '5. volume': string;
  };
}[] = getData();

const size = chartSize;
const candles = DATA.slice(0, 20);
const values = candles
  .map(candle => [
    Number(candle.data['3. low']),
    Number(candle.data['2. high']),
  ])
  .flat();
const domain = [Math.min(...values), Math.max(...values)];
const caliber = size / candles.length;
const scaleY = scaleLinear().domain(domain).range([size, 0]);
const scaleBody = scaleLinear()
  .domain([0, domain[1] - domain[0]])
  .range([0, size]);

const ExchangeItem = ({ item }: ExchangeItemProps) => {
  return (
    <View style={style.mainView}>
      <Text style={style.title}>{item.title}</Text>
      <View style={style.chartView}>
        <CandleStickChart
          {...{
            size,
            candles,
            caliber,
            scaleY,
            scaleBody,
            domain,
          }}
        />
      </View>
    </View>
  );
};

const style: { mainView: ViewStyle; title: TextStyle; chartView: ViewStyle } = {
  mainView: {
    flex: 1,
    width: cardSize,
    height: cardSize,
    borderRadius: pixelSizeHorizontal(8),
    backgroundColor: '#FFF',
    marginBottom: pixelSizeVertical(8),
  },
  title: {
    height: pixelSizeVertical(30),
  },
  chartView: {
    height: chartSize,
    width: chartSize,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
};

export default ExchangeItem;
