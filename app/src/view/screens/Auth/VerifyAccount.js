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

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {appImages} from '../../../assets/utilities/index';
import {Button, Divider, TextInput} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Back from '../../../assets/svg/back.svg';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

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

export default function VerifyAccount() {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);

  const ref = useBlurOnFulfill({value, cellCount: 4});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [isFocused, setIsFocused] = useState(false);
  return (
    <ScrollView style={styles.bg} contentContainerStyle={{flexGrow: 1}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#FACA4E'} />
      <View style={styles.mainv}>
        <TouchableOpacity
          style={{marginTop: '9%', marginLeft: '8%', alignSelf: 'flex-start'}}>
          <Back width={20} height={20} />
        </TouchableOpacity>

        <View>
          <Image
            source={require('../../../assets/images/forget.png')}
            resizeMode="contain"
            style={{
              width: wp(50),
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

        <CodeField
          ref={ref}
          {...props}
          // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
          value={value}
          onChangeText={setValue}
          cellCount={4}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({index, symbol}) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.cell,
                isFocused && styles.focusCell,
                index !== 0 && {marginLeft: wp(2)}, // Add margin between cells
              ]}
              onPress={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}>
              <Text>{symbol || (isFocused ? <Cursor /> : null)}</Text>
            </TouchableOpacity>
          )}
        />
        
        <View style={{flexDirection:'row', alignItems:'center', height:hp(5.5), marginTop:hp(2.1)}}>

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
         { } Resend in 00:45
        </Text>
        </View>

        <View style={{marginTop: '15%', alignSelf: 'center'}}>
          <CustomButton
            title="Verify"
            load={loading}
            // checkdisable={inn == '' && cm == '' ? true : false}
            customClick={() => {
              //navigation.navigate('Profile_image');
            }}
          />
        </View>
      </View>
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
    borderColor: 'gray', // Default border color
    alignItems: 'center',
    justifyContent: 'center',
  },
  focusCell: {
    borderColor: 'pink', // Border color when focused
  },
});
