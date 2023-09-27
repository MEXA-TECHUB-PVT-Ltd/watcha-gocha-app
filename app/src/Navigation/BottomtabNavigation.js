import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import HomeActive from '../assets/svg/HomeActive.svg';

import HomeInActive from '../assets/svg/HomeInactive.svg';

import Dashboard from '../view/screens/BottomTab/Dashboard';

const BottomtabNavigation = () => {
  const Bottom = createBottomTabNavigator();
  return (
    <Bottom.Navigator
      initialRouteName="Dashboard"
      tabBarOptions={{
        activeTintColor: '#24A59E', // Color of the active tab icon and label
        inactiveTintColor: '#CACACA', // Color of inactive tab icons and labels
        style: {
          backgroundColor: '#FFFFFF', // Background color of the tab bar
        },
        labelStyle: {
          color: '#CACACA',
          fontSize: wp(1.5), // Font size of the tab labels
          FontFamily: 'Inter-Medium',
          marginTop: hp(-1), // Font weight of the tab labels
        },

        tabBarShowLabel: true, // Show all tab bar labels
      }}
      screenOptions={{
        headerShown: false,
        tabBarActiveBackgroundColor: '#FFFFFF',
        tabBarInactiveBackgroundColor: '#FFFFFF',
        activeTintColor: '#24A59E', // Color of the active tab icon and label
        inactiveTintColor: '#CACACA',
        tabBarHideOnKeyboard: true,
      }}>
      <Bottom.Screen
        options={({focused}) => ({
          tabBarIcon: () =>
            focused ? (
              <HomeActive width={21} height={21} />
            ) : (
              <HomeInActive
                width={21}
                height={21}
                style={{
                  width: wp(6.1),
                  height: hp(6.1),
                  tintColor: '#CACACA', // Color for the inactive state
                }}
              />
            ),
        })}
        name="Dashboard"
        component={Dashboard}
      />

      <Bottom.Screen
        options={({focused}) => ({
          tabBarIcon: () =>
            focused ? (
              <HomeActive width={21} height={21} />
            ) : (
              <HomeInActive
                width={21}
                height={21}
                style={{
                  width: wp(6.1),
                  height: hp(6.1),
                  tintColor: '#CACACA', // Color for the inactive state
                }}
              />
            ),
        })}
        name="Category"
        component={Dashboard}
      />

      <Bottom.Screen
        options={({focused}) => ({
          tabBarIcon: () =>
            focused ? (
              <HomeActive width={21} height={21} />
            ) : (
              <HomeInActive
                width={21}
                height={21}
                style={{
                  width: wp(6.1),
                  height: hp(6.1),
                  tintColor: '#CACACA', // Color for the inactive state
                }}
              />
            ),
        })}
        name="Video"
        component={Dashboard}
      />

      <Bottom.Screen
        options={({focused}) => ({
          tabBarIcon: () =>
            focused ? (
              <HomeActive width={21} height={21} />
            ) : (
              <HomeInActive
                width={21}
                height={21}
                style={{
                  width: wp(6.1),
                  height: hp(6.1),
                  tintColor: '#CACACA', // Color for the inactive state
                }}
              />
            ),
        })}
        name="Mail"
        component={Dashboard}
      />

      <Bottom.Screen
        options={({focused}) => ({
          tabBarIcon: () =>
            focused ? (
              <HomeActive width={21} height={21} />
            ) : (
              <HomeInActive
                width={21}
                height={21}
                style={{
                  width: wp(6.1),
                  height: hp(6.1),
                  tintColor: '#CACACA', // Color for the inactive state
                }}
              />
            ),
        })}
        name="Gallery"
        component={Dashboard}
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
