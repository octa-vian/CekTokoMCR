import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors } from '../Utils'
import { DalamPengiriman, DalamPengirimanRed, MenungguPesanan, MenungguPesananRed, PesananBaru, PesananBaruRed, PesananSelesai, PesananSelesaiRed, SiapDikirim, SiapDikirimRed, SvgBeranda, SvgBerandaActive, SvgInfo, SvgInfoActive } from '../IconSvg'
import { color } from 'react-native-reanimated'
import { IconHome, IconHomeRed, IconNotif, IconNotifRed, IconProfil, IconProfilRed, IconRating, IconRatingRed } from '../imgSvg'
import Api from '../Api'

const IconTab = ({title, active, onPress, onLongPress})  => {

  const [badge, setBadge] = useState();

  useEffect(()=>{
    GetBadgeInfo();
  },[title, active])


  const GetBadgeInfo=()=>{
    Api.get('info/badge_info')
      .then(async(res)=>{
        console.log(res.data.response)
        setBadge(res.data.response.jumlah)
      })
      .catch(err=>{
        console.log(err)
      })
  }
  
  const Icon =()=>{
    GetBadgeInfo();
    if(title === 'Beranda'){
      return active ? <IconHomeRed height={20} width={20}/> : <IconHome height={20} width={20}/>
    }
    if(title=== 'Rating Toko'){
      return active ? <IconRatingRed height={20} width={20}/> : <IconRating height={20} width={20}/>
    }
    if(title=== 'Notifikasi'){
      return active ? 
      <View style={{border:2,borderColor:colors.btnActif, paddingHorizontal:0}}>
      < IconNotifRed height={20} width={20}/>
      {
      badge > 0 && (
        <View style={{backgroundColor:colors.btnActif, position:'absolute',top:-2,right:-6, padding:1,width:14,height:14, borderRadius:14/2,justifyContent:'center', alignItems:'center'}}>
          <Text style={{fontSize:10,color:'white'}}>{badge}</Text>
        </View>
        )
      }
      </View> 
      : 

      <View style={{border:2,borderColor:colors.btnActif, paddingHorizontal:0}}>
      <IconNotif height={20} width={20}/>
      {
      badge > 0 && (
        <View style={{backgroundColor:colors.btnActif, position:'absolute',top:-2,right:-6, padding:1,width:14,height:14, borderRadius:14/2,justifyContent:'center', alignItems:'center'}}>
          <Text style={{fontSize:10,color:'white'}}>{badge}</Text>
        </View>
        )
      }
      </View> 
    }
    if(title=== 'Profil'){
      return active ? <IconProfilRed height={20} width={20}/> : <IconProfil height={20} width={20}/>
    }
    return active ? <SvgBerandaActive/> : <SvgBeranda/>
  }

  return (
    <TouchableOpacity activeOpacity={0.2} style={styles.container} onPress={onPress} onLongPress={onLongPress} onPressIn={()=>title == 'Notifikasi' ? setBadge(0) : null}>
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