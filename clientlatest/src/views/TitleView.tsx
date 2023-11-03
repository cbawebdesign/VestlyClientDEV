import { View, ViewStyle, TextStyle } from 'react-native';
import React from 'react';
import GradientText from './text/GradientText';
import Text from './text/Text';
import { PRIMARY_COLOR } from '../config/constants';
import {
  fontPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
} from '../config/utils';

interface TitleViewProps {
  balances: number[];
  isDetail?: boolean;
}

const getSubTitle = (index: number, isDetail?: boolean) => {
  if (isDetail) {
    return 'GAME BALANCE';
  }

  if (index === 0) {
    return 'WEEKLY GAME BALANCE';
  }

  return 'PRIVATE GAME BALANCE';
};

const TitleView = ({ balances, isDetail }: TitleViewProps) => {
  const renderBalanceView = (item: number, index: number) => (
    <View key={index} style={style.titleSubView}>
      <GradientText style={style.balanceText} variant="titleLarge">
        {`$${item.toFixed(2)}`}
      </GradientText>
      <Text style={style.balanceLabel} variant="bodySmall">
        {getSubTitle(index, isDetail)}
      </Text>
    </View>
  );

  return <View style={style.titleView}>{balances.map(renderBalanceView)}</View>;
};

const style: {
  titleView: ViewStyle;
  titleSubView: ViewStyle;
  balanceText: TextStyle;
  balanceLabel: TextStyle;
  cardView: ViewStyle;
  mainGameCardView: ViewStyle;
  button: ViewStyle;
  privateGamesCardView: ViewStyle;
  labelView: ViewStyle;
  labelStyle: TextStyle;
} = {
  titleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: pixelSizeVertical(8),
  },
  titleSubView: {
    flex: 1,
    alignItems: 'center',
  },
  balanceText: {
    fontWeight: 'bold',
    fontSize: fontPixel(30),
    color: PRIMARY_COLOR,
  },
  balanceLabel: { opacity: 0.5, fontSize: fontPixel(11) },
  cardView: {
    flex: 1,
    borderRadius: pixelSizeHorizontal(8),
    marginVertical: pixelSizeVertical(25),
  },
  mainGameCardView: {
    width: '100%',
    height: pixelSizeVertical(150),
    backgroundColor: '#FFF',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: { borderColor: PRIMARY_COLOR },
  privateGamesCardView: {
    // flex: 1,
  },
  labelView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  labelStyle: {
    paddingBottom: pixelSizeHorizontal(10),
    opacity: 0.8,
    fontWeight: 'bold',
  },
};

export default TitleView;
