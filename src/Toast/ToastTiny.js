import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import Toast from 'react-native-tiny-toast'

const ToastTiny = ({pesan}) => {

    const [isStatus, setStatus] = useState(true);
    
    useEffect(() => {
        setTimeout(() => {
            setStatus=true
        }, 1000);

        setTimeout(() => {
            setStatus=true
        }, 3000);
      }, []);

    return (
        <View style={{flex:1}}>
         <Toast
            visible={isStatus}
            position={50}
            onHidden={()=>{
              // onHidden
            }}>{pesan}
        </Toast>
        </View>
    )
}

export default ToastTiny
