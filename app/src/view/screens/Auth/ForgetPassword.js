import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ScrollView,
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  LogBox,
  Animated,
  ImageBackground,
  Pressable,
  StatusBar,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import ForgetPasswordImg from '../../../assets/images/forget.png';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {appImages} from '../../../assets/utilities/index';
import {Button, Divider, TextInput} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Back from '../../../assets/svg/back.svg';

import CustomButton from '../../../assets/Custom/Custom_Button';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SwitchSelector from 'react-native-switch-selector';
import User from '../../../assets/svg/User.svg';
LogBox.ignoreAllLogs();

const ForgetPassword = ({navigation}) => {
  const isFocused = useIsFocused();

  useEffect(() => {}, [isFocused]);

  const [email, setEmail] = useState('');

  const [isTextInputActive, setIsTextInputActive] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [openGallery, setOpenGallery] = useState(false);
  const [userName, setUserName] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const ref_RBSheet = useRef(null);
  const ref_RBSheetCamera = useRef(null);

  const handleFocus = () => {
    setIsTextInputActive(true);
  };

  const handleBlur = () => {
    setIsTextInputActive(false);
  };

  return (
    <ScrollView style={styles.bg} contentContainerStyle={{flexGrow: 1}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#FACA4E'} />
      <View style={styles.mainv}>

        
        <TouchableOpacity
          style={{marginTop: '9%', marginLeft: '8%', alignSelf: 'flex-start'}}
          onPress={() => navigation.goBack()}>
          <Back width={20} height={20} />
        </TouchableOpacity>

        <View style={styles.passwordImg}>
          <Image
            source={require('../../../assets/images/forget.png')}
            resizeMode="contain"
            style={{
              width: wp(40),
              height: hp(40),
            }}
          />
        </View>

        <Text style={styles.resetPasswordHeadingTxt}>Forget Password</Text>

        <Text style={styles.resetPasswordTxt}>
          Enter email address below, and well send you {'\n'} 4-digit code to
          reset the password
        </Text>

        <TextInput
          mode="outlined"
          label="Email Address"
          onChangeText={text => setEmail(text)}
          style={styles.ti}
          outlineColor="#0000001F"
          placeholderTextColor={'#646464'}
          activeOutlineColor="#FACA4E"
          autoCapitalize="none"
          onFocus={handleFocus}
          onBlur={handleBlur}
          left={
            <TextInput.Icon
              icon={() => (
                <MaterialCommunityIcons
                  name={'email-outline'}
                  size={23}
                  color={isTextInputActive == true ? '#FACA4E' : '#64646485'}
                />
              )}
            />
          }
          // left={isTextInputActive ? <Oemail /> : <Gemail />}
        />

        <View style={{marginTop: '25%', alignSelf: 'center'}}>
          <CustomButton
            title="Send Code"
            load={loading}
            // checkdisable={inn == '' && cm == '' ? true : false}
            customClick={() => {
             navigation.navigate("VerifyAccount")
              //navigation.navigate('Profile_image');
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  mainv: {
    flex: 1,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    alignItems: 'center',
    marginTop: '15%',
    backgroundColor: 'white',
  },
  bg: {
    // height:800,
    backgroundColor: '#FACA4E',
  },
  passwordImg: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(5),
    height: hp(25),
  },
  resetPasswordHeadingTxt: {
    marginTop: hp(3),
    fontFamily: 'Inter',
    color: '#333333',
    fontSize: wp(7),
    fontWeight: 'bold',
  },
  resetPasswordTxt: {
    marginTop: hp(1.5),
    textAlign: 'center',
    fontFamily: 'Inter',
    fontWeight: '400',
    color: '#9597A6',
    fontSize: wp(3.5),
  },
  ti: {
    marginHorizontal: '7%',
    marginTop: '10%',
    width: 300,
    backgroundColor: 'white',
    fontSize: wp(4),
    paddingLeft: '2%',
    borderRadius: 10,
  },
});
