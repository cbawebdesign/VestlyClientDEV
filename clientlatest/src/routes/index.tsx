import React, { useEffect } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TransitionPresets } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { Login, Signup } from '../screens/auth';
import { RootState } from '../config/store';
import Main from '../screens/Main';
import Splash from '../screens/Splash';
import { useFirebaseAuth } from '../config/hooks';
import { stopFetching } from '../reducers/auth';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Signup: undefined;
  Main: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const config = {
  screens: {
    Main: {
      screens: {
        HomeStackScreen: {
          screens: {
            Game: {
              path: 'game/:id',
            },
          },
        },
      },
    },
  },
};
const linking = {
  prefixes: ['vestly://', 'https://vestly.app'],
  config,
};

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

function Routes() {
  useFirebaseAuth();

  const authSlice = useSelector((state: RootState) => state.auth);
  const userSlice = useSelector((state: RootState) => state.user);

  const renderStackNavigator = () => {
    if (userSlice.user) {
      return (
        <Stack.Navigator
          screenOptions={{ headerShown: false, headerTransparent: true }}>
          <Stack.Screen name="Main" component={Main} />
        </Stack.Navigator>
      );
    }

    if (authSlice.fetching) {
      return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={Splash} />
        </Stack.Navigator>
      );
    }

    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
        }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer theme={theme} linking={linking}>
      {renderStackNavigator()}
    </NavigationContainer>
  );
}

export default Routes;
