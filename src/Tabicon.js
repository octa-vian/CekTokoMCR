import React from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { DalamPengiriman, DalamPengirimanRed, MenungguPesanan, MenungguPesananRed, PesananBaru, PesananBaruRed, PesananSelesai, PesananSelesaiRed, SiapDikirim, SiapDikirimRed, SvgBeranda, SvgBerandaActive, SvgInfo, SvgInfoActive } from './IconSvg'
import { IconDalamPengirimanGray, IconDalamPengirimanRed, IconMenungguKonfirmasiGray, IconMenungguKonfirmasiRed, IconPesananBaruGrey, IconPesananBaruRed, IconPesananSelesaiGray, IconPesananSelesaiRed, IconPesananSiapDikirimGray, IconPesananSiapDikirimRed } from './imgSvg'
import { colors } from './Utils'

var window = Dimensions.get('window');
var width = (window.width  * 85/100) / 5;

const TabIcon = ({title, active, onPress, onLongPress})  => {
  
  const Icon =()=>{
    if(title === 'Pesanan Baru'){
      return active ? <IconPesananBaruRed height={45} width={45}/> : <IconPesananBaruGrey height={45} width={45}/>
    }
    if(title=== 'Menunggu Konfirmasi'){
      return active ? <IconMenungguKonfirmasiRed height={45} width={45}/> : <IconMenungguKonfirmasiGray height={45} width={45}/>
    }
    if(title=== 'Siap Dikirim'){
      return active ? <IconPesananSiapDikirimRed height={45} width={45}/> : <IconPesananSiapDikirimGray height={45} width={45}/>
    }
    if(title=== 'Sedang Diantar'){
      return active ? <IconDalamPengirimanRed height={45} width={45}/> : <IconDalamPengirimanGray height={45} width={45}/>
    }
    if(title=== 'Pesanan Selesai'){
      return active ? <IconPesananSelesaiRed height={45} width={45}/> : <IconPesananSelesaiGray height={45} width={45}/>
    }
    return active ? <SvgBerandaActive/> : <SvgBeranda/>
  }

  return (
    <TouchableOpacity activeOpacity={0.2} style={styles.container} onPress={onPress} onLongPress={onLongPress}>
      <View style={{flex:1, justifyContent:'center', alignItems:'center', width:'100%', marginTop:14}}>
      <View style={{backgroundColor:colors.bglayout, borderRadius:100, height:60, width:60, alignItems:'center', justifyContent:'center', }}>
      <Icon/>
      </View>
      </View>
      <View style={{width:'100%', flex:1, alignItems:"center",}}>
      <Text style={styles.title(active)}>{title}</Text>
      </View>
      
    </TouchableOpacity>
  )
}

export default TabIcon

const styles = StyleSheet.create({
  container:{
    alignItems:'center',
    //backgroundColor:'blue',
    width:'20%',
    flexDirection:'column'
    
  },
  title:(active)=>({
    fontSize:11,
    width:'75%',
    color: active ? colors.btnredcolor : 'gray',
    textAlign:'center',
    fontWeight:'normal',
    marginTop:12,
    elevation:3,
    //backgroundColor:'red'
    
  
  }),
  icon:{
    width:40, height:40
  }
})