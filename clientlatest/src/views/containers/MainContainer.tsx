import React from 'react';

import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  ViewStyle,
  SafeAreaView,
  ImageBackground,
  ImageStyle,
  StatusBar,
} from 'react-native';
import { BACKGROUND_MESH } from '../../config/constants';
import { pixelSizeHorizontal } from '../../config/utils';

interface MainContainerProps {
  children: React.ReactNode;
  enableKeyboardAvoiding?: boolean;
  tabbarEnabled?: boolean;
  onBackgroundPress?: () => void;
}

const MainContainer = ({
  children,
  enableKeyboardAvoiding = false,
  tabbarEnabled = false,
  onBackgroundPress,
}: MainContainerProps) => {
  const onPress = React.useCallback(() => {
    if (onBackgroundPress) {
      onBackgroundPress();
    }

    Keyboard.dismiss();
  }, [onBackgroundPress]);

  if (tabbarEnabled) {
    return (
      <>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={style.mainView}>
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle="dark-content"
          />
          <ImageBackground
            source={BACKGROUND_MESH}
            style={style.innerViewWithTabbar}
            imageStyle={style.backgroundImage}>
            {/* <SafeAreaView style={style.safeAreaView} /> */}
            {children}
          </ImageBackground>
        </KeyboardAvoidingView>
      </>
    );
  }

  if (enableKeyboardAvoiding) {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={style.mainView}>
        <TouchableWithoutFeedback
          style={{
            flex: 1,
            // alignItems: 'center',
          }}
          onPress={onPress}>
          <ImageBackground
            source={BACKGROUND_MESH}
            style={style.innerView}
            imageStyle={style.backgroundImage}>
            {children}
          </ImageBackground>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }

  return (
    <ImageBackground
      source={BACKGROUND_MESH}
      style={style.innerView}
      imageStyle={style.backgroundImage}>
      <SafeAreaView style={style.safeAreaView}>{children}</SafeAreaView>
    </ImageBackground>
  );
};

const style: {
  safeAreaView: ViewStyle;
  mainView: ViewStyle;
  innerView: ViewStyle;
  innerViewWithTabbar: ViewStyle;
  backgroundImage: ImageStyle;
} = {
  safeAreaView: {
    flex: 1,
    justifyContent: 'center',
  },
  mainView: {
    flex: 1,
  },
  innerView: {
    flex: 1,
    // justifyContent: 'center',
  },
  innerViewWithTabbar: {
    flex: 1,
    paddingBottom: 0,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
};

export default MainContainer;
