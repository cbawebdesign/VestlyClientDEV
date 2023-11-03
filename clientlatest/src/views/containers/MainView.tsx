import { ImageBackground, StyleSheet } from 'react-native';
import React from 'react';
import { pixelSizeHorizontal } from '../../config/utils';
import { BACKGROUND_MESH } from '../../config/constants';

interface MainViewProps {
  children: React.ReactNode;
  fullScreen?: boolean;
}

const MainView = ({ children, fullScreen }: MainViewProps) => {
  if (fullScreen) {
    return (
      <ImageBackground source={BACKGROUND_MESH} style={style.fullScreenView}>
        {children}
      </ImageBackground>
    );
  }

  return (
    <ImageBackground source={BACKGROUND_MESH} style={style.paddedView}>
      {children}
    </ImageBackground>
  );
};

const style = StyleSheet.create({
  fullScreenView: { flex: 1, paddingVertical: pixelSizeHorizontal(12.5) },
  paddedView: {
    flex: 1,
    padding: pixelSizeHorizontal(12.5),
  },
});

export default MainView;
