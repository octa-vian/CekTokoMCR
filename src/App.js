// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Rooter from './Rooter';

const Stack = createStackNavigator();

function App() {
  return (
   <View style={{flex:1}}>
     <Rooter></Rooter>
   </View>
  );
}

export default App;