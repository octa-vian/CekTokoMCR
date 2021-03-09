import React, { useState } from 'react'
import { View, Text, Modal, Image, ActivityIndicator } from 'react-native'
import { colors } from '../Utils';

const LoadingImage = ({visible}) => {

    return (
        <Modal
            animationType="slide" transparent={true}
            visible={visible}>
                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <View
                style={{
                height: 100,
                width:100,
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
                {/* <Image source={require('../imgSvg/maskot.png')} style={{height:55, width:55, marginTop:8}} /> */}
                <ActivityIndicator size='large' color={colors.btnActif} />
                <Text style={{marginTop:6}}>Loading...</Text>
                </View>
                </View>
                    
        </Modal>
    )
}

export default LoadingImage
