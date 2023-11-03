import React from 'react';
import { Dimensions, View, ViewStyle } from 'react-native';
import { DatePickerModal } from 'react-native-paper-dates';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { pixelSizeHorizontal } from '../../config/utils';

interface DatePickerProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  onDateSelect: (date: Date) => void;
}

const DatePicker = ({
  children,
  open,
  onClose,
  onDateSelect,
}: DatePickerProps) => {
  const onDismissSingle = React.useCallback(() => {
    onClose();
  }, [onClose]);

  const onConfirmSingle = React.useCallback(
    (params: { date: Date | undefined }) => {
      onClose();

      if (params.date) {
        onDateSelect(params.date);
      }
    },
    [onClose, onDateSelect],
  );

  return (
    <SafeAreaProvider style={style.safeAreaView}>
      <View style={style.mainView}>
        {children}
        <DatePickerModal
          locale="en"
          mode="single"
          visible={open}
          onDismiss={onDismissSingle}
          onConfirm={onConfirmSingle}
          presentationStyle="pageSheet"
          validRange={{ startDate: new Date() }}
        />
      </View>
    </SafeAreaProvider>
  );
};

const style: { safeAreaView: ViewStyle; mainView: ViewStyle } = {
  safeAreaView: {
    width: Dimensions.get('screen').width,
  },
  mainView: { flex: 1, padding: pixelSizeHorizontal(8) },
};

export default DatePicker;
