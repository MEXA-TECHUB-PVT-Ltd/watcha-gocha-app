import {StyleSheet, Image, TouchableOpacity, Text, View} from 'react-native';
import React, {useRef} from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import BottomtabNavigation from './BottomtabNavigation';
import {useNavigation} from '@react-navigation/native';
import HomeActive from '../assets/svg/HomeActive.svg';
import CategoryActive from '../assets/svg/CategoryActive.svg';
import VideoActive from '../assets/svg/VideoActive.svg';
import MailActive from '../assets/svg/MailActive.svg';
import ProfileActive from '../assets/svg/ProfileActive.svg';
import MarketActive from '../assets/svg/MarketActive.svg';
import AddActive from '../assets/svg/AddActive.svg';
import BlogsActive from '../assets/svg/BlogsActive.svg';
import PrivacyPolicyActiveActive from '../assets/svg/PrivacyPolicyActive.svg';
import TermsAndconditionActive from '../assets/svg/TermsAndConditionActive.svg';
import ContactUsActive from '../assets/svg/ContactUsActive.svg';
import RBSheet from 'react-native-raw-bottom-sheet';

import {appImages} from '../assets/utilities';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const Drawer = createDrawerNavigator();

const DrawerNavigation = ({navigation}) => {
  const ref_RBSheetLogout = useRef(null);

  const logOut = () => {
    ref_RBSheetLogout.current.close();
    navigation.navigate('Signin_signup');
  };

  const CustomDrawerContent = props => {
    const navigation = useNavigation();

    return (
      <DrawerContentScrollView
        {...props}
        style={{}}
        showsVerticalScrollIndicator={false}>
        {/* <StatusBar
              translucent={false}
              barStyle={'dark-content'}
              backgroundColor={Colors.White}
            /> */}
        <View
          style={{
            flex: 1,
            backgroundColor: '#ffffff',
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              // height: hp(25),
            }}>
            <Image
              source={appImages.logo}
              style={{
                width: hp(25),
                height: hp(13),
                resizeMode: 'contain',
                marginVertical: hp(5),
              }}
            />
            {/* <View
                  style={{
                    width: wp(67),
                    height: hp(0.1),
                    backgroundColor: '#00000021',
                  }}
                /> */}
          </View>

          <View style={{flex: 1}}>
            <View style={{marginLeft: 18, marginTop: hp(-5)}}>
              <DrawerItem
                label="Home"
                labelStyle={{
                  color: '#333333',
                  marginLeft: wp(-2.3),
                  fontFamily: 'Inter-Medium',
                }}
                onPress={() => navigation.navigate('Dashboards')}
                icon={focused => <HomeActive />}
              />
              {/* <DrawerItem
                    label="Chats"
                    // labelStyle={{ color: 'red'}}
                    onPress={() => navigation.navigate('Chat')}
                    icon={focused => <ChatIcon />}
                  /> */}

              <DrawerItem
                label="Mass Apps"
                labelStyle={{
                  color: '#333333',
                  marginLeft: wp(-4.3),
                  fontFamily: 'Inter-Medium',
                }}
                onPress={() => navigation.navigate('Category')}
                icon={focused => <CategoryActive />}
              />

              <DrawerItem
                label="Pi/3.14 Videos"
                onPress={() => navigation.navigate('Videos')}
                labelStyle={{
                  color: '#333333',
                  marginLeft: wp(-5),
                  fontFamily: 'Inter-Medium',
                }}
                icon={focused => <VideoActive />}
              />
              <DrawerItem
                label="DISC"
                labelStyle={{
                  color: '#333333',
                  marginLeft: wp(-4),
                  fontFamily: 'Inter-Medium',
                }}
                onPress={() => navigation.navigate('Mail')}
                icon={focused => <MailActive />}
              />

              <DrawerItem
                label="Pic Tours"
                labelStyle={{
                  color: '#333333',
                  marginLeft: wp(-2),
                  fontFamily: 'Inter-Medium',
                }}
                onPress={() => navigation.navigate('PicTourss')}
                icon={focused => <ProfileActive />}
              />

              <DrawerItem
                label="Market Zone"
                labelStyle={{
                  color: '#333333',
                  marginLeft: wp(-5),
                  fontFamily: 'Inter-Medium',
                }}
                onPress={() => navigation.navigate('MarketPlace')}
                icon={focused => <MarketActive />}
              />

              <DrawerItem
                label="Banner Advertisement"
                labelStyle={{
                  color: '#333333',
                  marginLeft: wp(-4.3),
                  fontFamily: 'Inter-Medium',
                }}
                onPress={() => navigation.navigate('ViewBanners')}
                icon={focused => <AddActive />}
              />

              <DrawerItem
                label="Privacy policy"
                labelStyle={{
                  color: '#333333',
                  marginLeft: wp(-4.1),
                  fontFamily: 'Inter-Medium',
                }}
                onPress={() => navigation.navigate('PrivacyPolicy')}
                icon={focused => <PrivacyPolicyActiveActive />}
              />

              <DrawerItem
                label="Terms & Condition"
                labelStyle={{
                  color: '#333333',
                  marginLeft: wp(-4.1),
                  fontFamily: 'Inter-Medium',
                }}
                onPress={() => navigation.navigate('TermsAndCondition')}
                icon={focused => <TermsAndconditionActive />}
              />

              <DrawerItem
                label="Notification"
                labelStyle={{
                  color: '#333333',
                  marginLeft: wp(-4.1),
                  fontFamily: 'Inter-Medium',
                }}
                onPress={() => navigation.navigate('Notification')}
                icon={focused => <ContactUsActive />}
              />

              <DrawerItem
                label="Contact Us"
                labelStyle={{
                  color: '#333333',
                  marginLeft: wp(-4.1),
                  fontFamily: 'Inter-Medium',
                }}
                onPress={() => navigation.navigate('ContactUs')}
                icon={focused => <ContactUsActive />}
              />
            </View>
            <View
              style={{
                flex: 1,
                marginTop: hp(3),
                justifyContent: 'flex-end',
                alignItems: 'center',
                marginBottom: hp(5),
              }}>
              <TouchableOpacity
                onPress={() => ref_RBSheetLogout.current.open()}
                style={{
                  width: wp(60),
                  height: 40,
                  backgroundColor: '#FACA4E',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 20,
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    color: '#232323',
                    fontFamily: 'Inter-Regular',
                    marginLeft: 10,
                  }}>
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </DrawerContentScrollView>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Drawer.Navigator
        screenOptions={{headerShown: false}}
        drawerContent={props => <CustomDrawerContent {...props} />}>
        {/* Drawer screens */}
        {/* Define your drawer screens here */}

        <Drawer.Screen name="Home" component={BottomtabNavigation} />
        {/* Other drawer screens */}
      </Drawer.Navigator>

      <RBSheet
        ref={ref_RBSheetLogout}
        height={330}
        openDuration={250}
        enableOverDrag={false}
        enabledGestureInteraction={false}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          container: {
            justifyContent: 'center',
            alignItems: 'center',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            paddingTop: 0,
            padding: 20,
            zIndex: 999,
          },
          draggableIcon: {
            backgroundColor: 'transparent',
          },
        }}>
        <Image source={appImages.alert} style={{resizeMode: 'contain'}} />
        <Text
          style={[
            styles.txtNotification,
            {marginTop: 1, fontSize: hp(2.5), fontWeight: '500'},
          ]}>
          Confirmation
        </Text>

        <Text style={{marginTop: hp(2)}}>Do You Really Want To Logout?</Text>

        <View style={styles.buttonDirections}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => ref_RBSheetLogout.current.close()}>
            <Text style={styles.textButton}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => logOut()}
            style={[styles.button, {backgroundColor: '#FACA4E'}]}>
            <Text style={[styles.textButton, {color: '#232323'}]}>Logout</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
    </View>
  );
};

export default DrawerNavigation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  ti: {
    marginHorizontal: '7%',
    marginTop: '5%',
    width: 300,
    backgroundColor: 'white',
    fontSize: wp(4),
    paddingLeft: '2%',
    borderRadius: 10,
  },
  buttonDirections: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(4.3),
    width: '100%',
    marginLeft: wp(5),
    justifyContent: 'space-evenly',
  },
  button: {
    borderColor: '#FACA4E',
    borderWidth: 0.8,
    borderRadius: wp(5),
    width: wp(35),
    height: hp(5.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    color: '#FACA4E',
    fontWeight: 'bold',
  },
  txtNotification: {
    fontWeight: '500',
    marginTop: hp(10),
    marginLeft: wp(5),
    fontSize: hp(2.3),
    color: '#0B0B0B',
  },
});
