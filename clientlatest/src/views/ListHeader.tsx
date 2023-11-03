import { View } from 'react-native';
import React from 'react';
import Text from './text/Text';
import { pixelSizeVertical } from '../config/utils';

interface ListHeaderProps {
  title: string;
}

const ListHeader = ({ title }: ListHeaderProps) => {
  return (
    <View style={style}>
      <Text variant="bodySmall">{title}</Text>
    </View>
  );
};

const style = {
  marginVertical: pixelSizeVertical(4),
};

export default ListHeader;
