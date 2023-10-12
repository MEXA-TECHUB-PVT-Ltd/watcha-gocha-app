import { StyleSheet, Image,TouchableOpacity, Text, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator,DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import BottomtabNavigation from './BottomtabNavigation';
import { useNavigation } from '@react-navigation/native';
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










import { appImages } from '../assets/utilities';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP,
    widthPercentageToDP as wp,
  } from 'react-native-responsive-screen';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
    
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
                flex:1,
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
                <View style={{marginLeft: 18, marginTop:hp(-5)}}>
                  <DrawerItem
                    label="Home"
                    labelStyle={{ color: '#333333', marginLeft:wp(-2.3), fontFamily:'Inter-Medium'}}
                    onPress={() => navigation.navigate('Dashboards')}
                    icon={focused => <HomeActive /> }
                  />
                  {/* <DrawerItem
                    label="Chats"
                    // labelStyle={{ color: 'red'}}
                    onPress={() => navigation.navigate('Chat')}
                    icon={focused => <ChatIcon />}
                  /> */}
      
                  <DrawerItem
                    label="Category"
                    labelStyle={{ color: '#333333', marginLeft:wp(-4.3), fontFamily:'Inter-Medium'}}
                    onPress={() => navigation.navigate('Category')}
                    
                    icon={focused => <CategoryActive/>}
                  />

                  <DrawerItem
                    label="Pi/3.14 Videos"
                    onPress={() =>  navigation.navigate("Videos")}
                    labelStyle={{ color: '#333333', marginLeft:wp(-5), fontFamily:'Inter-Medium'}}
                    icon={focused => <VideoActive/>}
                  />
                  <DrawerItem
                    label="DISC"
                    labelStyle={{ color: '#333333', marginLeft:wp(-4), fontFamily:'Inter-Medium'}}
                    onPress={() => navigation.navigate('Mail')}
                    icon={focused => <MailActive/>}
                  />

                   <DrawerItem
                    label="Pic Tours"
                    labelStyle={{ color: '#333333', marginLeft:wp(-2), fontFamily:'Inter-Medium'}}
                    onPress={() => navigation.navigate('PicTours')}
                    icon={focused => <ProfileActive/>}
                  />

                    <DrawerItem
                    label="Market Zone"
                    labelStyle={{ color: '#333333', marginLeft:wp(-5), fontFamily:'Inter-Medium'}}
                    onPress={() => navigation.navigate('MarketPlace')}
                    icon={focused => <MarketActive/>}
                  />

                    <DrawerItem
                    label="Banner Advertisement"
                    labelStyle={{ color: '#333333', marginLeft:wp(-4.3), fontFamily:'Inter-Medium'}}

                    onPress={() => navigation.navigate('ViewBanners')}
                    icon={focused => <AddActive/>}
                  />


                    <DrawerItem
                    label="Privacy policy"
                    labelStyle={{ color: '#333333', marginLeft:wp(-4.1), fontFamily:'Inter-Medium'}}
                    onPress={() => navigation.navigate('PrivacyPolicy')}
                    icon={focused => <PrivacyPolicyActiveActive/>}
                  />


                    <DrawerItem
                    label="Terms & Condition"
                    labelStyle={{ color: '#333333',  marginLeft:wp(-4.1), fontFamily:'Inter-Medium'}}
                    onPress={() => navigation.navigate('TermsAndCondition')}
                    icon={focused => <TermsAndconditionActive/>}
                  />

                    <DrawerItem
                    label="Contact Us"
                    labelStyle={{ color: '#333333',  marginLeft:wp(-4.1), fontFamily:'Inter-Medium'}}
                    onPress={() => navigation.navigate('ContactUs')}
                    icon={focused => <ContactUsActive/>}
                  />

                  
                </View>
                  <View
                    style={{
                      flex: 1,
                      marginTop:hp(3),
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      marginBottom:hp(5)
                    }}>
                    <TouchableOpacity
                      style={{
                        width: wp(60),
                        height: 40,
                        backgroundColor: '#FACA4E',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 20,
                        flexDirection: 'row',
                      }}>
                      <Text style={{color: '#232323', fontFamily:'Inter-Regular', marginLeft: 10}}>Logout</Text>
                    </TouchableOpacity>
                  </View>
              </View>
            </View>
      
          </DrawerContentScrollView>
        );
      };
      
      
  return (
    <Drawer.Navigator
    screenOptions={{headerShown: false}}
    drawerContent={props => <CustomDrawerContent {...props} />}>
    {/* Drawer screens */}
    {/* Define your drawer screens here */}

    <Drawer.Screen name="Home" component={BottomtabNavigation} />
    {/* Other drawer screens */}
  </Drawer.Navigator>
  )
}

export default DrawerNavigation;


const styles = StyleSheet.create({})