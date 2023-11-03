import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { PRIMARY_COLOR } from '../../config/constants';
import { pixelSizeHorizontal, pixelSizeVertical } from '../../config/utils';

const StockItem = ({ item }) => {
  return (
    <View style={style.mainView}>
      <Text style={style.text}>{item.assetId}</Text>
      <Text style={style.text}>{item.quantity.toFixed(2)}</Text>
      <Text style={style.text}>{item.openPrice}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 4,
    marginVertical: 2,
    paddingHorizontal: pixelSizeHorizontal(8),
    paddingVertical: pixelSizeVertical(4),
  },
  text: {
    flex: 1,
    color: '#FFF',
  },
});

export default StockItem;
