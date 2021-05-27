import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import CheckBox from '@react-native-community/checkbox'
import { colors } from '../../Utils';

const ListUrutkan = ({nama, onPress, styleBorder, styleBacground}) => {
    const [checlist, setCheclist] = useState(false);

    const itemSelected = (checked) => {
        setCheclist(checked);
    }
    return (
        <View style={{flexDirection:'row', width:'100%', marginBottom:15}}>
            <Text style={{fontSize:14, fontWeight:'bold', color:'balck', flex:1}}>{nama}</Text>
            <View style={{flex:1, alignItems:'flex-end'}}>
            <TouchableOpacity style={[styles.borderBtn, styleBorder]} onPress={onPress}>
            <View style={[styles.backgroundBtn, styleBacground]}></View>
            </TouchableOpacity>
            </View>
            
        </View>
    )
}

export default ListUrutkan
const styles = StyleSheet.create({
    borderBtn:{
    borderColor:colors.btnTextGray, 
    borderWidth:1, height:28, width:28, borderRadius:100, 
    alignItems:'center', justifyContent:'center'
    },
    backgroundBtn:{
    backgroundColor:colors.btnTextGray, 
    height:20, 
    width:20, 
    borderRadius:100, 
    }
})
