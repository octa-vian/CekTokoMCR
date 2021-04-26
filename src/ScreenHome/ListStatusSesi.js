import React from 'react'
import { View, Text, Dimensions, TouchableOpacity, StyleSheet } from 'react-native'
import { colors } from '../Utils'

var window = Dimensions.get('window');
var width = (window.width  * 70/100) / 3;

const ListStatusSesi = ({jamSesi, customBorder, customBackground, onPress}) => {
    return (
        <TouchableOpacity style={[styles.styleBorder, customBorder]} onPress={onPress}>
        <Text style={[styles.styleBackground, customBackground]}>{jamSesi}</Text>
        </TouchableOpacity>
    )
}

export default ListStatusSesi
const styles = StyleSheet.create({
    styleBorder:{ 
        height:40, 
        width:width, 
        marginRight:8, 
        backgroundColor:'#FFF5F7', 
        borderColor:'#ED0A2A', 
        borderWidth:1, 
        borderRadius:100, 
        alignItems:'center', 
        justifyContent:'center', 
    },

    styleBackground:{
        color:colors.btnActif, 
        fontWeight:'bold'
    }
})
