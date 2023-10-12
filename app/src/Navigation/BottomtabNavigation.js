import {StyleSheet, Text, ScrollView, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import HomeActive from '../assets/svg/HomeActive.svg';

import HomeInActive from '../assets/svg/HomeInactive.svg';

import MailActive from '../assets/svg/MailActive.svg';

import MailInActive from '../assets/svg/MailInActive.svg';

import CategoryActive from '../assets/svg/CategoryActive.svg';

import CategoryInActive from '../assets/svg/CategoryInactive.svg';

import VideoActive from '../assets/svg/VideoActive.svg';

import VideoInActive from '../assets/svg/VideoInactive.svg';

import ProfileActive from '../assets/svg/ProfileActive.svg';

import ProfileInActive from '../assets/svg/ProfileInactive.svg';

import {appImages} from '../assets/utilities';
import Dashboard from './../view/screens/BottomTab/Dashboard';
import Categories from './../view/screens/BottomTab/Categories';
import Video from './../view/screens/BottomTab/Video';
import Disc from './../view/screens/BottomTab/Disc';
import MarketZone from './../view/screens/BottomTab/MarketZone';
import CustomTabBar from '../assets/Custom/CustomTabBar';

const BottomtabNavigation = () => {
  const Bottom = createBottomTabNavigator();
  return (
    

    <Bottom.Navigator
      initialRouteName="Dashboard"
      //tabBar={(props) => <CustomTabBar {...props} />} // Use your custom tab bar
      tabBarOptions={
        {
          // ... (other tabBarOptions)
        }
      }

      screenOptions={{
        headerShown: false,
        tabBarShowLabel:false,
        tabBarActiveBackgroundColor: '#FFFFFF',
        tabBarInactiveBackgroundColor: '#FFFFFF',
        activeTintColor: '#24A59E', // Color of the active tab icon and label
        inactiveTintColor: '#CACACA',
        tabBarHideOnKeyboard: true,
        lazy: false, // Set lazy to false to ensure all tabs are rendered

      }}>
      <Bottom.Screen
        options={({focused}) => ({
          tabBarIcon: ({focused}) =>
            focused ? (
              <HomeActive width={23} height={23} />


            ) : (
              <HomeInActive width={23} height={23} />

            ),
          tabBarLabel: ({focused}) => (
            <Text style={focused ? styles.focusedLabel : styles.inactiveLabel}>
              Home
            </Text>
          ),
        })}
        name="Dashboards"
        component={Dashboard}
      />

      <Bottom.Screen
        options={({focused}) => ({
          tabBarIcon: ({focused}) =>
            focused ? (
              <CategoryActive />
            ) : (
              <CategoryInActive  width={23} height={23}  />
            ),
          
        })}
        name="Category"
        component={Categories}
      />

      <Bottom.Screen
        options={({focused}) => ({
          tabBarIcon: ({focused}) =>
            focused ? (
              <VideoActive width={23} height={23} />

            ) : (
              <VideoInActive width={23} height={23} />

            ),
          tabBarLabel: ({focused}) => (
            <Text style={focused ? styles.focusedLabel : styles.inactiveLabel}>
              Home
            </Text>
          ),
        })}
        name="Videos"
        component={Video}
      />

      <Bottom.Screen
        options={({focused}) => ({
          tabBarIcon: ({focused}) =>
            focused ? (
              <MailActive width={23} height={23} />

            ) : (
              <MailInActive width={23} height={23} />
            ),
          tabBarLabel: ({focused}) => (
            <Text style={focused ? styles.focusedLabel : styles.inactiveLabel}>
              Home
            </Text>
          ),
        })}
        name="Mail"
        component={Disc}
      />

      <Bottom.Screen
        options={({focused}) => ({
          tabBarIcon: ({focused}) =>
            focused ? (
              <ProfileActive width={23} height={23} />
            ) : (
              <ProfileInActive width={23} height={23} />
            ),
          tabBarLabel: ({focused}) => (
            <Text style={focused ? styles.focusedLabel : styles.inactiveLabel}>
              Home
            </Text>
          ),
        })}
        name="MarketPlace"
        component={MarketZone}
      />


      

    </Bottom.Navigator>
    
  );
};

export default BottomtabNavigation;

const styles = StyleSheet.create({
  focusedLabel: {
    color: '#24A59E',
    fontFamily: 'Inter-Medium',
    fontSize: wp(1.5),
    marginTop: hp(-1),
  },
  inactiveLabel: {
    color: '#CACACA',
    fontFamily: 'Inter-Medium',
    fontSize: wp(1.5),
    marginTop: hp(-1),
  },
});
