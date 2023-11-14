import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ScrollView,
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  LogBox,
  Animated,
  ImageBackground,
  ActivityIndicator,
  Pressable,
  StatusBar,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {appImages} from '../../../assets/utilities/index';
import {Button, Divider, TextInput} from 'react-native-paper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Gemail from '../../../assets/svg/gemail.svg';
import Oemail from '../../../assets/svg/oemail.svg';

import Glock from '../../../assets/svg/glock.svg';
import Olock from '../../../assets/svg/olock.svg';

import Ouser from '../../../assets/svg/ouser.svg';
import Guser from '../../../assets/svg/guser.svg';

import CustomButton from '../../../assets/Custom/Custom_Button';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SwitchSelector from 'react-native-switch-selector';
import styles from './styles';
LogBox.ignoreAllLogs();

const App = ({navigation}) => {
  const isFocused = useIsFocused();
  const [check, setcheck] = useState(0);
  useEffect(() => {}, [isFocused]);

  const options = [
    {label: 'Sign In', value: 0},
    {label: 'Sign Up', value: 1},
  ];

  const [signin_email, setsignin_email] = useState('');
  const [signin_pass, setsignin_pass] = useState('');
  const [signin_ShowPassword, setsignin_ShowPassword] = useState(true);
  const [signin_ShowPassword1, setsignin_ShowPassword1] = useState(true);
  const [signin_ShowPassword2, setsignin_ShowPassword2] = useState(true);

  const [username, setusername] = useState('');
  const [signup_email, setsignup_email] = useState('');
  const [signup_pass, setsignup_pass] = useState('');
  const [signup_cpass, setsignup_cpass] = useState('');

  const [isTextInputActive, setIsTextInputActive] = useState(false);
  const [isTextInputActive1, setIsTextInputActive1] = useState(false);
  const [isTextInputActive2, setIsTextInputActive2] = useState(false);
  const [isTextInputActive3, setIsTextInputActive3] = useState(false);
  const [isTextInputActive4, setIsTextInputActive4] = useState(false);
  const [isTextInputActive5, setIsTextInputActive5] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [emailSignInError, setEmailSignInError] = useState(false);

  const [passwordSignInError, setPasswordSignInError] = useState(false);

  const [signUpUserNameError, setSignUpUserNameError] = useState(false);

  const [signUpEmailError, setSignUpEmailError] = useState(false);

  const [signUpPasswordError, setSignUpPasswordError] = useState(false);

  const [emailNotCorrect, setemailNotCorrect] = useState(false);

  const [emailNotCorrectSignUp, setemailNotCorrectSignUp] = useState(false);

  const [signUpConfirmPasswordError, setSignUpConfirmPasswordError] =
    useState(false);

  const handleFocus = () => {
    setIsTextInputActive(true);
  };

  const goToScreen2 = () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    console.log('Sign Up');

    setSignUpUserNameError(false);
    setSignUpEmailError(false);
    setSignUpPasswordError(false);
    setSignUpConfirmPasswordError(false);

    if (
      username === '' &&
      signup_email === '' &&
      signup_pass === '' &&
      signup_cpass === ''
    ) {
      setSignUpUserNameError(true);
      setSignUpEmailError(true);
      setSignUpPasswordError(true);
      setSignUpConfirmPasswordError(true);
    } else if (
      username !== '' &&
      signup_email == '' &&
      signup_pass === '' &&
      signup_cpass === ''
    ) {
      console.log('user name not present');

      setSignUpUserNameError(false);
      setSignUpEmailError(true);
      setSignUpPasswordError(true);
      setSignUpConfirmPasswordError(true);
    } else if (
      username !== '' &&
      signup_email !== '' &&
      signup_pass === '' &&
      signup_cpass === ''
    ) {
      console.log('user name not present');

      setSignUpUserNameError(false);
      setSignUpEmailError(false);
      setSignUpPasswordError(true);
      setSignUpConfirmPasswordError(true);
    } else if (
      username !== '' &&
      signup_email !== '' &&
      signup_pass !== '' &&
      signup_cpass === ''
    ) {
      console.log('user name not present');

      setSignUpUserNameError(false);
      setSignUpEmailError(false);
      setSignUpPasswordError(false);
      setSignUpConfirmPasswordError(true);
    } else if (
      username === '' &&
      signup_email === '' &&
      signup_pass === '' &&
      signup_cpass !== ''
    ) {
      console.log('user name not present');

      setSignUpUserNameError(true);
      setSignUpEmailError(true);
      setSignUpPasswordError(true);
      setSignUpConfirmPasswordError(false);
    } else if (
      username !== '' &&
      signup_email === '' &&
      signup_pass !== '' &&
      signup_cpass !== ''
    ) {
      console.log('user name not present');

      setSignUpUserNameError(false);
      setSignUpEmailError(true);
      setSignUpPasswordError(false);
      setSignUpConfirmPasswordError(false);
    } else if (!emailRegex.test(signup_email)) {
      //setEmailSnackBarVisible(true);
      setemailNotCorrectSignUp(true);
      //console.log("Email Not Correct", emailNotCorrect)
    }
    // else if (username !== '' && signup_email === '' &&
    // signup_pass === '' &&
    // signup_cpass === '') {
    //    setSignUpEmailError(true);
    // } else if (signup_pass==='') {
    //   setSignUpPasswordError(true);
    // } else if (signup_cpass === '') {
    //   setSignUpConfirmPasswordError(true);
    // }
    else {
      handleSignup()
      //navigation.navigate('Profile_image');
      //   setIsLoading(true);
      //   setTimeout(() => {

      //     // setIsLoading(false);

      //     // Replace 'YourTargetScreen' with the screen you want to navigate to
      //   }, 2000);
    }

    /* setTimeout(() => {
      navigation.navigate('BottomTabNavigation');

      setIsLoading(false);

      // Replace 'YourTargetScreen' with the screen you want to navigate to
    }, 2000); // Adjust the loading duration as needed */
  };

  const goTOScreen = () => {
    console.log('clicked');

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    setEmailSignInError(false);
    setPasswordSignInError(false);
    setSignUpUserNameError(false);
    setSignUpEmailError(false);
    setSignUpPasswordError(false);
    setSignUpConfirmPasswordError(false);

    if (signin_email === '' && signin_pass === '') {
      setEmailSignInError(true);
      setPasswordSignInError(true);
    } else if (signin_email === '') {
      setEmailSignInError(true);
    } else if (signin_pass === '') {
      setPasswordSignInError(true);
    } else if (!emailRegex.test(signin_email)) {
      //setEmailSnackBarVisible(true);
      setemailNotCorrect(true);
      //console.log("Email Not Correct", emailNotCorrect)
    } else {
      setIsLoading(true);
      setTimeout(() => {

        handleSignIn()
        //setIsLoading(false);

        // Replace 'YourTargetScreen' with the screen you want to navigate to
      }, 2000);
    }

    /* setTimeout(() => {
      navigation.navigate('BottomTabNavigation');

      setIsLoading(false);

      // Replace 'YourTargetScreen' with the screen you want to navigate to
    }, 2000); // Adjust the loading duration as needed */
  };

  const handleBlur = () => {
    setIsTextInputActive(false);
  };
  const handleFocus1 = () => {
    setIsTextInputActive1(true);
  };

  const handleBlur1 = () => {
    setIsTextInputActive1(false);
  };
  const handleFocus2 = () => {
    setIsTextInputActive2(true);
  };

  const handleBlur2 = () => {
    setIsTextInputActive2(false);
  };
  const handleFocus3 = () => {
    setIsTextInputActive3(true);
  };

  const handleBlur3 = () => {
    setIsTextInputActive3(false);
  };
  const handleFocus4 = () => {
    setIsTextInputActive4(true);
  };

  const handleBlur4 = () => {
    setIsTextInputActive4(false);
  };
  const handleFocus5 = () => {
    setIsTextInputActive5(true);
  };

  const handleBlur5 = () => {
    setIsTextInputActive5(false);
  };

  const handleTogglePasswordVisibility = () => {
    setsignin_ShowPassword(!signin_ShowPassword);
  };
  const handleTogglePasswordVisibility1 = () => {
    setsignin_ShowPassword1(!signin_ShowPassword1);
  };
  const handleTogglePasswordVisibility2 = () => {
    setsignin_ShowPassword2(!signin_ShowPassword2);
  };

  const signupEndpoint =
    'https://watch-gotcha-be.mtechub.com/user/register'; // Replace with your actual API endpoint

  const handleSignup = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(signupEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: signup_email,
          username: username,
          password: signup_pass,
          confirmPassword: signup_cpass,
          role: 'user',
        }),
      });

      const data = await response.json();

      console.log('error data', data.newUser.role);

      if (data.newUser.role==='user') {

        setIsLoading(false)
        // Assuming there's at least one result
        const firstResult = data.newUser;
        console.log('id', firstResult.id);
        console.log('email', firstResult.email);
        console.log('username', firstResult.username);

         AsyncStorage.setItem('email', firstResult.email.toString(), () => {
          console.log('user email saved successfully');
        });

        AsyncStorage.setItem(
          'userName',
          firstResult.username.toString(),
          () => {
            console.log('user name saved successfully');
          },
        );

        AsyncStorage.setItem('userId ', firstResult.id.toString(), () => {
          console.log('user id saved successfully of signup');
        });
      } else {
        setIsLoading(false)
        console.error('No results found.', data.response.result);
      }

      setIsLoading(false);

      // Reset the input fields
      setsignup_email('');
      setsignup_pass('');
      setsignup_cpass('');
      setusername('');

      //navigation.navigate("Profile_image");

      navigation.navigate("BottomTabNavigation")

      // navigation.navigate('SelectGender');
    } catch (error) {
      console.error('Error is on sign up:', error);
      //showAlert();
      setIsLoading(false);
    }
  };
   
  const signInEndpoint =
    'https://watch-gotcha-be.mtechub.com/user/login'; // Replace with your actual API endpoint

  const handleSignIn = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(signInEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: signin_email,
          password: signin_pass,
          role: 'user',
        }),
      });

      const data = await response.json();

      console.log('error data sign in', data);

      if (data.statusCode===200) {

        setIsLoading(false)
        // Assuming there's at least one result
        const firstResult = data.user;
        console.log('id', firstResult.id);
        console.log('email', firstResult.email);
        console.log('username', firstResult.username);

         AsyncStorage.setItem('email', firstResult.email.toString(), () => {
          console.log('user email saved successfully');
        });

        AsyncStorage.setItem(
          'userName',
          firstResult.username.toString(),
          () => {
            console.log('user name saved successfully');
          },
        );

        AsyncStorage.setItem('userId ', firstResult.id.toString(), () => {
          console.log('user id saved successfully of sign in');
        });

        AsyncStorage.setItem('email ', firstResult.email.toString(), () => {
          console.log('user email saved successfully of sign in');

        });

        navigation.navigate('BottomTabNavigation');

      } else {
        setIsLoading(false)
        console.error('No results found.', data.response.result);
      }

      setIsLoading(false);

      // Reset the input fields
      setsignin_email('');
      setsignin_pass('');

      
      // navigation.navigate('SelectGender');
    } catch (error) {
      //console.error('Error:');
      //showAlert();
      setIsLoading(false);
    }
  };

  const skipforNow=()=>{
    setIsLoading(true)

       setTimeout(() => {

          setIsLoading(false);
        
          navigation.navigate("BottomTabNavigation")

    }, 2000);
  }


  return (
    <ScrollView style={styles.bg} contentContainerStyle={{flexGrow: 1}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#FACA4E'} />
      <View style={styles.mainv}>
        <Image
          source={appImages.logo}
          style={{width: 280, height: 80, marginTop: '5%'}}
          resizeMode="contain"
        />

        <SwitchSelector
          options={options}
          initial={0}
          hasPadding
          textColor={'#232323'}
          textStyle={{
            fontSize: 14,
            fontWeight: 'bold',
          }}
          buttonStyle={{
            height: 120, // Adjust the height of the switch button as needed
            borderRadius: 20, // Match the borderRadius with the container's borderRadius
          }}
          style={{
            marginTop: '8%',
            width: '90%',
            borderRadius: 20,
            fontWeight: 'bold',
          }} // Adjust the height value as needed
          selectedColor={'#333333'}
          buttonColor={'#FFFFFF'}
          backgroundColor={'#FACA4E'}
          borderColor={'#EEF1F6'}
          bold={true}
          height={50}
          valuePadding={5}
          onPress={value => {
            setcheck(value);
          }}
        />
        {check == 0 ? (
          <Text
            style={{
              color: '#9597A6',
              fontSize: wp(4),
              marginVertical: '5%',
              fontFamily: 'Inter-Medium',
            }}>
            Please sign in to access your account.
          </Text>
        ) : (
          <Text
            style={{
              color: '#9597A6',
              fontSize: wp(4),
              marginVertical: '5%',
              fontFamily: 'Inter-Medium',
            }}>
            Let's begin by creating your account.
          </Text>
        )}

        {check == 0 ? (
          <View style={styles.v1}>
            <TextInput
              mode="outlined"
              label="Email Address"
              onChangeText={text => setsignin_email(text)}
              style={styles.ti}
              outlineColor="#0000001F"
              placeholderTextColor={'#646464'}
              activeOutlineColor="#FACA4E"
              autoCapitalize="none"
              onFocus={handleFocus}
              onBlur={handleBlur}
              left={
                <TextInput.Icon
                  icon={() => (
                    <MaterialCommunityIcons
                      name={'email-outline'}
                      size={23}
                      color={
                        isTextInputActive == true ? '#FACA4E' : '#64646485'
                      }
                    />
                  )}
                />
              }
              // left={isTextInputActive ? <Oemail /> : <Gemail />}
            />
            {emailSignInError === true ? (
              <Text
                style={{
                  color: 'red',
                  marginLeft: widthPercentageToDP(10),
                  marginTop: heightPercentageToDP(1.8),
                  fontSize: heightPercentageToDP(1.8),
                }}>
                Please Enter Your Email!
              </Text>
            ) : null}

            {emailNotCorrect === true ? (
              <Text
                style={{
                  color: 'red',
                  marginLeft: widthPercentageToDP(10),
                  marginTop: heightPercentageToDP(1.8),
                  fontSize: heightPercentageToDP(1.8),
                }}>
                Please Enter Correct Email!
              </Text>
            ) : null}

            <View>
              <TextInput
                mode="outlined"
                label="Password"
                onChangeText={text => setsignin_pass(text)}
                style={styles.ti}
                placeholderTextColor={'#646464'}
                outlineColor="#0000001F"
                activeOutlineColor="#FACA4E"
                secureTextEntry={signin_ShowPassword}
                onFocus={handleFocus1}
                onBlur={handleBlur1}
                left={
                  <TextInput.Icon
                    icon={() => (
                      <MaterialCommunityIcons
                        name={'lock-outline'}
                        size={23}
                        color={
                          isTextInputActive1 == true ? '#FACA4E' : '#64646485'
                        }
                      />
                    )}
                  />
                }
              />
              <TouchableOpacity
                onPress={handleTogglePasswordVisibility}
                style={[
                  styles.hs,
                  {
                    borderColor: signin_ShowPassword ? '#646464' : '#FACA4E',
                    backgroundColor: signin_ShowPassword
                      ? '#64646412'
                      : '#FF660012',
                  },
                ]}>
                <Text
                  style={[
                    styles.txt,
                    {color: signin_ShowPassword ? '#646464' : '#FACA4E'},
                  ]}>
                  {signin_ShowPassword ? 'Show' : 'Hide'}
                </Text>
              </TouchableOpacity>
            </View>

            {passwordSignInError === true ? (
              <Text
                style={{
                  color: 'red',
                  marginLeft: widthPercentageToDP(10),
                  marginTop: heightPercentageToDP(1.8),
                  fontSize: heightPercentageToDP(1.8),
                }}>
                Please Enter Your Password!
              </Text>
            ) : null}

            <TouchableOpacity
              onPress={() => navigation.navigate('ForgetPassword')}>
              <Text
                style={{
                  color: '#FACA4E',
                  fontSize: wp(4),
                  fontFamily: 'Inter-Bold',
                  marginRight: '5%',
                  alignSelf: 'flex-end',
                  marginTop: '10%',
                }}>
                Forgot Password?
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => skipforNow() }>
              <Text
                style={{
                  color: '#FACA4E',
                  fontSize: wp(4),
                  textDecorationLine:'underline',
                  fontFamily: 'Inter-Bold',
                  marginRight: '5%',
                  alignSelf: 'center',
                  marginTop: '3%',
                }}>
                 Skip For Now
              </Text>
            </TouchableOpacity>

            <View style={{marginTop: '25%', alignSelf: 'center'}}>
              <CustomButton
                title="Sign In"
                load={false}
                // checkdisable={inn == '' && cm == '' ? true : false}
                customClick={() => {
                  goTOScreen();

                  //navigation.navigate('BottomTabNavigation')
                }}
              />
            </View>
          </View>
        ) : (
          <View style={styles.v1}>
            <TextInput
              mode="outlined"
              label="Username"
              onChangeText={text => setusername(text)}
              value={username}
              style={styles.ti}
              outlineColor="#0000001F"
              placeholderTextColor={'#646464'}
              activeOutlineColor="#FACA4E"
              autoCapitalize="none"
              onFocus={handleFocus2}
              onBlur={handleBlur2}
              left={
                <TextInput.Icon
                  icon={() => (
                    <MaterialCommunityIcons
                      name={'account-outline'}
                      size={23}
                      color={
                        isTextInputActive2 == true ? '#FACA4E' : '#64646485'
                      }
                    />
                  )}
                />
              }
            />

            {signUpUserNameError === true ? (
              <Text
                style={{
                  color: 'red',
                  marginLeft: widthPercentageToDP(10),
                  marginTop: heightPercentageToDP(1.8),
                  fontSize: heightPercentageToDP(1.8),
                }}>
                Please Enter Your User name!
              </Text>
            ) : null}

            <TextInput
              mode="outlined"
              label="Email Address"
              onChangeText={text => setsignup_email(text)}
              style={styles.ti}
              outlineColor="#0000001F"
              placeholderTextColor={'#646464'}
              activeOutlineColor="#FACA4E"
              autoCapitalize="none"
              onFocus={handleFocus3}
              onBlur={handleBlur3}
              left={
                <TextInput.Icon
                  icon={() => (
                    <MaterialCommunityIcons
                      name={'email-outline'}
                      size={23}
                      color={
                        isTextInputActive3 == true ? '#FACA4E' : '#64646485'
                      }
                    />
                  )}
                />
              }
              // left={isTextInputActive ? <Oemail /> : <Gemail />}
            />

            {signUpEmailError === true ? (
              <Text
                style={{
                  color: 'red',
                  marginLeft: widthPercentageToDP(10),
                  marginTop: heightPercentageToDP(1.8),
                  fontSize: heightPercentageToDP(1.8),
                }}>
                Please Enter Your Email Address!
              </Text>
            ) : null}

            {emailNotCorrectSignUp === true ? (
              <Text
                style={{
                  color: 'red',
                  marginLeft: widthPercentageToDP(10),
                  marginTop: heightPercentageToDP(1.8),
                  fontSize: heightPercentageToDP(1.8),
                }}>
                Please Enter Correct Email!
              </Text>
            ) : null}

            <View>
              <TextInput
                mode="outlined"
                label="Password"
                onChangeText={text => setsignup_pass(text)}
                style={styles.ti}
                placeholderTextColor={'#646464'}
                outlineColor="#0000001F"
                activeOutlineColor="#FACA4E"
                secureTextEntry={signin_ShowPassword1}
                onFocus={handleFocus4}
                onBlur={handleBlur4}
                left={
                  <TextInput.Icon
                    icon={() => (
                      <MaterialCommunityIcons
                        name={'lock-outline'}
                        size={23}
                        color={
                          isTextInputActive4 == true ? '#FACA4E' : '#64646485'
                        }
                      />
                    )}
                  />
                }
              />

              {signUpPasswordError === true ? (
                <Text
                  style={{
                    color: 'red',
                    marginLeft: widthPercentageToDP(10),
                    marginTop: heightPercentageToDP(1.8),
                    fontSize: heightPercentageToDP(1.8),
                  }}>
                  Please Enter Your Password
                </Text>
              ) : null}

              <TouchableOpacity
                onPress={handleTogglePasswordVisibility1}
                style={[
                  styles.hs,
                  {
                    borderColor: signin_ShowPassword1 ? '#646464' : '#FACA4E',
                    backgroundColor: signin_ShowPassword1
                      ? '#64646412'
                      : '#FF660012',
                  },
                ]}>
                <Text
                  style={[
                    styles.txt,
                    {color: signin_ShowPassword1 ? '#646464' : '#FACA4E'},
                  ]}>
                  {signin_ShowPassword1 ? 'Show' : 'Hide'}
                </Text>
              </TouchableOpacity>
            </View>

            <View>
              <TextInput
                mode="outlined"
                label="Confirm Password"
                onChangeText={text => setsignup_cpass(text)}
                style={styles.ti}
                placeholderTextColor={'#646464'}
                outlineColor="#0000001F"
                activeOutlineColor="#FACA4E"
                secureTextEntry={signin_ShowPassword2}
                onFocus={handleFocus5}
                onBlur={handleBlur5}
                left={
                  <TextInput.Icon
                    icon={() => (
                      <MaterialCommunityIcons
                        name={'lock-outline'}
                        size={23}
                        color={
                          isTextInputActive5 == true ? '#FACA4E' : '#64646485'
                        }
                      />
                    )}
                  />
                }
              />
              <TouchableOpacity
                onPress={handleTogglePasswordVisibility2}
                style={[
                  styles.hs,
                  {
                    borderColor: signin_ShowPassword2 ? '#646464' : '#FACA4E',
                    backgroundColor: signin_ShowPassword2
                      ? '#64646412'
                      : '#FF660012',
                  },
                ]}>
                <Text
                  style={[
                    styles.txt,
                    {color: signin_ShowPassword2 ? '#646464' : '#FACA4E'},
                  ]}>
                  {signin_ShowPassword2 ? 'Show' : 'Hide'}
                </Text>
              </TouchableOpacity>

              {signUpConfirmPasswordError === true ? (
                <Text
                  style={{
                    color: 'red',
                    marginLeft: widthPercentageToDP(10),
                    marginTop: heightPercentageToDP(1.8),
                    fontSize: heightPercentageToDP(1.8),
                  }}>
                  Please Enter Your Confirm Password
                </Text>
              ) : null}
            </View>

            <View style={{marginTop: '25%', alignSelf: 'center'}}>
              <CustomButton
                title="Sign Up"
                load={false}
                // checkdisable={inn == '' && cm == '' ? true : false}
                customClick={() => {
                  goToScreen2();
                }}
              />
            </View>
          </View>
        )}
      </View>

      {isLoading && (
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
          <ActivityIndicator size="large" color="#FACA4E" />
        </View>
      )}
    </ScrollView>
  );
};

export default App;
