import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { SvgBeranda, SvgBerandaActive, SvgInfo, SvgInfoActive } from './IconSvg'
import { colors } from './Utils'

const TabIcon = ({title, active, onPress, onLongPress})  => {
  
  const Icon =()=>{
    if(title === 'Home'){
      return active ? <SvgBerandaActive/> : <SvgBeranda/>
    }
    if(title=== 'Info'){
      return active ? <SvgInfoActive/> : <SvgInfo/>
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