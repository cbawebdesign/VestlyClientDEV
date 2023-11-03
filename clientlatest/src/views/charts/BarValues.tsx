import { TextStyle, View, ViewStyle } from 'react-native';
import React from 'react';
import Text from '../text/Text';
import Animated, {
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import AnimateableText from 'react-native-animateable-text';
import {
  fontPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
} from '../../config/utils';
import GradientText from '../text/GradientText';

interface BarValuesProps {
  animatedProps: object[];
  opacity: SharedValue<number>;
  identifier: string;
}

const BarValues = ({ animatedProps, opacity, identifier }: BarValuesProps) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      ...style.valuesView,
      opacity: opacity.value,
    };
  });

  return (
    <View style={style.mainView}>
      <GradientText style={style.title}>{identifier}</GradientText>
      <View style={style.valuesView}>
        <View style={style.labelValueView}>
          <Text style={style.label} variant="bodySmall">
            High
          </Text>
          <Animated.View style={animatedStyle}>
            <AnimateableText
              numberOfLines={1}
              style={style.value}
              animatedProps={animatedProps[0]}
            />
          </Animated.View>
        </View>

        <View style={style.labelValueView}>
          <Text style={style.label} variant="bodySmall">
            Low
          </Text>
          <Animated.View style={animatedStyle}>
            <AnimateableText
              numberOfLines={1}
              style={style.value}
              animatedProps={animatedProps[1]}
            />
          </Animated.View>
        </View>
        <View style={style.labelValueView}>
          <Text style={style.label} variant="bodySmall">
            Start
          </Text>
          <Animated.View style={animatedStyle}>
            <AnimateableText
              numberOfLines={1}
              style={style.value}
              animatedProps={animatedProps[2]}
            />
          </Animated.View>
        </View>
        <View style={style.labelValueView}>
          <Text style={style.label} variant="bodySmall">
            End
          </Text>
          <Animated.View style={animatedStyle}>
            <AnimateableText
              numberOfLines={1}
              style={style.value}
              animatedProps={animatedProps[3]}
            />
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

const style: {
  mainView: ViewStyle;
  title: TextStyle;

  labelsView: ViewStyle;
  label: TextStyle;
  valuesView: ViewStyle;
  value: TextStyle;
  valuesDataView: ViewStyle;
  labelValueView: ViewStyle;
} = {
  mainView: {
    backgroundColor: '#FFF',
    borderRadius: pixelSizeHorizontal(8),
    padding: pixelSizeHorizontal(12.5),
    paddingTop: 0,
    marginBottom: pixelSizeVertical(12.5),
  },
  title: {
    fontSize: fontPixel(20),
    fontWeight: 'bold',
  },
  labelsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    textTransform: 'uppercase',
    opacity: 0.7,
    alignSelf: 'flex-end',
  },
  valuesView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  value: {
    color: '#000',
    // flex: 1,
    alignSelf: 'flex-end',
  },
  valuesDataView: {},
  labelValueView: {},
};

export default BarValues;
