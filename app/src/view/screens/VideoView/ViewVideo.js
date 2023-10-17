import {
  StyleSheet,
  FlatList,
  Text,
  Image,
  ScrollView,
  Platform,
  TextInput,
  StatusBar,
  ImageBackground,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useRef, useMemo, useCallback, useEffect} from 'react';

import Back from '../../../assets/svg/back.svg';

import {appImages} from '../../../assets/utilities/index';
import Slider from '@react-native-community/slider';
import VolumeUp from '../../../assets/svg/VolumeUp.svg';
import Like from '../../../assets/svg/Like.svg';
import UnLike from '../../../assets/svg/Unlike.svg';
import Comment from '../../../assets/svg/Comment.svg';
import Send from '../../../assets/svg/Send.svg';
import Download from '../../../assets/svg/Download.svg';
import DownArrowComments from '../../../assets/svg/DownArrowComments.svg';
import UpArrowComments from '../../../assets/svg/UpArrowComments.svg';

import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';

import {GestureHandlerRootView} from 'react-native-gesture-handler';

import Share from 'react-native-share';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Fontiso from 'react-native-vector-icons/Fontisto';

import IonIcons from 'react-native-vector-icons/Ionicons';

import ButtonSend from '../../../assets/svg/ButtonSend.svg';

import SmileEmoji from '../../../assets/svg/SmileEmoji.svg';

import Entypo from 'react-native-vector-icons/Entypo';
import CustomSnackbar from '../../../assets/Custom/CustomSnackBar';

