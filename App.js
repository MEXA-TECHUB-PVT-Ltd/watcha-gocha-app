import 'react-native-gesture-handler';
import React, {useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Signin_signup from './app/src/view/screens/Signin_signup/Signin_signup';
import Profile_image from './app/src/view/screens/Profile_image/Profile_image';

import ForgetPassword from './app/src/view/screens/Auth/ForgetPassword';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
LogBox.ignoreAllLogs();

import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  LogBox,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';

// import B1 from './src/assets/svg/b1.svg'
// import B2 from './src/assets/svg/b2.svg'
// import B3 from './src/assets/svg/b3.svg'
import ResetPassword from './app/src/view/screens/Auth/ResetPassword';
import BottomtabNavigation from './app/src/Navigation/BottomtabNavigation';
import Dashboard from './app/src/view/screens/BottomTab/Dashboard';
import PhoneBase from './app/src/view/screens/PhoneBase';
import SearchApps from './app/src/view/screens/SearchApps';
import ViewVideo from './app/src/view/screens/VideoView/ViewVideo';
import UploadVideo from './app/src/view/screens/UploadAVideo/UploadVideo';
import UploadScreen from './app/src/view/screens/UploadAVideo/UploadScreen';
import PicDetails from './app/src/view/screens/PicDetails';
import SearchScreen from './app/src/view/screens/SearchScreen';
import VerifyAccount from './app/src/view/screens/Auth/VerifyAccount';
import PrivacyPolicy from './app/src/view/screens/PrivacyPolicy';
import TermsAndCondition from './app/src/view/screens/TermsAndCondition';
import ContactUs from './app/src/view/screens/ContactUs';
import SubscriptionPayment from './app/src/view/screens/SubscriptionPayment';
import UploadUpdateScreen from './app/src/view/screens/UpdateAVideo/UploadUpdateScreen';
import UploadUpdatePicScreen from './app/src/view/screens/UpdateAPic/UploadUpdatePicScreen';
import UploadUpdateVideo from './app/src/view/screens/UpdateAVideo/UploadUpdateVideo';
import UploadUpdatePic from './app/src/view/screens/UpdateAPic/UploadUpdatePic';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        
        <Stack.Screen
          name="UploadUpdatePicScreen"
          component={UploadUpdatePicScreen}
          options={{headerShown: false}}
        />

      <Stack.Screen
          name="BottomTabNavigation"
          component={BottomtabNavigation}
          options={{headerShown: false}}
        />

        

        <Stack.Screen
          name="UploadUpdatePic"
          component={UploadUpdatePic}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="UploadUpdateVideo"
          component={UploadUpdateVideo}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="UploadUpdateScreen"
          component={UploadUpdateScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="SubscriptionPayment"
          component={SubscriptionPayment}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="ContactUs"
          component={ContactUs}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="TermsAndCondition"
          component={TermsAndCondition}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicy}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="VerifyAccount"
          component={VerifyAccount}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="PicDetails"
          component={PicDetails}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="UploadScreen"
          component={UploadScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="UploadVideo"
          component={UploadVideo}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="ViewVideo"
          component={ViewVideo}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="SearchApps"
          component={SearchApps}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="PhoneBase"
          component={PhoneBase}
          options={{headerShown: false}}
        />

       
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="ForgetPassword"
          component={ForgetPassword}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Profile_image"
          component={Profile_image}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Signin_signup"
          component={Signin_signup}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );

  //   function Tabb() {

  //     return (
  //       <Tab.Navigator

  //         tabBarOptions={{
  //           labelStyle: {
  //             fontSize: 10,
  //             margin: 0,
  //             padding: 0,
  //             // marginBottom:'2%',
  //             color: 'pink'
  //           },

  //         }}
  //         screenOptions={({ route }) => ({
  //           tabBarLabelStyle: {
  //             textAlign: 'center', marginBottom: '5%',
  //           },
  //           tabBarShowLabel: false,

  //           tabBarStyle: {
  //             backgroundColor: '#ffff',
  //             borderTopColor: 'white',
  //             borderTopWidth: 0.5,
  //             height: 50,
  //             // borderTopLeftRadius: 20,
  //             // borderTopRightRadius: 20,
  //           },

  //           tabBarActiveTintColor: '#FE934E',
  //           tabBarInactiveTintColor: '#9E9E9E',
  //         })}
  //       >

  //         <Tab.Screen
  //           name="Home1"
  //           component={Home}
  //           options={{

  //             tabBarIcon: ({ focused }) =>
  //               focused ? <Bb1 /> : <B1 />,
  //             headerShown: false, title: 'Edit List'
  //           }}
  //           listeners={({ }) => ({
  //             tabPress: () => {
  //               console.log('++++++++++++++++++')
  //             },
  //           })}
  //         />

  //         <Tab.Screen
  //           name="Workouts"
  //           component={Workouts}
  //           options={{

  //             // tabBarIcon: ({ focused }) => (

  //             //   <TabIcon
  //             //     focused={focused}
  //             //     source={require('./src/assets/images/bottom2.png')}
  //             //     name={"Workouts"}
  //             //   />

  //             // ),
  //             tabBarIcon: ({ focused }) =>
  //               focused ? <Bb2 /> : <B2 />,
  //             headerShown: false, title: 'Workouts '
  //           }}
  //           onPress={() => {
  //             console.log('sak')

  //           }}
  //         />

  //         <Tab.Screen
  //           name="Daily_report"
  //           component={Daily_report}
  //           options={{

  //             // tabBarIcon: ({ focused }) => (
  //             //   <TabIcon
  //             //     focused={focused}
  //             //     source={require('./src/assets/images/bottom3.png')}
  //             //     name={"Daily_report"}
  //             //   />
  //             // ),
  //             tabBarIcon: ({ focused }) =>
  //               focused ? <Bb3 /> : <B3 />,
  //             headerShown: false, title: 'Daily_report '
  //           }}
  //           onPress={() => {
  //             console.log('sak')

  //           }}
  //         />
  //         <Tab.Screen
  //           name="Settings"
  //           component={Settings}
  //           options={{

  //             // tabBarIcon: ({ focused }) => (
  //             //   <TabIcon
  //             //     focused={focused}
  //             //     source={require('./src/assets/images/bottom4.png')}
  //             //     name={"Settings"}
  //             //   />
  //             // ),
  //             tabBarIcon: ({ focused }) =>
  //               focused ? <Bb4 /> : <B4 />,
  //             headerShown: false, title: 'Settings '
  //           }}
  //           onPress={() => {
  //             console.log('sak')

  //           }}
  //         />

  //       </Tab.Navigator>
  //     );
  //   }
};
export default App;
