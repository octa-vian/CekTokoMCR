import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Navigation from '../../Navigation'
import { colors } from '../../Utils'

const PesananSelesai = ({navigation}) => {
    
    return (
        <View style={styles.page}>
            <Navigation/>
        </View>
    )
}

export default PesananSelesai

const styles = StyleSheet.create({
    page: {
        flex: 1,
        alignItems:'center',
          paddingTop:20,
          backgroundColor:'white'
      },
      title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom:12
      },
})