export default function ViewVideo({navigation}) {
  const [showFullContent, setShowFullContent] = useState(false);

  const [showReply, setShowReply] = useState(false);

  const [showLikes, setShowLikes] = useState(false);

  const [showMenu, setShowMenu] = useState(false);

  const [isBottomSheetExpanded, setIsBottomSheetExpanded] = useState(false);

  const ref_Comments = useRef(null);

  const bottomSheetRef = useRef(null);
  // variables
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  const [snackbarVisible, setsnackbarVisible] = useState(false);

  const [commentText, setCommentText] = useState(null); // State variable to hold the text


  var details =
    'Hold onto your seats and get ready to be mesmerized by the beauty and grandeur of the Hold onto your seats';

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  const toggleContentLike = () => {
    setShowLikes(!showLikes);
  };

  const shareViaWhatsApp = async () => {
    const shareOptions = {
      title: 'Share via',
      message: 'Hey! Check out this cool app!',
      url: 'https://play.google.com/store/apps/details?id=your.app.package',
      //social: Share.Social,
    };

    try {
      await Share.open(shareOptions);
    } catch (error) {
      console.error('Error sharing via WhatsApp:', error.message);
    }
  };

  const dismissSnackbar = () => {
    setsnackbarVisible(false);
  };

  const handleUpdatePassword = async () => {
    // Perform the password update logic here
    // For example, you can make an API request to update the password

    // Assuming the update was successful
    setsnackbarVisible(true);

    // Automatically hide the Snackbar after 3 seconds
    setTimeout(() => {
      setsnackbarVisible(false);
      navigation.goBack();
    }, 3000);
  };

  const clearTextInput = () => {
    console.log("came to logssssss", commentText)
    // Clear the text in the TextInput
    setCommentText(null);
  };

  

  const chats = [
    {
      id: 1,
      name: 'John Doe',
      message: 'The laughter in this video is contagious!',
      reply: true,
    },
    {
      id: 2,
      name: 'Olivia Bennett',
      message: 'I wish I had a friend group like this. You all are incredible!',
      reply: false,
    },
    {
      id: 3,
      name: 'Ethan Rodriguez',
      message:
        'This video just made my day! Thanks for sharing your awesome moments.',
      reply: false,
    },
    {
      id: 4,
      name: 'Mia Bennett',
      message: 'Friendship goals right there! Love how close you all are',
      reply: false,
    },
    {
      id: 5,
      name: 'Liam Sullivan',
      message:
        'Looks like you guys are having an absolute blast! Wish I could join in on the fun',
      reply: false,
    },
  ];

  const renderComments = item => {
    console.log('Items', item);
    return (
      <View>
        <View
          style={{
            height: hp(14),
            //borderWidth:3,
            paddingHorizontal: wp(5),
            flexDirection: 'row',
            width: '100%',
          }}>
          <View
            style={{
              height: wp(14),
              alignSelf: 'center',
              resizeMode: 'hidden',
              width: wp(14),
              borderRadius: wp(14),
            }}>
            <Image
              style={{width: '100%', borderRadius: wp(2.1), height: '100%'}}
              source={appImages.profileImg}
            />
          </View>

          <View
            style={{
              flex: 1,
              marginLeft: wp(3),
              marginTop: hp(3),
              //borderWidth:3,
              justifyContent: 'space-around',
            }}>
            <Text
              style={{
                color: '#000000',
                fontFamily: 'Inter-Medium',
                fontSize: hp(2.1),
              }}>
              John Doe
            </Text>

            <Text
              style={{
                color: '#4C4C4C',
                fontFamily: 'Inter-Regular',
                fontSize: hp(1.6),
              }}>
              I wish I had a friend group like this. You all are incredible!
            </Text>

            {item.reply && (
              <TouchableOpacity
                onPress={() => setShowReply(!showReply)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  //borderWidth:3,
                  height: hp(3),
                  width: wp(21),
                }}>
                {showReply === true ? (
                  <UpArrowComments />
                ) : (
                  <DownArrowComments />
                )}

                <Text
                  style={{
                    color: '#FACA4E',
                    fontFamily: 'Inter-Regular',
                    marginLeft: wp(1.8),
                    fontSize: hp(1.6),
                  }}>
                  2
                </Text>

                <Text
                  style={{
                    color: '#FACA4E',
                    fontFamily: 'Inter-Regular',
                    marginLeft: wp(1.3),
                    fontSize: hp(1.6),
                  }}>
                  replies
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {showReply && (
          <View
            style={{
              justifyContent: 'space-evenly',
              height: hp(15),
              //borderWidth:3,
              marginLeft: wp(20),
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: hp(6),
                width: '100%',
              }}>
              <View
                style={{
                  height: wp(10),
                  alignSelf: 'center',
                  resizeMode: 'hidden',
                  width: wp(10),
                  borderRadius: wp(10),
                }}>
                <Image
                  style={{width: '100%', borderRadius: wp(2.1), height: '100%'}}
                  source={appImages.profileImg}
                />
              </View>

              <View style={{flex: 1, justifyContent: 'space-between'}}>
                <Text
                  style={{
                    color: '#000000',
                    fontFamily: 'Inter-Regular',
                    marginLeft: wp(1.8),
                    fontSize: hp(1.6),
                  }}>
                  Olivia Bennett
                </Text>

                <Text
                  style={{
                    color: '#4C4C4C',
                    fontFamily: 'Inter-Regular',
                    marginLeft: wp(2),
                    fontSize: hp(1.3),
                  }}>
                  I wish I had a friend group like this. You all are incredible!
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: hp(6),
                width: '100%',
              }}>
              <View
                style={{
                  height: wp(10),
                  alignSelf: 'center',
                  resizeMode: 'hidden',
                  width: wp(10),
                  borderRadius: wp(10),
                }}>
                <Image
                  style={{width: '100%', borderRadius: wp(2.1), height: '100%'}}
                  source={appImages.profileImg}
                />
              </View>

              <View style={{flex: 1, justifyContent: 'space-between'}}>
                <Text
                  style={{
                    color: '#000000',
                    fontFamily: 'Inter-Regular',
                    marginLeft: wp(1.8),
                    fontSize: hp(1.6),
                  }}>
                  Olivia Bennett
                </Text>

                <Text
                  style={{
                    color: '#4C4C4C',
                    fontFamily: 'Inter-Regular',
                    marginLeft: wp(2),
                    fontSize: hp(1.3),
                  }}>
                  I wish I had a friend group like this. You all are incredible!
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ImageBackground source={appImages.videoBG} style={{flex: 1}}>
        <StatusBar
          translucent={true}
          backgroundColor="transparent"
          barStyle="dark-content" // You can set the StatusBar text color to dark or light
        />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <IonIcons name={'chevron-back'} color={'white'} size={25} />
          </TouchableOpacity>

          <Image
            source={appImages.logoTransparent}
            style={{width: wp(39), marginLeft: wp(18)}}
            resizeMode="contain"
          />

          {showMenu && (
            <TouchableOpacity style={{marginLeft: wp(18), marginTop: hp(1)}}>
              <Entypo name={'dots-three-vertical'} size={18} color={'white'} />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.bottomView}>
          <View style={{height: hp(30), marginHorizontal: wp(8)}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: hp(5),
              }}>
              <View
                style={{
                  height: hp(10),
                  width: wp(10),
                  borderRadius: wp(8),
                  marginLeft: wp(3),
                  overflow: 'hidden',
                }}>
                <Image
                  style={{
                    flex: 1,
                    width: null,
                    height: null,
                    resizeMode: 'contain',
                  }}
                  source={appImages.profileImg}
                />
              </View>

              <Text style={styles.textProfileName}>John Doe</Text>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false} // Hide vertical scroll indicator
              style={{flex: 1, marginTop: hp(1)}}
              contentContainerStyle={{verticalLine: false}}>
              <Text
                style={{
                  marginTop: hp(1),
                  fontFamily: 'Inter',
                  fontSize: hp(1.8),
                  lineHeight: hp(2.1),
                  color: '#FFFFFF',
                }}>
                {showFullContent
                  ? details
                  : details.length > 90
                  ? details.substring(0, 90) + '...'
                  : details.slice(0)}
              </Text>

              <TouchableOpacity onPress={toggleContent}>
                <Text
                  style={{
                    fontFamily: 'Inter',
                    fontSize: hp(1.8),
                    color: '#FACA4E',
                  }}>
                  {details.length > 90
                    ? showFullContent
                      ? 'See Less'
                      : 'See More'
                    : null}
                </Text>
              </TouchableOpacity>
            </ScrollView>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: hp(5),
              }}>
              <View
                style={{
                  height: hp(2),
                  width: wp(65),
                  justifyContent: 'center',
                }}>
                <Slider
                  value={95}
                  minimumValue={0}
                  thumbTintColor="#FACA4E"
                  maximumValue={100}
                  minimumTrackTintColor={'#FACA4E'}
                  maximumTrackTintColor={'#F6F6F6'}
                />
              </View>

              <Text
                style={{
                  fontFamily: 'Inter',
                  fontSize: hp(1.5),
                  color: '#FFFFFF',
                }}>
                02:14
              </Text>
              <VolumeUp height={14} width={14} />
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: hp(8),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: wp(15),
                  //borderWidth:3,
                  height: hp(5),
                }}>
                <TouchableOpacity onPress={toggleContentLike}>
                  {showLikes ? (
                    <Like height={21} width={21} />
                  ) : (
                    <UnLike height={21} width={21} />
                  )}
                </TouchableOpacity>

                <Text
                  style={{
                    fontFamily: 'Inter-Regular',
                    fontSize: hp(1.7),
                    marginLeft: wp(1),
                    color: '#FFFFFF',
                  }}>
                  2.3 k
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => setIsBottomSheetExpanded(!isBottomSheetExpanded)}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: wp(15),
                  height: hp(5),
                }}>
                <TouchableOpacity>
                  <Comment height={21} width={21} />
                </TouchableOpacity>

                <Text
                  style={{
                    fontFamily: 'Inter-Regular',
                    fontSize: hp(1.7),
                    color: '#FFFFFF',
                  }}>
                  2.3 k
                </Text>
              </TouchableOpacity>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: wp(15),
                  height: hp(5),
                }}>
                <TouchableOpacity onPress={() => shareViaWhatsApp()}>
                  <Send height={20} width={20} />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: wp(10),
                  height: hp(5),
                }}>
                <TouchableOpacity onPress={() => handleUpdatePassword()}>
                  <Download height={20} width={20} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <CustomSnackbar
          message={'success'}
          messageDescription={'Video downloaded successfully'}
          onDismiss={dismissSnackbar} // Make sure this function is defined
          visible={snackbarVisible}
        />

        {/* <RBSheet
        ref={ref_Comments}
        height={330}
        openDuration={250}
        enableOverDrag={false}
        enabledGestureInteraction={false}
        closeOnDragDown={false}
        closeOnPressMask={false}
        customStyles={{
          container: {
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
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            height: hp(5),
          }}>
          <Text
            style={{
              color: '#000000',
              fontFamily: 'Inter-Bold',
              fontSize: hp(2.3),
            }}>
            Comments
          </Text>
        </View>

        <View style={{marginTop: hp(1),flex:1}}>
        <FlatList
          style={{flexGrow:1}}
          showsVerticalScrollIndicator={false}
          data={chats}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => renderComments(item)}
        />
      </View>

      <View style={{width:'100%', flexDirection:'row', alignItems:'center', height:hp(8)}}>
      <TouchableOpacity style={{height:hp(8), justifyContent:'center', alignItems:'center', width:wp(14),}}>
        <SmileEmoji/>
      </TouchableOpacity>

      <TextInput placeholderTextColor={'#848484'} placeholder='Write Comment Here' style={{flex:1, marginLeft:wp(1),}}/>

      <TouchableOpacity>
        <ButtonSend/>
      </TouchableOpacity>
      </View>

        
      </RBSheet> */}

        <BottomSheet
          ref={ref_Comments}
          index={isBottomSheetExpanded ? 0 : -1} // Set to -1 to start with collapsed state
          snapPoints={['65%', '90%']} // Adjust snap points as needed
          onScroll={event => {
            console.log('Event', event);
            const offsetY = event.nativeEvent.contentOffset.y;
            if (isBottomSheetExpanded && offsetY === 0) {
              setIsBottomSheetExpanded(false);
            } else if (!isBottomSheetExpanded && offsetY > 0) {
              setIsBottomSheetExpanded(true);
            }
          }}
          //snapPoints={snapPoints}
          //onChange={handleSheetChange}
          height={210}
          openDuration={250}
          closeOnDragDown={true}
          draggableIcon={false}
          closeOnPressMask={true}
          customStyles={{
            container: {
              borderTopLeftRadius: 100,
              borderTopRightRadius: 100,
              paddingTop: 0,
              padding: 20,
              zIndex: 999,
              backgroundColor: 'white',
            },
            draggableIcon: {
              backgroundColor: 'white',
            },
          }}>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              height: hp(5),
            }}>
            <Text
              style={{
                color: '#000000',
                fontFamily: 'Inter-Bold',
                fontSize: hp(2.3),
              }}>
              Comments
            </Text>
          </View>

          <View style={{marginTop: hp(1), flex: 1}}>
            <BottomSheetFlatList
              data={chats}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => renderComments(item)}
            />
          </View>

          {showReply === false ? (
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                height: hp(8),
              }}>
              <TouchableOpacity
                style={{
                  height: hp(8),
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: wp(14),
                }}>
                <SmileEmoji />
              </TouchableOpacity>

              <TextInput
                value={commentText} // Bind the value to the state variable
                onChangeText={text => setCommentText(text)} // Update state on text change
                placeholderTextColor={'#848484'}
                placeholder="Write Comment Heressssss"
                style={{flex: 1, marginLeft: wp(1)}}
              />

              <TouchableOpacity onPress={clearTextInput}>
                <ButtonSend />
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                height: hp(8),
              }}>
              <TouchableOpacity
                style={{
                  height: hp(8),
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: wp(14),
                }}>
                <SmileEmoji />
              </TouchableOpacity>

              <TextInput
                value={commentText} // Bind the value to the state variable
                onChangeText={text => setCommentText(text)} // Update state on text change
                placeholderTextColor={'#848484'}
                placeholder="Add a reply"
                style={{flex: 1, marginLeft: wp(1)}}
              />

              <TouchableOpacity onPress={()=>clearTextInput()}>
                <ButtonSend />
              </TouchableOpacity>
            </View>
          )}
        </BottomSheet>

        {isBottomSheetExpanded && showReply === false ? (
          <View
            style={{
              width: '100%',
              position: 'absolute',
              bottom: 0,
              left: 0,
              backgroundColor: 'white',
              flexDirection: 'row',
              alignItems: 'center',
              height: hp(8),
            }}>
            <TouchableOpacity
              style={{
                height: hp(8),
                justifyContent: 'center',
                alignItems: 'center',
                width: wp(14),
              }}>
              <SmileEmoji />
            </TouchableOpacity>

            <TextInput
               value={commentText} // Bind the value to the state variable
               onChangeText={text => setCommentText(text)} // Update state on text change
               placeholderTextColor={'#848484'}
               placeholder="Write Comment Here"
              style={{flex: 1, marginLeft: wp(1)}}
            />

            <TouchableOpacity onPress={()=>clearTextInput()}>
              <ButtonSend />
            </TouchableOpacity>
          </View>
        ) : (
          isBottomSheetExpanded && (
            <View
              style={{
                width: '100%',
                backgroundColor: 'white',
                flexDirection: 'row',
                alignItems: 'center',
                height: hp(8),
              }}>
              <TouchableOpacity
                style={{
                  height: hp(8),
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: wp(14),
                }}>
                <SmileEmoji />
              </TouchableOpacity>

              <TextInput
                value={commentText} // Bind the value to the state variable
                onChangeText={text => setCommentText(text)} // Update state on text change
                placeholderTextColor={'#848484'}
                placeholder="Add a reply"
                style={{flex: 1, marginLeft: wp(1)}}
              />

              <TouchableOpacity onPress={()=>clearTextInput()}>
                <ButtonSend />
              </TouchableOpacity>
            </View>
          )
        )}
      </ImageBackground>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    height: hp(6.2),
    marginTop: hp(8),
    alignItems: 'center',
    marginHorizontal: wp(8),
  },
  bottomView: {
    flex: 1,
    justifyContent: 'flex-end',
    // You can add padding or content to this view as needed.
  },
  textProfileName: {
    color: '#FFFFFF',
    fontSize: hp(2),
    marginLeft: wp(3),
    fontFamily: 'Inter',
    fontWeight: 'bold',
  },
});
