import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screen/HomeScreen';
import Info from '../Screen/Info';
import { colors } from '../Utils';
import { SafeAreaView } from 'react-native';
import { IconDaftarPesanan, IconHapus, } from '../IconSvg';
import { IconBerhasil, IconLock } from '../imgSvg';
import NavigationTopTab from '../NavigationTopTab';
import ControlTab from './ControlTab';
import NewHome from './NewHome';
import RatingToko from '../Screen/RatingToko/RatingToko';
import UbahProfile from '../Screen/UbahProfile/UbahProfile';
import Notifikasi from '../Screen/Notifikasi/Notifikasi';
import ViewProfile from '../Screen/UbahProfile/ViewProfile';

const Tab = createBottomTabNavigator();

function NavigationHome() {
  return (
    <Tab.Navigator
    tabBar={props=> <ControlTab {...props}/>}
    initialRouteName="Home Screen">
      <Tab.Screen name="Beranda" component={NewHome}/>
      <Tab.Screen name="Rating Toko" component={RatingToko}/>
      <Tab.Screen name="Notifikasi" component={Notifikasi}/>
      <Tab.Screen name="Profil" component={ViewProfile}/>
    </Tab.Navigator>
  );
}
export default NavigationHome;
