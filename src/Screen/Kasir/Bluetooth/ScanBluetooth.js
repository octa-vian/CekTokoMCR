import React, {Component} from 'react';
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
//import EscPos from "./escpos";
//import Tsc from "./tsc";

var {height, width} = Dimensions.get('window');

export default class ScanBluetooth extends Component {

    // data = {
    //     pembeli: this.props.route.params.nama_pembeli,
    // };

    _listeners = [];

    constructor() {
        // const {st} = props.navigation;
        // console.log('row', st.params.pembeli);
        
        super();
        this.state = {
            devices: null,
            pairedDs:[],
            foundDs: [],
            bleOpend: false,
            loading: true,
            boundAddress: '',
            debugMsg: '',
        }
    }

    componentDidMount() {//alert(BluetoothManager)
        BluetoothManager.isBluetoothEnabled().then((enabled)=> {
            this.setState({
                bleOpend: Boolean(enabled),
                loading: false
            })
        }, (err)=> {
            err
        });

        if (Platform.OS === 'ios') {
            let bluetoothManagerEmitter = new NativeEventEmitter(BluetoothManager);
            this._listeners.push(bluetoothManagerEmitter.addListener(BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED,
                (rsp)=> {
                    this._deviceAlreadPaired(rsp)
                }));
            this._listeners.push(bluetoothManagerEmitter.addListener(BluetoothManager.EVENT_DEVICE_FOUND, (rsp)=> {
                this._deviceFoundEvent(rsp)
            }));
            this._listeners.push(bluetoothManagerEmitter.addListener(BluetoothManager.EVENT_CONNECTION_LOST, ()=> {
                this.setState({
                    name: '',
                    boundAddress: ''
                });
            }));
        } else if (Platform.OS === 'android') {
            this._listeners.push(DeviceEventEmitter.addListener(
                BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED, (rsp)=> {
                    this._deviceAlreadPaired(rsp)
                }));
            this._listeners.push(DeviceEventEmitter.addListener(
                BluetoothManager.EVENT_DEVICE_FOUND, (rsp)=> {
                    this._deviceFoundEvent(rsp)
                }));
            this._listeners.push(DeviceEventEmitter.addListener(
                BluetoothManager.EVENT_CONNECTION_LOST, ()=> {
                    this.setState({
                        name: '',
                        boundAddress: ''
                    });
                }
            ));
            this._listeners.push(DeviceEventEmitter.addListener(
                BluetoothManager.EVENT_BLUETOOTH_NOT_SUPPORT, ()=> {
                    ToastAndroid.show("Device Not Support Bluetooth !", ToastAndroid.LONG);
                }
            ))
        }
    }

    componentWillUnmount() {
        //for (let ls in this._listeners) {
        //    this._listeners[ls].remove();
        //}
    }

