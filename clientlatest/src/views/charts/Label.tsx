import React from 'react';
import { TextStyle, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  SharedValue,
} from 'react-native-reanimated';
import AnimateableText from 'react-native-animateable-text';

interface LabelProps {
  animatedProps: object;
  translateY: SharedValue<number>;
  opacity: SharedValue<number>;
}

export default ({ animatedProps, translateY, opacity }: LabelProps) => {
  const styleY = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: translateY.value,
        },
      ],
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View style={[style.mainView, styleY]}>
      <AnimateableText animatedProps={animatedProps} />
    </Animated.View>
  );
};

const style: { mainView: ViewStyle; text: TextStyle } = {
  mainView: {
    alignSelf: 'flex-end',
    backgroundColor: '#FEFFFF',
    borderRadius: 4,
    padding: 4,
    marginTop: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
  },
  text: { color: 'black', fontVariant: ['tabular-nums'] },
};
