import React from 'react';

import NavigationContainer from './navigation/navigator';

import { Provider as ReduxProvider } from 'react-redux';

import store from './store';

import { Provider as PaperProvider } from 'react-native-paper';
import theme from './design/apptheme';

const App = () => {

  return (
    <PaperProvider theme={theme}>
      <ReduxProvider store={store}>
        <NavigationContainer />
      </ReduxProvider>
    </PaperProvider>
  );
};

export default App;
