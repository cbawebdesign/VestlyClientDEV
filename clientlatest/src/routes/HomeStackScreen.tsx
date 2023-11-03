import * as React from 'react';
import {
  StackNavigationOptions,
  StackScreenProps,
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import Home from '../screens/Home';
import { IconButton } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { initNewGame } from '../reducers/games';
import Game from '../screens/Game';
import { Close, Incognito, NewGame } from '../config/icons';
import { RouteProp } from '@react-navigation/native';
import Buy from '../screens/Buy';
import { GameType } from '../types/types';

export type RootStackParamList = {
  Home: { onNewGamePress: () => void };
  Game: undefined;
  Buy: undefined;
};

type HomeOptionsProps = StackScreenProps<RootStackParamList, 'Home'>;
type GameOptionsProps = StackScreenProps<RootStackParamList, 'Game'>;

const Stack = createStackNavigator<RootStackParamList>();

const homeScreenOptions = ({ route }: HomeOptionsProps) => ({
  headerLeft: () => (
    <IconButton
      icon={() => <Incognito />}
      iconColor="black"
      size={20}
      onPress={() => null}
    />
  ),
  headerRight: () => (
    <IconButton
      icon={() => <NewGame />}
      iconColor="black"
      size={20}
      onPress={route.params.onNewGamePress}
    />
  ),
});

const gameScreenOptions: (props: {
  route: RouteProp<RootStackParamList, 'Game'>;
  navigation: any;
}) => StackNavigationOptions = ({ navigation }: GameOptionsProps) => ({
  headerLeft: () => (
    <IconButton
      icon={() => <Close />}
      iconColor="black"
      size={20}
      onPress={() => navigation.goBack()}
    />
  ),
  cardOverlayEnabled: false,
});

const HomeStackScreen = () => {
  const dispatch = useDispatch();

  const handleNewGamePress = () => {
    dispatch(
      initNewGame({
        startAt: undefined,
        duration: undefined,
        players: [],
        type: GameType.PRIVATE,
      }),
    );
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerShadowVisible: false,
        headerTitle: '',
      }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={homeScreenOptions}
        initialParams={{ onNewGamePress: handleNewGamePress }}
      />

      <Stack.Group
        screenOptions={{
          presentation: 'modal',
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}>
        <Stack.Screen
          name="Game"
          component={Game}
          options={gameScreenOptions}
        />
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          presentation: 'card',
          cardOverlayEnabled: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}>
        <Stack.Screen name="Buy" component={Buy} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default HomeStackScreen;
