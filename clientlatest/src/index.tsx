import 'react-native-gesture-handler';

import React from 'react';
import { Provider } from 'react-redux';
import { LogBox } from 'react-native';
import { en, registerTranslation } from 'react-native-paper-dates';
import { PaperProvider, MD3LightTheme } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Routes from './routes';
import store from './config/store';
import { PRIMARY_COLOR } from './config/constants';

// TODO: Make sure this warning does not affect deep linking from game invitation text messages
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

registerTranslation('en', en);

export default function App() {
  return (
    <GestureHandlerRootView style={style}>
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <Routes />
        </PaperProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}

const theme = {
  ...MD3LightTheme,
  colors: { primary: PRIMARY_COLOR },
};

const style = { flex: 1 };
