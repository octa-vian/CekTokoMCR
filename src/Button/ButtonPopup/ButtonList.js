import React from 'react'
import { View, Text, Modal, TouchableOpacity } from 'react-native'
import { colors } from '../../Utils'

const ButtonList = ({visible, onPress, back}) => {
    return (
        <Modal
            animationType='fade' transparent={true}
            visible={visible}>
                <TouchableOpacity style={{flex:1, backgroundColor:'rgba(52, 52, 52, 0.0)', alignItems:'flex-end',marginTop:50}} onPress={back}>
                <View style={{marginRight:8, alignItems:'flex-end'}}>
                <View
                style={{
                height: 45,
                width:200,
                marginTop:8,
                position:'absolute',
                backgroundColor: 'white',
                borderRadius:4,
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
                <TouchableOpacity style={{height:45, width:200, borderRadius:4, justifyContent:'center', paddingLeft:20 }} onPress={onPress} > 
                <Text style={{fontSize:14, fontWeight:'bold', color:colors.btnActif }}> Logout </Text>
                </TouchableOpacity>
                </View>
                </View>
                </TouchableOpacity>  
        </Modal>

    )
}

export default ButtonList
