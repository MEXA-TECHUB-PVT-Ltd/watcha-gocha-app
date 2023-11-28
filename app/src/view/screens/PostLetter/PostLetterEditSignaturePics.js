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
  import PublicLetter from '../../../assets/svg/PublicLetter.svg';
  import PrivateLetter from '../../../assets/svg/PrivateLetter.svg';
  
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
  import SignatureCapture from 'react-native-signature-capture';
  import CustomSnackbar from './../../../assets/Custom/CustomSnackBar';

  export default function PostLetterSignature({navigation}) {

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');

  const [loading, setLoading] = useState(false);

  const [colorSelect, setColorSelect] = useState('');

  const [snackbarVisible, setsnackbarVisible] = useState(false);

  const ref_RBSendOffer = useRef(null);


  const [isTextInputActive, setIsTextInputActive] = useState(false);
  const [isTextInputActiveAddress, setIsTextInputActiveAddress] =
    useState(false);

  const [isTextInputActiveContact, setIsTextInputActiveContact] =
    useState(false);

  const [isTextInputActiveEmail, setIsTextInputActiveEmail] = useState(false);

  const [selectedItemId, setSelectedItemId] = useState(null);
  const ref_RBSheetCamera = useRef(null);
  const ref_RBSheetCameraCanvas = useRef(null);

  const [postLetter, setPostLetter] = useState('');
  const [letterType, setLetterTypes] = useState('Public');

  const [imageUri, setImageUri] = useState(null);


  const handleFocus = () => {
    setIsTextInputActive(true);
  };

  const handleBlur = () => {
    setIsTextInputActive(false);
  };

  const handleFocusAddress = () => {
    setIsTextInputActiveAddress(true);
  };

  const handleBlurAddress = () => {
    setIsTextInputActiveAddress(false);
  };

  const handleFocusContact = () => {
    setIsTextInputActiveContact(true);
  };

  const handleBlurContact = () => {
    setIsTextInputActiveContact(false);
  };

  const handleFocusEmail = () => {
    setIsTextInputActiveEmail(true);
  };

  const handleBlurEmail = () => {
    setIsTextInputActiveEmail(false);
  };

  const takePhotoFromCamera = async value => {
    ref_RBSheetCameraCanvas.current.close();
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
      },
    );
  };

  const choosePhotoFromLibrary = value => {

    ref_RBSheetCameraCanvas.current.close();

    setSelectedItem(value);
    launchImageLibrary({mediaType: 'photo'}, response => {
      console.log('image here', response);
      if (!response.didCancel && response.assets.length > 0) {
        setImageUri(response.assets[0].uri);
      }
      console.log('response', imageUri);

      //ref_RBSheetCamera.current.close();
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
      navigation.navigate("Mail")
    }, 3000);
  };

  const dismissSnackbar = () => {
    setsnackbarVisible(false);
  };


  const searches = [
    {id: 1, title: 'Subject'},
    {id: 2, title: 'Subject'},
    {id: 3, title: 'Greetings'},
    {id: 4, title: 'Introduction'},
    {id: 5, title: 'Greetings'},
  ];

  const setLetterType = value => {
    setLetterTypes(value);
    ref_RBSheetCamera.current.close();
  };

  const setType= ()=>{
    ref_RBSheetCamera.current.close();

    setLetterType('Private Letter');

    ref_RBSendOffer.current.open();

  }

  const renderSearches = item => {
    console.log('Items', item);
    const isSelected = selectedItemId === item.id;

    return (
      <TouchableOpacity
        style={[
          styles.searchesDetails,
          {
            // backgroundColor: isSelected ? '#FACA4E' : null,
          },
        ]}
        onPress={() => {
          setSelectedItemId(item.id);
          console.log('Selected item:', item.title);
        }}>
        <Text
          style={[
            styles.textSearchDetails,
            {color: isSelected ? '#FACA4E' : '#939393'},
          ]}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <ScrollView style={styles.container}>
    <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content" // You can set the StatusBar text color to dark or light
      />

      <View style={{marginTop: hp(5), height: hp(8)}}>
        <Headers
          showBackIcon={true}
          showText={true}
          text={'Post Letter'}
          onPress={() => navigation.goBack()}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: wp(8),
          alignItems: 'center',
          marginTop: hp(3),
          height: hp(8),
        }}>
        <View
          style={{
            width: wp(12),
            marginLeft: wp(0.5),
            height: wp(12),
            borderRadius: wp(12) / 2,
          }}>
          <Image
            source={appImages.profileImg}
            style={{width: '100%', height: '100%', resizeMode: 'cover'}}
          />
        </View>

        <TouchableOpacity
        onPress={()=>ref_RBSheetCamera.current.open()}
          style={{
            flexDirection: 'row',
            marginLeft: wp(5),
            height: hp(5),
            width: wp(33),
            borderWidth: 0.5,
            borderColor: '#FACA4E',
            borderRadius: wp(5),
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <Text style={{color: '#FACA4E', fontFamily: 'Inter-Regular'}}>
            {letterType}
          </Text>

          <Ionicons name="chevron-down" size={21} color="#FACA4E" />
        </TouchableOpacity>


        
      </View>

      <TouchableOpacity
        onPress={()=>ref_RBSheetCameraCanvas.current.open()}
          style={{
            borderRadius: wp(3),
            marginTop: hp(5),
            height: hp(25),
            width:'70%',
            alignSelf:'center',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#E7EAF2',
          }}>
          <Image style={{resizeMode: 'contain'}} source={appImages.Upload} />

          <Text
            style={{
              fontFamily: 'Inter',
              marginTop: hp(1.8),
              //fontWeight: 'bold',
              fontSize: hp(1.5),
              color: '#939393',
            }}>
            You can maximum 3 images or videos
          </Text>
        </TouchableOpacity>

        {imageUri !== null ? (
          <View
            style={{
              marginTop: hp(5),
              height: hp(35),
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


        <View style={{flex:1, justifyContent:'flex-end'}}>
        <View style={{marginTop: '25%', alignSelf: 'center'}}>
        <CustomButton
          title="Upload"
          load={loading}
          // checkdisable={inn == '' && cm == '' ? true : false}
          customClick={() => {
             handleUpdatePassword()
            //navigation.navigate('PostLetterEditSignature');
            //navigation.navigate('Profile_image');
          }}
        />
      </View>
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
          <Text
            style={{
              fontFamily: 'Inter-Medium',
              color: '#303030',
              fontSize: hp(2.3),
            }}>
            Select Letter Type
          </Text>
          <TouchableOpacity>
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
          <TouchableOpacity onPress={()=>setLetterType("Public Letter")} style={{flexDirection: 'row', marginHorizontal:wp(7)}}>

            <PublicLetter height={23} width={23}/>

          <Text
            style={{
              fontFamily: 'Inter-Regular',
              color: '#656565',
              marginLeft:wp(3),
              fontSize: hp(2.1),
            }}>

            Public letter

          </Text>

          </TouchableOpacity>

          <View style={{height:hp(0.1), marginHorizontal:wp(8), marginTop:hp(3), backgroundColor:'#00000012'}}>

          </View>

          <TouchableOpacity onPress={()=>setType()} style={{flexDirection: 'row', marginTop:hp(2.5), marginHorizontal:wp(7)}}>

            <PrivateLetter height={23} width={23}/>

          <Text
            style={{
              fontFamily: 'Inter-Regular',
              color: '#656565',
              marginLeft:wp(3),
              fontSize: hp(2.1),
            }}>

            Private Letter

          </Text>

          </TouchableOpacity>

          
        </View>
      </RBSheet>


      <RBSheet
        ref={ref_RBSheetCameraCanvas}
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
              onPress={() => ref_RBSheetCameraCanvas.current.close()}
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
           <Image source={appImages.ArtBoard} style={{ resizeMode:'contain'}}/>

            <Text style={{marginTop:hp(-1.8),color: '#333333'}}>From canvas</Text>
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

      <RBSheet
        ref={ref_RBSendOffer}
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
            height: hp(55),
          },
        }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            marginHorizontal: wp(8),
            justifyContent: 'space-evenly',
          }}>
          <Image source={appImages.alert} style={{resizeMode: 'contain'}} />

          <Text
            style={{
              color: '#333333',
              marginLeft: wp(1),
              fontSize: hp(2.3),
              //textDecorationLine:'underline',
              fontFamily: 'Inter-Bold',
              //fontWeight: 'bold',
            }}>
            Unable To Post!
          </Text>

          <Text
            style={{
              color: '#9597A6',
              marginLeft: wp(1),
              fontSize: hp(2),
              textAlign: 'center',
              lineHeight: hp(3),
              //textDecorationLine:'underline',
              fontFamily: 'Inter-Regular',
              //fontWeight: 'bold',
            }}>
            Upgrade for private letter posting and a{'\n'}seamless experience
          </Text>

          <View style={{marginHorizontal: wp(10)}}>
            <CustomButton
              title="Buy Subscription"
              customClick={() => {
                ref_RBSendOffer.current.close();
                navigation.navigate('SubscriptionPayment');
              }}
              style={{width: wp(59)}}
            />
          </View>


          <TouchableOpacity onPress={()=>ref_RBSendOffer.current.close()}>

          <Text
            style={{
              color: '#9597A6',
              marginLeft: wp(1),
              marginBottom: hp(3),
              fontSize: hp(2),
              textAlign: 'center',
              lineHeight: hp(3),
              //textDecorationLine:'underline',
              fontFamily: 'Inter-Regular',
              //fontWeight: 'bold',
            }}>
            Maybe later
          </Text>

          </TouchableOpacity>
        </View>
      </RBSheet>

      <CustomSnackbar
        message={'success'}
        messageDescription={'Letter Posted Successfully'}
        onDismiss={dismissSnackbar} // Make sure this function is defined
        visible={snackbarVisible}
      />
      
      </ScrollView>
  )
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
      selectCheckBox:{
        width: 17,
        height: 17,
        borderRadius: wp(1),
        borderWidth: 1,
        alignItems:'center',
        justifyContent:'center',
        borderColor: '#FACA4E',
      },
      unSelectCheckBox:{
        width: 17,
        height: 17,
        borderRadius: wp(1),
        borderWidth: 1,
        alignItems:'center',
        justifyContent:'center',
        borderColor: '#C4C4C4',
      },
})