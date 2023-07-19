import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import UesrMob from '../Mobxstate/UesrMob';
import { CommonActions } from '@react-navigation/native';

const SplashScr = (props:any) => {

  useEffect(()=>{
    setTimeout(() => {
      // Navigate to the main screen after 3 seconds
      console.log("Checking in splash",UesrMob)
      if (UesrMob.isLogin === true)
      {
        props.navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [
              { name: 'HomeTab' },
            ],
          })
        );
        // props.navigation.navigate('HomeTab');
      }
      else 
      {
        props.navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [
              { name: 'Login' },
            ],
          })
        );
        // props.navigation.navigate('Login');
      }
      
    }, 1000);
  },[]);
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/Splash1.png')} resizeMode="cover" style={styles.image}></ImageBackground>
    </View>
  )
}

export default SplashScr

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white'
  },
  image:{
    flex:1
  }
})