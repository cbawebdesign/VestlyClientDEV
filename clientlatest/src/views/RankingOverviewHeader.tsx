import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { pixelSizeHorizontal, pixelSizeVertical } from '../config/utils';

const RankingOverviewHeader = () => {
  return (
    <View style={style.mainView}>
      <Text style={style.text}>USERNAME</Text>
      <Text style={style.text}>BALANCE</Text>
      <Text style={style.text}>CHANGE</Text>
    </View>
  );
};

const style = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    borderRadius: 4,
    marginVertical: 2,
    paddingHorizontal: pixelSizeHorizontal(8),
    paddingVertical: pixelSizeVertical(4),
  },
  text: {
    flex: 1,
  },
});

export default RankingOverviewHeader;
