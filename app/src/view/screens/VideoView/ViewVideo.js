import {
  StyleSheet,
  FlatList,
  Text,
  Image,
  ScrollView,
  TextInput,
  StatusBar,
  ImageBackground,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Back from '../../../assets/svg/back.svg';
import {appImages} from '../../../assets/utilities/index';
import Slider from '@react-native-community/slider';
import VolumeUp from '../../../assets/svg/VolumeUp.svg';
import Like from '../../../assets/svg/Like.svg';
import UnLike from '../../../assets/svg/Unlike.svg';
import Comment from '../../../assets/svg/Comment.svg';
import Send from '../../../assets/svg/Send.svg';
import Download from '../../../assets/svg/Download.svg';

import Share from 'react-native-share';


import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Fontiso from 'react-native-vector-icons/Fontisto';

import IonIcons from 'react-native-vector-icons/Ionicons';

export default function ViewVideo() {
  const [showFullContent, setShowFullContent] = useState(false);

  const [showLikes, setShowLikes] = useState(false);

  var details =
    'Hold onto your seats and get ready to be mesmerized by the beauty and grandeur of the Hold onto your seats';

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  const toggleContentLike = () => {
    setShowLikes(!showLikes);
  };

  const shareViaWhatsApp = async () => {
    const shareOptions = {
      title: 'Share via',
      message: 'Hey! Check out this cool app!',
      url: 'https://play.google.com/store/apps/details?id=your.app.package',
      //social: Share.Social,
    };

    try {
      await Share.open(shareOptions);
    } catch (error) {
      console.error('Error sharing via WhatsApp:', error.message);
    }
  };

  return (
    <ImageBackground source={appImages.videoBG} style={{flex: 1}}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content" // You can set the StatusBar text color to dark or light
      />
      <View style={styles.header}>
        <IonIcons name={'chevron-back'} color={'white'} size={25} />

        <Image
          source={appImages.logoTransparent}
          style={{width: wp(39), marginLeft: wp(18)}}
          resizeMode="contain"
        />
      </View>

      <View style={styles.bottomView}>
        <View style={{height: hp(28), marginHorizontal: wp(8)}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: hp(6.5),
            }}>
            <View
              style={{
                height: hp(10),
                width: wp(10),
                borderRadius: wp(8),
                marginLeft: wp(3),
                overflow: 'hidden',
              }}>
              <Image
                style={{
                  flex: 1,
                  width: null,
                  height: null,
                  resizeMode: 'contain',
                }}
                source={appImages.profileImg}
              />
            </View>

            <Text style={styles.textProfileName}>John Doe</Text>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false} // Hide vertical scroll indicator
            style={{flex: 1}}
            contentContainerStyle={{verticalLine: false}}>
            <Text
              style={{
                marginTop: hp(1),
                fontFamily: 'Inter',
                fontSize: hp(1.8),
                lineHeight: hp(2.1),
                color: '#FFFFFF',
              }}>
              {showFullContent
                ? details
                : details.length > 90
                ? details.substring(0, 90) + '...'
                : details.slice(0)}
            </Text>

            <TouchableOpacity onPress={toggleContent}>
              <Text
                style={{
                  fontFamily: 'Inter',
                  fontSize: hp(1.8),
                  color: '#FACA4E',
                }}>
                {details.length > 90
                  ? showFullContent
                    ? 'See Less'
                    : 'See More'
                  : null}
              </Text>
            </TouchableOpacity>
          </ScrollView>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: hp(5),
            }}>
            <View
              style={{height: hp(2), width: wp(65), justifyContent: 'center'}}>
              <Slider
                value={95}
                minimumValue={0}
                thumbTintColor="#FACA4E"
                maximumValue={100}
                minimumTrackTintColor={'#FACA4E'}
                maximumTrackTintColor={'#F6F6F6'}
              />
            </View>

            <Text
              style={{
                fontFamily: 'Inter',
                fontSize: hp(1.5),
                color: '#FFFFFF',
              }}>
              02:14
            </Text>
            <VolumeUp height={14} width={14} />
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: hp(5),
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: wp(14),
                borderWidth:3,
                height: hp(5),
              }}>
              <TouchableOpacity onPress={toggleContentLike}>
                {showLikes ? (
                  <Like height={14} width={14} />
                ) : (
                  <UnLike height={14} width={14} />
                )}
              </TouchableOpacity>

              <Text
                style={{
                  fontFamily: 'Inter',
                  fontSize: hp(1.5),
                  color: '#FFFFFF',
                }}>
                2.3 k
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: wp(12),
                height: hp(5),
              }}>
              <TouchableOpacity>
                <Comment height={14} width={14} />
              </TouchableOpacity>

              <Text
                style={{
                  fontFamily: 'Inter',
                  fontSize: hp(1.5),
                  color: '#FFFFFF',
                }}>
                2.3 k
              </Text>
            </View>


            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                width: wp(10),
                height: hp(5),
              }}>
              <TouchableOpacity>
                <Send height={14} width={14} />
              </TouchableOpacity>

            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                width: wp(10),
                height: hp(5),
              }}>
              <TouchableOpacity onPress={()=> shareViaWhatsApp()}>
                <Download height={18} width={18} />
              </TouchableOpacity>

            </View>

          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    height: hp(6.2),
    marginTop: hp(8),
    alignItems: 'center',
    marginHorizontal: wp(8),
  },
  bottomView: {
    flex: 1,
    justifyContent: 'flex-end',
    // You can add padding or content to this view as needed.
  },
  textProfileName: {
    color: '#FFFFFF',
    fontSize: hp(2),
    marginLeft: wp(3),
    fontFamily: 'Inter',
    fontWeight: 'bold',
  },
});
