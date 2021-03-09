import React from 'react'
import { View, Text, Modal, TouchableOpacity, Image } from 'react-native'
import { colors } from '../Utils'

const LoadingDataKosong = ({visible, pesan, onPress}) => {
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
                <Image source={require('../imgSvg/belumadaa.png')} style={{height:100, width:130}} />
                <Text style={{marginTop:8, marginBottom:20, fontSize:14, fontWeight:'bold', textAlign:'center', width:180, textTransform:'capitalize'}} > {pesan} </Text>
                <TouchableOpacity style={{height:35, width:100, backgroundColor:colors.btnActif, borderRadius:8, alignItems:'center', justifyContent:'center'}} onPress={onPress}> 
                <Text style={{fontSize:14, fontWeight:'bold', textTransform:'uppercase', color:'white'}} > OK </Text>
                </TouchableOpacity>
                </View>
                </View>    
        </Modal>
    )
}

export default LoadingDataKosong
