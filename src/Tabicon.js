import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { DalamPengiriman, DalamPengirimanRed, MenungguPesanan, MenungguPesananRed, PesananBaru, PesananBaruRed, PesananSelesai, PesananSelesaiRed, SiapDikirim, SiapDikirimRed, SvgBeranda, SvgBerandaActive, SvgInfo, SvgInfoActive } from './IconSvg'
import { colors } from './Utils'

const TabIcon = ({title, active, onPress, onLongPress})  => {
  
  const Icon =()=>{
    if(title === 'Pesanana Baru'){
      return active ? <PesananBaruRed height={45} width={45}/> : <PesananBaru height={45} width={45}/>
    }
    if(title=== 'Menunggu Pesanan'){
      return active ? <MenungguPesananRed height={45} width={45}/> : <MenungguPesanan height={45} width={45}/>
    }
    if(title=== 'Siap Kirim'){
      return active ? < SiapDikirimRed height={45} width={45}/> : <SiapDikirim height={45} width={45}/>
    }
    if(title=== 'Dalam Pengiriman'){
      return active ? <DalamPengirimanRed height={45} width={45}/> : <DalamPengiriman height={45} width={45}/>
    }
    if(title=== 'Pesanan Selesai'){
      return active ? <PesananSelesaiRed height={45} width={45}/> : <PesananSelesai height={45} width={45}/>
    }
    return active ? <SvgBerandaActive/> : <SvgBeranda/>
  }

  return (
    <TouchableOpacity activeOpacity={0.2} style={styles.container} onPress={onPress} onLongPress={onLongPress}>
      <Icon/>
    </TouchableOpacity>
  )
}

export default TabIcon

const styles = StyleSheet.create({
  container:{
    alignItems:'center',
  },
  title:(active)=>({
    fontSize:12,
    color: active ? colors.btnredcolor : colors.bgPrimary,
  }),
  icon:{
    width:40, height:40
  }
})