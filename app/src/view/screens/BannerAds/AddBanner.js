import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  ImageBackground,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';

import {SelectCountry, Dropdown} from 'react-native-element-dropdown';
import CPaperInput from '../../../assets/Custom/CPaperInput';
import Headers from '../../../assets/Custom/Headers';

import Add from '../../../assets/svg/AddMainScreen.svg';

import Entypo from 'react-native-vector-icons/Entypo';
import CustomSnackbar from '../../../assets/Custom/CustomSnackBar';

export default function AddBanner({navigation}) {
  const [selectedItem, setSelectedItem] = useState('');

  const [snackBarVisible, setSnackbarVisible] = useState(false);

  const [snackBarVisibleAlert, setSnackbarVisibleAlert] = useState(false);

  const [loading, setIsLoading] = useState(false);

  const [imageInfo, setImageInfo] = useState(null);

  const [addBannerLink, setAddBannerLink] = useState('');

  const [startDate, setStartDate] = useState('');

  const [endDate, setEndDate] = useState('');

  const [isActiveAddBanner, setIsActiveAddBanner] = useState(false);

  const [isActiveStartDate, setIsActiveStartDate] = useState(false);

  const [isActiveEndDate, setIsActiveEndDate] = useState(false);

  const [imageUri, setImageUri] = useState(null);

  const [authToken, setAuthToken] = useState([]);

  const [userId, setUserId] = useState('');

  const ref_RBSheetCamera = useRef(null);

  //----------------------------\\

  useEffect(() => {
    // Make the API request and update the 'data' state
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    // Simulate loading
    setIsLoading(true);

    await getUserID();
    // Fetch data one by one
    // Once all data is fetched, set loading to false
    setIsLoading(false);
  };

  const getUserID = async () => {
    console.log("Id's");
    try {
      const result = await AsyncStorage.getItem('userId ');
      if (result !== null) {
        setUserId(result);
        console.log('user id retrieved:', result);

        userToken(result);
      }

      /*  const result3 = await AsyncStorage.getItem('authToken ');
      if (result3 !== null) {
        setAuthToken(result3);
        await fetchCategory(result3);

        console.log('user id retrieved:', result);
      } */

      /* const  userImage = await AsyncStorage.getItem('userImage');
      if (result3 !== null) {
        setAuthToken(result3);
        await fetchCategory(result3);

        console.log('user id retrieved:', result);
      } */
    } catch (error) {
      // Handle errors here
      console.error('Error retrieving user ID:', error);
    }

    /*  try {
      const result = await AsyncStorage.getItem('userName');
      if (result !== null) {
        setName(result);
        console.log('user id retrieved:', result);
      }
    } catch (error) {
      // Handle errors here
      console.error('Error retrieving user ID:', error);
    } */

    //await authTokenAndId()
  };

  //--------------------------------\\

  const userToken = async id => {
    try {
      const result3 = await AsyncStorage.getItem('authToken ');
      if (result3 !== null) {
        setAuthToken(result3);
        //await fetchCategory(result3, id);
      }
    } catch (error) {
      // Handle errors here
      console.error('Error retrieving user ID:', error);
    }
  };

  //-----------------------------\\

  const takePhotoFromCamera = async value => {
    setSelectedItem(value);
    launchCamera(
      {
        mediaType: 'photo',
        //videoQuality: 'medium',
      },
      response => {
        console.log('image here', response);

        if (!response.didCancel) {
          ref_RBSheetCamera.current.close();
          if (response.assets && response.assets.length > 0) {
            setImageUri(response.assets[0].uri);
            console.log('response', response.assets[0].uri);
            setImageInfo(response.assets[0]);
            ref_RBSheetCamera.current.close();
          } else if (response.uri) {
            // Handle the case when no assets are present (e.g., for videos)
            setImageUri(response.uri);
            console.log('response null', response.uri);
            ref_RBSheetCamera.current.close();
          }
        }
      },
    );
  };

  const choosePhotoFromLibrary = value => {
    setSelectedItem(value);
    launchImageLibrary({mediaType: 'photo'}, response => {
      console.log('image here', response);
      if (!response.didCancel && response.assets.length > 0) {
        console.log('Response', response.assets[0]);
        setImageUri(response.assets[0].uri);
        setImageInfo(response.assets[0]);
        ref_RBSheetCamera.current.close();
      }
      ref_RBSheetCamera.current.close();

      console.log('response', imageInfo);
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
      navigation.navigate('BottomTabNavigation');
    }, 3000);
  };

  const dismissSnackbar = () => {
    setSnackbarVisible(true);
  };

  const handleUpdatePasswordAlert = async () => {
    // Perform the password update logic here
    // For example, you can make an API request to update the password

    // Assuming the update was successful
    setSnackbarVisibleAlert(true);

    // Automatically hide the Snackbar after 3 seconds
    setTimeout(() => {
      setSnackbarVisibleAlert(false);
    }, 3000);
  };

  const dismissSnackbarAlert = () => {
    setSnackbarVisibleAlert(true);
  };

  const upload = async () => {
    if (
      imageUri !== null &&
      addBannerLink !== '' &&
      startDate !== '' &&
      endDate !== ''
    ) {
      handleUploadImage();
      //uploadVideo();
    } else {
      handleUpdatePasswordAlert();
    }
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

  const handleUploadImage = data => {
    setIsLoading(true);
    const uri = imageInfo.uri;
    const type = imageInfo.type;
    const name = imageInfo.fileName;
    const sourceImage = {uri, type, name};
    console.log('Source Image', sourceImage);
    const dataImage = new FormData();
    dataImage.append('file', sourceImage);
    dataImage.append('upload_preset', 'e6zfilan'); // Use your Cloudinary upload preset
    dataImage.append('cloud_name', 'dxfdrtxi3'); // Use your Cloudinary cloud name

    fetch('https://api.cloudinary.com/v1_1/dxfdrtxi3/image/upload', {
      method: 'POST',
      body: dataImage,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(res => res.json())
      .then(data => {
        //setImageUrl(data.url); // Store the Cloudinary video URL in your state
        //uploadVideo(data.url)
        //uploadXpiVideo(data.url);
        console.log('Image Url', data);
        //uploadXpiVideo(data.url,data)
        handleSendCode(data.url);
      })
      .catch(err => {
        setIsLoading(false);
        console.log('Error While Uploading Video', err);
      });
  };

  const forgetPasswordEndpoint =
    'https://watch-gotcha-be.mtechub.com/banner/createBanner'; // Replace with your actual API endpoint

  /* const handleSendCode = async datas => {
    console.log('DATA IMAGE', datas);
    setIsLoading(true);
    try {
      const response = await fetch(forgetPasswordEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          banner_link: addBannerLink,
          price: '100',
          image: datas,
          user_id: userId,
          startDate: startDate,
          endDate: endDate,
        }),
      });

      const data = await response.json();

      //console.log('error data sign in', data);

      if (data.statusCode === 200) {
        setIsLoading(false);
        console.log('Email', data);
        handleUpdatePassword();
        // Assuming there's at least one result
      } else {
        setIsLoading(false);
        console.log('ERROR', data);
        console.error('No results found.', data.response.result);
      }

      setIsLoading(false);
      // Reset the input fields
      // navigation.navigate('SelectGender');
    } catch (error) {
      //console.error('Error:');
      //showAlert();
      setIsLoading(false);
    }
  }; */

  const handleSendCode = async datas => {
    console.log('DATA IMAGE', datas);
    setIsLoading(true);

    try {
      const token = authToken; // Replace this with your actual function to get the bearer token

      const response = await fetch(forgetPasswordEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          banner_link: addBannerLink,
          price: 100,
          image: datas,
          user_id: userId,
          startDate: startDate,
          endDate: endDate,
          paid_status:true
        }),
      });

      const data = await response.json();

      if (data.statusCode === 201) {
        setIsLoading(false);
        console.log('Email', data);
        handleUpdatePassword();
        // Assuming there's at least one result
      } else {
        setIsLoading(false);
        console.log('ERROR', data);
        //console.error('No results found.', data.response.result);
      }

      // Reset the input fields
      // navigation.navigate('SelectGender');
    } catch (error) {
      console.error('Error:', error);
      //showAlert();
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#FFFFFF'} />

      <View style={{marginTop: hp(5)}}>
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

      {imageUri !== null ? (
        <View
          style={{
            marginTop: hp(5),
            height: hp(27),
            borderRadius: wp(3),
            marginHorizontal: wp(20),
          }}>
          {imageUri !== null && (
            <Image
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 1, // Ensure it's on top of other elements
                flex: 1,
                width: '100%',
                height: '100%',
                borderRadius: wp(3),
                resizeMode: 'contain',
              }}
              source={{uri: imageUri}}
            />
          )}
          {imageUri == null && (
            <Image
              style={{
                flex: 1,
                width: '100%',
                height: '100%',
                borderRadius: wp(3),
                resizeMode: 'stretch',
                zIndex: 0, // Ensure it's below other elements when no image
              }}
              source={appImages.updatePics}
            />
          )}
        </View>
      ) : null}

      <View style={{alignSelf: 'center'}}>
        <TextInput
          mode="outlined"
          label="Add Banner link"
          value={addBannerLink}
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

      <View
        style={{
          flex: 1,
          marginTop: hp(21),
          alignSelf: 'center',
          justifyContent: 'flex-end',
        }}>
        <CustomButton
          title={'Add'}
          load={false}
          // checkdisable={inn == '' && cm == '' ? true : false}
          customClick={() => {
            upload();
            //handleUpdatePassword();
            //navigation.navigate('Profile_image');
          }}
        />
      </View>

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

      <CustomSnackbar
        message={'Success'}
        messageDescription={'Banner Posted SuccessFully'}
        onDismiss={dismissSnackbar} // Make sure this function is defined
        visible={snackBarVisible}
      />

      <CustomSnackbar
        message={'Alert!'}
        messageDescription={'Kindly Fill All Fields'}
        onDismiss={dismissSnackbarAlert} // Make sure this function is defined
        visible={snackBarVisibleAlert}
      />

      <View
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {loading && <ActivityIndicator size="large" color="#FACA4E" />}
      </View>

      
    </ScrollView>
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
