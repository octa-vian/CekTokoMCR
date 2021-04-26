import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { colors } from './Utils'
// import {
//     showNotification, 
//     showNotificationIsVifeMinute, 
//     handleCancel
// } from './notification.android';
import PushNotification from 'react-native-push-notification';

const showNotification = (title, message) => {
    PushNotification.localNotification({
        title: title,
        message:message
    })

    console.log('notif: ' + title);
}

const ButtonNotificationShow = () => {
    return (
        <View style={{flex:1}}>
            <TouchableOpacity style = {{height:42, backgroundColor:colors.btnActif}} onPress={() => showNotification('Cek Toko', 'Transaksi Berhasil')}>
                <Text>Show Notif</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ButtonNotificationShow
