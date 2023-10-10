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
  
  import {
    heightPercentageToDP as hp,
    widthPercentageToDP,
    widthPercentageToDP as wp,
  } from 'react-native-responsive-screen';
  
  import Fontiso from 'react-native-vector-icons/Fontisto';
  
  import IonIcons from 'react-native-vector-icons/Ionicons';
  
  import {SelectCountry, Dropdown} from 'react-native-element-dropdown';
  import CPaperInput from '../../../assets/Custom/CPaperInput';
  
  const Category = [
    {label: 'Item 1', value: '1'},
    {label: 'Item 2', value: '2'},
    {label: 'Item 3', value: '3'},
  ];
  

export default function ViewAllBlogs({navigation}) {
  return (
    <View>
      <Text>ViewAllBlogs</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    
})