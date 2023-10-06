import {
  StyleSheet,
  FlatList,
  Text,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  ImageBackground,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useRef} from 'react';
import PenSettings from '../../../assets/svg/PenSettings.svg';
import LockSettings from '../../../assets/svg/LockSettings.svg';
import BookMarkSettings from '../../../assets/svg/BookmarkSettings.svg';

import Headers from '../../../assets/Custom/Headers';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {appImages} from '../../../assets/utilities';

export default function ProfileSettings({navigation}) {
  return (
    <View style={styles.container}>
      <View style={{marginTop: hp(5)}}>
        <Headers
          onPress={() => navigation.goBack()}
          showBackIcon={true}
          showText={true}
          text={'Settings'}
        />
      </View>

      <TouchableOpacity
      onPress={()=>navigation.navigate("UpdateProfile")}
        style={{
          height: hp(7),
          marginTop: hp(5),
          marginHorizontal: wp(8),
          borderWidth: 1,
          borderRadius: wp(3),
          flexDirection: 'row',
          alignItems: 'center',
          borderColor: '#00000017',
        }}>
        <View style={{marginLeft: wp(5)}}>
          <PenSettings width={18} height={18} />
        </View>

        <Text
          style={{
            color: '#4C4C4C',
            marginLeft: wp(3),
            fontFamily: 'Inter-Regular',
            //fontWeight: 'bold',
          }}>
          Update Profile
        </Text>
      </TouchableOpacity>

      <TouchableOpacity

        onPress={()=>navigation.navigate("UpdatePassword")}

        style={{
          height: hp(7),
          marginTop: hp(3),
          marginHorizontal: wp(8),
          borderWidth: 1,
          borderRadius: wp(3),
          flexDirection: 'row',
          alignItems: 'center',
          borderColor: '#00000017',
        }}>
        <View style={{marginLeft: wp(5)}}>
          <LockSettings width={18} height={18} />
        </View>

        <Text
          style={{
            color: '#4C4C4C',
            marginLeft: wp(3),
            fontFamily: 'Inter-Regular',
            //fontWeight: 'bold',
          }}>
          Update Password
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          height: hp(7),
          marginTop: hp(3),
          marginHorizontal: wp(8),
          borderWidth: 1,
          borderRadius: wp(3),
          flexDirection: 'row',
          alignItems: 'center',
          borderColor: '#00000017',
        }}>
        <View style={{marginLeft: wp(5)}}>
          <BookMarkSettings width={18} height={18} />
        </View>

        <Text
          style={{
            color: '#4C4C4C',
            marginLeft: wp(3),
            fontFamily: 'Inter-Regular',
            //fontWeight: 'bold',
          }}>
          Saved Items
        </Text>
      </TouchableOpacity>

      <View
        style={{
          flex: 1,
          //borderWidth: 3,
          marginBottom: wp(12),
          justifyContent: 'flex-end',
        }}>
        <TouchableOpacity
          style={{
            borderRadius: wp(5),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: wp(10),
            backgroundColor: '#FACA4E',
            height: hp(6.5),
          }}>

            <View style={{ flexDirection:'row', alignItems:'center', height:'100%', width:wp(25)}}>

          <Image
            source={appImages.LogOut}
            style={{width: wp(5), height: hp(7), resizeMode: 'contain'}}
          />
          <Text
            style={{
              color: '#232323',
              marginLeft: wp(3),
              fontFamily: 'Inter-Medium',
              //fontWeight: 'bold',
            }}>
            Logout
          </Text>
            </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
