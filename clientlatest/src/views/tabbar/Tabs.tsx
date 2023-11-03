import React from 'react';
import Svg, { Path } from 'react-native-svg';
import {
  Stocks,
  StocksLG,
  Rankings,
  RankingsLG,
  Settings,
  SettingsLG,
} from '../../config/icons';

export const BottomTabsData = [
  {
    id: 'games-tab',
    title: 'Games',
    icon: Stocks,
    activeIcon: StocksLG,
  },
  {
    id: 'rankings-tab',
    title: 'Rankings',
    icon: Rankings,
    activeIcon: RankingsLG,
  },
  {
    id: 'settings-tab',
    title: 'Settings',
    icon: Settings,
    activeIcon: SettingsLG,
  },
];
