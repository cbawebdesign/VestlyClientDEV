import * as shape from 'd3-shape';
import React from 'react';
import {
  Animated,
  Dimensions,
  I18nManager,
  StyleSheet,
  View,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { StaticTabbar, tabHeight as height } from './StaticTabBar';
import { BottomTabsData } from './Tabs';
import { PRIMARY_COLOR } from '../../config/constants';
import {
  ParamListBase,
  TabNavigationState,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';

interface TabBarBottomProps {
  state: TabNavigationState<ParamListBase>;
  insets: EdgeInsets;
}

const width = Dimensions.get('window').width;
const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const tabsData = BottomTabsData;
const tabBarBackground = PRIMARY_COLOR;

const navigationHandler = (screen: string) => {
  console.log('screen', screen);
};
const textColor = 'white';

const tabWidth = width / tabsData.length;

// @ts-ignore
const left = shape
  .line()
  // @ts-ignore
  .x(d => d.x)
  // @ts-ignore
  .y(d => d.y)([
  { x: 0, y: 0 },
  { x: width - 20, y: 0 },
]);

// @ts-ignore
const tab = shape
  .line()
  // @ts-ignore
  .x(d => d.x)
  // @ts-ignore
  .y(d => d.y)
  .curve(shape.curveBasis)([
  { x: width / 1.1, y: 0 },
  { x: width / 1.01 + tabWidth / 19.5, y: 0 },
  { x: width + tabWidth / 6.5, y: 10 },
  {
    x: width + tabWidth / 3.9,
    y: tabWidth > 100 ? tabWidth / 3.2 : tabWidth / 2.5,
  },
  {
    x: width + tabWidth - tabWidth / 3.9,
    y: tabWidth > 100 ? tabWidth / 3.2 : tabWidth / 2.5,
  },
  { x: width + tabWidth - tabWidth / 6.5, y: 10 },
  { x: (width + tabWidth) * 1.01 - tabWidth / 19.5, y: 0 },
  { x: (width + tabWidth) * 1.1, y: 0 },
]);

// @ts-ignore
const right = shape
  .line()
  // @ts-ignore
  .x(d => d.x)
  // @ts-ignore
  .y(d => d.y)([
  { x: width, y: 0 },
  { x: width * 2, y: 0 },
  { x: width * 2, y: height },
  { x: 0, y: height },
  { x: 0, y: 0 },
]);

const d = `${left} ${tab} ${right}`;
const tabs = tabsData;
const value = new Animated.Value(I18nManager.isRTL ? width / 1.33 : -width);

export const TabBarBottom = ({ state, insets }: TabBarBottomProps) => {
  const routeName = getFocusedRouteNameFromRoute(state.routes[state.index]);

  // Hide tabbar on specified screens
  if (routeName === 'Game' || routeName === 'Buy') {
    return undefined;
  }

  return React.createElement(
    View,
    { style: { backgroundColor: 'transparent', marginLeft: 0 } },
    React.createElement(
      View,
      { style: { width: width + 10, height: height } },
      React.createElement(
        AnimatedSvg,
        {
          width: width * 2,
          height: height,
          style: {
            backgroundColor: 'transparent',
            transform: [{ translateX: value }],
          },
        },
        React.createElement(Path, {
          ...{ d },
          fill: tabBarBackground,
        }),
      ),
    ),
    React.createElement(
      View,
      { style: [StyleSheet.absoluteFill, { paddingTop: 4 }] },
      React.createElement(StaticTabbar, {
        ...{ value, tabs },
        navigate: (id: string) => navigationHandler(id),
        tabBarBackground: tabBarBackground,
        textColor: textColor,
      }),
    ),
    React.createElement(View, {
      style: {
        backgroundColor: PRIMARY_COLOR,
        width: Dimensions.get('window').width,
        paddingBottom: insets.bottom,
      },
    }),
  );
};

export default TabBarBottom;
