import React from 'react'
import { View, Text } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from './Screen/HomeScreen';
import Info from './Screen/Info';
import Splesh from './Screen/Splash';
import { colors } from './Utils';
import KirimPesanan from './Screen/DaftarPesanan/KirimPesanan';
import DalamPengiriman from './Screen/DaftarPesanan/DalamPengiriman';
import MenungguPesanan from './Screen/DaftarPesanan/MenungguPesanan';

const Tab = createMaterialTopTabNavigator();

const Navigation = () => {
  return (
    <View style={{flex:1}}>
      <Tab.Navigator
      initialRouteName="Home"
      backgroundColor={colors.bgPrimary}
      tabBarOptions={{
        activeTintColor: colors.btnActif,
        inactiveTintColor: colors.bgPrimary,
        labelStyle: { fontSize: 12 },
        style: { backgroundColor: '#ffffff' },
      }}>
      <Tab.Screen
        name="Home"
        component={Splesh}
        options={{ tabBarLabel: 'Home' }}
      />

      <Tab.Screen
        name="Notif"
        component={MenungguPesanan}
        options={{ tabBarLabel: 'Info' }}
      />

      <Tab.Screen
        name="Pesanan Siap Kirim"
        component={KirimPesanan}
        options={{ tabBarLabel: 'Pesanan Siap' }}
      />

      <Tab.Screen
        name="Dalam Pengiriman"
        component={DalamPengiriman}
        options={{ tabBarLabel: 'Dalam Pengiriman' }}
      />
      
    </Tab.Navigator>
    </View>
  )
}

export default Navigation
