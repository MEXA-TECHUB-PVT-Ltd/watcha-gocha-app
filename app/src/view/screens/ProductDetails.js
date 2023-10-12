import {
  StyleSheet,
  FlatList,
  Text,
  ScrollView,
  StatusBar,
  Image,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import Back from '../../assets/svg/back.svg';
import {appImages} from '../../assets/utilities/index';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomButton from '../../assets/Custom/Custom_Button';

import Fontiso from 'react-native-vector-icons/Fontisto';
import Location from '../../assets/svg/Location.svg';
import SendMessage from '../../assets/svg/Message.svg';
import SendMail from '../../assets/svg/SendMail.svg';
import BellAlert from '../../assets/svg/BellAlert.svg';
import BookMark from '../../assets/svg/BookMark.svg';
import Share from '../../assets/svg/ShareGold.svg';

import RBSheet from 'react-native-raw-bottom-sheet';

import Ionicons from 'react-native-vector-icons/Ionicons';

import Headers from '../../assets/Custom/Headers';

import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';

import HeaderImageSlider from '../../assets/Custom/HeaderImageSlider';

import CustomSnackbar from '../../assets/Custom/CustomSnackBar';

import Shares from 'react-native-share';

export default function ProductDetails({navigation}) {
  const [imageUri, setImageUri] = useState(null);
  const [selectedValueListView, setSelectedValueListView] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarVisibleAlert, setSnackbarVisibleAlert] = useState(false);
  const [snackbarVisibleSaved, setSnackbarVisibleSaved] = useState(false);
  
  const ref_RBSendOffer = useRef(null);
  const ref_RBSendOffer2 = useRef(null);

  const details = [
    {id: 1, title: 'Lense', image: appImages.lense},
    {id: 2, title: 'Holder', image: appImages.holder},
    {id: 3, title: 'HeadPhone', image: appImages.headPhone},
    {id: 4, title: 'Shoes', image: appImages.shoes},
    {id: 5, title: 'Printer', image: appImages.printer},
    //{id: 10, title: 'Printer', image: appImages.printer},
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

  const shareViaWhatsApp = async () => {
    const shareOptions = {
      title: 'Share via',
      message: 'Hey! Check out this cool app!',
      url: 'https://play.google.com/store/apps/details?id=your.app.package',
      //social: Share.Social,
    };

    try {
      await Shares.open(shareOptions);
    } catch (error) {
      console.error('Error sharing via WhatsApp:', error.message);
    }
  };


  const renderAvailableApps = item => {
    console.log('Items', item);
    return (
      <View
        style={{
          //height: hp(18),
          //width:'100%',
          flex: 1,
          //borderRadius: wp(3),
          //margin: 5,
        }}>
        <Image
          style={{
            // flex: 1,
            resizeMode: 'contain',
          }}
          source={item.image}
        />
      </View>
    );
  };

  const renderDot = (index, currentIndex) => {
    const dotWidth = index === currentIndex ? 12 : 6; // Adjust the dot width as needed

    return <View key={index} style={[styles.dot, {width: dotWidth}]} />;
  };

  const radioButtonsGridView = [
    {label: '$ 400', value: '400'},
    {label: '$ 390', value: '390'},
    {label: '$ 380', value: '380'},
  ];

  const onPressChangeView = async item => {
    //console.log("first",item)
    setSelectedValueListView(item);
    //await AsyncStorage.setItem('distance', token);
    ref_RBSendOffer.current.close();
  };

  const dismissSnackbar = () => {
    setSnackbarVisible(true);
  };

  const changeModal = () => {
    ref_RBSendOffer.current.close();
    ref_RBSendOffer2.current.open();
  };


  const handleUpdatePassword = async () => {
    // Perform the password update logic here
    // For example, you can make an API request to update the password

    // Assuming the update was successful
    setSnackbarVisible(true);

    // Automatically hide the Snackbar after 3 seconds
    setTimeout(() => {
      setSnackbarVisible(false);
    }, 3000);
  };

  const handleUpdateAlert = async () => {
    // Perform the password update logic here
    // For example, you can make an API request to update the password

    // Assuming the update was successful
    setSnackbarVisibleAlert(true);

    // Automatically hide the Snackbar after 3 seconds
    setTimeout(() => {
      setSnackbarVisibleAlert(false);
    }, 3000);
  };

  const handleUpdateSaved = async () => {
    // Perform the password update logic here
    // For example, you can make an API request to update the password

    // Assuming the update was successful
    setSnackbarVisibleSaved(true);

    // Automatically hide the Snackbar after 3 seconds
    setTimeout(() => {
      setSnackbarVisibleSaved(false);
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content" // You can set the StatusBar text color to dark or light
      />
      <View style={{marginTop: hp(5)}}>
        <Headers
          showBackIcon={true}
          onPress={() => navigation.goBack()}
          showText={true}
          text={'Item Details'}
        />
      </View>

      <ScrollView style={{flex:1}}>


      <View style={{height: hp(25), marginTop: hp(5)}}>
        <HeaderImageSlider
          data={details}
          paginationStyleItemActiveStyle={{
            width: 18,
            height: 7,
            borderRadius: 7 / 2,
          }}
          paginationStyleItemInactive={{
            backgroundColor: '#D4D4D4',
            borderWidth: 0,
          }}
        />

        {/* <SwiperFlatList
      autoplay
      autoplayDelay={2}
      autoplayLoop
      index={2}
      showPagination
      data={availableApps}
      renderItem={renderAvailableApps}
    /> */}

        {/* <SwiperFlatList
      data={availableApps}
      autoplay
      autoplayDelay={2}
      autoplayLoop
      index={2}
      showPagination
      renderItem={renderAvailableApps}
      renderAll={false}
      paginationStyleItem={styles.paginationStyle}
      paginationActiveDotColor={'blue'} // Change this to your active dot color
      paginationDefaultColor={'gray'} // Change this to your default dot color
      renderPagination={({ index, currentIndex }) => renderDot(index, currentIndex)}
    /> */}
      </View>

      <View
        style={{
          flex: 1,
          marginTop: hp(19),
          marginHorizontal: wp(8),
        }}>
        <Text
          style={{
            color: '#595959',
            fontFamily: 'Inter',
            fontWeight: '800',
            fontSize: hp(2.4),
          }}>
          Classic Lens
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: '#77838F',
              marginTop: hp(1.3),
              fontFamily: 'Inter',
              fontWeight: '400',
              fontSize: hp(2),
            }}>
            Item
          </Text>

          <Text
            style={{
              color: '#77838F',
              marginTop: hp(1.3),
              fontFamily: 'Inter',
              fontWeight: '400',
              fontSize: hp(2),
            }}>
            $ 456
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: hp(1.8),
            height: hp(5),
          }}>
          <Location width={15} height={15} />

          <Text
            style={{
              color: '#77838F',
              fontFamily: 'Inter',
              marginLeft: wp(3),
              fontWeight: '400',
              fontSize: hp(2),
            }}>
            123 Main Street Cityville, USA
          </Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{marginTop: hp(3), height: hp(23)}}>
          <Text
            style={{
              color: '#77838F',
              fontFamily: 'Inter',
              textAlign: 'justify',
              lineHeight: hp(2.7),
              //fontWeight: '400',
              fontSize: hp(1.8),
            }}>
            Our Classic Lens offers a timeless touch to your photography.
            Crafted with precision and a nod to vintage aesthetics, this lens is
            perfect for capturing moments with a hint of nostalgia. Whether
            you're shooting portraits, landscapes, or street photography, the
            Classic Lens delivers stunning results with its soft focus and
            beautiful bokeh.
          </Text>
        </ScrollView>

        <View
          style={{
            flexDirection: 'row',
            height: hp(8),
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', width: wp(60)}}>
            <TouchableOpacity style={styles.circleBox}>
              {imageUri == null ? (
                <Image
                  style={{
                    flex: 1,
                    width: '100%',
                    height: '100%',
                    borderRadius: wp(12) / 2, // Half of the width (25/2)
                    resizeMode: 'contain',
                  }}
                  source={appImages.profileImg}
                />
              ) : (
                <Image
                  style={{
                    flex: 1,
                    width: '100%',
                    height: '100%',
                    borderRadius: wp(12) / 2, // Half of the width (25/2)
                    resizeMode: 'contain',
                  }}
                  source={{uri: imageUri}}
                />
              )}
            </TouchableOpacity>

            <View>
              <Text
                style={{
                  color: '#FACA4E',
                  fontFamily: 'Inter',
                  marginLeft: wp(3),
                  fontWeight: '400',
                  fontSize: hp(2),
                }}>
                John Doe
              </Text>

              <Text
                style={{
                  color: '#77838F',
                  fontFamily: 'Inter',
                  marginLeft: wp(3),
                  fontSize: hp(2),
                }}>
                johndoe@gmail.com
              </Text>
            </View>
          </View>

          <TouchableOpacity onPress={()=>navigation.navigate("ChatScreen")}>

          <SendMessage width={39} height={39} />

          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',

            height: hp(8),
          }}>
          <TouchableOpacity
            onPress={() => ref_RBSendOffer.current.open()}
            style={{
              width: wp(21),
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <SendMail />

            <Text
              style={{
                color: '#4C4C4C',
                fontFamily: 'Inter',
                fontWeight: 'bold',
                fontSize: hp(1.8),
              }}>
              Send Offer
            </Text>
          </TouchableOpacity>

          <View
            style={{
              width: wp(21),
              height: hp(7.5),
              //borderWidth:3,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <TouchableOpacity onPress={()=>handleUpdateAlert()}>

            <BellAlert style={{marginTop: hp(1)}} width={21} height={21} />

              </TouchableOpacity>

            <Text
              style={{
                color: '#4C4C4C',
                fontFamily: 'Inter',
                fontWeight: 'bold',
                fontSize: hp(1.8),
              }}>
              Alert
            </Text>
          </View>

          <View
            style={{
              width: wp(21),
              alignItems: 'center',
              height: hp(7.5),
              justifyContent: 'space-between',
            }}>
              <TouchableOpacity onPress={()=>handleUpdateSaved()}>

            <BookMark style={{marginTop: hp(1)}} width={21} height={21} />
              </TouchableOpacity>

            <Text
              style={{
                color: '#4C4C4C',
                fontFamily: 'Inter',
                fontWeight: 'bold',
                fontSize: hp(1.8),
              }}>
              Book Mark
            </Text>
          </View>

          <View
            style={{
              width: wp(21),
              alignItems: 'center',
              height: hp(7.5),
              justifyContent: 'space-between',
            }}>

              <TouchableOpacity onPress={()=>shareViaWhatsApp()}>

            <Share style={{marginTop: hp(1)}} width={18} height={18} />

              </TouchableOpacity>

            <Text
              style={{
                color: '#4C4C4C',
                fontFamily: 'Inter',
                fontWeight: 'bold',

                fontSize: hp(1.8),
              }}>
              Share
            </Text>
          </View>
        </View>
      </View>

      </ScrollView>


      <RBSheet
        ref={ref_RBSendOffer}
        closeOnDragDown={true}
        closeOnPressMask={false}
        animationType="fade"
        minClosingHeight={0}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(52, 52, 52, 0.5)',
          },
          draggableIcon: {
            backgroundColor: 'white',
          },
          container: {
            borderTopLeftRadius: wp(10),
            borderTopRightRadius: wp(10),
            height: hp(55),
          },
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: wp(8),
            alignItems: 'center',
          }}>
          <Text style={styles.maintext}>Send Offer</Text>
          <TouchableOpacity onPress={() => ref_RBSendOffer.current.close()}>
            <Ionicons
              name="close"
              size={22}
              color={'#303030'}
              onPress={() => ref_RBSendOffer.current.close()}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            height: hp(14),
            alignItems: 'center',
            marginTop: hp(3),
            marginHorizontal: wp(8),
            //borderWidth: 3,
          }}>
          <View
            style={{
              // height: hp(10),
              //flex: 1,
              height: hp(12),
              marginLeft: wp(5),
              //borderWidth:3,
              width: wp(21),
              borderRadius: wp(3),
              // margin: 5,
            }}>
            <Image
              style={{
                // position: 'absolute',
                // top: 0,
                // left: 0,
                //zIndex: 1, // Ensure it's on top of other elements
                //flex: 1,
                width: '100%',
                height: '100%',
                //height:hp(15),
                // width:wp(15),
                borderRadius: wp(3),
                resizeMode: 'contain',
              }}
              source={appImages.lense}
            />
          </View>

          <View
            style={{
              height: hp(10),
              marginLeft: wp(2.1),
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: '#333333',
                fontFamily: 'Inter',
                fontWeight: 'bold',

                fontSize: hp(2),
              }}>
              Item Name
            </Text>

            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  color: '#FACA4E',
                  fontFamily: 'Inter',
                  fontWeight: '500',

                  fontSize: hp(2),
                }}>
                $ 456
              </Text>
            </View>

            <View style={{flexDirection: 'row', marginLeft: wp(-1.7)}}>
              <Location width={18} height={18} />
              <Text
                style={{
                  color: '#77838F',
                  fontFamily: 'Inter',
                  fontWeight: '300',

                  fontSize: hp(1.7),
                }}>
                123 Main Street Cityville, USA
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            height: hp(15),
            //flexDirection: 'row', // Arrange items horizontally
            justifyContent: 'space-between', // Space between items
            //alignItems: 'center', // Center items vertically
            //borderWidth: 3,
            marginHorizontal: wp(8),
            //paddingHorizontal: 10, // Add horizontal padding
          }}>
          {radioButtonsGridView.map((button, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <RadioButtonLabel
                obj={button}
                index={index}
                onPress={() => onPressChangeView(button.value)}
                labelHorizontal={true}
                labelStyle={{
                  fontSize: hp(1.8),
                  fontFamily: 'Inter',
                  fontWeight: 'bold',
                  color: '#333333',
                  //marginRight: 10, // Add margin between label and button
                }}
                labelWrapStyle={
                  {
                    //marginBottom: hp(2),
                  }
                }
              />
              <RadioButtonInput
                obj={button}
                index={index}
                isSelected={selectedValueListView === button.value}
                onPress={() => onPressChangeView(button.value)}
                borderWidth={1}
                buttonInnerColor={
                  selectedValueListView === button.value
                    ? '#FACA4E'
                    : '#00000017'
                }
                buttonOuterColor={
                  selectedValueListView === button.value
                    ? '#FACA4E'
                    : '#00000017'
                }
                buttonSize={15}
                buttonOuterSize={20}
                //buttonStyle={{ marginTop: hp(3) }}
              />
            </View>
          ))}
        </View>

        <TouchableOpacity
        onPress={()=>changeModal()}
          style={{
            height: hp(5),
            marginTop: hp(1.9),
            marginHorizontal: wp(8),
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: '#333333',
              fontFamily: 'Inter',
              fontWeight: 'bold',

              fontSize: hp(1.8),
            }}>
            Offer a different amount
          </Text>
        </TouchableOpacity>

        <View
          style={{
            marginTop: hp(2.1),
            marginBottom: hp(5),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CustomButton
            title={'Send Offer'}
            load={false}
            // checkdisable={inn == '' && cm == '' ? true : false}
            customClick={() => {
              ref_RBSendOffer.current.close();
              handleUpdatePassword();
              //navigation.navigate('Profile_image');
            }}
          />
        </View>
      </RBSheet>

      <RBSheet
        ref={ref_RBSendOffer2}
        closeOnDragDown={true}
        closeOnPressMask={false}
        animationType="fade"
        minClosingHeight={0}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(52, 52, 52, 0.5)',
          },
          draggableIcon: {
            backgroundColor: 'white',
          },
          container: {
            borderTopLeftRadius: wp(10),
            borderTopRightRadius: wp(10),
            height: hp(48),
          },
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: wp(8),
            alignItems: 'center',
          }}>
          <Text style={styles.maintext}>Send Offer</Text>
          <TouchableOpacity onPress={() => ref_RBSendOffer2.current.close()}>
            <Ionicons
              name="close"
              size={22}
              color={'#303030'}
              onPress={() => ref_RBSendOffer2.current.close()}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            height: hp(14),
            alignItems: 'center',
            marginTop: hp(3),
            marginHorizontal: wp(8),
            //borderWidth: 3,
          }}>
          <View
            style={{
              // height: hp(10),
              //flex: 1,
              height: hp(12),
              marginLeft: wp(5),
              //borderWidth:3,
              width: wp(21),
              borderRadius: wp(3),
              // margin: 5,
            }}>
            <Image
              style={{
                // position: 'absolute',
                // top: 0,
                // left: 0,
                //zIndex: 1, // Ensure it's on top of other elements
                //flex: 1,
                width: '100%',
                height: '100%',
                //height:hp(15),
                // width:wp(15),
                borderRadius: wp(3),
                resizeMode: 'contain',
              }}
              source={appImages.lense}
            />
          </View>

          <View
            style={{
              height: hp(10),
              marginLeft: wp(2.1),
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: '#333333',
                fontFamily: 'Inter',
                fontWeight: 'bold',

                fontSize: hp(2),
              }}>
              Item Name
            </Text>

            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  color: '#FACA4E',
                  fontFamily: 'Inter',
                  fontWeight: '500',

                  fontSize: hp(2),
                }}>
                $ 456
              </Text>
            </View>

            <View style={{flexDirection: 'row', marginLeft: wp(-1.7)}}>
              <Location width={18} height={18} />
              <Text
                style={{
                  color: '#77838F',
                  fontFamily: 'Inter',
                  fontWeight: '300',

                  fontSize: hp(1.7),
                }}>
                123 Main Street Cityville, USA
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            height: hp(15),
            marginHorizontal: wp(8),
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: '#333333',
              fontFamily: 'Inter',
              fontWeight: 'bold',

              fontSize: hp(4.3),
            }}>
            $ 435
          </Text>

          <View
            style={{
              height: hp(0.1),
              width: '100%',
              backgroundColor: '#00000042',
            }}></View>

          <Text
            style={{
              color: '#FACA4E',
              fontFamily: 'Inter',
              fontWeight: '400',

              fontSize: hp(2.5),
            }}>
            Listed Price $456
          </Text>
        </View>

        <View
          style={{
            marginTop: hp(2.1),
            marginBottom: hp(5),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CustomButton
            title={'Send Offer'}
            load={false}
            // checkdisable={inn == '' && cm == '' ? true : false}
            customClick={() => {
              ref_RBSendOffer2.current.close();
              //ref_RBSendOffer.current.open();
              //navigation.navigate('Profile_image');
            }}
          />
        </View>
      </RBSheet>

      <CustomSnackbar
        message={'Success'}
        messageDescription={'Your Offer Sent Successfully'}
        onDismiss={dismissSnackbar} // Make sure this function is defined
        visible={snackbarVisible}
      />

      <CustomSnackbar
        message={'Success'}
        messageDescription={'You will get notified to the relevant feed'}
        onDismiss={dismissSnackbar} // Make sure this function is defined
        visible={snackbarVisibleAlert}
      />

      <CustomSnackbar
        message={'Success'}
        messageDescription={'Item saved successfully'}
        onDismiss={dismissSnackbar} // Make sure this function is defined
        visible={snackbarVisibleSaved}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  dot: {
    width: 6, // Default dot width
    height: 6, // Default dot height
    borderRadius: 3, // Make it round
    marginHorizontal: 5, // Adjust spacing between dots
    backgroundColor: 'gray', // Default dot color
  },
  paginationStyle: {
    bottom: 10, // Adjust the position of the pagination
  },
  circleBox: {
    width: wp(12),
    height: wp(12),
    overflow: 'hidden',
    borderColor: '#00000020',
    borderRadius: wp(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  maintext: {
    fontSize: hp(2.3),
    color: '#333333',
    fontWeight: 'bold',
  },
});
