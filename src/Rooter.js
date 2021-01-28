// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Login from './Screen/Login';
import Home from './Screen/HomeScreen';
import Navigation from './Navigation';
import Splash from './Screen/Splash';
import Info from './Screen/Info';
import NavigationTopTab from './NavigationTopTab';
import KirimPesanan from './Screen/DaftarPesanan/KirimPesanan';
import DalamPengiriman from './Screen/DaftarPesanan/DalamPengiriman';
import PesananSelesai from './Screen/DaftarPesanan/PesananSelesai';

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}


const Stack = createStackNavigator();
const Tabs = createMaterialTopTabNavigator();

const TopTab = () => {

  return (
    <Tabs.Navigator
     tabBar={props=> <NavigationTopTab {...props}/>}>
      <Tabs.Screen name="Home" component={Splash}/>
      <Tabs.Screen name="Info" component={Info}/>
      <Tabs.Screen name="Pesanan Siap Kirim" component={KirimPesanan}/>
      <Tabs.Screen name="Dalam Pengiriman" component={DalamPengiriman}/>
      <Tabs.Screen name="Pesanan Siap" component={PesananSelesai}/>
    </Tabs.Navigator>
  )
  
}




function Rooter() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
        <Stack.Screen name="Home" component={Home} options={{headerShown:false}} />
        <Stack.Screen name="Navv" component={Navigation} options={{headerShown:false}} />
        <Stack.Screen name="Top" component={TopTab} options={{headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Rooter;