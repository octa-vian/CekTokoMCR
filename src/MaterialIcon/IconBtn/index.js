import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { SvgBeranda, SvgBerandaRed, SvgInfo, SvgInfoRed } from '../../IconSvg'

const IconBtn=({title, active})=>{
    if(title=="Home"){
      return active ? <SvgBerandaRed/> : <SvgBeranda/>
    }
    if(title =="Splash"){
      return active ? <SvgInfoRed/> : <SvgInfo/>
    }
     return active ? <SvgBerandaRed/> : <SvgBeranda/>
  }
  
  export default IconBtn