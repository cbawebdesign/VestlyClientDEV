import React, { useRef, useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackScreen from '../routes/HomeStackScreen';
import Settings from './Settings';
import Compose from './Compose';
import MainContainer from '../views/containers/MainContainer';
import BottomSheet from '../views/bottomSheets/BottomSheet';
import GorhomBottomSheet from '@gorhom/bottom-sheet';
import DatePicker from '../views/pickers/DatePicker';
import GameSetupView from '../views/GameSetupView';
import { useDispatch, useSelector } from 'react-redux';
import { sagaActions } from '../sagas/actions';
import { RootState } from '../config/store';
import {
  Keyboard,
  NativeSyntheticEvent,
  TextInputEndEditingEventData,
} from 'react-native';
import TabBarBottom from '../views/tabbar/TabbarBottom';
import { DEV_PHONENUMBER } from '../config/constants';
import { Game, GameType, Player } from '../types/types';
import { initNewGame } from '../reducers/games';
import { getPurchaseQuote } from '../reducers/stocks';
import StockPurchaseBottomSheet from '../views/bottomSheets/StockPurchaseBottomSheet';

const Tab = createBottomTabNavigator();

const TabBar = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={TabBarBottom}>
      <Tab.Screen name="HomeStackScreen" component={HomeStackScreen} />
      <Tab.Screen name="Compose" component={Compose} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

const Main = () => {
  const bottomSheetRef = useRef<GorhomBottomSheet>(null);
  const dispatch = useDispatch();
  const gamesSlice = useSelector((state: RootState) => state.games);
  const stocksSlice = useSelector((state: RootState) => state.stocks);

  const [openDatePicker, setOpenDatePicker] = React.useState<boolean>(false);

  const [newGame, setNewGame] = useState<Game>({
    name: 'Testing New Game',
    players: [{ phoneNumber: DEV_PHONENUMBER }],
    duration: '1 week',
    startAt: new Date(),
    type: GameType.PRIVATE,
  });
  const [positionSize, setPositionSize] = useState<string>('');

  const toggleOpenDatePickerPress = React.useCallback(() => {
    setOpenDatePicker(prev => !prev);
  }, [setOpenDatePicker]);

  const handleNameChange = React.useCallback(
    (event: NativeSyntheticEvent<TextInputEndEditingEventData>) => {
      setNewGame(prev => ({ ...prev, name: event.nativeEvent.text } as Game));
    },
    [setNewGame],
  );

  const handleDateSelect = React.useCallback(
    (date: Date) => {
      setNewGame(prev => ({ ...prev, startAt: date } as Game));
    },
    [setNewGame],
  );

  const handleDurationChange = React.useCallback(
    (value: string) => {
      setNewGame(prev => ({ ...prev, duration: value } as Game));
    },
    [setNewGame],
  );

  const handleAddPhoneNumber = React.useCallback(() => {
    if (
      newGame?.players &&
      newGame?.players.length > 0 &&
      newGame?.players[newGame.players.length - 1].phoneNumber?.length === 0
    ) {
      return;
    }

    setNewGame(prev => ({
      ...prev,
      players: [...(prev?.players as Player[]), { phoneNumber: '' }],
    }));
  }, [newGame, setNewGame]);

  const handlePhoneNumberChange = React.useCallback(
    (text: string, inputIndex: number) => {
      const players = newGame.players.map((item: Player, index: number) => {
        if (index === inputIndex) {
          return { phoneNumber: text };
        }
        return item;
      });

      setNewGame(prev => ({
        ...prev,
        players,
      }));
    },
    [newGame, setNewGame],
  );

  const handlePhoneNumberDeletePress = React.useCallback(
    (index: number) => {
      const players = newGame.players.filter(
        (_, itemIndex) => itemIndex !== index,
      );
      setNewGame(prev => ({ ...prev, players }));
    },

    [newGame, setNewGame],
  );

  const handleCreateGamePress = React.useCallback(() => {
    Keyboard.dismiss();

    if (!newGame?.startAt || !newGame.duration) {
      return;
    }

    dispatch(sagaActions.createGame(newGame));
  }, [dispatch, newGame]);

  const handlePurchaseValueChange = React.useCallback((text: string) => {
    setPositionSize(text);
  }, []);

  const handleStockPurchasePress = React.useCallback(() => {
    if (!stocksSlice.ticker) {
      return;
    }

    dispatch(
      sagaActions.openPosition({
        identifier: stocksSlice.ticker.identifier,
        positionSize,
      }),
    );
  }, [dispatch, stocksSlice.ticker, positionSize]);

  const handleBottomSheetClose = React.useCallback(() => {
    dispatch(initNewGame(undefined));
    dispatch(getPurchaseQuote(undefined));
    setPositionSize('');
  }, [dispatch]);

  const renderBottomSheetViews = () => {
    if (gamesSlice.newGame) {
      return (
        <DatePicker
          open={openDatePicker}
          onClose={toggleOpenDatePickerPress}
          onDateSelect={handleDateSelect}>
          <GameSetupView
            onOpenDatePickerPress={toggleOpenDatePickerPress}
            onDurationChange={handleDurationChange}
            onCreateGamePress={handleCreateGamePress}
            loading={gamesSlice.fetching}
            onAddPhoneNumber={handleAddPhoneNumber}
            values={newGame}
            onPhoneNumberChange={handlePhoneNumberChange}
            onPhoneNumberDeletePress={handlePhoneNumberDeletePress}
            onNameChange={handleNameChange}
            disabled={
              !newGame.name ||
              !newGame?.startAt ||
              !newGame.duration ||
              newGame.players.length === 0
            }
            phoneNumberError={gamesSlice.phoneNumberError}
          />
        </DatePicker>
      );
    }

    if (stocksSlice.quote) {
      return (
        <StockPurchaseBottomSheet
          portfolioBalance={gamesSlice.currentPlayer?.balance as number}
          quote={stocksSlice.quote}
          onPurchasePress={handleStockPurchasePress}
          onPurchaseValueChange={handlePurchaseValueChange}
          positionSizeValue={positionSize}
          loading={stocksSlice.fetching}
        />
      );
    }

    return null;
  };

  useEffect(() => {
    if (gamesSlice.newGame) {
      bottomSheetRef.current?.snapToIndex(0);
    } else {
      bottomSheetRef.current?.close();
    }
  }, [gamesSlice.newGame]);

  useEffect(() => {
    if (stocksSlice.quote) {
      bottomSheetRef.current?.snapToIndex(0);
    } else {
      bottomSheetRef.current?.close();
    }
  }, [stocksSlice.quote]);

  return (
    <MainContainer tabbarEnabled>
      <TabBar />
      <BottomSheet
        bottomSheetRef={bottomSheetRef}
        onClose={handleBottomSheetClose}>
        {renderBottomSheetViews()}
      </BottomSheet>
    </MainContainer>
  );
};

export default Main;
