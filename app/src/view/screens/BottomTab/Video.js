import {
  StyleSheet,
  FlatList,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Text,
  View,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Fontiso from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import Add from '../../../assets/svg/AddMainScreen.svg';
import Headers from '../../../assets/Custom/Headers';
import {appImages} from '../../../assets/utilities';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AsyncStorage from '@react-native-async-storage/async-storage';

import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';

import RBSheet from 'react-native-raw-bottom-sheet';

import {useIsFocused} from '@react-navigation/native';

export default function Video({navigation}) {
  const [selectedItemId, setSelectedItemId] = useState(null);

  const [loading, setLoading] = useState(false);

  const [topVideoImage, setTopVideoImage] = useState('');

  const [topVideoText, setTopVideoText] = useState('');

  const [searchesData, setSearches] = useState([]);

  const [authToken, setAuthToken] = useState('');

  const [imageInfo, setImageInfo] = useState(null);

  const isFocused = useIsFocused();

  const [selectedItem, setSelectedItem] = useState('');

  const [data, setData] = useState([]);

  const [dataLatestVideos, setDataLatestVideos] = useState([]);

  const [dataTopVideos, setDataTopVideos] = useState([]);

  const [dataMostViewedVideos, setMostViewedVideos] = useState([]);

  const [dataMostCommentedVideos, setMostCommentedVideos] = useState([]);

  const ref_RBSheetCamera = useRef(null);

  useEffect(() => {
    // Check if it's the initial load (selectedItemId is not set yet)
    if (selectedItemId === null) {
      setSelectedItemId(17);
    } else {
      // Fetch data based on the updated selectedItemId
      fetchVideos();
    }
  }, [selectedItemId, isFocused]);

  const fetchVideos = async () => {
    // Simulate loading
    setLoading(true);

    // Fetch data one by one
    await getUserID();
    await fetchTopVideos();
    await fetchLatestVideos();
    await fetchMostViewedVideos();
    await fetchMostCommentedVideos();

    // Once all data is fetched, set loading to false
    setLoading(false);
  };

  const getUserID = async () => {
    console.log('AT User Id');
    try {
      const result = await AsyncStorage.getItem('authToken ');
      if (result !== null) {
        setAuthToken(result);
        await fetchCategory(result);
        console.log('user id retrieved:', result);
      }
    } catch (error) {
      // Handle errors here
      console.error('Error retrieving user ID:', error);
    }
  };

  const fetchTrendingVideos = async () => {
    console.log('Categry in id', selectedItemId);
    console.log("Id's", authToken);

    const token = authToken;

    try {
      const response = await fetch(
        `https://watch-gotcha-be.mtechub.com/xpi/getTrendingVideosByCategory/${selectedItemId}?page=1&limit=5`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      console.log('Resultings', result.Videos);
      setData(result.Videos); // Update the state with the fetched data
    } catch (error) {
      console.error('Error Trending:', error);
    }
  };

  const fetchLatestVideos = async () => {
    const token = authToken;

    try {
      const response = await fetch(
        `https://watch-gotcha-be.mtechub.com/xpi/getAllRecentVideosByCategory/${selectedItemId}?page=1&limit=2`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      console.log('Resultings', result.Videos);
      setDataLatestVideos(result.Videos); // Update the state with the fetched data
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchTopVideos = async () => {
    const token = authToken;

    try {
      const response = await fetch(
        `https://watch-gotcha-be.mtechub.com/top/app/top_tour/${selectedItemId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      console.log('Resultings of Top Videossss', result.topVideo[0]);
      setDataTopVideos(result.topVideo[0]); // Update the state with the fetched data
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchMostViewedVideos = async () => {
    const token = authToken;

    try {
      const response = await fetch(
        `https://watch-gotcha-be.mtechub.com/xpi/getMostViewedVideosByCategory/${selectedItemId}?page=1&limit=5`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      console.log('Resultings', result.Videos);
      setMostViewedVideos(result.Videos); // Update the state with the fetched data
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchMostCommentedVideos = async () => {
    const token = authToken;

    try {
      const response = await fetch(
        `https://watch-gotcha-be.mtechub.com/xpi/getMostCommentedVideosByCategory/${selectedItemId}?page=1&limit=5`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      console.log('Resultings', result.Videos);
      setMostCommentedVideos(result.Videos); // Update the state with the fetched data
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchCategory = async result => {
    console.log('Auth Token category', result);
    const token = result;

    try {
      const response = await fetch(
        'https://watch-gotcha-be.mtechub.com/videoCategory/getAllVideoCategories',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      console.log('Search Results', result.AllCategories);
      setSearches(result.AllCategories.reverse()); // Update the state with the fetched data

      await fetchTrendingVideos(result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  /*  const takePhotoFromCamera = value => {
    ref_RBSheetCamera.current.close();
    setSelectedItem(value);
    navigation.navigate('UploadUpdateVideo');
  };

  const choosePhotoFromLibrary = value => {
    ref_RBSheetCamera.current.close();
    setSelectedItem(value);
    navigation.navigate('UploadUpdateVideo');
  }; */

  const takePhotoFromCamera = async value => {
    setSelectedItem(value);
    launchCamera(
      {
        mediaType: 'video',
        videoQuality: 'medium',
      },
      response => {
        console.log('image here', response);
        if (!response.didCancel) {
          if (response.assets && response.assets.length > 0) {
            setLoading(true);
            setImageInfo(response.assets[0]);
            ref_RBSheetCamera.current.close();
            setLoading(false);

            navigation.navigate('UploadUpdateVideo', {
              Video: response.assets[0],
            });
          } else if (response.uri) {
            console.log('response', imageInfo);
            ref_RBSheetCamera.current.close();
            setLoading(false);

            navigation.navigate('UploadUpdateVideo', {
              Video: response.assets[0],
            });
          }
        }
        console.log('response', imageInfo);
        ref_RBSheetCamera.current.close();
        setLoading(false);

        navigation.navigate('UploadUpdateVideo', {Video: response.assets[0]});
      },
    );
  };

  const choosePhotoFromLibrary = value => {
    setSelectedItem(value);
    launchImageLibrary({mediaType: 'video'}, response => {
      console.log('image here', response);
      if (!response.didCancel && response.assets.length > 0) {
        /*  console.log('Response', response.assets[0]);
        setImageUri(response.assets[0].uri);
        setImageInfo(response.assets[0]); */
        setLoading(true);
        setImageInfo(response.assets[0]);
        ref_RBSheetCamera.current.close();
        setLoading(false);

        navigation.navigate('UploadUpdateVideo', {Video: response.assets[0]});
      }

      console.log('response', imageInfo);
      ref_RBSheetCamera.current.close();
      setLoading(false);

      navigation.navigate('UploadUpdateVideo', {Video: response.assets[0]});
    });
  };

  const availableAppsVideo = [
    {
      id: 1,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches1,
    },
    {
      id: 2,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches2,
    },
    {
      id: 3,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches3,
    },
    {
      id: 4,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches4,
    },
    {
      id: 5,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches1,
    },
    {
      id: 6,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches2,
    },
    {
      id: 7,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches3,
    },
    {
      id: 8,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches4,
    },
    {
      id: 9,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches1,
    },
    {
      id: 10,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches2,
    },
  ];

  const availableApps = [
    {
      id: 1,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches1,
    },
    {
      id: 2,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches2,
    },
    {
      id: 3,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches3,
    },
    {
      id: 4,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches4,
    },
    {
      id: 5,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches1,
    },
    {
      id: 6,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches2,
    },
    {
      id: 7,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches3,
    },
    {
      id: 8,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches4,
    },
    {
      id: 9,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches1,
    },
    {
      id: 10,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches2,
    },
  ];

  const searches = [
    {id: 1, title: 'Games'},
    {id: 2, title: 'Business'},
    {id: 3, title: 'Education'},
    {id: 4, title: 'Games'},
    {id: 5, title: 'Business'},
    {id: 6, title: 'Education'},
    {id: 7, title: 'Games'},
    {id: 8, title: 'Business'},
    {id: 9, title: 'Education'},
    {id: 10, title: 'Games'},
  ];

  const renderAvailableApps = item => {
    console.log('Items', item);
    return (
      <View style={{width: wp(30), margin: 5}}>
        <View>
          <Image
            style={{
              position: 'absolute',
              top: 0,
              left: 0,

              zIndex: 1, // Ensure it's on top of other elements
              //flex: 1,
              width: '100%',
              height: hp(12),
              borderRadius: wp(3),
              resizeMode: 'cover',
            }}
            source={item.image}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: wp(2),
            marginTop: hp(12.5),
          }}>
          <Text style={{fontSize: hp(1.1), fontWeight: 'bold', width: wp(23)}}>
            {item.title}
          </Text>

          <Entypo name={'dots-three-vertical'} size={14} color={'#4A4A4A'} />
        </View>
      </View>
    );
  };

  const renderAvailableAppsVideo = item => {
    //console.log('Itemsss', item);
    console.log('Video Link', item.thumbnail);
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ViewVideo', {videoData: item})}
        style={{width: wp(27), margin: 5}}>
        <View>
          {item.thumbail === '' ||
          item.thumbnail === null ||
          item.thumbnail.startsWith('/') ||
          item.thumbnail === undefined ? (
            <Image
              style={{
                position: 'absolute',
                top: 0,
                left: 0,

                zIndex: 1, // Ensure it's on top of other elements
                //flex: 1,
                width: '100%',
                height: hp(12),
                borderRadius: wp(1),
                resizeMode: 'cover',
              }}
              source={appImages.galleryPlaceHolder}
            />
          ) : (
            <Image
              style={{
                position: 'absolute',
                top: 0,
                left: 0,

                zIndex: 1, // Ensure it's on top of other elements
                //flex: 1,
                width: '100%',
                height: hp(12),
                borderRadius: wp(1),
                resizeMode: 'cover',
              }}
              source={{uri: item.thumbnail}}
            />
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: wp(0.5),
            marginTop: hp(12.5),
          }}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              fontSize: hp(1.5),
              fontFamily: 'Inter-Regular',
              color: '#000000',
              width: wp(23),
            }}>
            {item.description}
          </Text>

          <Entypo name={'dots-three-vertical'} size={14} color={'#4A4A4A'} />
        </View>
      </TouchableOpacity>
    );
  };

  const renderSearches = item => {
    console.log('Items', item);
    const isSelected = selectedItemId === item.id;

    return (
      <TouchableOpacity
        style={[
          styles.searchesDetails,
          {
            backgroundColor: isSelected ? '#FACA4E' : '#F2F2F2',
          },
        ]}
        onPress={() => {
          setSelectedItemId(item.id);
          console.log('Selected item:', item.title);
        }}>
        <Text
          style={[
            styles.textSearchDetails,
            {color: isSelected ? '#232323' : '#939393'},
          ]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
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
          showListings={true}
          onPressListings={() => navigation.openDrawer()}
          onPressSearch={() => navigation.navigate('SearchScreen')}
          showText={true}
          text={'XPi/3.14 videos'}
          showSearch={true}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          marginTop: hp(1),
          marginHorizontal: wp(8),
        }}>
        <View
          style={{
            height: hp(18),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{width: wp(60), resizeMode: 'contain'}}
            source={appImages.bannerAds}
          />
        </View>

        <View style={styles.latestSearchList}>
          <Text
            style={{color: '#232323', fontWeight: 'bold', fontSize: hp(2.1)}}>
            Top
          </Text>
          <FlatList
            style={{flex: 1}}
            contentContainerStyle={{alignItems: 'center'}}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={searchesData}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => renderSearches(item)}
          />
        </View>
        <View
          style={{
            marginTop: hp(1.5),
            marginLeft: wp(2.5),
            flexDirection: 'row',
            height: hp(17),
          }}>
          <View
            //onPress={() => navigation.navigate('ViewVideo')}
            style={{width: wp(39), height: '100%', borderRadius: wp(5)}}>
            <Image
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 1, // Ensure it's on top of other elements
                //flex: 1,
                width: '100%',
                height: '100%',
                borderRadius: wp(3),
                resizeMode: 'cover',
              }}
              source={appImages.galleryPlaceHolder}
            />
            <View
              style={{
                position: 'absolute',
                top: hp(10),
                left: 7,
                //height: hp(3),
                //width: wp(21),
                //borderRadius: wp(3),
                //backgroundColor: '#FACA4E',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 2, // Ensure it's on top
              }}>
              <Text
                style={{
                  fontSize: hp(2.1),
                  fontFamily: 'Inter',
                  color: '#FFFFFF',
                  fontWeight: '700',
                }}>
                {dataTopVideos?.name}
              </Text>
            </View>
          </View>

          <View
            style={{
              marginTop: hp(3),
              height: hp(12.8),
              width: '45%',
              marginHorizontal: wp(1.5),
            }}>
            <Text
              numberOfLines={5}
              ellipsizeMode="tail"
              style={{
                fontSize: hp(1.5),
                //marginLeft: wp(1),
                lineHeight: hp(2),
                fontFamily: 'Inter-Regular',
                color: '#000000',
                //fontWeight: '700',
              }}>
              {/* Explore the intricate web of global politics in this
              thought-provoking video as we delve into the ever-shifting
              landscape of international diplomacy...... */}

              {dataTopVideos?.description}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('ViewVideo')}
          style={{marginTop: hp(1.5), height: hp(23)}}>
          <Text
            style={{
              fontSize: hp(2.3),
              marginLeft: wp(3),
              fontFamily: 'Inter',
              color: '#4A4A4A',
              fontWeight: 'bold',
            }}>
            Trending
          </Text>

          <View style={{marginTop: hp(1), height: '100%'}}>
            {loading === true ? (
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
            ) : 

            (
              <>
                {data?.length === 0 ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{fontWeight: 'bold', fontSize: hp(2.1)}}>
                      No data available
                    </Text>
                  </View>
                ) :
            (
              <FlatList
                style={{flex: 1}}
                showsHorizontalScrollIndicator={false}
                data={data}
                horizontal
                //keyExtractor={item => item.id.toString()}
                renderItem={({item}) => renderAvailableAppsVideo(item)}
              />
            )}
              </>
            )}
          </View>
        </TouchableOpacity>

        <View style={{marginTop: hp(2.1), height: hp(23)}}>
          <Text
            style={{
              fontSize: hp(2.3),
              marginLeft: wp(3),
              fontFamily: 'Inter',
              color: '#4A4A4A',
              fontWeight: 'bold',
            }}>
            Latest Video
          </Text>

          <View style={{marginTop: hp(1), height: '100%'}}>
            {loading === true ? (
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
            ) :
            (
              <>
                {dataLatestVideos?.length === 0 ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{fontWeight: 'bold', fontSize: hp(2.1)}}>
                      No data available
                    </Text>
                  </View>
                ) : (
              <FlatList
                style={{flex: 1}}
                showsHorizontalScrollIndicator={false}
                data={dataLatestVideos}
                horizontal
                // keyExtractor={item => item.id.toString()}
                renderItem={({item}) => renderAvailableAppsVideo(item)}
              />
            )}
            </>
            )}
          </View>
        </View>

        <View style={{marginTop: hp(2.1), height: hp(23)}}>
          <Text
            style={{
              fontSize: hp(2.3),
              marginLeft: wp(3),
              fontFamily: 'Inter',
              color: '#4A4A4A',
              fontWeight: 'bold',
            }}>
            Most Viewed
          </Text>

          <View style={{marginTop: hp(1), height: '100%'}}>
            {loading === true ? (
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
            )  :
            (
              <>
                {dataMostViewedVideos?.length === 0 ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{fontWeight: 'bold', fontSize: hp(2.1)}}>
                      No data available
                    </Text>
                  </View>
                ) : (
              <FlatList
                style={{flex: 1}}
                showsHorizontalScrollIndicator={false}
                data={dataMostViewedVideos}
                horizontal
                //keyExtractor={item => item.id.toString()}
                renderItem={({item}) => renderAvailableAppsVideo(item)}
              />
              )}
              </>
            )}
          </View>
        </View>

        <View style={{marginTop: hp(2.1), height: hp(23)}}>
          <Text
            style={{
              fontSize: hp(2.3),
              marginLeft: wp(3),
              fontFamily: 'Inter',
              color: '#4A4A4A',
              fontWeight: 'bold',
            }}>
            Most Commented
          </Text>

          <View style={{marginTop: hp(1), height: '100%'}}>
            {loading === true ? (
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
            ):
            (
              <>
                {dataMostCommentedVideos?.length === 0 ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{fontWeight: 'bold', fontSize: hp(2.1)}}>
                      No data available
                    </Text>
                  </View>
                ) : (
              <FlatList
                style={{flex: 1}}
                showsHorizontalScrollIndicator={false}
                data={dataMostCommentedVideos}
                horizontal
                //keyExtractor={item => item.id.toString()}
                renderItem={({item}) => renderAvailableAppsVideo(item)}
              />
            )}
            </>
            )}
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => ref_RBSheetCamera.current.open()}
        style={{position: 'absolute', bottom: 1, right: 25}}>
        <Add />
      </TouchableOpacity>

      <RBSheet
        ref={ref_RBSheetCamera}
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
            height: hp(25),
          },
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: wp(8),
            alignItems: 'center',
          }}>
          <Text style={styles.maintext}>Select an option</Text>
          <TouchableOpacity onPress={() => ref_RBSheetCamera.current.close()}>
            <Ionicons
              name="close"
              size={22}
              color={'#303030'}
              onPress={() => ref_RBSheetCamera.current.close()}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            marginTop: hp(3),
          }}>
          <TouchableOpacity
            onPress={() => takePhotoFromCamera('camera')}
            style={
              selectedItem === 'camera'
                ? styles.selectedItems
                : styles.nonselectedItems
            }>
            <Ionicons
              color={selectedItem === 'camera' ? '#FACA4E' : '#888888'}
              name="camera"
              size={25}
            />

            <Text style={{color: '#333333'}}>From camera</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => choosePhotoFromLibrary('gallery')}
            style={
              selectedItem === 'gallery'
                ? styles.selectedItems
                : styles.nonselectedItems
            }>
            <MaterialCommunityIcons
              color={selectedItem === 'gallery' ? '#FACA4E' : '#888888'}
              name="image"
              size={25}
            />

            <Text style={{color: '#333333'}}>From gallery</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchBar: {
    height: hp(5.9),
    marginTop: hp(3),
    flex: 1,
    backgroundColor: '#F2F2F2',
    flexDirection: 'row',
    alignItems: 'center',
    //marginLeft: wp(3.8),
    borderRadius: wp(5),
    borderWidth: 0.5,
    borderColor: '#00000017',
  },
  latestSearchList: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(2.1),
    height: hp(7),
    marginLeft: wp(5),
    //borderWidth: 3,
  },
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: hp(5),
    marginHorizontal: wp(8),
    height: hp(8),
    //borderWidth: 3,
  },
  latestSearch: {
    fontFamily: 'Inter',
    fontWeight: 'bold',
    fontSize: wp(4.3),
    marginTop: hp(2),
    marginLeft: wp(10),
    color: '#595959',
  },
  searchesDetails: {
    flexDirection: 'row',
    marginLeft: wp(3),
    alignItems: 'center',
    justifyContent: 'center',
    //width: wp(30),
    padding: wp(3.3),
    backgroundColor: '#F2F2F2',
    borderRadius: wp(5),
    //height: hp(5),
  },
  textSearchDetails: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: hp(1.8),
    textAlign: 'center',
  },
  textHeader: {
    fontSize: wp(5.7),
    color: '#333333',
    fontFamily: 'Inter',
    fontWeight: 'bold',
  },

  header: {
    flexDirection: 'row',
    height: hp(6.2),
    marginTop: hp(3),
    alignItems: 'center',
    marginHorizontal: wp(8),
  },
  headerText: {
    fontSize: hp(2.5),
    alignSelf: 'center',
    marginLeft: wp(23),
    color: '#333333',
    fontFamily: 'Inter',
    fontWeight: 'bold',
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
  textInputSelectedCategory: {
    borderWidth: 1,
    borderRadius: wp(3),
    width: '98%',
    borderColor: '#FACA4E',

    paddingHorizontal: 20,
    paddingVertical: 6.8,
    marginBottom: 20,
    marginTop: hp(3),
  },
  textInputCategoryNonSelected: {
    borderWidth: 1,
    borderRadius: wp(3),
    width: '98%',
    borderColor: '#E7EAF2',
    paddingHorizontal: 20,
    paddingVertical: 6.8,
    marginBottom: 20,
    marginTop: hp(3),
  },
  iconStyle: {
    color: '#C4C4C4',
    width: 20,
    height: 20,
  },
  iconStyleInactive: {
    color: '#FACA4E',
  },
  maintext: {
    fontSize: hp(2.3),
    color: '#303030',
    fontWeight: 'bold',
  },
  modaltextview: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: wp(90),
    borderRadius: 25,
    backgroundColor: 'white',
    paddingHorizontal: wp(15),
  },
  optiontext: {
    fontSize: hp(1.7),
    color: '#303030',
    marginLeft: wp(4),
  },
  nonselectedItems: {
    width: wp(35),
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: hp(14),
    borderRadius: wp(1.8),
    borderWidth: 1,
    borderColor: '#E7EAF2',
  },
  selectedItems: {
    width: wp(35),
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: hp(14),
    borderRadius: wp(1.8),
    borderWidth: 1,
    borderColor: '#FACA4E',
  },
});
