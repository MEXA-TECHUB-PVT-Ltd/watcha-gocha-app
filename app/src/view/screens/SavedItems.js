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
  import PlusPost from '../../assets/svg/PlusPost.svg';
  
  import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
  
  import Back from '../../assets/svg/back.svg';
  import {appImages} from '../../assets/utilities/index';
  import Slider from '@react-native-community/slider';
  import VolumeUp from '../../assets/svg/VolumeUp.svg';
  import Like from '../../assets/svg/Like.svg';
  import UnLike from '../../assets/svg/Unlike.svg';
  import Comment from '../../assets/svg/Comment.svg';
  import Send from '../../assets/svg/Send.svg';
  import Download from '../../assets/svg/Download.svg';
  import CustomButton from '../../assets/Custom/Custom_Button';
  import Ionicons from 'react-native-vector-icons/Ionicons';
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
  import Saved from '../../assets/svg/BookMark.svg'
  import CustomSnackbar from '../../assets/Custom/CustomSnackBar';
  import Share from 'react-native-share';
  
  import {
    heightPercentageToDP as hp,
    widthPercentageToDP,
    widthPercentageToDP as wp,
  } from 'react-native-responsive-screen';
  
  import Fontiso from 'react-native-vector-icons/Fontisto';
  
  import IonIcons from 'react-native-vector-icons/Ionicons';
  
  import {SelectCountry, Dropdown} from 'react-native-element-dropdown';
  import CPaperInput from '../../assets/Custom/CPaperInput';
import Headers from '../../assets/Custom/Headers';
  
  const Category = [
    {label: 'Item 1', value: '1'},
    {label: 'Item 2', value: '2'},
    {label: 'Item 3', value: '3'},
  ];

  const availableApps = [
    {id: 1, title: 'Lense', image: appImages.lense},
    {id: 2, title: 'Holder', image: appImages.holder},
    {id: 3, title: 'HeadPhone', image: appImages.headPhone},
    {id: 4, title: 'Shoes', image: appImages.shoes},
    {id: 5, title: 'Printer', image: appImages.printer},
    {id: 6, title: 'Lense', image: appImages.lense},
    {id: 7, title: 'Holder', image: appImages.holder},
    {id: 8, title: 'HeadPhone', image: appImages.headPhone},
    {id: 9, title: 'Shoes', image: appImages.shoes},
    //{id: 10, title: 'Printer', image: appImages.printer},
    
    
  ];
  

export default function SavedItems({navigation}) {

    const renderAvailableApps = item => {
        console.log('Items', item);
        return (
          <View
            style={{
              height: hp(18),
              flex: 1,
              borderRadius: wp(3),
              margin: 5,
            }}>
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
              source={item.image}
            />
            <View
                style={{
                  position: 'absolute',
                  top: hp(1),
                   right:3,
                  //height: hp(3),
                  //width: wp(21),
                  //borderRadius: wp(3),
                  //backgroundColor: '#FACA4E',
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: 2, // Ensure it's on top
                }}>
               <Saved width={18} height={18}/>
              </View>
          </View>
        );
      };


  return (
    <View style={styles.container}>
    <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
     
     <View style={{marginTop:hp(5)}}>
     <Headers onPress={()=>navigation.goBack()} showText={true} text={'Saved Items'} showBackIcon={true}/>

     </View>

     <FlatList
        style={{marginTop: hp(3), marginHorizontal:wp(5), flex: 1}}
        showsVerticalScrollIndicator={false}
        data={availableApps}
        keyExtractor={item => item.id.toString()}
        numColumns={3} // Set the number of columns to 3
        renderItem={({item}) => renderAvailableApps(item)}
      />

    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    }
})