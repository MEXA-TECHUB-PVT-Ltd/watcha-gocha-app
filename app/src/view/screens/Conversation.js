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

import Back from '../../assets/svg/back.svg';

import {appImages} from '../../assets/utilities/index';
import Slider from '@react-native-community/slider';
import VolumeUp from '../../assets/svg/VolumeUp.svg';
import Like from '../../assets/svg/Like.svg';
import UnLike from '../../assets/svg/Unlike.svg';
import Comment from '../../assets/svg/Comment.svg';
import Send from '../../assets/svg/Send.svg';
import Download from '../../assets/svg/Download.svg';
import DownArrowComments from '../../assets/svg/DownArrowComments.svg';
import UpArrowComments from '../../assets/svg/UpArrowComments.svg';

import Ionicons from 'react-native-vector-icons/Ionicons';

import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';

import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {GiftedChat, Bubble, Day} from 'react-native-gifted-chat';

import Share from 'react-native-share';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Fontiso from 'react-native-vector-icons/Fontisto';

import IonIcons from 'react-native-vector-icons/Ionicons';

import ButtonSend from '../../assets/svg/ButtonSendBlack.svg';

import SmileEmoji from '../../assets/svg/SmileEmoji.svg';

import Entypo from 'react-native-vector-icons/Entypo';
import CustomSnackbar from '../../assets/Custom/CustomSnackBar';

export default function Conversation({navigation}) {
  const [messages, setMessages] = useState([]);

  const [commentText, setCommentText] = useState(null); // State variable to hold the text

  const clearTextInput = () => {
    console.log('came to logssssss', commentText);
    // Clear the text in the TextInput
    setCommentText(null);
  };

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Realy? can I get it too?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
        },
      },
      {
        _id: 2,
        text: 'Hey mar, I just got a great fried noodle recipe from my mother!',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'You',
        },
      },
      {
        _id: 3,
        text: 'Dont forget to split it for me when its ripe ! haha',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
        },
      },
      {
        _id: 4,
        text: 'Of course dude!',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'You',
        },
      },
      // Add more messages here...
    ]);
  }, []);

  const renderDay = (props) => {
    return (
      <Day
        {...props}
        textStyle={{
          fontFamily: 'Inter-Bold',
          fontSize: 16,
          color: 'gray', // Customize the color of the date separator
        }}
      />
    );
  };

  // Define a function to render custom message bubbles
  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#F4F8FC', // Customize the color for left messages
          },
          right: {
            backgroundColor: '#FACA4E', // Customize the color for right messages
          },
        }}
      />
    );
  };

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  const CustomInputToolbar = () => {
    return null; // This will remove the input message box
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content" // You can set the StatusBar text color to dark or light
      />

      <View
        style={{
          flexDirection: 'row',
          marginTop: hp(7),
          alignItems: 'center',
          justifyContent: 'center',
          height: hp(7),
        }}>
        <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.backArrow}>
          <Ionicons name="chevron-back-sharp" size={25} color="#282828" />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: '100%',
            width: wp(39),
            justifyContent: 'space-between',
            alignSelf: 'center',
          }}>
          <TouchableOpacity style={{}}>
            <Image
              source={appImages.profileImg}
              style={styles.profileImgs}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <Text
            style={{
              color: '#1E2022',
              marginLeft: wp(1.5),
              fontFamily: 'Inter-Bold',
              fontSize: hp(2.1),
            }}>
            Gossip Gurus
          </Text>
        </View>
      </View>

      <View style={{flex: 1}}>
        <GiftedChat
          messagesContainerStyle={{paddingBottom: 30}}
          messages={messages}
          //onSend={messages => onSend(messages)}
          user={{
            // _id: user_id,
            _id: 1,
          }}
          // renderAvatar={props => {
          //   return null;
          // }}
          renderAvatar={null}
          renderBubble={renderBubble} // Set the custom renderBubble function

          renderDay={null}  

          /* renderBubble={props => {
            return <CustomBubble {...props} />;
          }} */
          //alwaysShowSend
          /*  onInputTextChanged={text => {
            console.log('text : ', text);
          }} */
          // renderChatEmpty={() => (
          //   <View
          //     style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          //     {loading ? null : (
          //       <Text
          //         style={{
          //           color: 'gray',
          //           fontSize: 14,
          //           transform: [{scaleY: -1}],
          //         }}>
          //         No Record Found
          //       </Text>
          //     )}
          //   </View>
          // )}
          //disableComposer={false}
          renderInputToolbar={CustomInputToolbar} // This will remove the input message box
        />

        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            height: hp(21),
          }}>
          {/* ... (previous code) */}
        </View>
      </View>

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
          placeholderTextColor={'#848484'}
          value={commentText} // Bind the value to the state variable
          onChangeText={text => setCommentText(text)} // Update state on text change
          placeholder="Write Comment Here"
          style={{flex: 1, marginLeft: wp(1)}}
        />

        <TouchableOpacity onPress={()=> clearTextInput()}>
          <ButtonSend />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  profileImgs: {
    resizeMode: 'contain',
    //marginTop: hp(-2),
    //position: 'absolute',
    //right: -10,
    width: wp(12),
    height: wp(12),
  },
  backArrow: {
    position: 'absolute',
    left: 20,
    justifyContent: 'center', // Vertically align the arrow within the touchable area
    paddingVertical: 10, // Add padding to increase the touchable area
    paddingRight: 10, // Add some space on the right side if needed
  },
});
