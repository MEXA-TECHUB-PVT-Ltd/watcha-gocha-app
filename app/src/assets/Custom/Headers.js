import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Fontiso from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Header} from '@react-navigation/stack';
import { appImages } from '../../assets/utilities/index'

const Headers = ({
  showBackIcon,
  showText,
  showSearch,
  onPressSearch,
  onPressListings,
  onPressGridView,
  onPressAdd,
  text,
  showHeart,
  showProfile,
  showIcon,
  showSettings,
  showAdd,
  showListings,
  showGridView,
  style,
  onPress,
  navigation,
}) => {
  return (
    <View style={styles.header}>
      {showBackIcon && (
        <TouchableOpacity style={styles.backArrow} onPress={onPress}>
          <Ionicons name="chevron-back-sharp" size={30} color="#282828" />
        </TouchableOpacity>
      )}

      {showText && <Text style={[styles.headerText, style]}>{text}</Text>}

      {showIcon && (
        <Image
          source={appImages.logo}
          style={{
            width: wp(50),
            height: hp(50),
            marginTop: '5%',
            alignSelf: 'center',
          }}
          resizeMode="contain"
        />
      )}

      {showHeart && (
        <TouchableOpacity style={styles.heartIcon}>
          <Fontiso name="heart-alt" size={20} color="#2B2B2B" />
        </TouchableOpacity>
      )}

      {/* {showProfile && (
       <Image
       source={appImages.profile} // Replace with your image source
       style={styles.img}
     />
      )} */}

      {showSettings && (
        <TouchableOpacity style={styles.heartIcon}>
          <AntDesign name="setting" size={20} color="#2B2B2B" />
        </TouchableOpacity>
      )}

      {showAdd && (
        <TouchableOpacity onPress={onPressAdd} style={styles.heartIcon}>
          <AddButton style={styles.imgAdd} width={25} height={25} />
        </TouchableOpacity>
      )}

      {showListings && (
        <TouchableOpacity onPress={onPressListings} style={styles.heartIcon}>
          <Image style={styles.imgAdd} source={Images.listView} />
        </TouchableOpacity>
      )}

      {showSearch && (
        <TouchableOpacity onPress={onPressSearch} style={styles.heartIcon}>
          <Ionicons name="search-outline" size={25} color="#24A59E" />
        </TouchableOpacity>
      )}

      {showGridView && (
        <TouchableOpacity onPress={onPressGridView} style={styles.heartIcon}>
          <Image style={styles.imgAdd} source={Images.gridView} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Headers;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    //justifyContent:'space-between',
    alignItems: 'center',
    justifyContent: 'center',
    //paddingHorizontal:wp(5),
    height: hp(5),
    marginTop: StatusBar.currentHeight - 20,
  },
  headerText: {
    //color: AppColors.dark,
    //fontFamily: FontFamily.Heading,
    fontWeight: '500',
    //fontWeight: '500',
    fontSize: wp(2.8),
    alignSelf: 'center',
  },
  backArrow: {
    position: 'absolute',
    left: wp(5),
  },
  heartIcon: {
    position: 'absolute',
    right: wp(5),
  },
  imgAdd: {
    resizeMode: 'contain',
    height: hp(3),
  },
  img:{
    position: 'absolute',
    right: wp(5),
    width: wp(25),
    height: wp(25),
    borderWidth: 1,
    overflow:'hidden',
    borderColor: '#00000020',
    borderRadius: wp(50),
  }
});
