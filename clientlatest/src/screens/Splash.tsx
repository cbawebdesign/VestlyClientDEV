import React from 'react';
import MainContainer from '../views/containers/MainContainer';
import { ActivityIndicator } from 'react-native-paper';
import { LOGO, PRIMARY_COLOR } from '../config/constants';
import { Image, StyleSheet } from 'react-native';
import { pixelSizeHorizontal, pixelSizeVertical } from '../config/utils';

const Splash = () => (
  <MainContainer>
    <Image source={LOGO} style={style.logo} resizeMode="contain" />
    <ActivityIndicator animating={true} color={PRIMARY_COLOR} />
  </MainContainer>
);

const style = StyleSheet.create({
  logo: {
    width: pixelSizeHorizontal(200),
    alignSelf: 'center',
    marginBottom: pixelSizeVertical(16),
  },
});

export default Splash;
