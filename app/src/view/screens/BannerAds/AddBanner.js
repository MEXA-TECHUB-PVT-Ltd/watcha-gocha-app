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

import {SelectCountry, Dropdown} from 'react-native-element-dropdown';
import CPaperInput from '../../../assets/Custom/CPaperInput';
import Headers from '../../../assets/Custom/Headers';

import Add from '../../../assets/svg/AddMainScreen.svg';

import Entypo from 'react-native-vector-icons/Entypo';
import CustomSnackbar from '../../../assets/Custom/CustomSnackBar';

export default function AddBanner({navigation}) {
  const [selectedItem, setSelectedItem] = useState('');

  const [snackBarVisible, setSnackbarVisible] = useState(false);


  const [addBannerLink, setAddBannerLink] = useState('');

  const [startDate, setStartDate] = useState('');

  const [endDate, setEndDate] = useState('');

  const [isActiveAddBanner, setIsActiveAddBanner] = useState(false);

  const [isActiveStartDate, setIsActiveStartDate] = useState(false);

  const [isActiveEndDate, setIsActiveEndDate] = useState(false);

  const [imageUri, setImageUri] = useState(null);

  const ref_RBSheetCamera = useRef(null);

  const takePhotoFromCamera = async value => {
    setSelectedItem(value);
    launchCamera(
      {
        mediaType: 'photo',
        // videoQuality: 'medium',
      },
      response => {
        console.log('image here', response);
        if (!response.didCancel) {
          if (response.assets && response.assets.length > 0) {
            setImageUri(response.assets[0].uri);
            console.log('response', response.assets[0].uri);
          } else if (response.uri) {
            // Handle the case when no assets are present (e.g., for videos)
            setImageUri(response.uri);
            console.log('response', response.uri);
          }
        }
        ref_RBSheetCamera.current.close();
      },
    );
  };

  const choosePhotoFromLibrary = value => {
    setSelectedItem(value);
    launchImageLibrary({mediaType: 'photo'}, response => {
      console.log('image here', response);
      if (!response.didCancel && response.assets.length > 0) {
        setImageUri(response.assets[0].uri);
      }
      console.log('response', imageUri);

      ref_RBSheetCamera.current.close();
    });
  };

  const handleFocusAddBanner = () => {
    setIsActiveAddBanner(true);
  };

  const handleBlurAddBanner = () => {
    setIsActiveAddBanner(false);
  };

  const handleFocusStartDate = () => {
    setIsActiveStartDate(true);
  };

  const handleBlurStartDate = () => {
    setIsActiveStartDate(false);
  };

  const handleFocusEndDate = () => {
    setIsActiveEndDate(true);
  };

  const handleBlurEndDate = () => {
    setIsActiveEndDate(false);
  };

  const handleUpdatePassword = async () => {
    // Perform the password update logic here
    // For example, you can make an API request to update the password

    // Assuming the update was successful
    setSnackbarVisible(true);

    // Automatically hide the Snackbar after 3 seconds
    setTimeout(() => {
      setSnackbarVisible(false);
      navigation.navigate("BottomTabNavigation")
    }, 3000);
  };

  const dismissSnackbar = () => {
    setSnackbarVisible(true);
  };

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
      <View>
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
            marginTop: hp(1),
            backgroundColor: '#00000021',
          }}></View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#FFFFFF'} />


      <View style={{marginTop:hp(5)}}>

      <Headers
        showBackIcon={true}
        onPress={() => navigation.goBack()}
        showText={true}
        text={'Add Banner'}
      />

      </View>

      <TouchableOpacity
        onPress={() => ref_RBSheetCamera.current.open()}
        style={{
          borderRadius: wp(3),
          marginTop: hp(5),
          marginHorizontal: wp(8),
          height: hp(25),
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: '#E7EAF2',
        }}>
        <Image
          style={{resizeMode: 'contain'}}
          source={appImages.UploadBanner}
        />

        <Text
          style={{
            fontFamily: 'Inter',
            marginTop: hp(1.8),
            //fontWeight: 'bold',
            fontSize: hp(2.1),
            color: '#939393',
          }}>
          Upload Image
        </Text>
      </TouchableOpacity>

      <View style={{alignSelf: 'center'}}>
        <TextInput
          mode="outlined"
          label="Add Banner link"
          onChangeText={text => setAddBannerLink(text)}
          //multiline={true} // Enable multiline input
          //numberOfLines={3} // Set the initial number of lines
          style={{...styles.ti}} // Adjust the height as needed
          outlineColor="#0000001F"
          placeholderTextColor="#646464"
          activeOutlineColor="#FACA4E"
          autoCapitalize="none"
          onFocus={handleFocusAddBanner}
          onBlur={handleBlurAddBanner}
        />
      </View>

      <View style={{alignSelf: 'center'}}>
        <TextInput
          mode="outlined"
          label="Start Date"
          onChangeText={text => setStartDate(text)}
          //multiline={true} // Enable multiline input
          //numberOfLines={3} // Set the initial number of lines
          style={{...styles.ti}} // Adjust the height as needed
          outlineColor="#0000001F"
          placeholderTextColor="#646464"
          activeOutlineColor="#FACA4E"
          autoCapitalize="none"
          onFocus={handleFocusStartDate}
          onBlur={handleBlurStartDate}
        />
      </View>

      
      <View style={{alignSelf: 'center'}}>
        <TextInput
          mode="outlined"
          label="End Date"
          onChangeText={text => setEndDate(text)}
          //multiline={true} // Enable multiline input
          //numberOfLines={3} // Set the initial number of lines
          style={{...styles.ti}} // Adjust the height as needed
          outlineColor="#0000001F"
          placeholderTextColor="#646464"
          activeOutlineColor="#FACA4E"
          autoCapitalize="none"
          onFocus={handleFocusEndDate}
          onBlur={handleBlurEndDate}
        />
      </View>

      <View style={{flex:1, alignSelf:'center', justifyContent:'flex-end'}}>
      <CustomButton
            title={'Add'}
            load={false}
            // checkdisable={inn == '' && cm == '' ? true : false}
            customClick={() => {

                handleUpdatePassword()
              //navigation.navigate('Profile_image');
            }}
          />
      </View>

      <CustomSnackbar
        message={'Success'}
        messageDescription={'Banner Added Successfully'}
        onDismiss={dismissSnackbar} // Make sure this function is defined
        visible={snackBarVisible}
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
          <Text style={styles.maintext}>Select an option</Text>
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
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            marginTop: hp(3),
          }}>
          <TouchableOpacity
            onPress={() => takePhotoFromCamera('camera')}
            style={
              selectedItem === 'camera'
                ? styles.selectedItems
                : styles.nonselectedItems
            }>
            <Ionicons
              color={selectedItem === 'camera' ? '#FACA4E' : '#888888'}
              name="camera"
              size={25}
            />

            <Text style={{color: '#333333'}}>From camera</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => choosePhotoFromLibrary('gallery')}
            style={
              selectedItem === 'gallery'
                ? styles.selectedItems
                : styles.nonselectedItems
            }>
            <MaterialCommunityIcons
              color={selectedItem === 'gallery' ? '#FACA4E' : '#888888'}
              name="image"
              size={25}
            />

            <Text style={{color: '#333333'}}>From gallery</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  ti: {
    marginTop: '5%',
    width: 300,
    backgroundColor: 'white',
    fontSize: wp(4),
    paddingLeft: '2%',
    borderRadius: 10,
  },
  textInputSelectedCategory: {
    borderWidth: 1,
    borderRadius: wp(3),
    width: '98%',
    borderColor: '#FACA4E',

    paddingHorizontal: 20,
    paddingVertical: 6.8,
    marginBottom: 20,
    marginTop: hp(3),
  },
  textInputCategoryNonSelected: {
    borderWidth: 1,
    borderRadius: wp(3),
    width: '98%',
    borderColor: '#E7EAF2',
    paddingHorizontal: 20,
    paddingVertical: 6.8,
    marginBottom: 20,
    marginTop: hp(3),
  },
  iconStyle: {
    color: '#C4C4C4',
    width: 20,
    height: 20,
  },
  iconStyleInactive: {
    color: '#FACA4E',
  },
  maintext: {
    fontSize: hp(2.3),
    color: '#303030',
    fontWeight: 'bold',
  },
  modaltextview: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: wp(90),
    borderRadius: 25,
    backgroundColor: 'white',
    paddingHorizontal: wp(15),
  },
  optiontext: {
    fontSize: hp(1.7),
    color: '#303030',
    marginLeft: wp(4),
  },
  nonselectedItems: {
    width: wp(35),
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: hp(14),
    borderRadius: wp(1.8),
    borderWidth: 1,
    borderColor: '#E7EAF2',
  },
  selectedItems: {
    width: wp(35),
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: hp(14),
    borderRadius: wp(1.8),
    borderWidth: 1,
    borderColor: '#FACA4E',
  },
  selectCheckBox: {
    width: 17,
    height: 17,
    borderRadius: wp(1),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#FACA4E',
  },
  unSelectCheckBox: {
    width: 17,
    height: 17,
    borderRadius: wp(1),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#C4C4C4',
  },
});
