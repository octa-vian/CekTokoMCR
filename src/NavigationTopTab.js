import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Animated from 'react-native-reanimated';
import TabIcon from './Tabicon';
import { colors } from './Utils';
import Header from './Screen/Header';



const NavigationTopTab = ({state, descriptors, navigation, position }) => {
  //const {kodeSesi} = route.params;
  return (
    <View>
      <Header title= "Daftar Pesanan" onPress={()=> navigation.goBack()}/>
    <View style={{ flexDirection: 'row', alignItems:'center', backgroundColor:'white', height:130, width:'100%' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: route.name,
                  params:{name:route.name}
                }
              ]
            });
          }
        };

        

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TabIcon key={index} title={label} active={isFocused} onPress={onPress} onLongPress={onLongPress}/>
        );
      })}
    </View>
    </View>
  );
}
export default NavigationTopTab;