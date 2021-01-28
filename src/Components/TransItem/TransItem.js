import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

const TransItem = ({title, active, onPress, onLongPress})  => {

  const Icon=()=>{
    if(title=="Pesanan Baru"){
      return active ? <ILNewOrderActive/> : <ILNewOrder/>
    }
    if(title =="Periksa Pesanan"){
      return active ? <ILCheckOrderActive/> : <ILCheckOrder/>
    }
    if(title =="Pesanan Menunggu Dikirim"){
      return active ? <ILWaitingDeliveryActive/> : <ILWaitingDelivery/>
    }
    if(title =="Dalam Pengiriman"){
      return active ? <ILDeliveryOrderActive/> : <ILDeliveryOrder/>
    }
    if(title =="Selesaikan Pengiriman"){
      return active ? <ILCompleteDeliveryActive/> : <ILCompleteDelivery/>
    }
    return active ? <ILNewOrderActive/> : <ILNewOrder/>
  }

  return (
    <TouchableOpacity activeOpacity={0.2} style={styles.container} onPress={onPress} onLongPress={onLongPress}>
      <Icon/>
      {/* <Text style={styles.title(active)}>{title}</Text> */}
    </TouchableOpacity>
  )
}

export default TransItem

const styles = StyleSheet.create({
  container:{
    alignItems:'center'
  },
  title:(active)=>({
    fontSize:12,
    color: active ? colors.text.menuActive : colors.text.menuInactive,
    fontFamily: active ? fonts.primary[600] : fonts.primary[600],
    marginTop:4
  }),
  icon:{
    width:22, height:22
  }
})