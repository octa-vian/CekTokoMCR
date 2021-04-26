import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Platform } from 'react-native'
import { colors } from '../../Utils'
import Header from '../Header'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Api from '../../Api';

const UbahWaktuPengiriman = ({navigation}) => {

    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');

    const [showTime, setTime] = useState(false);
    const [showTime1, setTime1] = useState(false);
    const [showTime2, setTime2] = useState(false);
    const [showTime2S, setTime2S] = useState(false);
    const [showTime3, setTime3] = useState(false);
    const [showTime3S, setTime3S] = useState(false);
    const [jamBuka, setJambuka] = useState();
    const [jamTutup, setJamTutup] = useState();

    const [jBuka, setJbuka] = useState();
    const [jTutup, setJtutup] = useState();

    const [JamBuka2, setJamBuka2] = useState();
    const [JamTutup2, setJamTutup2] = useState();

    const [jBuka2, setJbuka2] = useState();
    const [jTutuo2, setJtutup2] = useState();

    const [JamBuka3, setJambuka3] = useState();
    const [JamTutup3, setJamTutup3] = useState();

    const [jbuka3, setJbuka3] = useState();
    const [jTutup3, setJtutup3] = useState();


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setTime(Platform.OS === 'ios');
        setDate(currentDate);
        setJambuka(moment(currentDate).format('HH:mm:ss'));
        setJbuka(moment(currentDate).format('HH:mm'));
      };

      const onChangeTutup = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setTime1(Platform.OS === 'ios');
        setDate(currentDate);
        setJamTutup(moment(currentDate).format('HH:mm:ss'));
        setJtutup(moment(currentDate).format('HH:mm'));
      };

      const onChangeBuka2 = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setTime2(Platform.OS === 'ios');
        setDate(currentDate);
        setJamBuka2(moment(currentDate).format('HH:mm:ss'));
        setJbuka2(moment(currentDate).format('HH:mm'));
      };

      const onChangeTutup2 = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setTime2S(Platform.OS === 'ios');
        setDate(currentDate);
        setJamTutup2(moment(currentDate).format('HH:mm:ss'));
        setJtutup2(moment(currentDate).format('HH:mm'));
      };

      const onChangeBuka3 = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setTime3(Platform.OS === 'ios');
        setDate(currentDate);
        setJambuka3(moment(currentDate).format('HH:mm:ss'));
        setJbuka3(moment(currentDate).format('HH:mm'));
      };

      const onChangeTutup3 = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setTime3S(Platform.OS === 'ios');
        setDate(currentDate);
        setJamTutup3(moment(currentDate).format('HH:mm:ss'));
        setJtutup3(moment(currentDate).format('HH:mm'));
      };

      const showMode = (currentMode) => {
        setTime(true);    
        setMode(currentMode);
      };

      const showMode1Tutup = (currentMode) => {
        setTime1(true);    
        setMode(currentMode);
      };
      
      const showModeBuka2= (currentMode) => {
        setTime2(true);    
        setMode(currentMode);
      };

      const showModeTutup2 = (currentMode) => {
        setTime2S(true);    
        setMode(currentMode);
      };

      const showModeBuka3= (currentMode) => {
        setTime3(true);    
        setMode(currentMode);
      };

      const showModeTutup3= (currentMode) => {
        setTime3S(true);    
        setMode(currentMode);
      };

      

      const showTimepicker = () => {
        showMode('time');
      };

      const showTimepicker1Tutup = () => {
        showMode1Tutup('time');
      };

      const showTimepickerBuka2 = () => {
        showModeBuka2('time');
      };

      const showTimepickerTutup2 = () => {
        showModeTutup2('time');
      };

      const showTimepickerBuka3 = () => {
        showModeBuka3('time');
      };

      const showTimepickerTutup3 = () => {
        showModeTutup3('time');
      };

      const param = {
        sesi1_awal:jamBuka,
        sesi1_akhir:jamTutup,
        sesi2_awal:JamBuka2,
        sesi2_akhir:JamTutup2,
        sesi3_awal:JamBuka3,
        sesi3_akhir:JamTutup3
    }

    console.log('data: ', param)

      const PostSesi = () => {
          Api.post('profile/update_sesi_pengiriman', param)
          .then(async (body) => {
              let res = body.data
              let metadata = res.metadata

              if(metadata.status === 200){
                  alert(metadata.message);
                  navigation.navigate('Profil');
              } else {
                  alert(metadata.message);
              }
          })
      }

    return (
        <View style={{flex:1, backgroundColor:'white'}}>
            <Header title="Ubah Waktu Pengiriman" onPress={() => navigation.goBack()}/>

            <ScrollView>
            <View style={{marginTop:16, }}>
                <Text style={{fontSize:14, fontWeight:'bold', marginLeft:16}}>Sesi 1</Text>
            <View style={{flexDirection:'row', alignItems:'center', marginTop:16}}>
                <TouchableOpacity style={{height:49, flex:1, backgroundColor:colors.bglayout, marginLeft:16, marginRight:6, borderRadius:100, justifyContent:'center', paddingLeft:24}} onPress={showTimepicker}>
                    <Text style={{fontSize:14, fontWeight:'bold'}}>{jBuka}</Text>
                </TouchableOpacity>
                <View style={{width:20, borderWidth:4, borderColor:colors.bglayout, borderRadius:10}}></View>
                <TouchableOpacity style={{height:49, flex:1, backgroundColor:colors.bglayout, marginLeft:6, marginRight:16, borderRadius:100, justifyContent:'center', paddingLeft:24}} onPress={showTimepicker1Tutup}>
                <Text style={{fontSize:14, fontWeight:'bold'}}>{jTutup}</Text>
                </TouchableOpacity>
            </View>
            </View>

            <View style={{borderWidth:4, borderColor:colors.bglayout, marginTop:24, marginBottom:24, }} />

            <View style={{marginTop:16, }}>
                <Text style={{fontSize:14, fontWeight:'bold', marginLeft:16}}>Sesi 2</Text>
            <View style={{flexDirection:'row', alignItems:'center', marginTop:16}}>
                <TouchableOpacity style={{height:49, flex:1, backgroundColor:colors.bglayout, marginLeft:16, marginRight:6, borderRadius:100, justifyContent:'center', paddingLeft:24}} onPress={showTimepickerBuka2}>
                <Text style={{fontSize:14, fontWeight:'bold'}}>{jBuka2}</Text>
                </TouchableOpacity>
                <View style={{width:20, borderWidth:4, borderColor:colors.bglayout, borderRadius:10}}></View>
                <TouchableOpacity style={{height:49, flex:1, backgroundColor:colors.bglayout, marginLeft:6, marginRight:16, borderRadius:100, justifyContent:'center', paddingLeft:24}} onPress={showTimepickerTutup2}>
                <Text style={{fontSize:14, fontWeight:'bold'}}>{jTutuo2}</Text>
                </TouchableOpacity>
            </View>
            </View>

            <View style={{borderWidth:4, borderColor:colors.bglayout, marginTop:24, marginBottom:24, }} />

            <View style={{marginTop:16, }}>
                <Text style={{fontSize:14, fontWeight:'bold', marginLeft:16}}>Sesi 3</Text>
            <View style={{flexDirection:'row', alignItems:'center', marginTop:16}}>
                <TouchableOpacity style={{height:49, flex:1, backgroundColor:colors.bglayout, marginLeft:16, marginRight:6, borderRadius:100, justifyContent:'center', paddingLeft:24}} onPress={showTimepickerBuka3}>
                <Text style={{fontSize:14, fontWeight:'bold'}}>{jbuka3}</Text>
                </TouchableOpacity>
                <View style={{width:20, borderWidth:4, borderColor:colors.bglayout, borderRadius:10}}></View>
                <TouchableOpacity style={{height:49, flex:1, backgroundColor:colors.bglayout, marginLeft:6, marginRight:16, borderRadius:100, justifyContent:'center', paddingLeft:24}} onPress={showTimepickerTutup3}>
                <Text style={{fontSize:14, fontWeight:'bold'}}>{jTutup3}</Text>
                </TouchableOpacity>
            </View>
            </View>
            </ScrollView>

            {showTime && (
                    <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display='default'
                    onChange={onChange}
                    />
                )}
            
            {showTime1 && (
                    <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date}
                    mode={mode}
                    is24Hour={true}
                    display='default'
                    onChange={onChangeTutup}
                    />
                )}

            {showTime2 && (
                    <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date}
                    mode={mode}
                    is24Hour={true}
                    display='default'
                    onChange={onChangeBuka2}
                    />
            )}

            {showTime2S && (
                    <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date}
                    mode={mode}
                    is24Hour={true}
                    display='default'
                    onChange={onChangeTutup2}
                    />
            )}

            {showTime3 && (
                    <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date}
                    mode={mode}
                    is24Hour={true}
                    display='default'
                    onChange={onChangeBuka3}
                    />
            )}

            {showTime3S && (
                    <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date}
                    mode={mode}
                    is24Hour={true}
                    display='default'
                    onChange={onChangeTutup3}
                    />
            )}


            <View style={{alignItems:'center', justifyContent:'center'}}>

                <TouchableOpacity style={{height:48, width:'85%', backgroundColor:colors.btnActif, borderRadius:100, marginBottom:24, alignItems:'center', justifyContent:'center'}} onPress={() => PostSesi()}>
                    <Text style={{fontSize:14, fontWeight:'bold', color:'white'}}>Simpan Perubahan</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default UbahWaktuPengiriman
