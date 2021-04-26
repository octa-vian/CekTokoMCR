import React from 'react'
import { View, Text, SafeAreaView } from 'react-native'

const HeaderHome = ({title}) => {
    return (
        <SafeAreaView>
            <View style={{justifyContent:'center', marginLeft:16, height:66, width:'100%'}}>
            <Text style={{fontSize:20, fontWeight:'bold'}}>{title}</Text>
            </View>
        </SafeAreaView>
    )
}

export default HeaderHome
