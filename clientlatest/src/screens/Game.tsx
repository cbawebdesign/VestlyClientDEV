import { View, FlatList, StyleSheet } from 'react-native';
import React, { useLayoutEffect } from 'react';
import MainView from '../views/containers/MainView';
import TitleView from '../views/TitleView';
import { pixelSizeHorizontal, pixelSizeVertical } from '../config/utils';
import { useSelector } from 'react-redux';
import { RootState } from '../config/store';
import Text from '../views/text/Text';
import Button from '../views/buttons/Button';
import StockItem from '../views/listItems/StockItem';
import PortfolioOverviewHeader from '../views/PortfolioOverviewHeader';
import RankingOverviewHeader from '../views/RankingOverviewHeader';
import { ActivityIndicator } from 'react-native-paper';
import { PRIMARY_COLOR } from '../config/constants';
import { GLOBAL_SHADOW } from '../config/constants';

const Game = ({ navigation }) => {
  const gamesSlice = useSelector((state: RootState) => state.games);
  const userSlice = useSelector((state: RootState) => state.user);

  const handleBuyPress = React.useCallback(() => {
    navigation.navigate('Buy');
  }, [navigation]);

  const renderItem = ({ item, index }) => <StockItem key={index} item={item} />;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: gamesSlice.currentGame?.name || gamesSlice.currentGame?._id,
    });
  }, [navigation, gamesSlice]);

  if (gamesSlice.fetching) {
    return (
      <MainView>
        <ActivityIndicator animating={true} color={PRIMARY_COLOR} />
      </MainView>
    );
  }

  return (
    <MainView>
      {typeof gamesSlice.currentPlayer?.balance === 'number' && (
        <TitleView balances={[gamesSlice.currentPlayer.balance]} isDetail />
      )}
      <View style={style.buySellView}>
        <Button mode="outlined" onPress={handleBuyPress}>
          BUY
        </Button>
        <Button mode="outlined">SELL</Button>
      </View>
      <View style={style.outerCardView}>
        <Text style={style.labelStyle} variant="labelLarge">
          PORTFOLIO OVERVIEW
        </Text>
        <View style={style.innerCardView}>
          <FlatList
            ListHeaderComponent={PortfolioOverviewHeader}
            data={
              gamesSlice.currentGame?.players.find(
                item => item.userId === userSlice?.user?._id,
              )?.portfolio?.positions || []
            }
            renderItem={renderItem}
          />
        </View>
      </View>
      <View style={style.outerCardView}>
        <Text style={style.labelStyle} variant="labelLarge">
          PLAYER RANKINGS
        </Text>
        <View style={style.innerCardView}>
          <FlatList
            ListHeaderComponent={RankingOverviewHeader}
            data={[]}
            renderItem={renderItem}
          />
        </View>
      </View>
    </MainView>
  );
};
const style = StyleSheet.create({
  buySellView: {
    marginVertical: pixelSizeVertical(8),
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '75%',
    alignSelf: 'center',
  },
  outerCardView: {
    marginTop: pixelSizeVertical(25),
    marginBottom: pixelSizeVertical(25),
    flex: 1,
  },
  innerCardView: {
    backgroundColor: '#FEFEFE',
    padding: pixelSizeHorizontal(12.5),
    borderRadius: pixelSizeHorizontal(8),
    ...GLOBAL_SHADOW,
  },
  labelStyle: {
    paddingBottom: pixelSizeHorizontal(10),
    opacity: 0.8,
    fontWeight: 'bold',
  },
});

export default Game;
