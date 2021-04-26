import React from 'react'
import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import { colors } from '../Utils';

var window = Dimensions.get('window');
var width = (window.width  * 70/100) / 2;

const ListMetodeBelanja = ({label, onPress, ChangeBorder, ChangeBackground}) => {
    return (
    <TouchableOpacity style={[styles.styleStatus, ChangeBorder]} onPress={onPress}>
        <Text style={[styles.TxtExpres, ChangeBackground]}>{label}</Text>
    </TouchableOpacity>
    )
}

export default ListMetodeBelanja
 const styles = StyleSheet.create({
    styleStatus:{
        backgroundColor:'#FFF5F7', 
        borderRadius:100,
        height:40, width:width, 
        //backgroundColor:'#FFF5F7', 
        borderColor:'#ED0A2A', 
        borderWidth:1, 
        borderRadius:100, 
        marginRight:8, 
        alignItems:'center', 
        justifyContent:'center',
        elevation:2
    },
    TxtExpres:{
    color:colors.btnActif,
    fontWeight:'bold'
    }
 })
