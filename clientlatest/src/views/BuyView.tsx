import { View, StyleSheet } from 'react-native';
import React from 'react';
import Button from './buttons/Button';
import { pixelSizeVertical } from '../config/utils';

interface BuyViewProps {
  onGetQuotePress: () => void;
}

const BuyView = ({ onGetQuotePress }: BuyViewProps) => {
  return (
    <View style={style.mainView}>
      <Button
        onPress={onGetQuotePress}
        mode="outlined"
        textColor="#FFF"
        buttonColor="#FFF">
        Get Purchase Quote
      </Button>
    </View>
  );
};

const style = StyleSheet.create({
  mainView: {
    padding: pixelSizeVertical(12.5),
  },
});

export default BuyView;