    _deviceAlreadPaired(rsp) {
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
            let pared = this.state.pairedDs;
            pared = pared.concat(ds||[]);
            this.setState({
                pairedDs:pared
            });
        }
    }

    _deviceFoundEvent(rsp) {//alert(JSON.stringify(rsp))
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
            let found = this.state.foundDs || [];
            if(found.findIndex) {
                let duplicated = found.findIndex(function (x) {
                    return x.address == r.address
                });
                //CHECK DEPLICATED HERE...
                if (duplicated == -1) {
                    found.push(r);
                    this.setState({
                        foundDs: found
                    });
                }
            }
        }
    }

    _renderRow(rows){
        let items = [];
        for(let i in rows){
            let row = rows[i];
            if(row.address) {
                items.push(
                    <TouchableOpacity key={new Date().getTime()+i} style={styles.wtf} onPress={()=>{
                    this.setState({
                        loading:true
                    });
                    BluetoothManager.connect(row.address)
                        .then((s)=>{
                            this.setState({
                                loading:false,
                                boundAddress:row.address,
                                name:row.name || "UNKNOWN"
                            })
                        },(e)=>{
                            this.setState({
                                loading:false
                            })
                            alert(e);
                        })

                }}><Text style={styles.name}>{row.name || "UNKNOWN"}</Text><Text
                        style={styles.address}>{row.address}</Text></TouchableOpacity>
                );
            }
        }
        return items;
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <Header title="Print Struk"/>
                <Text>{JSON.stringify(this.state, null, 3)}</Text>
                <Text>{this.state.debugMsg}</Text>
                <Text style={styles.title}>Status Blutooth: <Text style={{color:'blue'}}>{this.state.bleOpend?"true":"false"}</Text></Text>
                <Text>*</Text>
                <View>
                <Switch value={this.state.bleOpend} onValueChange={(v)=>{
                this.setState({
                    loading:true
                })
                if(!v){
                    BluetoothManager.disableBluetooth().then(()=>{
                        this.setState({
                            bleOpend:false,
                            loading:false,
                            foundDs:[],
                            pairedDs:[]
                        });
                    },(err)=>{alert(err)});

                }else{
                    BluetoothManager.enableBluetooth().then((r)=>{
                        var paired = [];
                        if(r && r.length>0){
                            for(var i=0;i<r.length;i++){
                                try{
                                    paired.push(JSON.parse(r[i]));
                                }catch(e){
                                    //ignore
                                }
                            }
                        }
                        this.setState({
                            bleOpend:true,
                            loading:false,
                            pairedDs:paired
                        })
                    },(err)=>{
                        this.setState({
                            loading:false
                        })
                        alert(err)
                    });
                }
            }}/>
                    <Button disabled={this.state.loading || !this.state.bleOpend} onPress={()=>{
                        this._scan();
                    }} title="Scan"/>
                </View>
                <Text  style={styles.title}>Connected:<Text style={{color:"blue"}}>{!this.state.name ? 'No Devices' : this.state.name}</Text></Text>
                <Text  style={styles.title}>Found(tap to connect):</Text>
                {this.state.loading ? (<ActivityIndicator animating={true}/>) : null}
                <View style={{flex:1,flexDirection:"column"}}>
                {
                    this._renderRow(this.state.foundDs)
                }
                </View>
                <Text  style={styles.title}>Paired:</Text>
                {this.state.loading ? (<ActivityIndicator animating={true}/>) : null}
                <View style={{flex:1,flexDirection:"column",}}>
                {
                    this._renderRow(this.state.pairedDs)
                }
                </View>

                {/* <View style={{flexDirection:"row",justifyContent:"space-around",paddingVertical:30}}>
                <Button disabled={this.state.loading || !(this.state.bleOpend && this.state.boundAddress.length > 0 )}
                        title="ESC/POS" onPress={()=>{
                    this.props.navigator.push({
                        component:EscPos,
                        passProps:{
                            name:this.state.name,
                            boundAddress:this.state.boundAddress
                        }
                    })
                }}/>
                <Button disabled={this.state.loading|| !(this.state.bleOpend && this.state.boundAddress.length > 0) }
                        title="TSC" onPress={()=>{
                   this.props.navigator.push({
                       component:Tsc,
                       passProps:{
                           name:this.state.name,
                           boundAddress:this.state.boundAddress
                       }
                   })
                }
                }/>
                </View> */}
                
                <Button onPress={async () => {
                    await BluetoothEscposPrinter.printBarCode("123456789012", BluetoothEscposPrinter.BARCODETYPE.JAN13, 3, 120, 0, 2);
                    await  BluetoothEscposPrinter.printText("\r\n\r\n\r\n", {});
                }} title="Print BarCode"/>
                <Text style={{marginTop:20}}></Text>
                <Button onPress={async () => {
                await BluetoothEscposPrinter.printerInit();
                await  BluetoothEscposPrinter.printText("\n\r",{});
                await  BluetoothEscposPrinter.printText("\n\r",{});
                await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
                await BluetoothEscposPrinter.setBlob(0);
                await  BluetoothEscposPrinter.printText("TOKO SEJARAH\n\r", {
                encoding:'GBK',
                codepage:0,
                widthtimes:1,
                heigthtimes:1,
                fonttype:1
                });
                await  BluetoothEscposPrinter.printText("\n\r",{});
                await  BluetoothEscposPrinter.printText("------------------------------------------\n\r",{});
                //await  BluetoothEscposPrinter.printText("\n\r",{});

                await BluetoothEscposPrinter.printColumn([21,21],[BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
                ["Kasir","Mas Pendi"],{});
                await BluetoothEscposPrinter.printColumn([21,21],[BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
                ["Waktu","22 Mar 2021, 15:09"],{});
                await BluetoothEscposPrinter.printColumn([21,21],[BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
                ["No. Struk","#INV-0827123"],{});
                await BluetoothEscposPrinter.printColumn([21,21],[BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
                ["Jenis Pembayaran","Tunai"],{});

               //await  BluetoothEscposPrinter.printText("\n\r",{});
                await  BluetoothEscposPrinter.printText("------------------------------------------\n\r",{});
                
                await  BluetoothEscposPrinter.printText("### LUNAS ###\n\r", {
                    encoding:'GBK',
                    codepage:0,
                    widthtimes:0.8,
                    heigthtimes:0.8,
                    fonttype:0
                    });
                
                await  BluetoothEscposPrinter.printText("------------------------------------------\n\r",{});

                //with columns, split to 4 columns of 8 char each, need to specify alignment for each column and text for each column        
                await BluetoothEscposPrinter.printColumn([8,12,8,12],[BluetoothEscposPrinter.ALIGN.LEFT,BluetoothEscposPrinter.ALIGN.LEFT,BluetoothEscposPrinter.ALIGN.CENTER,BluetoothEscposPrinter.ALIGN.RIGHT],
                        ["1","PRODUCTA","2","Rp. 3000"],{});        
                await BluetoothEscposPrinter.printColumn([8,12,8,12],[BluetoothEscposPrinter.ALIGN.LEFT,BluetoothEscposPrinter.ALIGN.LEFT,BluetoothEscposPrinter.ALIGN.CENTER,BluetoothEscposPrinter.ALIGN.RIGHT],
                        ["2","PRODUCTB","3","Rp. 50,000"],{}); 
                //await  BluetoothEscposPrinter.printText("I am an english\r\n\r\n", {});
                
                }} title="Print Text"/>
            </ScrollView>
        );
    }

    _selfTest() {
        this.setState({
            loading: true
        }, ()=> {
            BluetoothEscposPrinter.selfTest(()=> {
            });

            this.setState({
                loading: false
            })
        })
    }

    _scan() {
        this.setState({
            loading: true
        })
        BluetoothManager.scanDevices()
            .then((s)=> {
                var ss = s;
                var found = ss.found;
                try {
                    found = JSON.parse(found);//@FIX_it: the parse action too weired..
                } catch (e) {
                    //ignore
                }
                var fds =  this.state.foundDs;
                if(found && found.length){
                    fds = found;
                }
                this.setState({
                    foundDs:fds,
                    loading: false
                });
            }, (er)=> {
                this.setState({
                    loading: false
                })
                alert('error' + JSON.stringify(er));
            });
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },

    title:{
        width:width,
        backgroundColor:"#eee",
        color:"#232323",
        paddingLeft:8,
        paddingVertical:4,
        textAlign:"left"
    },
    wtf:{
        flex:1,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        height:42
    },
    name:{
        flex:1,
        textAlign:"left"
    },
    address:{
        flex:1,
        textAlign:"right"
    }
});