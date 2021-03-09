import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import LoadingImage from './LoadingImage'

const LoadingImageMessage = ({status}) => {

    const [loding1, setLoading1] = useState(false);
    const [loding2, setLoading2] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setLoading1(false);
            setLoading2(false);
        }, 3000)
    })

    if(status === 1){
        setLoading1(true);
    } else {
        setLoading2(true);
    }

    return (
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <LoadingImage visible={loding1} />
            <LoadingImageMessage visible={loding2} />
        </View>
    )
}

export default LoadingImageMessage
