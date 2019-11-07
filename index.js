import React from 'react';
import 'react-native-gesture-handler';
import {Platform} from 'react-native';
import {AppRegistry} from 'react-native';
import App from './src/index';
import {androidName, iosName} from './app.json';

console.disableYellowBox = true;

AppRegistry.registerComponent(
  Platform.OS === 'android' ? androidName : iosName,
  () => App,
);
