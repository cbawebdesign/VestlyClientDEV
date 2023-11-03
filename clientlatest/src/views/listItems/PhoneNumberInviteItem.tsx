import {
  View,
  NativeSyntheticEvent,
  TextInputEndEditingEventData,
  TextStyle,
  ViewStyle,
} from 'react-native';
import React from 'react';
import { IconButton, TextInput } from 'react-native-paper';
import { pixelSizeVertical } from '../../config/utils';
import Text from '../text/Text';
import { ICON_COLOR, PRIMARY_COLOR } from '../../config/constants';
import { PhoneInputError } from '../../types/types';

interface PhoneNumberInviteItemProps {
  onInputFocus: () => void;
  value: string | undefined;
  onEndEditing: (
    event: NativeSyntheticEvent<TextInputEndEditingEventData>,
  ) => void;
  index: number;
  onDeletePress: (index: number) => void;
  error: string | undefined;
}

const PhoneNumberInviteItem = ({
  onInputFocus,
  value,
  onEndEditing,
  index,
  onDeletePress,
  error,
}: PhoneNumberInviteItemProps) => {
  const handleDeletePress = React.useCallback(() => {
    onDeletePress(index);
  }, [index, onDeletePress]);

  return (
    <View>
      <Text variant="labelLarge" style={style.label}>{`Player ${
        index + 1
      }`}</Text>
      <View style={style.innerView}>
        <TextInput
          mode="outlined"
          outlineColor={typeof error === 'string' ? 'red' : PRIMARY_COLOR}
          dense
          placeholder="Player Phone number"
          inputMode="tel"
          onFocus={onInputFocus}
          value={value}
          onEndEditing={onEndEditing}
          style={style.input}
          right={<TextInput.Icon icon="phone" color={PRIMARY_COLOR} />}
        />

        <IconButton
          icon="delete"
          iconColor={PRIMARY_COLOR}
          onPress={handleDeletePress}
        />
      </View>
      {typeof error === 'string' && (
        <Text style={style.errorText} variant="bodySmall">
          {PhoneInputError[error]}
        </Text>
      )}
    </View>
  );
};

const style: {
  mainView: ViewStyle;
  label: TextStyle;
  innerView: ViewStyle;
  input: ViewStyle;
  errorText: TextStyle;
} = {
  mainView: { flex: 1 },
  label: { marginTop: pixelSizeVertical(8) },
  innerView: { flexDirection: 'row', flex: 1 },
  input: {
    marginVertical: pixelSizeVertical(4),
    flex: 1,
  },
  errorText: {
    color: 'red',
  },
};

export default PhoneNumberInviteItem;
