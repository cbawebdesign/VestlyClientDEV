import React from 'react';
import { Text as PaperText, TextProps } from 'react-native-paper';
import { TEXT_COLOR } from '../../config/constants';

export const Text = (props: TextProps<any>) => (
  <PaperText
    {...props}
    style={[style, props.style]}
    variant={props.variant || 'displayMedium'}>
    {props.children}
  </PaperText>
);

const style = { color: TEXT_COLOR };

export default Text;
