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

import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';

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
import CustomSnackbar from '../../../assets/Custom/CustomSnackBar';
LogBox.ignoreAllLogs();

const ResetPassword = ({navigation}) => {
  const isFocused = useIsFocused();

  useEffect(() => {}, [isFocused]);

  const [newPassword, setNewPassword] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState();

  const [isTextInputActive, setIsTextInputActive] = useState(false);
  const [isConfirmActive, setIsConfirmPasswordActive] = useState(false);

  const [loading, setIsLoading] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [openGallery, setOpenGallery] = useState(false);
  const [userName, setUserName] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const ref_RBSheet = useRef(null);
  const ref_RBSheetCamera = useRef(null);

  const [signin_email, setsignin_email] = useState();
  const [signin_pass, setsignin_pass] = useState();
  const [confirm, setconfirm_pass] = useState();

  const [signin_ShowPassword, setsignin_ShowPassword] = useState(true);
  const [signin_ConfirmShowPassword, setsignin_ConfirmShowPassword] = useState(true);

  const [signin_ShowPassword1, setsignin_ShowPassword1] = useState(true);
  const [signin_ShowPassword2, setsignin_ShowPassword2] = useState(true);

  const [username, setusername] = useState();
  const [signup_email, setsignup_email] = useState();
  const [signup_pass, setsignup_pass] = useState();
  const [signup_cpass, setsignup_cpass] = useState();

  const [isTextInputActive1, setIsTextInputActive1] = useState(false);
  const [isTextInputActive2, setIsTextInputActive2] = useState(false);
  const [isTextInputActive3, setIsTextInputActive3] = useState(false);
  const [isTextInputActive4, setIsTextInputActive4] = useState(false);
  const [isTextInputActive5, setIsTextInputActive5] = useState(false);

  const [isTextInputActiveConfirmPass, setIsTextInputActiveConfirmPass] = useState(false);

  const handleFocus = () => {
    setIsTextInputActive(true);
  };

  const handleBlur = () => {
    setIsTextInputActive(false);
  };

  const handleFocus1 = () => {
    setIsTextInputActive1(true);
  };

  const handleBlur1 = () => {
    setIsTextInputActive1(false);
  };

  const handleFocus2 = () => {
    setIsTextInputActiveConfirmPass(true)
  };

  const handleBlur2 = () => {
    setIsTextInputActiveConfirmPass(false)

  };
  const handleFocus3 = () => {
    setIsTextInputActive3(true);
  };

  const handleBlur3 = () => {
    setIsTextInputActive3(false);
  };
  const handleFocus4 = () => {
    setIsTextInputActive4(true);
  };

  const handleBlur4 = () => {
    setIsTextInputActive4(false);
  };
  const handleFocus5 = () => {
    setIsTextInputActive5(true);
  };

  const handleBlur5 = () => {
    setIsTextInputActive5(false);
  };

  const handleTogglePasswordVisibility = () => {
    setsignin_ShowPassword(!signin_ShowPassword);
  };

  const handleTogglePasswordVisibilityConfirm = () => {
    setsignin_ConfirmShowPassword(!signin_ConfirmShowPassword);
  };
  const handleTogglePasswordVisibility1 = () => {
    setsignin_ShowPassword1(!signin_ShowPassword1);
  };
  const handleTogglePasswordVisibility2 = () => {
    setsignin_ShowPassword2(!signin_ShowPassword2);
  };

  //----------------------------\\

  const handleFocusConfirmPassword = () => {
    setIsConfirmPasswordActive(true);
  };


  //--------------------------\\

  
  //----------------------------\\


  const dismissSnackbar = () => {
    setSnackbarVisible(true);
  };

  const handleBlurConfirmPassword = () => {
    setIsConfirmPasswordActive(false);
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
              width: wp(45),
              height: hp(45),
            }}
          />
        </View>

        <Text style={styles.resetPasswordHeadingTxt}>Reset Password</Text>

        <Text style={styles.resetPasswordTxt}>Create a strong password</Text>

        <View>
          <TextInput
            mode="outlined"
            label="Password"
            onChangeText={text => setsignin_pass(text)}
            style={styles.ti}
            placeholderTextColor={'#646464'}
            outlineColor="#0000001F"
            activeOutlineColor="#FACA4E"
            secureTextEntry={signin_ShowPassword}
            onFocus={handleFocus1}
            onBlur={handleBlur1}
            left={
              <TextInput.Icon
                icon={() => (
                  <MaterialCommunityIcons
                    name={'lock-outline'}
                    size={23}
                    color={isTextInputActive1 == true ? '#FACA4E' : '#64646485'}
                  />
                )}
              />
            }
          />
          <TouchableOpacity
            onPress={handleTogglePasswordVisibility}
            style={[
              styles.hs,
              {
                borderColor: signin_ShowPassword ? '#646464' : '#FACA4E',
                backgroundColor: signin_ShowPassword
                  ? '#64646412'
                  : '#FF660012',
              },
            ]}>
            <Text
              style={[
                styles.txt,
                {color: signin_ShowPassword ? '#646464' : '#FACA4E'},
              ]}>
              {signin_ShowPassword ? 'Show' : 'Hide'}
            </Text>
          </TouchableOpacity>
        </View>




        <View>
          <TextInput
            mode="outlined"
            label="Confirm Password"
            onChangeText={text => setconfirm_pass(text)}
            style={styles.ti}
            placeholderTextColor={'#646464'}
            outlineColor="#0000001F"
            activeOutlineColor="#FACA4E"
            secureTextEntry={signin_ConfirmShowPassword}
            onFocus={handleFocus2}
            onBlur={handleBlur2}
            left={
              <TextInput.Icon
                icon={() => (
                  <MaterialCommunityIcons
                    name={'lock-outline'}
                    size={23}
                    color={isTextInputActive2 == true ? '#FACA4E' : '#64646485'}
                  />
                )}
              />
            }
          />
          <TouchableOpacity
            onPress={handleTogglePasswordVisibilityConfirm}
            style={[
              styles.hs,
              {
                borderColor: signin_ConfirmShowPassword ? '#646464' : '#FACA4E',
                backgroundColor: signin_ConfirmShowPassword
                  ? '#64646412'
                  : '#FF660012',
              },
            ]}>
            <Text
              style={[
                styles.txt,
                {color: signin_ConfirmShowPassword ? '#646464' : '#FACA4E'},
              ]}>
              {signin_ConfirmShowPassword ? 'Show' : 'Hide'}
            </Text>
          </TouchableOpacity>
        </View>
 








        <View style={{marginTop: '25%', alignSelf: 'center'}}>
          <CustomButton
            title="Reset"
            load={loading}
            // checkdisable={inn == '' && cm == '' ? true : false}
            customClick={() => {
              navigation.navigate('BottomTabNavigation');
            }}
          />
        </View>
      </View>

      <CustomSnackbar
        message={'success'}
        messageDescription={'Password Reset Successfully'}
        onDismiss={dismissSnackbar} // Make sure this function is defined
        visible={snackbarVisible}
      />
    </ScrollView>
  );
};

export default ResetPassword;

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

  bg: {
    // height:800,
    backgroundColor: '#FACA4E',
  },
  mainv: {
    flex: 1,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    marginTop: '15%',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  ti: {
    marginHorizontal: '7%',
    marginTop: '5%',
    width: 300,
    backgroundColor: 'white',
    fontSize: wp(4),
    paddingLeft: '2%',
    borderRadius: 10,
  },
  v1: {
    marginTop: '10%',
  },
  hs: {
    position: 'absolute',
    borderWidth: 1,
    borderRadius: 10,
    width: 60,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    right: 35,
    top: 31,
  },
  txt: {
    fontSize: wp(3.6),
    fontFamily: 'Inter-Medium',
  },
});
