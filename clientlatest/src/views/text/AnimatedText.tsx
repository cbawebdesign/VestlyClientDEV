import React from 'react';
import type { TextInputProps, TextProps as RNTextProps } from 'react-native';
import { StyleSheet, TextInput } from 'react-native';
import Animated, { SharedValue, AnimatedProps } from 'react-native-reanimated';

interface TextProps extends Omit<TextInputProps, 'value' | 'style'> {
  text: SharedValue<string>;
  style?: AnimatedProps<RNTextProps>['style'];
  animatedProps: object;
}

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const AnimatedText = (props: TextProps) => {
  const { style, text, animatedProps, ...rest } = props;

  return (
    <AnimatedTextInput
      underlineColorAndroid="transparent"
      editable={false}
      value={text}
      style={[styles.baseStyle, style || undefined]}
      {...rest}
      {...{ animatedProps }}
    />
  );
};

const styles = StyleSheet.create({
  baseStyle: {
    color: 'black',
  },
});

export default AnimatedText;
