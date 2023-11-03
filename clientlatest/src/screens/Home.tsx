import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../config/store';
import { pixelSizeHorizontal, pixelSizeVertical } from '../config/utils';
import MainView from '../views/containers/MainView';
import Text from '../views/text/Text';
import { PRIMARY_COLOR } from '../config/constants';
import PrivateGameItem from '../views/listItems/PrivateGameItem';
import { Game } from '../types/types';
import { ScrollView } from 'react-native-gesture-handler';
import Button from '../views/buttons/Button';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routes/HomeStackScreen';
import TitleView from '../views/TitleView';
import { sagaActions } from '../sagas/actions';
import { GLOBAL_SHADOW } from '../config/constants';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home = ({ navigation }: HomeProps) => {
  const dispatch = useDispatch();
  const gamesSlice = useSelector((state: RootState) => state.games);
  const userSlice = useSelector((state: RootState) => state.user);

  const handleGamePress = React.useCallback(
    (item: Game) => {
      dispatch(sagaActions.getGame({ gameId: item._id as string }));
      navigation.navigate('Game');
    },
    [navigation, dispatch],
  );

  const renderItem = ({ item, index }: { item: Game; index: number }) => (
    <PrivateGameItem
      key={index}
      item={item}
      index={index}
      onGamePress={handleGamePress}
      portfolioBalance={
        item.players.find(
          playerItem => playerItem.userId === userSlice.user?._id,
        )?.balance
      }
    />
  );

  useEffect(() => {
    if (gamesSlice.currentGame) {
      navigation.navigate('Game');
    }
  }, [navigation, gamesSlice.currentGame]);

  return (
    <MainView fullScreen>
      <ScrollView
        contentContainerStyle={style.mainView}
        showsVerticalScrollIndicator={false}>
        {gamesSlice.gameBalance && (
          <TitleView
            balances={[
              gamesSlice.gameBalance.publicGame,
              gamesSlice.gameBalance.privateGame,
            ]}
          />
        )}

        <View style={[style.cardView]}>
          <View style={style.labelView}>
            <Text style={style.labelStyle} variant="labelLarge">
              WEEKLY GAME
            </Text>
            <Button mode="text" onPress={() => null}>
              View All
            </Button>
          </View>
          <View style={style.mainGameCardView}>
            <Text variant="bodyLarge">CURRENTLY NOT ENROLLED</Text>
            <Button mode="outlined" style={style.button}>
              ENROLL
            </Button>
          </View>
        </View>

        <View style={[style.cardView, style.privateGamesCardView]}>
          <View style={[style.labelView, style.privateGameLabelView]}>
            <Text style={style.labelStyle} variant="labelLarge">
              PORTFOLIOS
            </Text>
            <Button mode="text" onPress={() => null}>
              View All
            </Button>
          </View>
          <FlatList
            contentContainerStyle={style.contentContainerStyle}
            data={gamesSlice.games}
            renderItem={renderItem}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    </MainView>
  );
};

const style = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  cardView: {
    borderRadius: pixelSizeHorizontal(8),
    marginVertical: pixelSizeVertical(8),
  },
  mainGameCardView: {
    height: pixelSizeVertical(150),
    backgroundColor: '#FFF',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    width: Dimensions.get('window').width - pixelSizeHorizontal(50),
    marginHorizontal: pixelSizeHorizontal(25),
    ...GLOBAL_SHADOW,
    borderRadius: pixelSizeHorizontal(8),
  },
  button: { borderColor: PRIMARY_COLOR },
  privateGamesCardView: {
    marginLeft: 0,
  },
  contentContainerStyle: {
    paddingLeft: pixelSizeHorizontal(25),
  },
  labelView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: pixelSizeHorizontal(25),
  },
  privateGameLabelView: {},
  labelStyle: {
    paddingBottom: pixelSizeHorizontal(10),
    opacity: 0.8,
    fontWeight: 'bold',
  },
});

export default Home;
