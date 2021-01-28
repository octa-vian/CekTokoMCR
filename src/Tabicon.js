import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { DalamPengiriman, Infored, SvgBeranda, SvgBerandaRed, SvgInfo, SvgInfoRed } from './IconSvg'
import { colors } from './Utils'

const TabIcon = ({title, active, onPress, onLongPress})  => {
console.log(title);
    

  function Icons(){
    if(title=="Home"){
      return active ? 
      <Image style={{width:30, height:42, marginTop:10}} source = {require('./Gambar/pesananbarumerah.png')}/> : 
      <Image style={{width:30, height:42, marginTop:10}} source = {require('./Gambar/pesananbaruhitam.png')}/>
    }
    if(title =="Info"){
      return active ? 
      <Image style={{width:34, height:42, marginTop:10,}} source = {require('./Gambar/menunggumerah.png')}/> : 
      <Image style={{width:34, height:42, marginTop:10, }} source = {require('./Gambar/menungguhitam.png')}/>
    }

    if(title =="Pesanan Siap Kirim"){
      return active ? 
      <Image style={{width:36, height:42, marginTop:10,}} source = {require('./Gambar/boxmerah.png')}/> : 
      <Image style={{width:39, height:42, marginTop:10, }} source = {require('./Gambar/boxhitam.png')}/>
    }

    if(title =="Dalam Pengiriman"){
      return active ? 
      <Image style={{width:34, height:42, marginTop:10,}} source = {require('./Gambar/menunggumerah.png')}/> : 
      <Image style={{width:34, height:42, marginTop:10, }} source = {require('./Gambar/menungguhitam.png')}/>
    }

    if(title =="Pesanan Siap"){
      return active ? 
      <Image style={{width:34, height:42, marginTop:10,}} source = {require('./Gambar/menunggumerah.png')}/> : 
      <Image style={{width:34, height:42, marginTop:10, }} source = {require('./Gambar/menungguhitam.png')}/>
    }
  
    return active ? <Text>ok</Text> : <Text>no</Text>
  }

  return (
    <TouchableOpacity activeOpacity={0.2} style={styles.container} onPress={onPress} onLongPress={onLongPress}>
      <Icons/>
      {/* <Text style={styles.title(active)}>{title}</Text> */}
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