import React, { useEffect, useState } from 'react'
import {ActivityIndicator,
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    ScrollView,
    DeviceEventEmitter,
    NativeEventEmitter,
    Switch,
    TouchableOpacity,
    Dimensions,
    ToastAndroid} from 'react-native';
import {BluetoothEscposPrinter, BluetoothManager, BluetoothTscPrinter} from "react-native-bluetooth-escpos-printer";
import Header from '../../Header';
var _listeners = [];
var {height, width} = Dimensions.get('window');

const PrintBlueTooth = ({navigation}) => {

    const [Fungsi, setFungsi] = useState({
        devices: null,
        pairedDs:[],
        foundDs: [],
        bleOpend: false,
        loading: true,
        boundAddress: '',
        debugMsg: '',
    })

    useEffect(() => {
        BluetoothManager.isBluetoothEnabled().then((enabled)=> {
            setFungsi({
                bleOpend: Boolean(enabled),
                loading: false
            })
        }, (err)=> {
            err
        });

        if (Platform.OS === 'ios') {
            let bluetoothManagerEmitter = new NativeEventEmitter(BluetoothManager);
            _listeners.push(bluetoothManagerEmitter.addListener(BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED,
                (rsp)=> {
                    _deviceAlreadPaired(rsp)
                }));
            _listeners.push(bluetoothManagerEmitter.addListener(BluetoothManager.EVENT_DEVICE_FOUND, (rsp)=> {
                    _deviceFoundEvent(rsp)
            }));
            _listeners.push(bluetoothManagerEmitter.addListener(BluetoothManager.EVENT_CONNECTION_LOST, ()=> {
                setFungsi({
                    name: '',
                    boundAddress: ''
                })
            }));
        } else if (Platform.OS === 'android') {
            _listeners.push(DeviceEventEmitter.addListener(
                BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED, (rsp)=> {
                    _deviceAlreadPaired(rsp)
                }));
            _listeners.push(DeviceEventEmitter.addListener(
                BluetoothManager.EVENT_DEVICE_FOUND, (rsp)=> {
                    _deviceFoundEvent(rsp)
                }));
            _listeners.push(DeviceEventEmitter.addListener(
                BluetoothManager.EVENT_CONNECTION_LOST, ()=> {
                    setFungsi({
                        name: '',
                        boundAddress: ''
                    })
                }
            ));
            _listeners.push(DeviceEventEmitter.addListener(
                BluetoothManager.EVENT_BLUETOOTH_NOT_SUPPORT, ()=> {
                    ToastAndroid.show("Device Not Support Bluetooth !", ToastAndroid.LONG);
                }
            ))
        }
    })

    const _deviceAlreadPaired = (rsp) => {
        var ds = null;
        if (typeof(rsp.devices) == 'object') {
            ds = rsp.devices;
        } else {
            try {
                ds = JSON.parse(rsp.devices);
            } catch (e) {
            }
        }
        if(ds && ds.length) {
            let pared = Fungsi.pairedDs;
            pared = pared.concat(ds||[]);
            setFungsi({
                pairedDs: pared
            });
        }
    }

    const _deviceFoundEvent = (rsp) => {
        var r = null;
        try {
            if (typeof(rsp.device) == "object") {
                r = rsp.device;
            } else {
                r = JSON.parse(rsp.device);
            }
        } catch (e) {//alert(e.message);
            //ignore
        }
        //alert('f')
        if (r) {
            let found = Fungsi.foundDs || [];
            if(found.findIndex) {
                let duplicated = found.findIndex(function (x) {
                    return x.address == r.address
                });
                //CHECK DEPLICATED HERE...
                if (duplicated == -1) {
                    found.push(r);
                    setFungsi({
                        foundDs: found
                    });
                }
            }
        }
    }

    


    return (
        <View style={styles.page}>
           <Header title="Print Struk"/>
        </View>
    )
}

export default PrintBlueTooth

const styles = StyleSheet.create({
    page:{
        flex:1,
        backgroundColor:'white'
    }
})
