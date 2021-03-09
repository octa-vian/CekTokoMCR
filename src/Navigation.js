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
import PesananDisetujui from './Screen/DaftarPesanan/PesananSelesai/PesananDisetujui';
import PesananDitolak from './Screen/DaftarPesanan/PesananSelesai/PesananDitolak';
import DetailPesananDikirim from './Screen/DaftarPesanan/PesananDikirim/DetailPesananDikirim';
import DetailPesananDitolak from './Screen/DaftarPesanan/PesananSelesai/DetailPesananDitolak';

const Tab = createMaterialTopTabNavigator();

// const Navigasi = () => {
//   <NavigationContainer>
//       <Stack.Navigator initialRouteName='Pesanan Selesai'>
//         <Stack.Screen name="Detail Diterima" component={DetailPesananDitolak} options={{headerShown:false}} />
//         <Stack.Screen name="Detail Ditolak" component={DetailPesananDikirim} options={{headerShown:false}} />
//       </Stack.Navigator>
//     </NavigationContainer>
// }

const Navigation = ({navigation}) => {
  return (
    <View style={{flex:1, backgroundColor:colors.bglayout}}>
      <View style={{alignItems:'center'}}>
        <Text style={{fontSize: 16,fontWeight: 'bold', marginBottom:12, marginTop:12}}> Pesanan Selesai </Text>
      </View>
      <Tab.Navigator
      initialRouteName="Home"
      backgroundColor={colors.bgPrimary}
      tabBarOptions={{
        activeTintColor: colors.btnActif,
        inactiveTintColor: colors.bgPrimary,
        indicatorStyle:{
          backgroundColor:colors.btnredcolor
        },
        labelStyle: { fontSize: 12, fontWeight:'bold' },
        style: { backgroundColor: colors.bglayout },
      }}>

      <Tab.Screen
        name="Distujui"
        component={PesananDisetujui}
        options={{ tabBarLabel: 'Distujui' }}
      />

      <Tab.Screen
        name="Ditolak"
        component={PesananDitolak}
        options={{ tabBarLabel: 'Ditolak' }}
      />
      
    </Tab.Navigator>
    </View>
  )
}

export default Navigation
