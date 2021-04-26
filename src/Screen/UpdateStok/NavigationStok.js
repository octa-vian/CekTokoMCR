import React from 'react'
import { View, Text } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { colors } from '../../Utils';
import produkpopuler from '../ProdukPopuler/ProdukPopuler'
import RatingToko from '../RatingToko/RatingToko';
import Header from '../Header';
import ProdukMenipis from '../ProdukPopuler/ProdukMenipis';


const Tab = createMaterialTopTabNavigator();

const NavigationStok = ({navigation}) => {
    return (
        <View style={{flex:1, }}>
            <Header title={'Update Stok'} onPress={() => navigation.goBack()} />

            <Tab.Navigator
            initialRouteName="Home"
            backgroundColor={colors.bgPrimary}
            tabBarOptions={{
                activeTintColor: colors.btnActif,
                inactiveTintColor: colors.bgPrimary,
                indicatorStyle:{
                backgroundColor:colors.btnredcolor
                },
                labelStyle: { fontSize: 14, fontWeight:'bold', textTransform:'capitalize' },
                style: { backgroundColor: 'white' },
                
            }}>

            <Tab.Screen
                name="Semua Barang"
                component={produkpopuler}
                options={{ tabBarLabel: 'Semua Barang', }}
            />

            <Tab.Screen
                name="Stok Menipis"
                component={ProdukMenipis}
                options={{ tabBarLabel: 'Stok Menipis' }}
            />
            
            </Tab.Navigator>
        </View>
    )
}

export default NavigationStok
