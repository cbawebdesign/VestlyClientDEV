import { View, ViewStyle, StyleSheet } from 'react-native';
import React from 'react';
import Svg from 'react-native-svg';
import { scaleLinear } from 'd3-scale';
import Candle from './Candle';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  interpolate,
  useAnimatedProps,
  useDerivedValue,
  clamp,
} from 'react-native-reanimated';
import Label from './Label';
import {
  formatForCandleStickChart,
  pixelSizeHorizontal,
  pixelSizeVertical,
} from '../../config/utils';
import { ChartBar } from '../../types/types';
import BarValues from './BarValues';
import DataLabelsView from './DataLabelsView';
import PeriodSelectView from './PeriodSelectView';

type ContextType = {
  translateX: number;
  translateY: number;
};

interface CandleStickChartProps {
  size: number;
  candles: ChartBar[];
  identifier: string;
  onPeriodSelect: (item: string) => void;
  activePeriod: string;
}

const CandleStickChart = ({
  size,
  candles,
  identifier,
  onPeriodSelect,
  activePeriod,
}: CandleStickChartProps) => {
  //
  const values = candles
    .map(candle => [candle.Low, candle.High])
    .flat()
    .filter(item => item !== undefined);
  const domain = [Math.min(...values), Math.max(...values)];
  const caliber = size / candles.length;
  const scaleY = scaleLinear().domain(domain).range([size, 0]);
  const scaleBody = scaleLinear()
    .domain([0, domain[1] - domain[0]])
    .range([0, size]);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const startDate = useSharedValue('');
  const endDate = useSharedValue('');
  const opacity = useSharedValue(0);

  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (event, context) => {
      context.translateX = event.x;
      context.translateY = event.y;
      translateX.value = event.x;
      translateY.value = event.y;
      opacity.value = 1;
    },
    onActive: (event, context) => {
      const valueX = event.translationX + context.translateX;
      const valueY = event.translationY + context.translateY;

      const moduloValue = valueX % caliber;
      const subtractedValue = valueX - moduloValue;

      const addedValue = subtractedValue + caliber / 2;

      translateX.value = clamp(addedValue, caliber / 2, size - caliber / 2);
      translateY.value = clamp(valueY, 0, size);

      const index = Math.floor(translateX.value / caliber);

      startDate.value = candles[index].StartDateTime;
      endDate.value = candles[index].EndDateTime;
    },
    onEnd: () => {
      translateX.value = 0;
      translateY.value = 0;
      opacity.value = 0;
    },
  });

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

  const styleX = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
      ],
      opacity: opacity.value,
    };
  });

  const animatedTextHigh = useDerivedValue(() => {
    const value = interpolate(
      translateY.value,
      [0, size],
      [domain[1], domain[0]],
    );

    return formatForCandleStickChart(value);
  });
  const animatedTextLow = useDerivedValue(() => {
    const value = interpolate(
      translateY.value,
      [0, size],
      [domain[0], domain[1]],
    );

    return formatForCandleStickChart(value);
  });
  const animatedTextStart = useDerivedValue(() => {
    return startDate.value;
  });
  const animatedTextEnd = useDerivedValue(() => {
    return endDate.value;
  });

  const animatedPropsHigh = useAnimatedProps(() => {
    return {
      text: animatedTextHigh.value,
      // Here we use any because the text prop is not available in the type
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;
  });
  const animatedPropsLow = useAnimatedProps(() => {
    return {
      text: animatedTextLow.value,
    } as any;
  });
  const animatedPropsStart = useAnimatedProps(() => {
    return {
      text: animatedTextStart.value,
    } as any;
  });
  const animatedPropsEnd = useAnimatedProps(() => {
    return {
      text: animatedTextEnd.value,
    } as any;
  });

  return (
    <>
      <BarValues
        animatedProps={[
          animatedPropsHigh,
          animatedPropsLow,
          animatedPropsStart,
          animatedPropsEnd,
        ]}
        {...{ opacity, identifier }}
      />
      <PeriodSelectView onSelect={onPeriodSelect} activePeriod={activePeriod} />
      <View style={style.chartView}>
        <GestureHandlerRootView
          style={{
            width: size,
            height: size,
          }}>
          <Svg width={size} height={size}>
            {candles.map((candle, index) => (
              <Candle
                key={index}
                {...{ candle, caliber, scaleY, scaleBody, index }}
              />
            ))}
          </Svg>
          <PanGestureHandler minDist={0} onGestureEvent={panGestureEvent}>
            <Animated.View style={StyleSheet.absoluteFill}>
              <Animated.View style={styleY}>
                <View style={[style.indicatorView, { width: size }]} />
              </Animated.View>
              <Animated.View style={styleX}>
                <View style={[style.indicatorView, { height: size }]} />
              </Animated.View>
              <Label
                {...{
                  translateY,
                  opacity,
                  animatedProps: animatedPropsHigh,
                }}
              />
            </Animated.View>
          </PanGestureHandler>
          <DataLabelsView dates={candles.map(item => item.EndDateTime)} />
        </GestureHandlerRootView>
      </View>
    </>
  );
};

const style: {
  indicatorView: ViewStyle;
  chartView: ViewStyle;
} = {
  chartView: {
    backgroundColor: '#FFF',
    borderRadius: pixelSizeHorizontal(8),
    padding: pixelSizeHorizontal(12.5),
    paddingBottom: pixelSizeVertical(25),
    marginBottom: pixelSizeVertical(12.5),
  },
  indicatorView: {
    width: 1,
    borderColor: 'lightgrey',
    borderWidth: 1,
    borderStyle: 'dashed',
  },
};

export default CandleStickChart;
