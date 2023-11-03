import {
  View,
  ViewStyle,
  Dimensions,
  StyleSheet,
  TextStyle,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-paper/src/components/Icon';
import { Game, Player } from '../../types/types';
import { pixelSizeHorizontal, pixelSizeVertical } from '../../config/utils';
import { Incognito } from '../../config/icons';
import { PRIMARY_COLOR, GLOBAL_SHADOW } from '../../config/constants';
import Text from '../text/Text';
import { Card } from 'react-native-paper';

interface PrivateGameItem {
  item: Game;
  index: number;
  onGamePress: (item: Game) => void;
  portfolioBalance: number | undefined;
}

const cardSize = Dimensions.get('window').width / 2;

const PrivateGameItem = ({
  item,
  onGamePress,
  portfolioBalance,
}: PrivateGameItem) => {
  const renderAvatar = (playerItem: Player, index: number) => {
    if (playerItem.avatar) {
      return (
        <Icon
          key={index}
          size={pixelSizeHorizontal(20)}
          source={playerItem.avatar}
        />
      );
    }

    return (
      <View
        key={index}
        style={[
          style.iconView,
          { marginLeft: index > 0 ? -pixelSizeHorizontal(10) : 0 },
        ]}>
        <Incognito color="#FFF" scale={1} />
      </View>
    );
  };

  return (
    <Card
      mode="outlined"
      style={[
        style.mainView,
        {
          borderColor: item.isEnabled ? PRIMARY_COLOR : '#EEEEEE',
          ...GLOBAL_SHADOW,
        },
      ]}
      contentStyle={style.cardContentView}
      onPress={() => onGamePress(item)}>
      <Card.Content>
        <View style={style.innerView}>
          <Text variant="bodySmall">NAME OF GAME</Text>
          <Text style={style.name} variant="titleSmall" numberOfLines={1}>
            {item.name || item._id}
          </Text>
        </View>
        <View style={style.innerView}>
          <Text variant="bodySmall">PLAYERS</Text>
          <View style={style.iconsView}>{item.players.map(renderAvatar)}</View>
        </View>
        <View style={style.innerView}>
          <Text variant="bodySmall">PORTFOLIO VALUE</Text>
          <Text variant="titleMedium">{`$${portfolioBalance?.toFixed(
            2,
          )}`}</Text>
        </View>
      </Card.Content>
    </Card>
  );
};

const style: {
  mainView: ViewStyle;
  cardContentView: ViewStyle;
  innerView: ViewStyle;
  name: TextStyle;
  iconsView: ViewStyle;
  iconView: ViewStyle;
} = {
  mainView: {
    width: cardSize,
    height: cardSize,
    marginRight: pixelSizeHorizontal(8),
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderRadius: pixelSizeHorizontal(10),
    marginBottom: pixelSizeVertical(25),
  },
  cardContentView: {},
  innerView: {
    marginVertical: pixelSizeHorizontal(4),
  },
  name: {
    alignItems: 'flex-end',
  },
  iconsView: {
    flexDirection: 'row',
    padding: pixelSizeHorizontal(8),
  },
  iconView: {
    width: pixelSizeHorizontal(30),
    height: pixelSizeHorizontal(30),
    borderRadius: pixelSizeHorizontal(15),
    backgroundColor: PRIMARY_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#FFF',
  },
};

export default PrivateGameItem;
