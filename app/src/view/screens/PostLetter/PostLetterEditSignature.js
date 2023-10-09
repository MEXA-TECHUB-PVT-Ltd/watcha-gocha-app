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
import React, {useState, useRef, useEffect} from 'react';
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

import Canvas from 'react-native-canvas';

import SignatureCapture from 'react-native-signature-capture';

export default function PostLetterSignature({navigation}) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');

  const [loading, setLoading] = useState(false);

  const [colorSelect, setColorSelect] = useState('#202020');

  const signatureRef = useRef(null);

  //-------------------\\

  /* const saveSign = () => {
    signatureRef.current.saveImage();
  }; */

  const saveSign = () => {
    signatureRef.current.saveImage((encodedImage) => {
      // Save the encoded image to state
      setSavedSignature(encodedImage);
    });
  };

  const resetSign = () => {
    signatureRef.current.resetImage();
    setSavedSignature(null);

  };

  const onSaveEvent = result => {
    // result.encoded - for the base64 encoded png
    // result.pathName - for the file path name
    console.log(result);
  };

  const onDragEvent = () => {
    // This callback will be called when the user enters a signature
    console.log('dragged');
  };

  //--------------------\\

  const canvasRef = useRef(null);
  let ctx = null;
  let isDrawing = false;

  const [isTextInputActive, setIsTextInputActive] = useState(false);
  const [isTextInputActiveAddress, setIsTextInputActiveAddress] =
    useState(false);

  const [isTextInputActiveContact, setIsTextInputActiveContact] =
    useState(false);
  
  const [savedSignature, setSavedSignature] = useState(null);

  const [isTextInputActiveEmail, setIsTextInputActiveEmail] = useState(false);

  const [selectedItemId, setSelectedItemId] = useState(null);
  const ref_RBSheetCamera = useRef(null);
  const [postLetter, setPostLetter] = useState('');
  const [letterType, setLetterTypes] = useState('Public');

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = 300; // Set your canvas width
      canvasRef.current.height = 300; // Set your canvas height
      ctx = canvasRef.current.getContext('2d');
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'black';
    }
  }, []);

  /* const handleTouchStart = (event) => {
    isDrawing = true;
    ctx.beginPath();
    const { pageX, pageY } = event.touches[0];
    ctx.moveTo(pageX, pageY);
    console.log("event", event)
  };

  const handleTouchMove = (event) => {
    if (!isDrawing) return;
    const { pageX, pageY } = event.touches[0];
    ctx.lineTo(pageX, pageY);
    ctx.stroke();
  };

  const handleTouchEnd = () => {
    isDrawing = false;
    ctx.closePath();
  }; */

  /* handleCanvas = (canvas) => {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'purple';
    ctx.fillRect(0, 0, 100, 100);
  } */

  const handleTouchStart = event => {
    if (canvasRef.current) {
      isDrawing = true;
      const {pageX, pageY} = event.nativeEvent.touches[0];
      ctx.beginPath();
      ctx.moveTo(pageX, pageY);
    }
  };

  const handleTouchMove = event => {
    if (canvasRef.current && isDrawing) {
      const {pageX, pageY} = event.nativeEvent.touches[0];
      ctx.lineTo(pageX, pageY);
      ctx.stroke();
    }
  };

  const handleTouchEnd = () => {
    isDrawing = false;
    ctx.closePath();
  };

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
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content" // You can set the StatusBar text color to dark or light
      />

      <View style={{marginTop: hp(5), height: hp(8)}}>
        <Headers
          showBackIcon={true}
          showText={true}
          text={'Edit Signature'}
          onPress={() => navigation.goBack()}
        />
      </View>

      <View
        style={{
          borderRadius: wp(10),
          marginTop:hp(10),
          alignSelf:'center',
          width:'80%',
          height:hp(50),
          //backgroundColor:'black',
          borderColor: '#E7EAF2',
          borderWidth: 1,
          overflow:'hidden'
        }}>
        <SignatureCapture
          style={{width:'100%', height:'100%'}}
          ref={signatureRef}
          onSaveEvent={onSaveEvent}
          onDragEvent={onDragEvent}
          saveImageFileInExtStorage={false}
          showNativeButtons={false}
          showTitleLabel={false}
          //backgroundColor={'black'}
          strokeColor={colorSelect}
          minStrokeWidth={10}
          maxStrokeWidth={10}
          viewMode={'portrait'}
        />
      </View>

      {/* <View style={{marginLeft:wp(8), marginTop:hp(5)}}>

      <CPaperInput
          multiline={true}
          placeholder={'Description'}
          //heading={'Email Address'}
          placeholderTextColor="#121420"
          value={email}
          onChangeText={text => setEmail(text)}
          height={hp(38)}
        />

      </View> */}

      <View
        style={{
          flexDirection: 'row',
          marginTop: hp(5),
          height: hp(8),
          marginHorizontal: wp(8),
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => resetSign()}>
          <Text
            style={{
              color: '#FACA4E',
              fontFamily: 'Inter-Regular',
              fontSize: hp(1.7),
            }}>
            Clear
          </Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            height: hp(5),
            width: wp(23),
          }}>
          <TouchableOpacity
            onPress={() => setColorSelect('#202020')}
            style={{
              width: wp(5),
              height: wp(5),
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#202020',
              borderRadius: wp(5) / 2,
            }}>
            {colorSelect === '#202020' ? (
              <AntDesign color={'#FFFFFF'} name={'check'} size={12} />
            ) : null}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setColorSelect('#FFF500')}
            style={{
              width: wp(5),
              height: wp(5),
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#FFF500',
              borderRadius: wp(5) / 2,
            }}>
            {colorSelect === '#FFF500' ? (
              <AntDesign color={'#FFFFFF'} name={'check'} size={12} />
            ) : null}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setColorSelect('#225DD9')}
            style={{
              width: wp(5),
              height: wp(5),
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#225DD9',
              borderRadius: wp(5) / 2,
            }}>
            {colorSelect === '#225DD9' ? (
              <AntDesign color={'#FFFFFF'} name={'check'} size={12} />
            ) : null}
          </TouchableOpacity>
        </View>
      </View>

      {savedSignature && (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Saved Signature:</Text>
          <Image
          //source={appImages.LogOut}
            source={{ uri: `data:image/png;base64,${savedSignature}` }}
            style={{ borderWidth:3, width: 200, height: 100 }}
          />
        </View>
      )}

      <View style={{marginTop: '10%', alignSelf: 'center'}}>
        <CustomButton
          title="Done"
          load={loading}
          // checkdisable={inn == '' && cm == '' ? true : false}
          customClick={() => {
            //saveSign()
            navigation.navigate('PostLetterEditSignaturePics');
            //navigation.navigate('Profile_image');
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  canvas: {
    borderWidth: 1,
  },
  signature: {
    marginTop: hp(3),
    borderRadius: 5,
    height: hp(39),
    width: '80%',
    //borderColor: '#E7EAF2',
    borderWidth: 1,
  },
});
