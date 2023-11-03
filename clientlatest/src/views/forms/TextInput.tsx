import React from 'react';
import {
  TextInput as RNPaperTextInput,
  TextInputProps,
} from 'react-native-paper';
import { PRIMARY_COLOR } from '../../config/constants';
import { StyleSheet } from 'react-native';

interface Props extends TextInputProps {
  icon?: string;
}

const style = StyleSheet.create({
  contentStyle: {},
  textStyle: {
    backgroundColor: '#FFF',
  },
  outlineStyle: { backgroundColor: '#FFF' },
});

const TextInput = (props: Props) => {
  return (
    <RNPaperTextInput
      {...props}
      mode={props.mode || 'outlined'}
      dense
      right={
        props.icon ? <RNPaperTextInput.Icon icon={props.icon} /> : undefined
      }
      outlineColor={PRIMARY_COLOR}
      style={style.textStyle}
      contentStyle={style.contentStyle}
      outlineStyle={style.outlineStyle}
    />
  );
};

export default TextInput;
