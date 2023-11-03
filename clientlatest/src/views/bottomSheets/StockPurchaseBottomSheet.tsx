import { Dimensions, StyleSheet, View } from 'react-native';
import React from 'react';
import GradientText from '../text/GradientText';
import Text from '../text/Text';
import { PRIMARY_COLOR } from '../../config/constants';
import { pixelSizeHorizontal, pixelSizeVertical } from '../../config/utils';
import TextInput from '../forms/TextInput';
import Button from '../buttons/Button';
import { Quote } from '../../types/types';

interface StockPurchaseBottomSheetProps {
  portfolioBalance: number;
  quote: Quote;
  onPurchasePress: () => void;
  onPurchaseValueChange: (text: string) => void;
  positionSizeValue: string;
  loading: boolean;
}

const getMarketType = (type: string | null) => {
  if (!type) {
    return 'ACTIVE TRADING HOURS';
  }
  if (type === 'preMarket') {
    return 'PRE-MARKET';
  }

  return 'POST-MARKET';
};

const StockPurchaseBottomSheet = ({
  portfolioBalance,
  quote,
  onPurchasePress,
  onPurchaseValueChange,
  positionSizeValue,
  loading,
}: StockPurchaseBottomSheetProps) => {
  const balanceAfterPurchase = React.useMemo(() => {
    if (positionSizeValue.length > 0 && positionSizeValue !== '0') {
      return `$${(
        portfolioBalance -
        quote.ask * Number(positionSizeValue)
      ).toFixed(2)}`;
    }

    return `$${portfolioBalance.toFixed(2)}`;
  }, [portfolioBalance, positionSizeValue, quote]);

  return (
    <View style={style.mainView}>
      <View style={style.titleView}>
        <GradientText>{quote.identifier}</GradientText>
        <Text variant="bodySmall">{quote.name}</Text>
        <Text variant="bodySmall">{quote.market}</Text>
      </View>

      <View style={style.positionView}>
        <View style={style.balanceView}>
          <Text style={style.dataItemLabel} variant="bodyMedium">
            PORTFOLIO BALANCE:
          </Text>
          <Text variant="bodyMedium">{` $${portfolioBalance.toFixed(2)}`}</Text>
        </View>

        <View style={style.mainPurchaseView}>
          <View style={style.marketTypeView}>
            <Text style={style.marketType} variant="bodyMedium">
              {getMarketType(quote.extendedHoursType)}
            </Text>
          </View>

          <View style={style.dataView}>
            <View style={style.dataItemView}>
              <Text style={style.dataItemLabel} variant="bodySmall">
                ASK PRICE
              </Text>
              <Text variant="bodyMedium">{`$${quote.ask.toFixed(2)}`}</Text>
            </View>
            <View style={style.dataItemView}>
              <Text style={style.dataItemLabel} variant="bodySmall">
                LAST
              </Text>
              <Text variant="bodyMedium">{`$${quote.last.toFixed(2)}`}</Text>
            </View>
            <View style={style.dataItemView}>
              <Text style={style.dataItemLabel} variant="bodySmall">
                PREV. CLOSE
              </Text>
              <Text variant="bodyMedium">{`$${quote.previousClose.toFixed(
                2,
              )}`}</Text>
            </View>
            <View style={style.dataItemView}>
              <Text style={style.dataItemLabel} variant="bodySmall">
                CHANGE
              </Text>
              <Text
                variant="bodyMedium"
                style={{
                  color: quote.percentChange >= 0 ? 'green' : 'red',
                }}>{`${quote.percentChange.toFixed(2)}%`}</Text>
            </View>
          </View>
        </View>
        <View style={style.inputView}>
          <TextInput
            label="Enter position size"
            // icon="currency-usd"
            keyboardType="number-pad"
            onChangeText={onPurchaseValueChange}
          />
        </View>
        <View style={style.balanceView}>
          <Text style={style.dataItemLabel} variant="bodyMedium">
            PORTFOLIO BALANCE AFTER PURCHASE:
          </Text>
          <Text variant="bodyMedium">
            {balanceAfterPurchase || `$${portfolioBalance}`}
          </Text>
        </View>
      </View>
      <View style={style.buttonView}>
        <Button
          mode="contained"
          onPress={onPurchasePress}
          loading={loading}
          disabled={loading}>
          OPEN POSITION
        </Button>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  mainView: {
    flex: 1,
    width: Dimensions.get('window').width,
    padding: pixelSizeHorizontal(12.5),
  },
  titleView: {
    marginBottom: pixelSizeVertical(25),
    alignItems: 'center',
  },
  positionView: { flex: 1 },
  balanceView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: pixelSizeVertical(12.5),
  },
  mainPurchaseView: {
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
    padding: 4,
    marginBottom: pixelSizeVertical(12.5),
    borderRadius: pixelSizeHorizontal(8),
  },
  marketTypeView: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: pixelSizeVertical(4),
    borderBottomWidth: 1,
    backgroundColor: PRIMARY_COLOR,
    marginBottom: pixelSizeVertical(8),
    borderRadius: pixelSizeHorizontal(4),
  },
  marketType: {
    color: '#FFF',
  },
  dataView: {
    flexDirection: 'row',
  },
  dataItemView: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 4,
  },
  dataItemLabel: {
    opacity: 0.7,
    marginBottom: 4,
  },
  inputView: {
    marginBottom: pixelSizeVertical(12.5),
  },
  buttonView: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
});

export default StockPurchaseBottomSheet;
