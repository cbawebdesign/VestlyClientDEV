import React from 'react';
import {
  Button as PaperButton,
  ButtonProps,
  ActivityIndicator,
} from 'react-native-paper';
import { pixelSizeVertical } from '../../config/utils';
import { ViewStyle } from 'react-native';
import { PRIMARY_COLOR } from '../../config/constants';

const Button = (props: ButtonProps) => {
  if (props.mode === 'contained') {
    return (
      <PaperButton
        {...props}
        disabled={props.disabled || props.loading}
        buttonColor={PRIMARY_COLOR}
        textColor="#FFF"
        style={style}>
        {props.loading ? (
          <ActivityIndicator animating={true} color="#FFF" />
        ) : (
          props.children
        )}
      </PaperButton>
    );
  }

  return (
    <PaperButton
      {...props}
      disabled={props.disabled || props.loading}
      textColor={PRIMARY_COLOR}
      style={[style, props.style]}>
      {props.children}
    </PaperButton>
  );
};

const style: ViewStyle = {
  marginVertical: pixelSizeVertical(4),
  borderColor: PRIMARY_COLOR,
};

export default Button;
