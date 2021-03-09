import React from 'react'
import { View, Text, Modal, Image, ActivityIndicator } from 'react-native'
import { colors } from '../Utils'

const LoadingMessage = ({visible, pesan}) => {
    return (
        <Modal
            animationType='fade' transparent={true}
            visible={visible}>
                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <View
                style={{
                height: 70,
                //width:220,
                position:'absolute',
                flexDirection:'row',
                backgroundColor: 'white',
                borderRadius:8,
                alignItems: 'center',
                justifyContent:'center',
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 6,
                },
                padding:15,
                shadowOpacity: 0.37,
                shadowRadius: 7.49,
                elevation: 12, }}>
                {/* <Image source={require('../imgSvg/maskot.png')} style={{height:55, width:55, marginTop:8}} /> */}
                <ActivityIndicator size='large' color={colors.btnActif} />
                <Text style={{marginTop:8, marginBottom:4, fontSize:14, fontWeight:'bold', textTransform:'capitalize'}} numberOfLines={1} > {pesan} </Text>
                </View>
                </View>    
        </Modal>
    )
}

export default LoadingMessage
