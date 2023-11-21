import {
  StyleSheet,
  FlatList,
  Text,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  ActivityIndicator,
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
import AsyncStorage from '@react-native-async-storage/async-storage';

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

export default function PostLetterSignature({navigation, route}) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [signatureId, setSignatureId] = useState('');

  const [userId, setUserId] = useState('');

  const [fileType, setFileType] = useState('');

  const [fileName, setFileName] = useState('');

  const [imageUrl, setImageUrl] = useState('');

  const [loading, setLoading] = useState(false);

  const [colorSelect, setColorSelect] = useState('#202020');

  const signatureRef = useRef(null);

  useEffect(() => {
    // Make the API request and update the 'data' state
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    // Simulate loading
    setLoading(true);

    await getUserID();
    // Fetch data one by one
    // Once all data is fetched, set loading to false
    setLoading(false);
  };

  const getUserID = async () => {
    console.log("Id's");
    try {
      const result = await AsyncStorage.getItem('userId ');
      if (result !== null) {
        setUserId(result);
        console.log('user id retrieved:', result);
      }
    } catch (error) {
      // Handle errors here
      console.error('Error retrieving user ID:', error);
    }

    try {
      const result = await AsyncStorage.getItem('userName');
      if (result !== null) {
        setName(result);
        console.log('user id retrieved:', result);
      }
    } catch (error) {
      // Handle errors here
      console.error('Error retrieving user ID:', error);
    }
  };


  //-------------------\\

  /* const saveSign = () => {
    signatureRef.current.saveImage();
  }; */

  const receivedDataName = route.params?.name;
  const receivedDatAddress = route.params?.address;
  const receivedDataContactNumber = route.params?.contactNumber;
  const receivedDataEmail = route.params?.email;
  const receivedDataCategoryId = route.params?.category_id;
  const receivedDataLetterType = route.params?.letterType;
  const receivedDataGreetingsTitle = route.params?.greetingsTitle;
  const receivedDataSubjectOfLetter = route.params?.subjectOfLetter;
  const receivedDatapostLetter = route.params?.postLetter;
  const receivedDataintroductionOfLetter = route.params?.introductionOfLetter;


  console.log('Name', receivedDataName);
  console.log('Address', receivedDatAddress);
  console.log('Contact', receivedDataContactNumber);
  console.log('Email', receivedDataEmail);
  console.log('Id', receivedDataCategoryId);
  console.log('LetterType', receivedDataLetterType);
  console.log('LetterTypeAppeal', receivedDataLetterType);
  console.log('Greetings', receivedDataGreetingsTitle);
  console.log('Subject Of Letter', receivedDataSubjectOfLetter);
  console.log('Post Letter', receivedDatapostLetter);
  console.log('Introduction Of Letter', receivedDataintroductionOfLetter);


  const saveSign = () => {
    console.log("Before saveImage");

    signatureRef.current.saveImage((encodedImage) => {
        console.log("Encoded Image")
      //console.log(("Encoded Image of:",encodedImage.encoded))
      // Save the encoded image to state
     /*  setSavedSignature(true);

      setEncodedImage(encodedImage.encoded) */

      

    });

    console.log("After saveImage");


    //heyy()
  };

  const heyy=()=>{
    console.log("Heyy Ref", signatureRef)
    console.log("Heyy Signature", encodedImage)

  }

  const resetSign = () => {
    signatureRef.current.resetImage();
    setSavedSignature(null);

  };

  const onSaveEvent = result => {
    // result.encoded - for the base64 encoded png
    // result.pathName - for the file path name

    console.log("Encoded Image", result.encoded )

    console.log("Encoded File Path", result.pathName )

    //console.log(("Encoded Image of:",encodedImage.encoded))
    // Save the encoded image to state
     setSavedSignature(true);


    setEncodedImage(result.encoded)

    setEncodedFilePath(result.pathName)

    generateRandomName()

    if(fileName!==''){
      handleUploadImage()
    }

    //extractFileInfo(result.pathName)

    

    /* if(fileName!=='' && fileType!== ''){
      handleUploadImage()
    } */


    //handleUploadImage()

  };


  const generateRandomName = () => {
    // Generate a random string as a unique identifier
    const randomString = Math.random().toString(36).substring(2, 10);
  
    // Get the current timestamp
    const timestamp = new Date().getTime();
  
    // Combine the random string and timestamp to create a unique name
    const uniqueName = `${randomString}_${timestamp}.png`;

    setFileName(uniqueName)
  
    return uniqueName;
  };
  


   const extractFileInfo = (filePath) => {
    // Use the platform-specific path delimiter
    const pathDelimiter = Platform.OS === 'android' ? '/' : '/';
    
    // Split the file path using the path delimiter
    const pathComponents = filePath.split(pathDelimiter);
  
    // Get the last component, which is the file name
    const fileName = pathComponents[pathComponents.length - 1];
  
    // Split the file name to get the file type
    const fileNameComponents = fileName.split('.');
    const fileType = fileNameComponents.length > 1 ? fileNameComponents.pop() : null;
   
    setFileName(fileName)

    setFileType(fileType)

    return { fileName, fileType };
  };
   
  
  const handleUploadImage = data => {
    setLoading(true);
    
    const uri = encodedFilePath;
    const type = 'image/png';
    const name = fileName;
    const sourceImage = {uri, type, name};
    //console.log('Source Image', sourceImage);
    console.log("Came to Upload Image", fileType)
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
        setImageUrl(data.url); // Store the Cloudinary video URL in your state
        //uploadVideo(data.url)
        //uploadXpiVideo(data.url);
        console.log('Image Url', data);
        //uploadXpiVideo(data.url,data)
       // uploadVideo(data.url);
      })
      .catch(err => {
        setLoading(false);
        console.log('Error While Uploading Video', err);
      });
  };

  const uploadVideo = async data => {
    console.log('Image Uri of encoded', data);
   
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTY5ODAzOTAyNywiZXhwIjoxNzAwNjMxMDI3fQ.JSki1amX9VPEP9uCsJ5vPiCl2P4EcBqW6CQyY_YdLsk';
    const apiUrl = 'https://watch-gotcha-be.mtechub.com/signature/createSignature';

    const requestData = {
      user_id: userId,
      image: data,
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`, // Use the provided token
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('API Response:', data);
        setLoading(false);
        //handleUpdatePassword();

        // Handle the response data as needed
      } else {
        setLoading(false);

        console.error(
          'Failed to upload video:',
          response.status,
          response.statusText,
        );
        // Handle the error
      }
    } catch (error) {
      console.error('API Request Error:', error);
      setLoading(false);

      // Handle the error
    }
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
  
  const [savedSignature, setSavedSignature] = useState(false);

  const [encodedImage, setEncodedImage] = useState(null);

  const [encodedFilePath, setEncodedFilePath] = useState(null);

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
          saveImageFileInExtStorage={true}
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
            source={{ uri: `data:image/png;base64,${encodedImage}`}}
            style={{ borderWidth: 3, width: 200, height: 50 }}
          />
        </View>
      )}

      <View style={{marginTop: '10%', alignSelf: 'center'}}>
        <CustomButton
          title="Done"
          load={loading}
          // checkdisable={inn == '' && cm == '' ? true : false}
          customClick={() => {
            saveSign()
            //navigation.navigate('PostLetterEditSignaturePics');
            //navigation.navigate('Profile_image');
          }}
        />
      </View>

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
