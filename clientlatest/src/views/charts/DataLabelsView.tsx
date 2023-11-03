import { View, ViewStyle, TextStyle } from 'react-native';
import React from 'react';
import Text from '../text/Text';
import { pixelSizeHorizontal, pixelSizeVertical } from '../../config/utils';

interface DateLabelsViewProps {
  dates: string[];
}

const DataLabelsView = ({ dates }: DateLabelsViewProps) => {
  const renderDateView = (item: string, index: number) => (
    <View key={index} style={style.dateView}>
      <Text style={style.label} variant="bodySmall">
        {item}
      </Text>
    </View>
  );
  return (
    <View style={style.mainView}>
      {dates.filter((_, index) => index % 5 === 2).map(renderDateView)}
    </View>
  );
};

const style: { mainView: ViewStyle; dateView: ViewStyle; label: TextStyle } = {
  mainView: {
    width: '100%',
    height: 1,
    backgroundColor: '#000',
    opacity: 0.7,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  dateView: {
    width: 1,
    height: pixelSizeVertical(5),
    backgroundColor: '#000',
  },
  label: {
    width: pixelSizeHorizontal(100),
    height: pixelSizeVertical(20),
    alignSelf: 'center',
    position: 'absolute',
    left: pixelSizeHorizontal(-25),
    bottom: pixelSizeVertical(-20),
  },
};

export default DataLabelsView;
