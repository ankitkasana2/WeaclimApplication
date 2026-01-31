/**
 * @format
 */
import './polyfill'; // Must be first
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';

import App from './AppIndex';
// import { View, Text } from 'react-native';
// const App = () => <View><Text>Hello</Text></View>;
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
