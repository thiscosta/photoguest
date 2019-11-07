import React from "react"
import 'react-native-gesture-handler'
import { AppRegistry } from 'react-native';
import App from './src/index';
import { name as appName } from './app.json';

console.disableYellowBox = true

AppRegistry.registerComponent("photoguest", () => App);
