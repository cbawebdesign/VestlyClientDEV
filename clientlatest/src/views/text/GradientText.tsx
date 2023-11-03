import React from 'react';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import Text from './Text';
import { PRIMARY_COLOR } from '../../config/constants';
import { TextStyle, View, ViewStyle } from 'react-native';
import { TextProps } from 'react-native-paper';

const GradientText = (props: TextProps<string>) => {
  return (
    <MaskedView
      maskElement={
        <View style={style.maskedView}>
          <Text {...props} style={[props.style, style.maskedText]} />
        </View>
      }>
      <LinearGradient
        colors={[PRIMARY_COLOR, '#000']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}>
        <Text {...props} style={[props.style, style.gradientText]} />
      </LinearGradient>
    </MaskedView>
  );
};

const style: {
  maskedView: ViewStyle;
  maskedText: TextStyle;
  gradientText: TextStyle;
} = {
  maskedView: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  maskedText: {
    color: '#000',
  },
  gradientText: { opacity: 0 },
};

export default GradientText;
