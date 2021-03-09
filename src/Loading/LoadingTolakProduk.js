import React from 'react'
import { View, Text, Modal, TouchableOpacity } from 'react-native'
import { IconBerhasil } from '../imgSvg'
import { colors } from '../Utils'

const LoadingTolakProduk = ({visible, pesan, onPress, onKirim}) => {
    return (
        <Modal
            animationType="slide" transparent={true}
            visible={visible}>
                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <View
                style={{
                height: 255,
                width:257,
                position:'absolute',
                backgroundColor: 'white',
                borderRadius:10,
                alignItems: 'center',
                justifyContent:'center',
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 6,
                },
                shadowOpacity: 0.37,
                shadowRadius: 7.49,
                elevation: 12, }}>
                <IconBerhasil/>
                <Text style={{marginTop:8, marginBottom:20, fontSize:14, fontWeight:'bold', textAlign:'center', width:180, textTransform:'capitalize'}} > {pesan} </Text>

                <View style={{flexDirection:'row'}}>

                <TouchableOpacity style={{ marginRight:10, height:28, width:100, backgroundColor:'gray', borderRadius:6, alignItems:'center', justifyContent:'center'}} onPress={onPress}> 
                <Text style={{fontSize:12, fontWeight:'bold', textTransform:'uppercase', color:'white'}} > Batal </Text>
                </TouchableOpacity>

                <TouchableOpacity style={{height:28, width:100, backgroundColor:colors.btnActif, borderRadius:6, alignItems:'center', justifyContent:'center'}} onPress={onKirim}> 
                <Text style={{fontSize:12, fontWeight:'bold', textTransform:'uppercase', color:'white'}} > Tolak </Text>
                </TouchableOpacity>

                </View>
                
                </View>
                </View>    
        </Modal>
    )
}

export default LoadingTolakProduk
