import React from 'react'
import { View, Text, Modal, TextInput, TouchableOpacity } from 'react-native'
import { colors } from '../Utils'

const PopUpTambahProduk = ({visible, btnSimpan}) => {
    return (
        <Modal animationType='slide' transparent={true}
        visible={visible}>
            <View style={{flex:1, backgroundColor:'rgba(52, 52, 52, 0.9)'}}>

                <View style={{flex:1, marginTop:200, backgroundColor:'white', borderTopLeftRadius:20, borderTopRightRadius:20}}>
                    
                    <View style={{flexDirection:'row'}}>
                    <TouchableOpacity style={{flex:1}} onPress={btnSimpan}>
                    <Text style={{fontSize:14, fontWeight:'bold', color:colors.btnActif, marginTop:12, marginLeft:15}}> Batalkan </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex:1, alignItems:'flex-end'}} onPress={btnSimpan}>
                    <Text style={{fontSize:14, fontWeight:'bold', color:colors.btnActif, marginTop:12, marginRight:15}}> Simpan </Text>
                    </TouchableOpacity>
                    </View>
                    

                    <View style={{alignItems:'center', justifyContent:'center', marginTop:50}}>
                    <Text style={{fontSize:14, fontWeight:'bold', marginLeft:20, marginRight:20, color:'#EB2843'}}> Produk Yang Kamu Rekomendasikan </Text>
                    </View>

                    <View style={{marginTop:44}}>
                        <Text style={{marginLeft:47, fontSize:12, fontWeight:'bold', color:'black'}}>Nama Produk</Text>
                        <TextInput style={{height:37, width:299, borderColor:'black', borderRadius:4, marginTop:8, marginBottom:10, borderWidth:1, marginLeft:37, marginRight:37, paddingLeft:10}}>

                        </TextInput>
                        <Text style={{marginLeft:47, fontSize:12, fontWeight:'bold', color:'black'}}>Jumlah</Text>
                        <TextInput style={{height:37, width:299, borderColor:'black', borderRadius:4, marginTop:8, marginBottom:10, borderWidth:1, marginLeft:37, marginRight:37, paddingLeft:10}}>

                        </TextInput>
                        <Text style={{marginLeft:47, fontSize:12, fontWeight:'bold', color:'black'}}>Satuan</Text>
                        <TextInput style={{height:37, width:299, borderColor:'black', borderRadius:4, marginTop:8, marginBottom:10, borderWidth:1, marginLeft:37, marginRight:37, paddingLeft:10}}>

                        </TextInput>
                    </View>

                    {/* <View style={{alignItems:'center', justifyContent:'center', marginTop:10}}>
                    <TouchableOpacity style={{height:32, width:120, backgroundColor:colors.btnActif, borderRadius:8, alignItems:'center', justifyContent:'center'}} onPress={btnSimpan}>
                        <Text style={{fontSize:12, color:'white', fontWeight:'bold', textTransform:'uppercase'}}> Simpan </Text>
                    </TouchableOpacity>
                    </View> */}

                </View>

            </View>
        </Modal>
    )
}

export default PopUpTambahProduk
