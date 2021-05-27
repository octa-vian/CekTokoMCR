import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from './Screen/Login';
import Home from './Screen/HomeScreen';
import Navigation from './Navigation';
import Splash from './Screen/Splash';
import Info from './Screen/Info';
import NavigationTopTab from './NavigationTopTab';
import KirimPesanan from './Screen/DaftarPesanan/KirimPesanan';
import DalamPengiriman from './Screen/DaftarPesanan/DalamPengiriman';
import PesananBaru from './Screen/DaftarPesanan/PesananBaru'
import PesananSelesai from './Screen/DaftarPesanan/PesananSelesai'
import MenungguPesanan from './Screen/DaftarPesanan/MenungguPesanan';
import RatingToko from './Screen/RatingToko/RatingToko';
import ProdukPopuler from './Screen/ProdukPopuler/ProdukPopuler';
import UbahProfile from './Screen/UbahProfile/UbahProfile';
import DetailPesanan from './Screen/DaftarPesanan/DetailPesananBaru/DetailPesanan';
import BuatStruk from './Screen/DaftarPesanan/DetailPesananBaru/BuatStruk';
import PreviewStruk from './Screen/DaftarPesanan/DetailPesananBaru/PreviewStruk';
import DetailMenungguPesanan from './Screen/DaftarPesanan/MenungguPesanan/DetailMenungguPesanan';
import DetailPesananDikirim from './Screen/DaftarPesanan/PesananDikirim/DetailPesananDikirim';
import DetailDalamPengiriman from './Screen/DaftarPesanan/DalamPengiriman/DetailDalamPengiriman';
import PesananDisetujui from './Screen/DaftarPesanan/PesananSelesai/PesananDisetujui';
import PesananDitolak from './Screen/DaftarPesanan/PesananSelesai/PesananDitolak';
import DitailPesananDisetujui from './Screen/DaftarPesanan/PesananSelesai/DitailPesananDisetujui';
import DetailPesananDitolak from './Screen/DaftarPesanan/PesananSelesai/DetailPesananDitolak';
import DetailProduk from './Screen/ProdukPopuler/DetailProduk';
import Notifikasi from './Screen/Notifikasi/Notifikasi';
import PopupFilter from './ComponentPopup/PopupFilter';
import ButtonNotificationShow from './ButtonNotificationShow';
import App from './App';
import NavigationHome from './ScreenHome/NavigationHome';
import UbahWaktuPengiriman from './Screen/UbahProfile/UbahWaktuPengiriman';
import RekomendasiBarang from './Screen/DaftarPesanan/DetailPesananBaru/RekomendasiBarang';
import Pemesanan from './Screen/DaftarPesanan/Pemesanan';
import NavigationStok from './Screen/UpdateStok/NavigationStok';
import ProdukMenipis from './Screen/ProdukPopuler/ProdukMenipis';
import DetailProdukNew from './Screen/ProdukPopuler/DetailProdukNew';
import DaftarProdukKasir from './Screen/Kasir/DaftarProdukKasir';
import CheckOutProduk from './Screen/Kasir/CheckOutProduk';
import POS_Tunai from './Screen/Kasir/POS_Tunai';
import TransaksiBerhasil from './Screen/Kasir/TransaksiBerhasil';


function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tabs = createMaterialTopTabNavigator();

const DrawerAction = () => {
  return(
    
      <Drawer.Navigator initialRouteName="Test">
        <Drawer.Screen name="Test" component={HomeScreen} />
      </Drawer.Navigator>
    
  );
};

const TopTab = () => {
  return (
    <Tabs.Navigator
     tabBar={props=> <NavigationTopTab {...props}/>}>
      <Tabs.Screen name="Pesanan Baru" component={PesananBaru}/>
      <Tabs.Screen name="Menunggu Konfirmasi" component={MenungguPesanan}/>
      <Tabs.Screen name="Siap Dikirim" component={KirimPesanan}/>
      <Tabs.Screen name="Sedang Diantar" component={DalamPengiriman}/>
      <Tabs.Screen name="Pesanan Selesai" component={Navigation}/>
    </Tabs.Navigator>
  )
}

