import { Image, StyleSheet, StatusBar, Text, View } from 'react-native'
import React,{useEffect} from 'react'

import { appImages } from '../../assets/utilities';

import {
    heightPercentageToDP as hp,
    widthPercentageToDP,
    widthPercentageToDP as wp,
  } from 'react-native-responsive-screen';
  

export default function SplashScreen({navigation}) {

    useEffect(() => {
        // Use setTimeout to navigate to the next screen after 3 seconds
        const delay = 500; // 3 seconds in milliseconds
    
        const timeoutId = setTimeout(() => {
          // Navigate to the next screen here
          navigation.navigate('Signin_signup'); // Replace 'NextScreen' with the actual screen name
        }, delay);
    
        // Clear the timeout if the component unmounts (cleanup)
        return () => clearTimeout(timeoutId);
      }, [navigation]); // Include 'navigation' in the dependency array
    
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />

      <Image style={{width:wp(70), height:hp(70), resizeMode:'contain'}} source={appImages.logo}/>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white'
    }
})