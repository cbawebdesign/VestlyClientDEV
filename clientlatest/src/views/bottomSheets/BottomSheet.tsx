import React, { useCallback, useMemo } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import GorhomBottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackgroundProps,
} from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { pixelSizeVertical } from '../../config/utils';

interface BottomSheetProps {
  bottomSheetRef: React.Ref<GorhomBottomSheet>;
  onClose: () => void;
  children: React.ReactNode;
}

const BottomSheet = ({
  bottomSheetRef,
  onClose,
  children,
}: BottomSheetProps) => {
  const insets = useSafeAreaInsets();
  const snapPoints = useMemo(
    () => [Dimensions.get('window').height - pixelSizeVertical(100)],
    [],
  );

  const handleSheetChange = React.useCallback(
    (index: number) => {
      if (index === -1) {
        onClose();
      }
    },
    [onClose],
  );

  const handleBackgroundPress = React.useCallback(() => {
    Keyboard.dismiss();
  }, []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackgroundProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );

  return (
    <GorhomBottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      onChange={handleSheetChange}
      handleStyle={style.handleStyle}
      backdropComponent={renderBackdrop}>
      <TouchableWithoutFeedback
        style={style.backgroundView}
        onPress={handleBackgroundPress}>
        <View
          style={[style.contentContainer, { paddingBottom: insets.bottom }]}>
          {children}
        </View>
      </TouchableWithoutFeedback>
    </GorhomBottomSheet>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  handleStyle: { backgroundColor: '#EEEEEE70' },
  backgroundView: { flex: 1 },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#EEEEEE70',
  },
});

export default BottomSheet;