function Rooter() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Splash'>
      <Stack.Screen name="Splash" component={Splash} options={{headerShown:false}} />
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
        <Stack.Screen name="app" component={App} options={{headerShown:false}} />
        <Stack.Screen name="Home" component={Home} options={{headerShown:false}} />
        <Stack.Screen name="Navv" component={Navigation} options={{headerShown:false}} />
        <Stack.Screen name="Top" component={TopTab} options={{headerShown:false}} />
        <Stack.Screen name="Ratingtoko" component={RatingToko} options={{headerShown:false}} />
        <Stack.Screen name="Populer" component={ProdukPopuler} options={{headerShown:false}} />
        <Stack.Screen name="Profile" component={UbahProfile} options={{headerShown:false}} />
        <Stack.Screen name="Detail Pesanan" component={DetailPesanan} options={{headerShown:false}} />
        <Stack.Screen name="Buat Struk" component={BuatStruk} options={{headerShown:false}} />
        <Stack.Screen name="Preview Struk" component={PreviewStruk} options={{headerShown:false}} />
        <Stack.Screen name="Detail Menunggu Pesanan" component={DetailMenungguPesanan} options={{headerShown:false}} />
        <Stack.Screen name="Detail Pesanan Dikirim" component={DetailPesananDikirim} options={{headerShown:false}} />
        <Stack.Screen name="Detail Dalam Pengiriman" component={DetailDalamPengiriman} options={{headerShown:false}} />
        <Stack.Screen name="Diterima" component={PesananDisetujui} options={{headerShown:false}} />
        <Stack.Screen name="Ditolak" component={PesananDitolak} options={{headerShown:false}} />
        <Stack.Screen name="Detail Pesanan Disetujui" component={DitailPesananDisetujui} options={{headerShown:false}} />
        <Stack.Screen name="Detail Pesanan Ditolak" component={DetailPesananDitolak} options={{headerShown:false}} />
        <Stack.Screen name="Detail Produk" component={DetailProduk} options={{headerShown:false}} />
        <Stack.Screen name="Notifikasi" component={Notifikasi} options={{headerShown:false}} />
        <Stack.Screen name="Drawer" component={DrawerAction} options={{headerShown:false}} />
        <Stack.Screen name="Info" component={Info} options={{headerShown:false}} />
        <Stack.Screen name="Pop" component={PopupFilter} options={{headerShown:false}} />
        <Stack.Screen name="Show Notif" component={ButtonNotificationShow} options={{headerShown:false}} />
        <Stack.Screen name="Navigation Home" component={NavigationHome} options={{headerShown:false}} />
        <Stack.Screen name="Ubah Waktu Pengiriman" component={UbahWaktuPengiriman} options={{headerShown:false}} />
        <Stack.Screen name="Rekomendasi Barang" component={RekomendasiBarang} options={{headerShown:false}} />
        <Stack.Screen name="Pemesanan Barang" component={Pemesanan} options={{headerShown:false}} />
        <Stack.Screen name="Navigation Stok" component={NavigationStok} options={{headerShown:false}} />
        <Stack.Screen name="Produk Menipis" component={ProdukMenipis} options={{headerShown:false}} />
        <Stack.Screen name="Detail ProdukNew" component={DetailProdukNew} options={{headerShown:false}} />
        <Stack.Screen name="Daftar Produk Kasir" component={DaftarProdukKasir} options={{headerShown:false}} />
        <Stack.Screen name="Checkout Pesanan" component={CheckOutProduk} options={{headerShown:false}} />
        <Stack.Screen name="Pos Tunai" component={POS_Tunai} options={{headerShown:false}} />
        <Stack.Screen name="Transaksi Berhasil" component={TransaksiBerhasil} options={{headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Rooter;