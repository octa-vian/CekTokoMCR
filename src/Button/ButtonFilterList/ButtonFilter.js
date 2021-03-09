import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { colors } from '../../Utils'

const ButtonFilter = ({tittle, onPress, style, textStyle}) => {
    return (
        <TouchableOpacity style={[styles.page, style]} onPress={onPress}>
            <View style={{borderColor:'blue'}}>
            <Text style={[styles.textStyl, textStyle]}>{tittle}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default ButtonFilter

const styles = StyleSheet.create({

    page:{
        height:38,
        width:120,
        shadowColor: "#000",
        alignItems:'center',
        margin:5,
        justifyContent:'center',
        backgroundColor:'white',
        borderColor:'#707070',
        borderWidth: 1,
        shadowColor: "#000",
        borderRadius:5,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.20,
        shadowRadius: 5.20,

        elevation: 4,
    },
    button:{
        height:28,
        width:100,
        shadowColor: "#000",
        alignItems:'center',
        margin:12,
        justifyContent:'center',
        backgroundColor:'white',
        borderColor:colors.btnActif,
        borderWidth: 1,
        shadowColor: "#000",
        borderRadius:5,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.20,
        shadowRadius: 5.20,

        elevation: 4,
    },
    textStyl:{
        fontSize:12,
        color:'black',
        textAlign:'center',
        textTransform:'capitalize'
    }
})
