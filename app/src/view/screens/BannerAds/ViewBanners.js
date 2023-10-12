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
import RBSheet from 'react-native-raw-bottom-sheet';

import {Button, Divider, TextInput} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import Back from '../../../assets/svg/back.svg';
import {appImages} from '../../../assets/utilities/index';
import Slider from '@react-native-community/slider';
import VolumeUp from '../../../assets/svg/VolumeUp.svg';
import Like from '../../../assets/svg/Like.svg';
import UnLike from '../../../assets/svg/Unlike.svg';
import Comment from '../../../assets/svg/Comment.svg';
import Send from '../../../assets/svg/Send.svg';
import Download from '../../../assets/svg/Download.svg';
import CustomButton from '../../../assets/Custom/Custom_Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Share from 'react-native-share';
import Blogss from '../../../assets/images/logo.png';
import Link from '../../../assets/svg/Link.svg';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Fontiso from 'react-native-vector-icons/Fontisto';

import IonIcons from 'react-native-vector-icons/Ionicons';

import {SelectCountry, Dropdown} from 'react-native-element-dropdown';
import CPaperInput from '../../../assets/Custom/CPaperInput';
import Headers from '../../../assets/Custom/Headers';

import Add from '../../../assets/svg/AddMainScreen.svg';


export default function ViewBanners({navigation}) {

    const goToScreen=()=>{
        navigation.navigate("AddBanner");
    }
  const chats = [
    {
      id: 1,
      link: 'http:/?www.sample.org?head',
      startDate: '09/12/2023',
      EndDate: '09/12/2023',
    },
    {
      id: 2,
      link: 'http:/?www.sample.org?head',
      startDate: '09/12/2023',
      EndDate: '09/12/2023',
    },
    {
      id: 3,
      link: 'http:/?www.sample.org?head',
      startDate: '09/12/2023',
      EndDate: '09/12/2023',
    },
    {
      id: 4,
      link: 'http:/?www.sample.org?head',
      startDate: '09/12/2023',
      EndDate: '09/12/2023',
    },
    {
      id: 5,
      link: 'http:/?www.sample.org?head',
      startDate: '09/12/2023',
      EndDate: '09/12/2023',
    },
    {
      id: 6,
      link: 'http:/?www.sample.org?head',
      startDate: '09/12/2023',
      EndDate: '09/12/2023',
    },
  ];

  const renderBlogs = item => {
    console.log('Items', item);
    return (
      <TouchableOpacity onPress={()=>navigation.navigate("BannerDetails")}>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: wp(3),
            alignItems: 'center',
            height: hp(12),
            marginTop: hp(3),
            marginHorizontal: wp(8),
          }}>
          <View
            style={{
              height: hp(10),
              alignSelf: 'center',
              resizeMode: 'hidden',
              width: wp(21),
              borderRadius: wp(5),
            }}>
            <Image
              style={{width: '100%', borderRadius: wp(2.1), height: '100%'}}
              source={appImages.bannerAds}
            />
          </View>

          <View style={{flex: 1, justifyContent: 'space-between'}}>
            <View
              style={{
                height: hp(6),
                marginLeft: wp(1.8),
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                }}>
                <Text
                  style={{
                    color: '#000000',
                    fontSize: hp(1.8),
                    fontFamily: 'Inter-Medium',
                  }}>
                  Start date
                </Text>

                <Text
                  style={{
                    color: '#646464',
                    fontSize: hp(1.8),
                    fontFamily: 'Inter-Regular',
                  }}>
                  09/12/2023
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                }}>
                <Text
                  style={{
                    color: '#000000',
                    fontSize: hp(1.8),
                    fontFamily: 'Inter-Medium',
                  }}>
                  End date
                </Text>

                <Text
                  style={{
                    color: '#646464',
                    fontSize: hp(1.8),
                    fontFamily: 'Inter-Regular',
                  }}>
                  09/12/2023
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: hp(1),
                height: hp(2.1),
                alignSelf: 'center',
              }}>
              <Link width={14} height={14} />

              <Text
                style={{
                  color: '#646464',
                  marginLeft: wp(3),
                  fontSize: hp(1.5),
                  fontFamily: 'Inter-Regular',
                }}>
                http:/?www.sample.org?head
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            height: hp(0.1),
            width: '100%',
            marginTop:hp(1),
            backgroundColor: '#00000021',
          }}>


          </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#FFFFFF'} />

      <View style={{marginTop:hp(5)}}>

      <Headers
        showBackIcon={true}
        onPress={()=>navigation.goBack()}
        showText={true}
        text={'Banner Advertisement'}
      />

      </View>

      <View style={{marginTop: hp(1),flex:1}}>
        <FlatList
          style={{flexGrow:1}}
          showsVerticalScrollIndicator={false}
          data={chats}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => renderBlogs(item)}
        />
      </View>

      <TouchableOpacity
        onPress={() => goToScreen()}
        style={{position: 'absolute', bottom: 1, right: 25}}>
        <Add />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});