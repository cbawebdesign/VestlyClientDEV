import {
  View,
  ViewStyle,
  TextStyle,
  TextInputEndEditingEventData,
  NativeSyntheticEvent,
  Keyboard,
} from 'react-native';
import React, { useState } from 'react';
import Button from './buttons/Button';
import Text from './text/Text';
import { PRIMARY_COLOR, TEXT_COLOR } from '../config/constants';
import { pixelSizeHorizontal, pixelSizeVertical } from '../config/utils';
import { SegmentedButtons } from 'react-native-paper';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import PhoneNumberInviteItem from './listItems/PhoneNumberInviteItem';
import GradientText from './text/GradientText';
import TextInput from './forms/TextInput';
import { Game } from '../types/types';

interface GameSetupView {
  onOpenDatePickerPress: () => void;
  onDurationChange: (value: string) => void;
  onCreateGamePress: () => void;
  loading: boolean;
  onAddPhoneNumber: () => void;
  values: Game;
  onPhoneNumberChange: (text: string, index: number) => void;
  onPhoneNumberDeletePress: (index: number) => void;
  onNameChange: (
    event: NativeSyntheticEvent<TextInputEndEditingEventData>,
  ) => void;
  disabled: boolean;
  phoneNumberError: { phoneNumber: string; message: string } | undefined;
}

const GameSetupView = ({
  onOpenDatePickerPress,
  onDurationChange,
  onCreateGamePress,
  loading,
  onAddPhoneNumber,
  values,
  onPhoneNumberChange,
  onPhoneNumberDeletePress,
  onNameChange,
  disabled,
  phoneNumberError,
}: GameSetupView) => {
  const [inputFocused, setInputFocused] = useState<boolean>(false);

  const handleInputFocus = React.useCallback(
    () => setInputFocused(true),
    [setInputFocused],
  );

  const renderPhoneNumberItem = ({ index }: { index: number }) => (
    <PhoneNumberInviteItem
      onInputFocus={handleInputFocus}
      value={inputFocused ? undefined : values.players[index].phoneNumber}
      error={
        values.players[index].phoneNumber === phoneNumberError?.phoneNumber
          ? phoneNumberError.message
          : undefined
      }
      onEndEditing={(
        event: NativeSyntheticEvent<TextInputEndEditingEventData>,
      ) => {
        onPhoneNumberChange(event.nativeEvent.text, index);
        setInputFocused(false);
      }}
      index={index}
      onDeletePress={onPhoneNumberDeletePress}
    />
  );

  return (
    <View style={style.mainView}>
      <GradientText style={style.title}>Game Setup</GradientText>
      <View style={style.innerView}>
        <View style={style.bodyView}>
          <View style={style.labelDataColumnView}>
            <Text variant="labelLarge" style={style.label}>
              GAME NAME
            </Text>
            <TextInput
              value={values.name}
              onEndEditing={onNameChange}
              onFocus={handleInputFocus}
            />
          </View>
          <View style={style.labelDataRowView}>
            <Text variant="labelLarge" style={style.label}>
              START DATE
            </Text>
            <Button
              onPress={onOpenDatePickerPress}
              uppercase={false}
              style={style.button}
              mode="outlined">
              {values.startAt
                ? values.startAt.toLocaleDateString()
                : 'Pick single date'}
            </Button>
          </View>
          <View style={style.labelDataColumnView}>
            <Text style={style.label} variant="labelLarge">
              DURATION
            </Text>
            <SegmentedButtons
              density="regular"
              onValueChange={onDurationChange}
              value={values.duration || ''}
              buttons={buttons}
            />
          </View>
          <View style={[style.labelDataColumnView, style.dataScrollView]}>
            <Text variant="labelLarge" style={style.label}>
              INVITE PLAYERS
            </Text>
            <BottomSheetFlatList
              data={values.players.map(item => item.phoneNumber) as string[]}
              renderItem={renderPhoneNumberItem}
              keyExtractor={(index: string) => index}
              ListFooterComponent={
                <Button
                  mode="text"
                  textColor={TEXT_COLOR}
                  onPress={onAddPhoneNumber}
                  disabled={
                    values.players[values.players.length - 1]?.phoneNumber
                      ?.length === 0
                  }>
                  Add Phone Number
                </Button>
              }
            />
          </View>
        </View>
        {!inputFocused && (
          <Button
            uppercase
            mode="contained"
            onPress={onCreateGamePress}
            disabled={disabled}
            loading={loading}>
            Create Game
          </Button>
        )}
      </View>
    </View>
  );
};

const style: {
  mainView: ViewStyle;
  title: TextStyle;
  innerView: ViewStyle;
  bodyView: ViewStyle;
  labelDataRowView: ViewStyle;
  labelDataColumnView: ViewStyle;
  dataScrollView: ViewStyle;
  label: TextStyle;
  button: ViewStyle;
  segmentedButton: ViewStyle;
  buttonLabel: TextStyle;
} = {
  mainView: { flex: 1 },
  title: { marginBottom: pixelSizeHorizontal(16) },
  innerView: { flex: 1, justifyContent: 'space-between' },
  bodyView: { flex: 1 },
  labelDataRowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: pixelSizeVertical(25),
  },
  labelDataColumnView: {
    marginBottom: pixelSizeVertical(25),
  },
  dataScrollView: {
    flex: 1,
  },
  label: { marginBottom: pixelSizeVertical(8), color: PRIMARY_COLOR },
  button: { borderColor: PRIMARY_COLOR },
  segmentedButton: {
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
  },
  buttonLabel: {
    color: PRIMARY_COLOR,
  },
};

const buttonProps = {
  style: style.segmentedButton,
  labelStyle: style.buttonLabel,
  checkedColor: PRIMARY_COLOR,
  showSelectedCheck: true,
};

const buttons = [
  {
    value: '1 week',
    label: 'week',
    ...buttonProps,
  },
  {
    value: '1 month',
    label: 'month',
    ...buttonProps,
  },
  {
    value: '3 months',
    label: 'months',
    ...buttonProps,
  },
];

export default GameSetupView;
