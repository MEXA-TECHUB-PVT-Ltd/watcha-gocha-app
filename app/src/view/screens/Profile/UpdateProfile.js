import {
  StyleSheet,
  FlatList,
  Text,
  StatusBar,
  KeyboardAvoidingView,
  Image,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState, useRef} from 'react';
import Back from '../../../assets/svg/back.svg';
import {appImages} from '../../../assets/utilities/index';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Button, Divider, TextInput} from 'react-native-paper';
import Fontiso from 'react-native-vector-icons/Fontisto';
import Headers from '../../../assets/Custom/Headers';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomButton from '../../../assets/Custom/Custom_Button';
import User from '../../../assets/svg/User.svg';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SelectCountry, Dropdown} from 'react-native-element-dropdown';
import RBSheet from 'react-native-raw-bottom-sheet';
import CPaperInput from './../../../assets/Custom/CPaperInput';
import CustomSnackbar from '../../../assets/Custom/CustomSnackBar';

export default function UpdateProfile({navigation}) {
  const [selectedItem, setSelectedItem] = useState('');

  const [userName, setUserName] = useState('');

  const [email, setEmail] = useState('JohnDoe@gmail.com');

  const [price, setPrice] = useState('');

  const [snackbarVisible, setsnackbarVisible] = useState(false);

  const [isTextInputActive, setIsTextInputActive] = useState(false);

  const [isTextInputActivePrice, setIsTextInputActivePrice] = useState(false);

  const [isTextInputActiveDescription, setIsTextInputActiveDescription] =
    useState(false);

  const [isChecked, setIsChecked] = useState(false);

  const [category, setCategory] = useState('');

  const [description, setDescription] = useState('');

  const [imageUri, setImageUri] = useState(null);

  const [isFocus, setIsFocus] = useState(false);

  const ref_RBSheetCamera = useRef(null);

  const handleFocus = () => {
    setIsTextInputActive(true);
  };

  const handleBlur = () => {
    setIsTextInputActive(false);
  };

  const handleFocusPrice = () => {
    setIsTextInputActivePrice(true);
  };

  const handleBlurPrice = () => {
    setIsTextInputActivePrice(false);
  };

  const handleFocusDescription = () => {
    setIsTextInputActiveDescription(true);
  };

  const handleBlurDescription = () => {
    setIsTextInputActiveDescription(false);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const Category = [
    {label: 'Item 1', value: '1'},
    {label: 'Item 2', value: '2'},
    {label: 'Item 3', value: '3'},
  ];

  const dismissSnackbar = () => {
    setsnackbarVisible(false);
  };

  const TakeImageFromCamera = () => {
    ImageCropPicker.openCamera({
      width: 300,
      height: 500,
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => console.log(error));
  };
  const TakeImageFromGallery = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 500,
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => console.log(error));
  };

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

  const handleUpdatePassword = async () => {
    // Perform the password update logic here
    // For example, you can make an API request to update the password

    // Assuming the update was successful
    setsnackbarVisible(true);

    // Automatically hide the Snackbar after 3 seconds
    setTimeout(() => {
      setsnackbarVisible(false);
      navigation.goBack()
    }, 3000);
  };
  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: 'white'}}
      behavior="height" // You can use ‘height’ as well, depending on your preference
      enabled>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content" // You can set the StatusBar text color to dark or light
      />
      <View style={{marginTop: hp(5)}}>
        <Headers
          onPress={() => navigation.goBack()}
          showBackIcon={true}
          text={'Update Profile'}
          showText={true}
        />
      </View>
      <ScrollView
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        style={styles.container}>
        <View style={{alignItems: 'center', marginTop: hp(5)}}>
          <TouchableOpacity style={styles.circleBox}>
            {imageUri == null ? (
              <User width={30} height={30} />
            ) : (
              <Image
                style={{
                  flex: 1,
                  width: '100%',
                  height: '100%',
                  borderRadius: wp(25) / 2, // Half of the width (25/2)
                  resizeMode: 'contain',
                }}
                source={{uri: imageUri}}
              />
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity>
          <Button
            mode="contained"
            onPress={() => {
              ref_RBSheetCamera.current.open();
            }}
            style={styles.button}
            contentStyle={{
              padding: '1%',
            }}
            labelStyle={{
              fontSize: wp(3.7),
              fontFamily: 'Inter-Medium',
              color: '#232323',
            }}>
            Change Image
          </Button>
        </TouchableOpacity>

        <CPaperInput
          //multiline={true}
          //placeholder={'Description'}
          heading={'User Name'}
          placeholderTextColor="#121420"
          value={userName}
          onChangeText={text => setUserName(text)}
          //height={hp(20)}
        />

        <CPaperInput
          //multiline={true}
          //placeholder={'Description'}
          editable={false}
          heading={'Email Address'}
          placeholderTextColor="#121420"
          value={email}
          onChangeText={text => setEmail(text)}
          //height={hp(20)}
        />

        <Text
          style={{
            color: '#FF0000',
            marginLeft: wp(1),
            fontFamily: 'Inter-Regular',
            //fontWeight: 'bold',
          }}>
          You can't edit your email address
        </Text>

        <View style={{ marginTop:hp(18)}}>
            <CustomButton
              title="Update"
              customClick={() => {
                
                handleUpdatePassword(); // Call your password update function here

                //setsnackbarVisible(true);

                //navigation.goBack();
                //ref_RBSendOffer.current.close();
                //navigation.navigate('ResetPassword');
              }}
              //style={{width: wp(59)}}
            />
            </View>
      </ScrollView>

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
        message={'success'}
        messageDescription={'Update profile successfully'}
        onDismiss={dismissSnackbar} // Make sure this function is defined
        visible={snackbarVisible}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginHorizontal: wp(7),
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
  button: {
    // flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: '#FACA4E',
    borderRadius: 25,
    width: 150,
    marginTop: hp(2),
    marginBottom: '5%',
  },
  circleBox: {
    width: wp(28),
    height: hp(14),
    borderWidth: 1,
    overflow: 'hidden',
    borderColor: '#0000001F',
    borderRadius: wp(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
