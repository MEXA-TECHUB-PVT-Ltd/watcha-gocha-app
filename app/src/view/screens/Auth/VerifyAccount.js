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
import RBSheet from 'react-native-raw-bottom-sheet';

import OTPInputView from '@twotalltotems/react-native-otp-input';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {appImages} from '../../../assets/utilities/index';
import {Button, Divider, TextInput} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Back from '../../../assets/svg/back.svg';

/* import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field'; */

import Gemail from '../../../assets/svg/gemail.svg';
import Oemail from '../../../assets/svg/oemail.svg';

import Glock from '../../../assets/svg/glock.svg';
import Olock from '../../../assets/svg/olock.svg';

import Ouser from '../../../assets/svg/ouser.svg';
import Guser from '../../../assets/svg/guser.svg';

import CustomButton from '../../../assets/Custom/Custom_Button';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SwitchSelector from 'react-native-switch-selector';
LogBox.ignoreAllLogs();

export default function VerifyAccount({navigation}) {
  const [value, setValue] = useState('');
  const [otpCode, setOtpCode] = useState('');


  const ref_RBSendOffer = useRef(null);
  const [loading, setLoading] = useState(false);

  //const ref = useBlurOnFulfill({value, cellCount: 4});
 /*  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  }); */
  const [isFocused, setIsFocused] = useState(false);
  return (
    <ScrollView style={styles.bg} contentContainerStyle={{flexGrow: 1}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#FACA4E'} />
      <View style={styles.mainv}>
        <TouchableOpacity
        onPress={()=>navigation.goBack()}
          style={{marginTop: '9%', marginLeft: '8%', alignSelf: 'flex-start'}}>
          <Back width={20} height={20} />
        </TouchableOpacity>

        <View style={{}}>
          <Image
            source={require('../../../assets/images/VerifyModal.png')}
            resizeMode="contain"
            style={{
              width: wp(40),
              height: hp(30),
            }}
          />
        </View>

        <Text
          style={{
            color: '#333333',
            marginTop: hp(1.8),
            fontSize: hp(3),
            fontFamily: 'Inter',
            fontWeight: '800',
          }}>
          Verify Your Account
        </Text>

        <Text
          style={{
            color: '#9597A6',
            marginTop: hp(1.8),
            textAlign: 'center',
            fontSize: hp(2.1),
            fontFamily: 'Inter',
          }}>
          We've send a verification code on your{'\n'} email address
        </Text>

        <View style={{marginHorizontal:wp(8), paddingTop: 1}}>
              <View style={{}}>

              <OTPInputView
                  style={{
                    height: 50,
                    marginTop: hp(7),
                  }}
                  autoFocusOnLoad={false}

                  pinCount={4}
                  code={otpCode}
                  onCodeChanged={code => {
                    setOtpCode(code);
                  }}
                  placeholderTextColor={'#ABA7AF'}
                  codeInputFieldStyle={styles.underlineStyleBase}
                  codeInputHighlightStyle={{
                    ...styles.underlineStyleHighLighted,
                  }}
                />

               
              </View>
            </View>

{/* <View style={{width: wp(90), flex: 1, zIndex: 999}}>
            <OTPInputView
              ref={ref}
              style={{
                height: 50,
                // marginTop: hp(5),
              }}
              pinCount={4}
              code={otpCode}
              onCodeChanged={code => {
                setOtpCode(code);
              }}
              autoFocusOnLoad={false}
              placeholderCharacter={''}
              placeholderTextColor={'#ABA7AF'}
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={{
                ...styles.underlineStyleHighLighted,
              }}
            />
          </View> */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: hp(5.5),
            marginTop: hp(2.1),
          }}>
          <Text
            style={{
              color: '#9597A6',
              textAlign: 'center',
              fontSize: hp(2.1),
              fontFamily: 'Inter',
            }}>
            Did'nt recieve the code?
          </Text>

          <Text
            style={{
              color: '#FACA4E',
              textAlign: 'center',
              fontSize: hp(2.1),
              fontFamily: 'Inter',
            }}>
            {} Resend in 00:45
          </Text>
        </View>

        <View style={{marginTop: '15%', alignSelf: 'center'}}>
          <CustomButton
            title="Verify"
            load={loading}
            // checkdisable={inn == '' && cm == '' ? true : false}
            customClick={() => {
              ref_RBSendOffer.current.open();
              //navigation.navigate('Profile_image');
            }}
          />
        </View>
      </View>

      <RBSheet
        ref={ref_RBSendOffer}
        closeOnDragDown={true}
        closeOnPressMask={false}
        animationType="fade"
        minClosingHeight={0}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(52, 52, 52, 0.5)',
          },
          draggableIcon: {
            backgroundColor: 'white',
          },
          container: {
            borderTopLeftRadius: wp(10),
            borderTopRightRadius: wp(10),
            height: hp(51),
          },
        }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            marginHorizontal:wp(8),
            justifyContent: 'space-evenly',
          }}>
          <Image
            source={appImages.model_verify}
            style={{width:wp(30),marginTop:hp(-10),height:hp(30),resizeMode: 'contain'}}
          />

          <View style={{marginTop:hp(-5),height:hp(8)}}>
          <Text
            style={{
              color: '#333333',
              textAlign: 'center',
              fontSize: hp(2.3),
              fontWeight:'bold',
              fontFamily: 'Inter',
            }}>
            Account Verified!
          </Text>

          <Text
            style={{
              color: '#9597A6',
              marginTop:hp(0.5),
              textAlign: 'center',
              fontSize: hp(1.8),
              marginTop:hp(1.5),
              //fontWeight:'bold',
              fontFamily: 'Inter',
            }}>
            Your account has been successfully verified
          </Text>
          </View>

          <View style={{marginHorizontal:wp(10)}}>
             <CustomButton title='Reset Password' customClick={() => {
              //ref_RBSendOffer.current.open();
              navigation.navigate('ResetPassword');
            }}  style={{width:wp(59)}} /> 
          </View>
        </View>
      </RBSheet>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: hp(5), marginHorizontal: wp(12)},
  cell: {
    flex: 1,
    height: 50,
    borderRadius: wp(10), // Rounded corners
    borderWidth: 1,
    borderColor: '#E7EAF2', // Default border color
    alignItems: 'center',
    justifyContent: 'center',
  },
  focusCell: {
    flex: 1,
    height: 50,
    borderRadius: wp(10), // Rounded corners
    borderWidth: 1,
    borderColor: '#000000', // Default border color
    alignItems: 'center',
    justifyContent: 'center',
  },
 
  borderStyleBase: {
    width: 30,
    height: 45
  },

  underlineStyleBase: {
    color: '#000000',
    fontSize: 24,
    fontFamily: 'Inter-Medium',
    width: 60,
    height: 50,
    borderRadius: wp(15),
    borderWidth: 1,
    //borderBottomWidth: 1,
    borderColor: '#CCC',
    marginHorizontal: 5,
  },
  underlineStyleHighLighted: {
    borderColor: '#FACA4E',
    borderRadius: 0,
    borderWidth: 1,
    borderRadius: wp(15),
  },
});
