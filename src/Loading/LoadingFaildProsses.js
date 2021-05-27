import React from 'react'
import { View, Text, Modal, TouchableOpacity, Image } from 'react-native'
import { colors } from '../Utils'

const LoadingFaildProsses = ({visible, pesan, onPress}) => {
    return (
        <Modal
            animationType="slide" transparent={true}
            visible={visible}>
                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <View
                style={{
                height: 280,
                width:257,
                position:'absolute',
                backgroundColor: 'white',
                borderRadius:20,
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
                <Image source={require('../imgSvg/errora.png')} style={{height:120, width:138}}/>
                <Text style={{textAlign:'center', marginTop:20, fontWeight:'bold', fontSize:18}}>Oops..</Text>
                <Text style={{marginTop:3, marginBottom:20, fontSize:12, fontWeight:'bold', textAlign:'center', width:180, textTransform:'capitalize'}} > {pesan} </Text>
                <TouchableOpacity style={{height:35, width:100, backgroundColor:colors.btnActif, borderRadius:20, alignItems:'center', justifyContent:'center'}} onPress={onPress}> 
                <Text style={{fontSize:14, fontWeight:'bold', textTransform:'uppercase', color:'white'}} > OK </Text>
                </TouchableOpacity>
                </View> 
                </View>    
        </Modal>
    )
}

export default LoadingFaildProsses
