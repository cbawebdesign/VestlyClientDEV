import { View, Text, ViewStyle, Pressable, TextStyle } from 'react-native';
import React from 'react';
import {
  fontPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
} from '../../config/utils';
import { PRIMARY_COLOR } from '../../config/constants';
import { act } from 'react-test-renderer';

interface PeriodSelectViewProps {
  onSelect: (item: string) => void;
  activePeriod: string;
}

const periods = ['1D', '5D', '1M', '6M', 'YTD', '1Y', '5Y'];

const PeriodSelectView = ({
  onSelect,
  activePeriod,
}: PeriodSelectViewProps) => {
  const renderPeriod = (item: string) => (
    <Pressable
      disabled={item === activePeriod}
      style={({ pressed }) => [
        style.button,
        {
          backgroundColor:
            pressed || item === activePeriod ? PRIMARY_COLOR : '#FFF',
        },
      ]}
      onPress={() => onSelect(item)}
      key={item}>
      {({ pressed }) => (
        <Text
          style={[
            style.buttonText,
            {
              color: pressed || item === activePeriod ? '#FFF' : PRIMARY_COLOR,
            },
          ]}>
          {item}
        </Text>
      )}
    </Pressable>
  );

  return <View style={style.mainView}>{periods.map(renderPeriod)}</View>;
};

const style: { mainView: ViewStyle; button: ViewStyle; buttonText: TextStyle } =
  {
    mainView: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: '#FFF',
      borderRadius: pixelSizeHorizontal(8),
      marginBottom: pixelSizeVertical(12.5),
      paddingVertical: pixelSizeHorizontal(8),
    },
    button: {
      width: pixelSizeHorizontal(40),
      height: pixelSizeVertical(30),
      borderWidth: 1,
      borderColor: PRIMARY_COLOR,
      borderRadius: pixelSizeVertical(30) / 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      color: PRIMARY_COLOR,
      fontSize: fontPixel(14),
    },
  };

export default PeriodSelectView;
