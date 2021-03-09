import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import ToggleSwitch from 'toggle-switch-react-native'

const Switch = () => {
    return (
        <View>
            <ToggleSwitch
                isOn={false}
                onColor="green"
                offColor="red"
                label="Status Toko"
                labelStyle={{ color: "black", fontWeight: "900" }}
                size="small"
                onToggle={isOn => console.log("changed to : ", isOn)}
                />
        </View>
    )
}

export default Switch
const styles = StyleSheet.create({
    page:{
        flex:1
    }
})
