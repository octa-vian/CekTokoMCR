import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import {colors} from '../Utils'
import { SwitchButton } from '../Button';
import { color } from 'react-native-reanimated';
const HomeScreen = ({navigation}) => {
    return (
        <View style={{flex:1, backgroundColor:colors.bgPrimary}}>
            <View style={{flexDirection:'row',height:60, backgroundColor:colors.bgPrimary, justifyContent:'flex-end' }}>
                <TouchableOpacity onPress ={() => navigation.navigate('Login')} style={{height:24, width:24, alignItems:'center', marginTop:19, marginRight:17, marginBottom:10}}>
                    <Image source = {require('../Gambar/notif.png')} style={{height:24, width:24, alignItems:'center'}}/>
                </TouchableOpacity>
                
                <TouchableOpacity onPress ={() => navigation.navigate('Login')} style={{alignItems:'center', height:24, width:24, justifyContent:'center', marginTop:19, marginBottom:10, marginRight:35 }}>
                    <Image source = {require('../Gambar/setting.png')} style={{height:24, width:24, alignItems:'center'}}/>
                </TouchableOpacity>

            </View>

            <View style={{flexDirection:'row', alignItems:'center', backgroundColor:colors.bgPrimary, paddingTop:15, paddingRight:42}}>
                <Image source = {require('../Gambar/fotoprofile.png')} style={{height:96, width:96, alignItems:'center', marginTop:17, marginLeft:20, marginRight:15}}/>
                <View style={{flex:1, marginLeft:15}}>
                    <Text style={{fontSize:19, color:'white', fontWeight:'bold'}}>TOKO SEMESTA</Text>
                    <Text style={{fontSize:12, color:'white', marginTop:2}}>Jalan mangga no. 129292</Text>
                    <View style={{borderBottomColor: 'gray',
                    borderBottomWidth: 1, marginVertical:10 }}>
                    </View>
                    <View style={{flex:1, flexDirection:'row'}}>
                        <Text style={{flex:1, fontSize:11, color:'white'}}>Rating kelengkapan produk</Text>
                        <Image source={require('../Gambar/starkuning.png')} style={{height:10, width:10, marginRight:2}}/>
                        <Text style={{justifyContent:'center', alignItems:'center', color:'white', fontSize:10}}>5</Text>
                        
                    </View>
                    <View style={{flex:1, flexDirection:'row'}}>
                        <Text style={{flex:1, fontSize:11, color:'white'}}>Rating Harga</Text>
                        <Image source={require('../Gambar/starkuning.png')} style={{height:10, width:10, marginRight:2}}/>
                        <Text style={{justifyContent:'center', alignItems:'center', color:'white', fontSize:10}}>5</Text>
                        
                    </View>
                    <View style={{flex:1, flexDirection:'row'}}>
                        <Text style={{flex:1, color:'white', fontSize:11}}>Rating Pelayanan</Text>
                        <Image source={require('../Gambar/starkuning.png')} style={{height:10, width:10, marginRight:2}}/>
                        <Text style={{justifyContent:'center', alignItems:'center', color:'white', fontSize:10}}>5</Text>
                        
                    </View>
                </View>
            </View>

            <View style={{flexDirection:'row', alignContent:'flex-end', alignItems:'center', justifyContent:'flex-end', paddingTop:20, paddingRight:24, paddingBottom:10}}>
                <Text style={{color:'white', fontSize:12, marginRight:10,}}>Status Toko</Text>
                <SwitchButton/>
            </View>

            <View style={{flex:1,backgroundColor:colors.bglayout}}>
                <TouchableOpacity style={styles.CrView} onPress={() => navigation.navigate('Top')}>
                    <View style={styles.rowBodyCard}>
                        <View style={{alignItems:'center', marginLeft:20}}>
                        <Image source = {require('../Gambar/daftarpesanan.png')} style={{height:40, width:40}}/>  
                        </View>
                    <Text style={{fontSize:14, fontWeight:'bold', marginLeft:40}} >
                        Daftar Pesanan
                    </Text> 
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.CrView} onPress={() => navigation.navigate('Login')}>
                    <View style={styles.rowBodyCard}>
                        <View style={{alignItems:'center', marginLeft:20}}>
                        <Image source = {require('../Gambar/ratingtoko.png')} style={{height:40, width:40}}/>  
                        </View>
                    <Text style={{fontSize:14, fontWeight:'bold', marginLeft:40}} >
                        Rating Toko
                    </Text> 
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.CrView} onPress={() => navigation.navigate('Login')}>
                    <View style={styles.rowBodyCard}>
                        <View style={{alignItems:'center', marginLeft:20}}>
                        <Image source = {require('../Gambar/produkpopuler.png')} style={{height:40, width:40}}/>  
                        </View>
                    <Text style={{fontSize:14, fontWeight:'bold', marginLeft:40}} >
                        Produk Populer
                    </Text> 
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.CrView} onPress={() => navigation.navigate('Login')}>
                    <View style={styles.rowBodyCard}>
                        <View style={{alignItems:'center', marginLeft:20}}>
                        <Image source = {require('../Gambar/ubahprofile.png')} style={{height:40, width:40}}/>  
                        </View>
                    <Text style={{fontSize:14, fontWeight:'bold', marginLeft:40}} >
                        Ubah Profile
                    </Text> 
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    Container:{
        flex:1,
        backgroundColor:colors.bglayout,
      },
    
      ContainerBody:{
        backgroundColor:'red'
      },
    
      Header:{
        height:60,
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'flex-end',
        backgroundColor:colors.bgPrimary
      },
      Body:{
        height:180,
      }, 
      bodyColom:{
        flexDirection:'column',
        height:140,
        backgroundColor:colors.bgPrimary
      }, 
      bodyRow:{
        flexDirection:'row',
        height:140
      },
      body1:{
        width:130,
      },
      body2:{
        width:180,
        
      },
      body3:{
        width:40,
      },
      bd:{
        width:20,
        alignItems:'center'
      },
      bd1:{
        width:20,
        alignItems:'center',
      },
      bodyRow2:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-end',
        backgroundColor:colors.bgPrimary,
        paddingRight:24,
        height:40
      },
      rowBodyCard:{
        flexDirection:'row',
        alignItems:'center'
      },
      CrView:{
        shadowColor: "#000",
        backgroundColor:'white',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        height:55,
        justifyContent:'center',
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginRight:24,
        marginLeft:24,
        marginTop:17,
        borderRadius:6
      }

})
