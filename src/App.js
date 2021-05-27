// In App.js in a new project

import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Rooter from './Rooter';
import PushNotification from 'react-native-push-notification';
import {Platform} from 'react-native';
import { fcmService } from './FCMService';
import { localNotificationService } from './LocalNotificationService';
import Toast from 'react-native-toast-message';
import soundNotif from './asset/cektokonotif.mp3';

const Stack = createStackNavigator();



function App() {
  React.useEffect(() => {
    fcmService.registerAppWithFCM()
    fcmService.register(onRegister, onNotification, onOpenNotification)
    localNotificationService.configure(onOpenNotification)
    
    PushNotification.createChannel(
      {
        channelId: "myCektoko", // (required)
        channelName: "myCektoko", // (required)
        soundName: "cektokonotif.mp3",
        importance: 4,
        vibrate: true,
      },
      (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );
  
  
    function onRegister(token) {
      console.log("[App] onRegister: ", token)
    }
  
    function onNotification(notify) {
      console.log("[App] onNotification: ", notify)

      if(Platform.OS === 'android'){
        PushNotification.createChannel(
            {
                channelId: "myCekToko", // (required)
                channelName: "myCekToko", // (required)
                soundName: "cektokonotif.mp3",
                importance: 4,
                vibrate: true,
            },
            (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
            );
      }

      const options = {
        soundName: 'default',
        playSound: true,
        //cektokonotif.mp3
        //largeIcon: '../src/imgSvg/maskot.png', // add icon large for Android (Link: app/src/main/mipmap)
        // add icon small for Android (Link: app/src/main/mipmap)
      }

      localNotificationService.showNotification(
        0,
        notify.title,
        notify.body,
        notify,
        options
      )
    }
  
    function onOpenNotification(notify) {
      console.log("[App] onOpenNotification: ", notify)

      if(Platform.OS === 'android'){
        PushNotification.createChannel(
            {
                channelId: "myCekToko", // (required)
                channelName: "myCekToko", // (required)
                soundName: "cektokonotif.mp3",
                importance: 4,
                vibrate: true,
            },
            (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
            );
      }

    }
  
    return () => {
      console.log("[App] unRegister")
      fcmService.unRegister()
      localNotificationService.unregister()
    }
  
  }, [])
  return (
   <View style={{flex:1}}>
     <Toast ref={(ref) => Toast.setRef(ref)}/>
     <Rooter></Rooter>
   </View>
  );
}

export default App;