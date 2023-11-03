import React, { Fragment, useEffect, useState, useRef } from 'react';
import {
  Animated,
  Dimensions,
  I18nManager,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
const AnimatedView = Animated.createAnimatedComponent(View);

interface StaticTabbarProps {
  tabs: {
    id: string;
    title: string;
    icon: () => React.JSX.Element;
    activeIcon: () => React.JSX.Element;
  }[];
  value: Animated.Value;
  navigate: (screen: string) => void;
  tabBarBackground: string;
  textColor: string;
}

const { width } = Dimensions.get('window');

export const tabHeight = 64;
const duration = 300;

export const StaticTabbar = ({
  tabs,
  value,
  navigate,
  tabBarBackground,
  textColor,
}: StaticTabbarProps) => {
  const translateX = useRef(new Animated.Value(0)).current;

  const tabWidth = width / tabs.length;

  const [values, setValues] = useState<Animated.Value[]>([]);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  useEffect(() => {
    setValues(
      tabs.map((_, index: number) => new Animated.Value(index === 0 ? 1 : 0)),
    );
  }, [tabs]);

  const onNavigate = (index: number) => {
    Animated.sequence([
      //   ...values.map(v =>
      //     Animated.timing(v, {
      //       toValue: 0,
      //       duration: 1,
      //       useNativeDriver: true,
      //     }),
      //   ),
      Animated.parallel([
        Animated.timing(values[index], {
          toValue: 1,
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(value, {
          toValue: I18nManager.isRTL
            ? width / 1.33 - tabWidth * index
            : -width + tabWidth * index,
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: tabWidth * index,
          duration,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  };

  return React.createElement(
    View,
    { style: { flexDirection: 'row' } },
    tabs.map(({ id, title, icon: Icon }, index) => {
      const opacity = value.interpolate({
        inputRange: I18nManager.isRTL
          ? [
              width / 1.33 - tabWidth * (index + 1),
              width / 1.33 - tabWidth * index,
              width / 1.33 - tabWidth * (index - 1),
            ]
          : [
              -width + tabWidth * (index - 1),
              -width + tabWidth * index,
              -width + tabWidth * (index + 1),
            ],
        outputRange: [1, 0, 1],
        extrapolate: 'clamp',
      });

      return React.createElement(
        Fragment,
        { key: `icon-${index}` },
        React.createElement(
          TouchableWithoutFeedback,
          {
            onPress: () => {
              onNavigate(index);
              setActiveTabIndex(index);
              navigate(id);
            },
          },
          React.createElement(
            AnimatedView,
            {
              style: {
                flex: 1,
                height: tabHeight - 4,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                opacity,
              },
            },
            React.createElement(Icon, null),
            React.createElement(
              View,
              { style: { marginTop: 8 } },
              React.createElement(
                Text,
                {
                  style: {
                    color: textColor,
                    fontSize: 12,
                    textAlign: 'center',
                  },
                },
                title,
              ),
            ),
          ),
        ),
        index === 0 &&
          React.createElement(
            AnimatedView,
            {
              style: {
                position: 'absolute',
                top: -32,
                width: tabWidth,
                height: tabHeight,
                left: tabWidth * index,
                justifyContent: 'center',
                alignItems: 'center',
                transform: [{ translateX }],
              },
            },
            React.createElement(
              View,
              {
                style: {
                  height: tabWidth > 100 ? tabWidth / 2.25 : tabWidth / 1.6,
                  width: tabWidth > 100 ? tabWidth / 2.25 : tabWidth / 1.6,
                  borderRadius: 48,
                  backgroundColor: tabBarBackground,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              },
              React.createElement(tabs[activeTabIndex].activeIcon, null),
            ),
          ),
      );
    }),
  );
};
