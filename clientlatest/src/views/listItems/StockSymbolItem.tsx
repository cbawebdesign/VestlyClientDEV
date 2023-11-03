import { Text, Pressable, ViewStyle, TextStyle } from 'react-native';
import React from 'react';
import { pixelSizeHorizontal, pixelSizeVertical } from '../../config/utils';
import { PRIMARY_COLOR } from '../../config/constants';

interface StockSymbolItemProps {
  item: { symbol: string; name: string };
  onPress: (item: string) => void;
}

const StockSymbolItem = ({ item, onPress }: StockSymbolItemProps) => {
  return (
    <Pressable
      style={({ pressed }) => [
        style.mainView,
        { backgroundColor: pressed ? PRIMARY_COLOR : '#FFF' },
      ]}
      onPress={() => onPress(item.symbol)}>
      {({ pressed }) => (
        <>
          <Text style={[style.symbol, { color: pressed ? '#FFF' : '#000' }]}>
            {item.symbol}
          </Text>
          <Text
            numberOfLines={1}
            style={[style.name, { color: pressed ? '#FFF' : '#000' }]}>
            {item.name}
          </Text>
        </>
      )}
    </Pressable>
  );
};

const style: { mainView: ViewStyle; symbol: TextStyle; name: TextStyle } = {
  mainView: {
    paddingHorizontal: pixelSizeHorizontal(12.5),
    paddingVertical: pixelSizeVertical(8),
    borderBottomColor: '#transparent',
    marginBottom: 2,
    flexDirection: 'row',
  },
  symbol: { width: pixelSizeHorizontal(100) },
  name: { flex: 1 },
};

export default StockSymbolItem;
