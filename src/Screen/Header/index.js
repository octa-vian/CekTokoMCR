import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, ImageBackground} from 'react-native';
import {colors} from '../../Utils'

const Header = ({title, onPress, solor, gambar, drawer}) => {
  return (
    <SafeAreaView>
    <View style={styles.page}>
      <TouchableOpacity onPress ={onPress}>
      <Image source={require('../../Gambar/back.png')} style={styles.img} /> 
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity onPress={drawer} style={{alignItems:'flex-end', justifyContent:'center', height:28, width:28, flex:1, marginRight:30}}>
      <Image style={{height:28, width:28}} source={gambar} />
    </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
};

const HeaderImg = () => {
  return(
    <SafeAreaView>
    <ImageBackground source={require('../../Gambar/bgprofilehome.png')} style={styles.page2}>
      <TouchableOpacity onPress ={onPress}>
      <Image source={require('../../Gambar/back.png')} style={styles.img} /> 
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </ImageBackground>
    </SafeAreaView>
  )
}

export default Header;

const styles = StyleSheet.create({
  page: {
    height:60,
    fontSize:14,
    alignItems:'center',
    paddingLeft:26,
    flexDirection:'row',
    backgroundColor: colors.bgPrimary,
  },
  page2:{
    height:60,
    fontSize:14,
    alignItems:'center',
    paddingLeft:26,
    flexDirection:'row',
    width:375,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  img:{
    height:14,
    width:20,
    marginRight:26
  }
});
