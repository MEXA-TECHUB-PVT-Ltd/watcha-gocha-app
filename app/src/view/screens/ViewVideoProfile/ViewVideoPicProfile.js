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
import React, {useState, useRef} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import Ionicons from 'react-native-vector-icons/Ionicons';
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

import Entypo from 'react-native-vector-icons/Entypo';
import CustomSnackbar from '../../../assets/Custom/CustomSnackBar';

import EditItem from '../../../assets/svg/UpdateItem.svg';

import Delete from '../../../assets/svg/Delete.svg';

export default function ViewVideoPicProfile({navigation}) {
  const [showFullContent, setShowFullContent] = useState(false);

  const [showLikes, setShowLikes] = useState(false);

  const [showMenu, setShowMenu] = useState(true);

  const [snackbarVisible, setsnackbarVisible] = useState(false);

  const [snackbarDeleteVisible, setSnackbarDeleteVisible] = useState(false);


  const ref_RBSheetCamera = useRef(null);

  const ref_RBSheetLogout = useRef(null);

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

  const dismissSnackbar = () => {
    setsnackbarVisible(false);
  };

  const changeModal = () => {
    ref_RBSheetCamera.current.close();
    ref_RBSheetLogout.current.open();
  };

  const dismissDeleteSnackbar = () => {
    setsnackbarVisible(false);
  };

  const handleUpdatePassword = async () => {
    // Perform the password update logic here
    // For example, you can make an API request to update the password

    // Assuming the update was successful
    setsnackbarVisible(true);

    // Automatically hide the Snackbar after 3 seconds
    setTimeout(() => {
      setsnackbarVisible(false);
      navigation.goBack();
    }, 3000);
  };

  const changeDelete = () => {
    ref_RBSheetLogout.current.close();
    handleUpdateDelete();
    //navigation.goBack()
  };

  const handleUpdateDelete = async () => {
    // Perform the password update logic here
    // For example, you can make an API request to update the password

    // Assuming the update was successful
    setSnackbarDeleteVisible(true);

    // Automatically hide the Snackbar after 3 seconds
    setTimeout(() => {
      setSnackbarDeleteVisible(false);
      navigation.goBack()
    }, 3000);
  };



  return (
    <ImageBackground source={appImages.videoBG} style={{flex: 1}}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content" // You can set the StatusBar text color to dark or light
      />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IonIcons name={'chevron-back'} color={'white'} size={25} />
        </TouchableOpacity>

        <Image
          source={appImages.logoTransparent}
          style={{width: wp(39), marginLeft: wp(18)}}
          resizeMode="contain"
        />

        {showMenu && (
          <TouchableOpacity
            onPress={() => ref_RBSheetCamera.current.open()}
            style={{marginLeft: wp(18), marginTop: hp(1)}}>
            <Entypo name={'dots-three-vertical'} size={18} color={'white'} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.bottomView}>
        <View style={{height: hp(30), marginHorizontal: wp(8)}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: hp(5),
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
            style={{flex: 1, marginTop: hp(1)}}
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
              height: hp(8),
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: wp(15),
                //borderWidth:3,
                height: hp(5),
              }}>
              <TouchableOpacity onPress={toggleContentLike}>
                {showLikes ? (
                  <Like height={21} width={21} />
                ) : (
                  <UnLike height={21} width={21} />
                )}
              </TouchableOpacity>

              <Text
                style={{
                  fontFamily: 'Inter-Regular',
                  fontSize: hp(1.7),
                  marginLeft: wp(1),
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
                width: wp(15),
                height: hp(5),
              }}>
              <TouchableOpacity>
                <Comment height={21} width={21} />
              </TouchableOpacity>

              <Text
                style={{
                  fontFamily: 'Inter-Regular',
                  fontSize: hp(1.7),
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
                width: wp(15),
                height: hp(5),
              }}>
              <TouchableOpacity onPress={() => shareViaWhatsApp()}>
                <Send height={20} width={20} />
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
              <TouchableOpacity onPress={() => handleUpdatePassword()}>
                <Download height={20} width={20} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <CustomSnackbar
        message={'success'}
        messageDescription={'Video downloaded successfully'}
        onDismiss={dismissSnackbar} // Make sure this function is defined
        visible={snackbarVisible}
      />

      <CustomSnackbar
        message={'success'}
        messageDescription={'Pic deleted successfully'}
        onDismiss={dismissDeleteSnackbar} // Make sure this function is defined
        visible={snackbarDeleteVisible}
      />

      <RBSheet
        ref={ref_RBSheetCamera}
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
            height: hp(25),
          },
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: wp(8),
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'Inter-Medium',
              color: '#303030',
              fontSize: hp(2.3),
            }}>
            Select an option
          </Text>
          <TouchableOpacity onPress={() => ref_RBSheetCamera.current.close()}>
            <Ionicons
              name="close"
              size={22}
              color={'#303030'}
              onPress={() => ref_RBSheetCamera.current.close()}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            //flexDirection: 'row',
            justifyContent: 'space-evenly',
            //alignItems: 'center',
            //borderWidth: 3,
            marginTop: hp(3),
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('UploadUpdatePicScreen')}
            style={{flexDirection: 'row', marginHorizontal: wp(7)}}>
            <EditItem height={23} width={23} />

            <Text
              style={{
                fontFamily: 'Inter-Regular',
                color: '#656565',
                marginLeft: wp(3),
                fontSize: hp(2.1),
              }}>
              Update Pic
            </Text>
          </TouchableOpacity>

          <View
            style={{
              height: hp(0.1),
              marginHorizontal: wp(8),
              marginTop: hp(3),
              backgroundColor: '#00000012',
            }}></View>

          <TouchableOpacity
            onPress={() => changeModal()}
            style={{
              flexDirection: 'row',
              marginTop: hp(2.5),
              marginHorizontal: wp(7),
            }}>
            <Delete height={23} width={23} />

            <Text
              style={{
                fontFamily: 'Inter-Regular',
                color: '#656565',
                marginLeft: wp(3),
                fontSize: hp(2.1),
              }}>
              Delete Pic
            </Text>
          </TouchableOpacity>
        </View>
      </RBSheet>

      <RBSheet
        ref={ref_RBSheetLogout}
        height={330}
        openDuration={250}
        enableOverDrag={false}
        enabledGestureInteraction={false}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          container: {
            justifyContent: 'center',
            alignItems: 'center',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            paddingTop: 0,
            padding: 20,
            zIndex: 999,
          },
          draggableIcon: {
            backgroundColor: 'transparent',
          },
        }}>
        <Image source={appImages.alert} style={{resizeMode: 'contain'}} />
        <Text
          style={[
            styles.txtNotification,
            {marginTop: 1, fontSize: hp(2.5), fontWeight: '500'},
          ]}>
          Confirmation
        </Text>

        <Text style={{marginTop: hp(2)}}>
          Do you really want to delete this video?
        </Text>

        <View style={styles.buttonDirections}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => ref_RBSheetLogout.current.close()}>
            <Text style={styles.textButton}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => changeDelete()}
            style={[styles.button, {backgroundColor: '#FACA4E'}]}>
            <Text style={[styles.textButton, {color: '#232323'}]}>Delete</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
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

  ti: {
    marginHorizontal: '7%',
    marginTop: '5%',
    width: 300,
    backgroundColor: 'white',
    fontSize: wp(4),
    paddingLeft: '2%',
    borderRadius: 10,
  },
  buttonDirections: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(4.3),
    width: '100%',
    marginLeft: wp(5),
    justifyContent: 'space-evenly',
  },
  button: {
    borderColor: '#FACA4E',
    borderWidth: 0.8,
    borderRadius: wp(5),
    width: wp(35),
    height: hp(5.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    color: '#FACA4E',
    fontWeight: 'bold',
  },
  txtNotification: {
    fontWeight: '500',
    marginTop: hp(10),
    marginLeft: wp(5),
    fontSize: hp(2.3),
    color: '#0B0B0B',
  },
});
