import React, { useState, useEffect } from 'react'
import { View, Text, Alert, Button } from 'react-native'
import RepoUtil from '../Helper/RepoUtil'

const Info = ({navigation}) => {
    const [session, setSession] = useState(null);

    const loadSession = async () => {
        const dataRepo = await RepoUtil.GetAsObject('@session');
        console.log('data Repo', dataRepo);
        setSession(dataRepo);
        if(dataRepo != null){
            // alert('Anda Sudah Login');
        }
      };

      useEffect(() => {
        loadSession();
     }, []);


     const confirmLogout = () => {
        Alert.alert(
          'Perhatian',
          'Apakah Anda Yakin Akan Logout ?',
          [
            {
              text: 'Batal',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'Ya',
              onPress: async () => {
                await RepoUtil.RemoveValue('@session');
                navigation.replace('Login');
              },
            },
          ],
          {cancelable: false},
        );
      };

    return (
        <View style={{flex:1, justifyContent:'center'}}>
            <Text> Hello Info</Text>

            <Button  title="Logout" color="red" onPress={() => confirmLogout()} />

        </View>
    )
}

export default Info
