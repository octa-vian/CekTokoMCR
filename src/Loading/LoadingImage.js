import React, { useState } from 'react'
import { View, Text, Modal, Image, ActivityIndicator } from 'react-native'
import { colors } from '../Utils';
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
  } from 'react-native-indicators';

const LoadingImage = ({visible}) => {

    return (
        <Modal
            animationType="fade" transparent={true}
            visible={visible}>
                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <View
                style={{
                height: 100,
                width:100,
                position:'absolute',
                alignItems: 'center',
                justifyContent:'center', 
                elevation: 12, }}>
                {/* <Image source={require('../imgSvg/maskot.png')} style={{height:55, width:55, marginTop:8}} /> */}
                {/* <ActivityIndicator size='large' color={colors.btnActif} /> */}
                <BarIndicator color={colors.btnActif} size={60} />
                {/* <Text style={{marginTop:6}}>Loading...</Text> */}
                </View>
                </View>
                    
        </Modal>
    )
}

export default LoadingImage
