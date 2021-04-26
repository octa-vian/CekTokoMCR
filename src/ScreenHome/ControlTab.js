import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Animated from 'react-native-reanimated';
import TabIcon from './IconTab';
import { colors } from '../Utils';
import IconTab from './IconTab';



const ControlTab = ({ state, descriptors, navigation, position }) => {
  
  return (
    <View>
    <View style={{ flexDirection: 'row', alignItems:'center', justifyContent:'space-around', backgroundColor:'white', height:56, paddingRight:22, paddingLeft:22,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    
    elevation: 11,
    }}>
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
          <IconTab key={index} title={label} active={isFocused} onPress={onPress} onLongPress={onLongPress}/>
        );
      })}
    </View>
    </View>
  );
}
export default ControlTab;