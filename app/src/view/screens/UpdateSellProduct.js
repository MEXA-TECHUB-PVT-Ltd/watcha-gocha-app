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
import Back from '../../assets/svg/back.svg';
import {appImages} from '../../assets/utilities/index';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Button, Divider, TextInput} from 'react-native-paper';
import Fontiso from 'react-native-vector-icons/Fontisto';
import Headers from '../../assets/Custom/Headers';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomButton from '../../assets/Custom/Custom_Button';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SelectCountry, Dropdown} from 'react-native-element-dropdown';
import UpdateItems from '../../assets/svg/UpdateItems.svg';
import RBSheet from 'react-native-raw-bottom-sheet';
import CPaperInput from '../../assets/Custom/CPaperInput';
import CustomSnackbar from '../../assets/Custom/CustomSnackBar';


export default function UpdateSellProduct({navigation}) {
  const [selectedItem, setSelectedItem] = useState('');

  const [snackbarVisible, setsnackbarVisible] = useState(false);


  const [title, setTitle] = useState('');

  const [price, setPrice] = useState('');

  const [isTextInputActive, setIsTextInputActive] = useState(false);

  const [isTextInputActivePrice, setIsTextInputActivePrice] = useState(false);

  const [isTextInputActiveDescription, setIsTextInputActiveDescription] =
    useState(false);

  const [isChecked, setIsChecked] = useState(false);

  const [category, setCategory] = useState('');

  const [description, setDescription] = useState('');

  const [condition, setcondition] = useState('');

  const [subCategory, setSubCategory] = useState('');

  const [imageUri, setImageUri] = useState(null);

  const [isFocus, setIsFocus] = useState(false);

  const [isFocusSubCategory, setIsFocusSubCategory] = useState(false);

  const [isFocusCondition, setIsFocusCondition] = useState(false);

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

  const Category = [
    {label: 'Item 1', value: '1'},
    {label: 'Item 2', value: '2'},
    {label: 'Item 3', value: '3'},
  ];

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

  const availableApps = [
    {id: 1, title: 'Lense', image: appImages.lense},
    {id: 2, title: 'Holder', image: appImages.holder},
    {id: 3, title: 'HeadPhone', image: appImages.headPhone},
    {id: 4, title: 'Shoes', image: appImages.shoes},
    {id: 5, title: 'Printer', image: appImages.printer},
    //{id: 10, title: 'Printer', image: appImages.printer},
  ];

  const renderAvailableApps = item => {
    console.log('Items', item);
    return (
      <View
        style={{
          height: hp(15),
          width: wp(28),
          //flex: 1,
          borderRadius: wp(3),
          //borderWidth:3,
          margin: 5,
        }}>
        <Image
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1, // Ensure it's on top of other elements
            //flex: 1,
            width: '100%',
            height: '100%',
            borderRadius: wp(3),
            resizeMode: 'cover',
          }}
          source={item.image}
        />
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: -10,
            left: wp(23),
            //height: hp(3),
            //width: wp(21),
            //borderRadius: wp(3),
            //backgroundColor: '#FACA4E',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2, // Ensure it's on top
          }}>
          <UpdateItems width={30} height={30} />
        </TouchableOpacity>
      </View>
    );
  };

  const dismissSnackbar = () => {
    setsnackbarVisible(false);
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
        <Headers onPress={()=>navigation.goBack()} showBackIcon={true} text={'Update Item'} showText={true} />
      </View>
      <ScrollView
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        style={styles.container}>
        <View style={{marginHorizontal: null}}>
          <FlatList
            style={{marginTop: hp(3)}}
            contentContainerStyle={{marginLeft: wp(5)}}
            showsVerticalScrollIndicator={false}
            data={availableApps}
            keyExtractor={item => item.id.toString()}
            numColumns={3} // Set the number of columns to 3
            renderItem={({item}) => renderAvailableApps(item)}
          />
        </View>

        <View
          style={{
            justifyContent: 'center',
            height: hp(15),
            marginHorizontal:wp(8),
            //alignItems: 'center',
            marginTop: hp(2),
          }}>

          <CPaperInput
            //multiline={true}
            //placeholder={'Description'}
            heading={'Title'}
            placeholderTextColor="#121420"
            value={title}
            onChangeText={text => setTitle(text)}
            //height={hp(20)}
          />
        </View>


        <View
          style={{
            justifyContent: 'center',
            //height: hp(15),
            marginHorizontal:wp(8),
            //alignItems: 'center',
          }}>

         
          <CPaperInput
            //multiline={true}
            //placeholder={'Description'}
            heading={'Price'}
            head
            placeholderTextColor="#121420"
            value={price}
            onChangeText={text => setPrice(text)}
            //height={hp(20)}
          />
        </View>

        <View style={{marginTop:hp(3),marginHorizontal:wp(7)}}>

        <Text
            style={isFocus?styles.headingFocused:styles.heading}>
            Select Category
          </Text> 
          <Dropdown
            style={
              isFocus
                ? styles.textInputSelectedCategory
                : styles.textInputCategoryNonSelected
            }
            containerStyle={{
              marginTop: 3,
              alignSelf: 'center',
              borderRadius: wp(3),
              width: '100%',
            }}
            // dropdownPosition="top"
            // mode="modal"
            placeholderStyle={{
              color: '#121420',
              //   fontWeight: '400',
              fontFamily: 'Inter',
              fontSize: hp(1.8),
            }}
            iconStyle={isFocus ? styles.iconStyle : styles.iconStyleInactive}
            itemTextStyle={{color: '#000000'}}
            selectedTextStyle={{fontSize: 16, color: '#000000'}}
            // inputSearchStyle={styles.inputSearchStyle}
            // iconStyle={styles.iconStyle}
            value={category}
            data={Category}
            search={false}
            maxHeight={200}
            labelField="label"
            valueField="value"
            placeholder={''}
            searchPlaceholder="Search..."
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setCategory(item.value);
              setIsFocus(false);
            }}
            renderRightIcon={() => (
              <AntDesign
                style={styles.icon}
                color={isFocus ? '#FACA4E' : '#C4C4C4'}
                name="down"
                size={15}
              />
            )}
          />
        </View>




        <View style={{marginTop:hp(3),marginHorizontal:wp(7)}}>

        <Text
            style={isFocusSubCategory?styles.headingFocused:styles.heading}>
            Select Sub Category
          </Text> 
          <Dropdown
            style={
              isFocusSubCategory
                ? styles.textInputSelectedCategory
                : styles.textInputCategoryNonSelected
            }
            containerStyle={{
              marginTop: 3,
              alignSelf: 'center',
              borderRadius: wp(3),
              width: '100%',
            }}
            // dropdownPosition="top"
            // mode="modal"
            placeholderStyle={{
              color: '#121420',
              //   fontWeight: '400',
              fontFamily: 'Inter',
              fontSize: hp(1.8),
            }}
            iconStyle={isFocusSubCategory ? styles.iconStyle : styles.iconStyleInactive}
            itemTextStyle={{color: '#000000'}}
            selectedTextStyle={{fontSize: 16, color: '#000000'}}
            // inputSearchStyle={styles.inputSearchStyle}
            // iconStyle={styles.iconStyle}
            value={subCategory}
            data={Category}
            search={false}
            maxHeight={200}
            labelField="label"
            valueField="value"
            placeholder={''}
            searchPlaceholder="Search..."
            onFocus={() => setIsFocusSubCategory(true)}
            onBlur={() => setIsFocusSubCategory(false)}
            onChange={item => {
              setSubCategory(item.value);
              setIsFocusSubCategory(false);
            }}
            renderRightIcon={() => (
              <AntDesign
                style={styles.icon}
                color={setIsFocusSubCategory ? '#FACA4E' : '#C4C4C4'}
                name="down"
                size={15}
              />
            )}
          />
        </View>



        <View style={{marginTop:hp(3),marginHorizontal:wp(7)}}>

        <Text
            style={isFocusCondition?styles.headingFocused:styles.heading}>
            Select Sub Category
          </Text> 
          <Dropdown
            style={
              isFocusCondition
                ? styles.textInputSelectedCategory
                : styles.textInputCategoryNonSelected
            }
            containerStyle={{
              marginTop: 3,
              alignSelf: 'center',
              borderRadius: wp(3),
              width: '100%',
            }}
            // dropdownPosition="top"
            // mode="modal"
            placeholderStyle={{
              color: '#121420',
              //   fontWeight: '400',
              fontFamily: 'Inter',
              fontSize: hp(1.8),
            }}
            iconStyle={isFocusCondition ? styles.iconStyle : styles.iconStyleInactive}
            itemTextStyle={{color: '#000000'}}
            selectedTextStyle={{fontSize: 16, color: '#000000'}}
            // inputSearchStyle={styles.inputSearchStyle}
            // iconStyle={styles.iconStyle}
            value={condition}
            data={Category}
            search={false}
            maxHeight={200}
            labelField="label"
            valueField="value"
            placeholder={''}
            searchPlaceholder="Search..."
            onFocus={() => setIsFocusCondition(true)}
            onBlur={() => setIsFocusCondition(false)}
            onChange={item => {
              setcondition(item.value);
              setIsFocusCondition(false);
            }}
            renderRightIcon={() => (
              <AntDesign
                style={styles.icon}
                color={setIsFocusCondition ? '#FACA4E' : '#C4C4C4'}
                name="down"
                size={15}
              />
            )}
          />
        </View>

        <View
          style={{
            justifyContent: 'center',
            //height: hp(15),
            marginHorizontal:wp(8),
            //alignItems: 'center',
          }}>
         
          <CPaperInput
            multiline={true}
            //placeholder={'Description'}
            heading={'Description'}
            head
            placeholderTextColor="#121420"
            value={description}
            onChangeText={text => setDescription(text)}
            height={hp(20)}
          />
        </View>

        <TouchableOpacity
          onPress={() => handleCheckboxChange()}
          style={{flexDirection: 'row', marginTop:hp(3), marginHorizontal:wp(8), width: '100%'}}>
          <TouchableOpacity
            style={isChecked ? styles.selectCheckBox : styles.unSelectCheckBox}
            onPress={
              () => handleCheckboxChange()
              // setChecked(!checked);
            }>
            {isChecked && <Entypo name={'check'} size={15} color={'#FACA4E'} />}

            {/* {checked ? ( */}
            {/* <Icon
                  name="checkmark"
                  size={28}
                  color={AppColors.buttonColor}
                /> */}
            {/* ) : ( */}

            {/* )} */}
          </TouchableOpacity>
          <Text
            style={{
              marginLeft: wp(1.8),
              fontFamily: 'Inter',
              color: '#333333',
            }}>
            Add to top post
          </Text>
        </TouchableOpacity>
        <View style={{marginTop:hp(5),marginHorizontal:wp(8)}}>
        <CustomButton
            title={'Update'}
            load={false}
            // checkdisable={inn == '' && cm == '' ? true : false}
            customClick={() => {
              handleUpdatePassword()
              //navigation.navigate('Profile_image');
            }}
          />
          </View>
      </ScrollView>

      <CustomSnackbar
        message={'Success'}
        messageDescription={'Item updated Successfully'}
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
    //marginHorizontal: wp(8),
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
    width: '100%',
    borderColor: '#FACA4E',

    paddingHorizontal: 20,
    paddingVertical: 6.8,
    marginBottom: 20,
    marginTop: hp(3),
  },
  textInputCategoryNonSelected: {
    borderWidth: 1,
    borderRadius: wp(3),
    width: '100%',
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
  heading: {
    color: '#0B0B0B',
    fontWeight:'bold',
    //marginBottom:hp(2.3),
    fontSize: hp(2.1),
    fontFamily: 'Inter',
  },
  headingFocused:{
    //marginBottom:hp(1.5),
    fontSize: hp(2.3),
    fontWeight:'bold',
    color: '#FACA4E',
    //fontSize: 13,
    fontFamily: 'Inter',
  }
});
