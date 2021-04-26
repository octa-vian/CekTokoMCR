import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors } from '../Utils'
import { DalamPengiriman, DalamPengirimanRed, MenungguPesanan, MenungguPesananRed, PesananBaru, PesananBaruRed, PesananSelesai, PesananSelesaiRed, SiapDikirim, SiapDikirimRed, SvgBeranda, SvgBerandaActive, SvgInfo, SvgInfoActive } from '../IconSvg'
import { color } from 'react-native-reanimated'
import { IconHome, IconHomeRed, IconNotif, IconNotifRed, IconProfil, IconProfilRed, IconRating, IconRatingRed } from '../imgSvg'

const IconTab = ({title, active, onPress, onLongPress})  => {
  
  const Icon =()=>{
    if(title === 'Beranda'){
      return active ? <IconHomeRed height={20} width={20}/> : <IconHome height={20} width={20}/>
    }
    if(title=== 'Rating Toko'){
      return active ? <IconRatingRed height={20} width={20}/> : <IconRating height={20} width={20}/>
    }
    if(title=== 'Notifikasi'){
      return active ? < IconNotifRed height={20} width={20}/> : <IconNotif height={20} width={20}/>
    }
    if(title=== 'Profil'){
      return active ? <IconProfilRed height={20} width={20}/> : <IconProfil height={20} width={20}/>
    }
    return active ? <SvgBerandaActive/> : <SvgBeranda/>
  }

  return (
    <TouchableOpacity activeOpacity={0.2} style={styles.container} onPress={onPress} onLongPress={onLongPress}>
      <Icon/>
      <View style={{margin:2}}>
      </View>
       <Text style={styles.title(active)}>{title}</Text>
    </TouchableOpacity>
  )
}

export default IconTab

const styles = StyleSheet.create({
  container:{
    alignItems:'center',
  },
  title:(active)=>({
    fontSize:12,
    color: active ? colors.btnActif : colors.btnTextGray,
  }),
  icon:{
    width:40, height:40,
  }
})