import React, { useEffect, useState } from 'react'
import { View, Text, Modal, TouchableOpacity, StyleSheet, FlatList, SafeAreaView, Image } from 'react-native'
import {
    SelectMultipleButton,
    SelectMultipleGroupButton
  } from "react-native-selectmultiple-button";
import Api from '../Api';
import ButtonFilter from '../Button/ButtonFilterList/ButtonFilter';
import { IconExit } from '../IconSvg';
import { colors } from '../Utils';

const PopupFilter = ({visible, back, pushId}) => {

    const multipleData = ["Semua", "Sembako", "Daging", "Sayur", "Snack", "Minuman", "Sacset"];
    const [btn, setBtn] = useState([]);
    const [btnUrutan, setUrutan] = useState([]);
    const [changeColor, setColor] = useState();
    const [changeColorUrutan, setColorUrutan] = useState();
    const [id, setId] = useState([]);

    const data = [
        {id: '1', name:'Termurah', nilai:'termurah'},
        {id: '2', name:'Termahal', nilai:'termahal'},
        {id:'3', name:'A-Z', nilai:'a-z'},
        {id:'4', name:'Z-A', nilai:'z-a'}
    ];

      useEffect(() =>{
          getData();
      }, [])

      const getData = () =>  {
          Api.get('product/kategori')
          .then( async (response) => {
              let res = response.data;
              let metadata = res.metadata;

              if(metadata.status === 200) {
                 // alert(metadata.message);
                  setBtn(res.response);
              } else{
                alert(metadata.message);
              }
          })
      }

      const SelectedItem = (select) => {
          btn.map((value) => {
              value.id;
              value.posisi=false;
          })
          btn[select].posisi=true;

          if(btn[select].posisi === true){
             // alert('berhasil');
              setColor(select);
              pushId = btn[select].id;
          }
          console.log('id: ', pushId);
          console.log('btn: ', btn);
      }

      const SelectedItemUrutan = (select) => {
        data.map((value) => {
            value.id;
            value.posisi=false;
        })
        data[select].posisi=true;

        if(data[select].posisi === true){
           // alert('berhasil');
            setColorUrutan(select);
        }

        console.log('btn: ', data);
    }

    //   const getDataUrutan = () =>  {
    //     Api.get('product/kategori')
    //     .then( async (response) => {
    //         let res = response.data;
    //         let metadata = res.metadata;

    //         if(metadata.status === 200) {
    //             alert(metadata.message);
    //             setBtn(res.response);
    //         } else{
    //           alert(metadata.message);
    //         }
    //     })
    // }

      const renderItem = ({item, index}) => {

        if (index === changeColor){
            return (
                <ButtonFilter 
                style={{borderColor:colors.btnActif,
                borderWidth: 1, backgroundColor:'#FFF3F5'}}
                textStyle={{color:'#EB2843'}}
                key={item.id}
                tittle={item.kategori}
                onPress={() => SelectedItem(index)}>
                </ButtonFilter> 
                );
        } else{
            return (
                <ButtonFilter 
                key={item.id}
                tittle={item.kategori}
                onPress={() => SelectedItem(index)}>
                </ButtonFilter> 
                );
        }
        };

    const renderUrutkan = ({item, index}) => {
        
        if(index === changeColorUrutan){
            return(
                <ButtonFilter 
                key={item.id}
                style={{borderColor:colors.btnActif,
                borderWidth: 1, backgroundColor:'#FFF3F5'}}
                textStyle={{color:'#EB2843'}}
                tittle={item.name}
                nilai={item.nilai}
                onPress={() => SelectedItemUrutan(index)}>
                </ButtonFilter> 
                )
        } else {
            return(
                <ButtonFilter 
                key={item.id}
                tittle={item.name}
                nilai={item.nilai}
                onPress={() => SelectedItemUrutan(index)}>
                </ButtonFilter> 
                )
        }
        
    }

    return (
        <SafeAreaView>
        <Modal
        animationType='slide' transparent={true}
        visible={visible}>
        <View style={styles.page}>

            <View style={styles.filter}>
            <TouchableOpacity style={{alignItems:'flex-end', marginTop:15, marginRight:20,}} onPress={back} >
                <IconExit height={18} width={18} />
            </TouchableOpacity>
                
                <View style={{flex:1,}} >
                <Text style={{marginTop:15, marginLeft:15, fontWeight:'bold', fontSize:12}}> Kategori </Text>

                <View style={{justifyContent:'center'}}>
                <FlatList
                data={btn}
                renderItem={(item, index) => renderItem(item, index)}
                keyExtractor={item => item.id}
                numColumns={3}/>
                </View>

                <Text style={{marginTop:45, marginLeft:15, fontWeight:'bold', fontSize:12}}> Urutkan </Text>

                <View style={{justifyContent:'center',}} >
                <FlatList
                data={data}
                renderItem={ (item, index) => renderUrutkan(item, index)}
                keyExtractor={item => item.id}
                numColumns={3}/>
                </View>
                </View>

            <TouchableOpacity style={styles.btnFilter} onPress={() => pushId} >
                <Text style={{color:'white', fontSize:14, fontWeight:'bold'}}> Terapkan </Text> 
            </TouchableOpacity>

            </View>

        </View>
        </Modal>
        </SafeAreaView>
    )
}

export default PopupFilter

const styles = StyleSheet.create({

    page:{
        flex:1,
        backgroundColor:'rgba(52, 52, 52, 0.9)',
        justifyContent:'center',
        
    },
    filter:{
        flex:1,
        justifyContent:'center',
        marginTop:200,
        backgroundColor:'white',
        borderTopLeftRadius:25,
        borderTopRightRadius:25,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,

        elevation: 15,
        },
    btnFilter:{
        height:35, 
        width:160, 
        borderRadius:6,
        marginLeft:100,
        marginRight:100,
        marginBottom:30,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:colors.btnActif,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,

        elevation: 13,
            }
})
