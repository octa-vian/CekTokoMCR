import React, { useEffect } from 'react'
import { View, Text, Image, ImageBackground } from 'react-native'
import { colors } from '../Utils';

const Splash = ({navigation}) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.replace('Login');
        }, 1500);
    });
    return (
        <View style={{flex:1, backgroundColor:colors.bglayout, alignItems:'center', justifyContent:'center'}}> 
            <Image source={require('../imgSvg/maskot.png')}/>
        </View>
    )
}

export default Splash
