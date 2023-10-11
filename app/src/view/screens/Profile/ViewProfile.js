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
import Entypo from 'react-native-vector-icons/Entypo';

import {Button, Divider, TextInput} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import PlusPost from '../../../assets/svg/PlusPost.svg';
import Approved from '../../../assets/svg/Approved.svg';

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

export default function ViewProfile({navigation}) {
  const availableAppsVideo = [
    {
      id: 1,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches1,
    },
    {
      id: 2,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches2,
    },
    {
      id: 3,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches3,
    },
    {
      id: 4,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches4,
    },
    {
      id: 5,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches1,
    },
    {
      id: 6,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches2,
    },
    {
      id: 7,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches3,
    },
    {
      id: 8,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches4,
    },
    {
      id: 9,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches1,
    },
    {
      id: 10,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches2,
    },
  ];

  const availableApps = [
    {
      id: 1,
      title: 'Item Name',
      image: appImages.topSearches1,
    },
    {
      id: 2,
      title: 'Item Name',
      image: appImages.topSearches2,
    },
    {
      id: 3,
      title: 'Item Name',
      image: appImages.topSearches3,
    },
    {
      id: 4,
      title: 'Item Name',
      image: appImages.topSearches4,
    },
    {
      id: 5,
      title: 'Item Name',
      image: appImages.topSearches1,
    },
    {
      id: 6,
      title: 'Item Name',
      image: appImages.topSearches2,
    },
    {
      id: 7,
      title: 'Item Name',
      image: appImages.topSearches3,
    },
    {
      id: 8,
      title: 'Item Name',
      image: appImages.topSearches4,
    },
    {
      id: 9,
      title: 'Item Name',
      image: appImages.topSearches1,
    },
    {
      id: 10,
      title: 'Item Name',
      image: appImages.topSearches2,
    },
  ];

  const renderAvailableApps = item => {
    console.log('Items', item);
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ProductDetailsProfile')}
        style={{width: wp(35), margin: 5}}>
        <View>
          <Image
            style={{
              position: 'absolute',
              top: 0,
              left: 0,

              zIndex: 1, // Ensure it's on top of other elements
              //flex: 1,
              width: '100%',
              height: hp(18),
              borderRadius: wp(3),
              resizeMode: 'cover',
            }}
            source={item.image}
          />
        </View>

        <View
          style={{
            position: 'absolute',
            top: hp(14),
            left: 7,
            //height: hp(3),
            //width: wp(21),
            //borderRadius: wp(3),
            //backgroundColor: '#FACA4E',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2, // Ensure it's on top
          }}>
          <Text
            style={{
              fontSize: hp(1.6),
              fontFamily: 'Inter',
              color: '#FFFFFF',
              fontWeight: '700',
            }}>
            {item.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderAvailableAppsPic = item => {
    console.log('Items', item);
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ViewVideoPicProfile')}
        style={{width: wp(28), margin: 5}}>
        <View>
          <Image
            style={{
              position: 'absolute',
              top: 0,
              left: 0,

              zIndex: 1, // Ensure it's on top of other elements
              //flex: 1,
              width: '100%',
              height: hp(12),
              borderRadius: wp(2.1),
              resizeMode: 'cover',
            }}
            source={item.image}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: wp(2),
            marginTop: hp(12.5),
          }}>
           <Text style={{fontSize: hp(1.5), color:'#000000', fontFamily:'Inter-Regular', width: wp(23)}}>
            {item.title}
          </Text>
          <Entypo name={'dots-three-vertical'} size={14} color={'#4A4A4A'} />
        </View>
      </TouchableOpacity>
    );
  };

  const renderAvailableAppsVideo = item => {
    console.log('Items', item);
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ViewVideoProfile')}
        style={{width: wp(28), margin: 5}}>
        <View>
          <Image
            style={{
              position: 'absolute',
              top: 0,
              left: 0,

              zIndex: 1, // Ensure it's on top of other elements
              //flex: 1,
              width: '100%',
              height: hp(12),
              borderRadius: wp(2.1),
              resizeMode: 'cover',
            }}
            source={item.image}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: wp(2),
            marginTop: hp(12.5),
          }}>
          <Text style={{fontSize: hp(1.5), color:'#000000', fontFamily:'Inter-Regular', width: wp(23)}}>
            {item.title}
          </Text>

          <Entypo name={'dots-three-vertical'} size={14} color={'#4A4A4A'} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content" // You can set the StatusBar text color to dark or light
      />
      <View style={{marginTop: hp(5), marginRight: wp(5)}}>
        <Headers
          onPress={() => navigation.goBack()}
          showBackIcon={true}
          showSettings={true}
          onPressSettings={() => navigation.navigate('ProfileSettings')}
          showText={true}
          text={'Profile'}
        />
      </View>

      <ScrollView style={{flex: 1}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: hp(3),
            height: hp(21),
          }}>
          <View
            style={{
              width: wp(20),
              marginLeft: wp(0.5),
              height: wp(20),
              borderRadius: wp(20) / 2,
            }}>
            <Image
              source={appImages.profileImg}
              style={{width: '100%', height: '100%', resizeMode: 'contain'}}
            />
          </View>

          <Text
            style={{
              fontSize: hp(2.3),
              //marginLeft: wp(2),
              marginTop: hp(1.3),
              color: '#FACA4E',
              //fontWeight: 'bold',
              fontFamily: 'Inter-Medium',
            }}>
            John Doe
          </Text>

          <Text
            style={{
              fontSize: hp(2),
              //marginLeft: wp(2),
              //   /marginTop:hp(0.1),
              color: '#77838F',
              //fontWeight: 'bold',
              fontFamily: 'Inter-Regular',
            }}>
            JohnDoe@gmail.com
          </Text>
        </View>
        <View
          style={{
            height: hp(6.5),
            marginTop: hp(1.5),
            marginHorizontal: wp(6),
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              width: wp(30),
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontSize: hp(2.5),
                //marginLeft: wp(2),
                //   /marginTop:hp(0.1),
                color: '#1E2022',
                //fontWeight: 'bold',
                fontFamily: 'Inter-Bold',
              }}>
              115
            </Text>

            <Text
              style={{
                fontSize: hp(1.8),
                //marginLeft: wp(2),
                //   /marginTop:hp(0.1),
                color: '#77838F',
                //fontWeight: 'bold',
                fontFamily: 'Inter-Regular',
              }}>
              Xpi/3.14 Videos
            </Text>
          </View>

          <View
            style={{
              width: wp(18),
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontSize: hp(2.5),
                //marginLeft: wp(2),
                //   /marginTop:hp(0.1),
                color: '#1E2022',
                //fontWeight: 'bold',
                fontFamily: 'Inter-Bold',
              }}>
              2,703
            </Text>

            <Text
              style={{
                fontSize: hp(1.8),
                //marginLeft: wp(2),
                //   /marginTop:hp(0.1),
                color: '#77838F',
                //fontWeight: 'bold',
                fontFamily: 'Inter-Regular',
              }}>
              Pic Tour
            </Text>
          </View>

          <View
            style={{
              width: wp(18),
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontSize: hp(2.5),
                //marginLeft: wp(2),
                //   /marginTop:hp(0.1),
                color: '#1E2022',
                //fontWeight: 'bold',
                fontFamily: 'Inter-Bold',
              }}>
              115
            </Text>

            <Text
              style={{
                fontSize: hp(1.8),
                //marginLeft: wp(2),
                //   /marginTop:hp(0.1),
                color: '#77838F',
                //fontWeight: 'bold',
                fontFamily: 'Inter-Regular',
              }}>
              DISC
            </Text>
          </View>

          <View
            style={{
              width: wp(21),
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontSize: hp(2.5),
                //marginLeft: wp(2),
                //   /marginTop:hp(0.1),
                color: '#1E2022',
                //fontWeight: 'bold',
                fontFamily: 'Inter-Bold',
              }}>
              1,506
            </Text>

            <Text
              style={{
                fontSize: hp(1.7),
                //marginLeft: wp(2),
                //   /marginTop:hp(0.1),
                color: '#77838F',
                //fontWeight: 'bold',
                fontFamily: 'Inter-Regular',
              }}>
              Marketpark
            </Text>
          </View>
        </View>

        <View
          style={{height: hp(23), marginLeft: wp(8), marginTop: hp(5)}}>
          <Text
            style={{
              fontSize: hp(2.1),
              //marginLeft: wp(2),
              //   /marginTop:hp(0.1),
              color: '#77838F',
              //fontWeight: 'bold',
              fontFamily: 'Inter-Bold',
            }}>
            My Pi/3.14 Videos
          </Text>

          <View style={{marginTop: hp(1), height: '100%'}}>
            <FlatList
              style={{flex: 1, marginLeft: wp(-1.5)}}
              showsVerticalScrollIndicator={false}
              data={availableAppsVideo}
              horizontal
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => renderAvailableAppsVideo(item)}
            />
          </View>
        </View>

        <View
          style={{height: hp(23), marginLeft:wp(8), marginTop: hp(1)}}>
          <Text
            style={{
              fontSize: hp(2.1),
              //marginLeft: wp(2),
              //   /marginTop:hp(0.1),
              color: '#77838F',
              //fontWeight: 'bold',
              fontFamily: 'Inter-Bold',
            }}>
            My Pic Tour
          </Text>

          <View style={{marginTop: hp(1), height: '100%'}}>
            <FlatList
              style={{flex: 1, marginLeft: wp(-1.5)}}
              showsVerticalScrollIndicator={false}
              data={availableAppsVideo}
              horizontal
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => renderAvailableAppsPic(item)}
            />
          </View>
        </View>

        <View
          style={{height: hp(23), marginHorizontal: wp(8), marginTop: hp(1)}}>
          <Text
            style={{
              fontSize: hp(2.1),
              //marginLeft: wp(2),
              //   /marginTop:hp(0.1),
              color: '#77838F',
              //fontWeight: 'bold',
              fontFamily: 'Inter-Bold',
            }}>
            My Disc
          </Text>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('LetterDetails')}>
              <Image
                source={appImages.OpenLetter}
                style={{resizeMode: 'contain', width: wp(39)}}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('LetterDetails')}>
              <Image
                source={appImages.OpenLetter}
                style={{resizeMode: 'contain', width: wp(39)}}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{height: hp(23), marginHorizontal: wp(8), marginTop: hp(1)}}>
          <Text
            style={{
              fontSize: hp(2.1),
              //marginLeft: wp(2),
              //   /marginTop:hp(0.1),
              color: '#77838F',
              //fontWeight: 'bold',
              fontFamily: 'Inter-Bold',
            }}>
            My Market Zone
          </Text>

          <FlatList
            style={{flex: 1, marginTop: hp(1), marginLeft: wp(-2)}}
            showsVerticalScrollIndicator={false}
            data={availableApps}
            horizontal
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => renderAvailableApps(item)}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
