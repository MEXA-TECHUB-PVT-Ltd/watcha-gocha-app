import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Text,
  View,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Fontiso from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';

import Headers from '../../../assets/Custom/Headers';
import {appImages} from '../../../assets/utilities';
import Add from '../../../assets/svg/AddMainScreen.svg';
import Approved from '../../../assets/svg/Approved';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Toast from 'react-native-toast-message';

import NonVerified from '../../../assets/svg/NonVerified.svg';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {useIsFocused} from '@react-navigation/native';

export default function Disc({navigation, route}) {
  const [selectedItemId, setSelectedItemId] = useState(1);

  const [categoryIdNews, setCategoryIdNews] = useState(null);

  const [loading, setLoading] = useState(false);

  const isFocused = useIsFocused();

  const [newsData, setNewsData] = useState([]);

  const [topNewsData, setTopNewsData] = useState([]);

  const [authToken, setAuthToken] = useState('');

  const [opensLettersPublicGeneralData, setOpensLettersPublicGeneralData] =
    useState([]);

  const [opensLettersPublicCelebrityData, setOpensLettersPublicCelebrityData] =
    useState([]);

  const [opensLettersPrivateFriendsData, setOpensLettersPrivateFriendsData] =
    useState([]);

  const [
    opensLettersPrivateCelebrityData,
    setOpensLettersPrivateCelebrityData,
  ] = useState([]);

  const [qafiData, setQAFIData] = useState([]);

  const [gebcData, setGEBCData] = useState([]);

  const {NewsCategory, Type} = route?.params || {};

  useEffect(() => {
    if (isFocused) {
      getUserID(); // Call the async function
    }
  }, [NewsCategory, isFocused]); // Include 'id' in the dependency array

  const getUserID = async () => {
    try {
      const result = await AsyncStorage.getItem('authToken ');
      if (result !== null) {
        setAuthToken(result);
        fetchData();
        console.log('user id retrieved:', result);
      }
    } catch (error) {
      // Handle errors here
      console.error('Error retrieving user ID:', error);
    }
  };

  const fetchData = async () => {
    console.log('Received NewsCategory of:', NewsCategory);
    console.log('Received Type of:', Type);
    /*   Toast.show({
      type: 'success', // 'success', 'error', 'info', 'warning'
      position: 'bottom', // 'top', 'bottom', 'center'
      text1: NewsCategory.toString(),
      visibilityTime: 3000, // in milliseconds
      autoHide: true,
    }); */

    // Check if 'id' exists before using it
    if (NewsCategory) {
      console.log('Received id:', NewsCategory);
      setCategoryIdNews(NewsCategory); // Uncomment this line if you want to use id to set selectedItemId

      if (Type === 'NEWS') {
        setLoading(true);
        setSelectedItemId(1);
        console.log('Category Id News is ', NewsCategory);
        // Fetch data one by one
        await fetchNews();

        // Once all data is fetched, set loading to false
        setLoading(false);
      } else if (Type === 'QAFI') {
        setLoading(true);
        setSelectedItemId(3);
        console.log('Category Id QAFI is ', NewsCategory);
        // Fetch data one by one
        await fetchQAFI();

        // Once all data is fetched, set loading to false
        setLoading(false);
      } else if (Type === 'GEBC') {
        setLoading(true);
        setSelectedItemId(4);
        console.log('Category Id QAFI is ', NewsCategory);
        // Fetch data one by one
        await fetchGEBC();

        // Once all data is fetched, set loading to false
        setLoading(false);
      }
    } else {
      /*  setLoading(true);
      //setSelectedItemId(1)
      console.log('Category Id News is ', NewsCategory);
      // Fetch data one by one
      await fetchNews();

      // Once all data is fetched, set loading to false
      setLoading(false); */
    }
  };

  const fetchNews = async () => {
    console.log('Categry in id', categoryIdNews);
    console.log('News Called');
    const token = authToken;

    try {
      const response = await fetch(
        `https://watch-gotcha-be.mtechub.com/news/getAllNewsByCategory/${categoryIdNews}?page=1&limit=100`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      console.log('Resultings of QAFI', result);
      //Alert.alert(result)

      setNewsData(result.AllQAFIs); // Update the state with the fetched data

      fetchTopNews();
    } catch (error) {
      console.error('Error Trending:', error);
    }
  };

  const fetchTopNews = async () => {
    console.log('Categry in id', categoryIdNews);
    console.log('News Called');
    const token = authToken;

    try {
      const response = await fetch(
        `https://watch-gotcha-be.mtechub.com/top/getSpecificTopNEWSByCategory/${categoryIdNews}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      console.log('Resultings of QAFI', result);
      //Alert.alert(result)

      setTopNewsData(result.topNEWS[0]); // Update the state with the fetched data
    } catch (error) {
      console.error('Error Trending:', error);
    }
  };

  const fetchQAFI = async () => {
    console.log(' QAFI in id', categoryIdNews);
    const token = authToken;

    try {
      const response = await fetch(
        `https://watch-gotcha-be.mtechub.com/qafi/getAllQafisByCategory/${categoryIdNews}?page=1&limit=50`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      console.log('Resultings of QAFI', result.QAFIs);
      //Alert.alert(result)

      setQAFIData(result.QAFIs); // Update the state with the fetched data
    } catch (error) {
      console.error('Error Trending:', error);
    }
  };

  const fetchGEBC = async () => {
    console.log('Categry in id', categoryIdNews);
    const token = authToken;

    try {
      const response = await fetch(
        `https://watch-gotcha-be.mtechub.com/gebc/getAllGEBCsByCategory/${categoryIdNews}?page=1&limit=50`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      console.log('Resultings of News', result.GEBCs);
      //Alert.alert(result)

      setGEBCData(result.GEBCs); // Update the state with the fetched data
    } catch (error) {
      console.error('Error Trending:', error);
    }
  };

  const fetchLetterPublicGeneral = async () => {
    setLoading(true);
    console.log('Categry in id', categoryIdNews);
    const token = authToken;

    try {
      const response = await fetch(
        `https://watch-gotcha-be.mtechub.com/letter/public_general_by_category/3/?page=1&limit=100`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      console.log('Resultings of News', result.AllLetter);
      //Alert.alert(result)

      setOpensLettersPublicGeneralData(result.AllLetter); // Update the state with the fetched data
      await fetchLetterPublicCelebrity();
    } catch (error) {
      setLoading(false);
      console.error('Error Trending:', error);
    }
  };

  const fetchLetterPublicCelebrity = async () => {
    const token = authToken;

    try {
      const response = await fetch(
        `https://watch-gotcha-be.mtechub.com/letter/public_celebrity_by_category/3/?page=1&limit=10`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      console.log('Resultings of News', result.AllLetter);
      //Alert.alert(result)

      setOpensLettersPublicCelebrityData(result.AllLetter); // Update the state with the fetched data
      await fetchLetterPrivateFriends();
    } catch (error) {
      setLoading(false);

      console.error('Error Trending:', error);
    }
  };

  const fetchLetterPrivateFriends = async () => {
    const token = authToken;

    try {
      const response = await fetch(
        `https://watch-gotcha-be.mtechub.com/letter/private_friends_by_category/3/?page=1&limit=5`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      console.log('Resultings of News', result.AllLetter);
      //Alert.alert(result)

      setOpensLettersPrivateFriendsData(result.AllLetter); // Update the state with the fetched data
      await fetchLetterPrivateCelebrity();
    } catch (error) {
      console.error('Error Trending:', error);
    }
  };

  const fetchLetterPrivateCelebrity = async () => {
    const token = authToken;

    try {
      const response = await fetch(
        `https://watch-gotcha-be.mtechub.com/letter/private_celebrity_by_category/3/?page=1&limit=2`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      console.log('Resultings of News', result.AllLetter);
      //Alert.alert(result)

      setOpensLettersPrivateCelebrityData(result.AllLetter); // Update the state with the fetched data
      setLoading(false);
    } catch (error) {
      setLoading(false);

      console.error('Error Trending:', error);
    }
  };

  //DISC

  const renderPublicGeneral = item => {
    console.log('Item of general public', item);
    const imageUrl =
      item.images && item.images[0]
        ? item.images[0].startsWith('/fileUpload')
          ? `https://watch-gotcha-be.mtechub.com${item.images[0]}`
          : item.images[0]
        : null;

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('LetterDetails', {Letters: item})}
        style={{width: wp(25.5), margin: 5}}>
        <View>
          {item.images && item.images[0] ? (
            <Image
              style={{
                height: hp(12),
                width: wp(23),
              }}
              source={{uri: imageUrl}}
            />
          ) : (
            // Show dummy image if item.images is null or undefined
            <Image
              style={{
                height: hp(12),
                width: wp(23),
              }}
              source={appImages?.videoPlaceHolder}
            />
          )}
          {/* <Image
            style={{
              height: hp(12),
              width: wp(23),
            }}
            source={{uri: imageUrl}}
          />  */}
        </View>
      </TouchableOpacity>
    );
  };

  //-------------------\\

  const goToScreen = () => {
    if (selectedItemId === 2) {
      navigation.navigate('PostLetterInfo');
    } else if (selectedItemId === 1) {
      navigation.navigate('PostOnNews');
    } else if (selectedItemId === 3) {
      navigation.navigate('QAFI');
    } else if (selectedItemId === 4) {
      navigation.navigate('GEBC');
    }
  };

  const availableApps = [
    {
      id: 1,
      title: 'Item Name',
      image: appImages.topSearches1,
    },
    {
      id: 2,
      title: 'Item Name',
      image: appImages.topSearches2,
    },
    {
      id: 3,
      title: 'Item Name',
      image: appImages.topSearches3,
    },
    {
      id: 4,
      title: 'Item Name',
      image: appImages.topSearches4,
    },
    {
      id: 5,
      title: 'Item Name',
      image: appImages.topSearches1,
    },
    {
      id: 6,
      title: 'Item Name',
      image: appImages.topSearches2,
    },
    {
      id: 7,
      title: 'Item Name',
      image: appImages.topSearches3,
    },
    {
      id: 8,
      title: 'Item Name',
      image: appImages.topSearches4,
    },
    {
      id: 9,
      title: 'Item Name',
      image: appImages.topSearches1,
    },
    {
      id: 10,
      title: 'Item Name',
      image: appImages.topSearches2,
    },
  ];

  //Disc Screen

  const searches = [
    {id: 1, title: 'On News'},
    {id: 2, title: 'Open Letters'},
    {id: 3, title: 'QAFI'},
    {id: 4, title: 'GEBC'},
  ];

  const renderAvailableApps = item => {
    console.log('Items of News', item);
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ViewNews', {picData: item})}
        style={{width: wp(25.5), margin: 5}}>
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
              borderRadius: wp(1),
              resizeMode: 'cover',
            }}
            source={{uri: item.image}}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: hp(12),
            height: hp(7),
            width: wp(25),
          }}>
          {item?.userimage ? (
            <View
              style={{
                width: wp(7),
                marginLeft: wp(0.5),
                height: wp(7),
                overflow: 'hidden',
                borderRadius: wp(7) / 2,
              }}>
              <Image
                source={{uri: item?.userimage}}
                style={{width: '100%', height: '100%', resizeMode: 'cover'}}
              />
            </View>
          ) : (
            <View
              style={{
                width: wp(7),
                marginLeft: wp(0.5),
                height: wp(7),
                borderRadius: wp(7) / 2,
              }}>
              <MaterialCommunityIcons
                style={{marginTop: hp(0.5)}}
                name={'account-circle'}
                size={23}
                color={'#FACA4E'}
              />
              {/*  <Image
            source={appImages.profileImg}
            style={{width: '100%', height: '100%', resizeMode: 'cover'}}
          /> */}
            </View>
          )}

          <Text
            style={{
              fontSize: hp(1.5),
              marginLeft: wp(0.7),
              color: '#000000',
              fontWeight: 'bold',
              fontFamily: 'Inter',
            }}>
            {item.username}
          </Text>

          <View style={{marginLeft: wp(1)}}>
            <NonVerified />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderAvailableAppsQAFI = item => {
    console.log('Items of QAFI', item);
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ViewQAFI', {picData: item})}
        style={{width: wp(25.5), margin: 5}}>
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
              borderRadius: wp(1),
              resizeMode: 'cover',
            }}
            source={{uri: item.image}}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: hp(12),
            height: hp(7),
            width: wp(25),
          }}>
          {item?.userimage ? (
            <View
              style={{
                width: wp(7),
                marginLeft: wp(0.5),
                height: wp(7),
                overflow: 'hidden',
                borderRadius: wp(7) / 2,
              }}>
              <Image
                source={{uri: item?.userimage}}
                style={{width: '100%', height: '100%', resizeMode: 'cover'}}
              />
            </View>
          ) : (
            <View
              style={{
                width: wp(7),
                marginLeft: wp(0.5),
                height: wp(7),
                borderRadius: wp(7) / 2,
              }}>
              <MaterialCommunityIcons
                style={{marginTop: hp(0.5)}}
                name={'account-circle'}
                size={30}
                color={'#FACA4E'}
              />
              {/*  <Image
            source={appImages.profileImg}
            style={{width: '100%', height: '100%', resizeMode: 'cover'}}
          /> */}
            </View>
          )}

          <Text
            style={{
              fontSize: hp(1.5),
              marginLeft: wp(0.7),
              color: '#000000',
              fontWeight: 'bold',
              fontFamily: 'Inter',
            }}>
            {item.username}
          </Text>

          <View style={{marginLeft: wp(1)}}>
            <NonVerified />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderAvailableAppsGEBC = item => {
    console.log('Items of GEBC', item);
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ViewGEBC', {picData: item})}
        style={{width: wp(25.5), margin: 5}}>
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            height: hp(10),
            borderRadius: wp(1),
            resizeMode: 'stretch',
            borderWidth: 1, // Border width
            borderColor: 'grey', // Border color
          }}>
          <Text style={{fontSize: hp(5)}}>{item.image}</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: hp(1),
            height: hp(7),
            width: wp(25),
          }}>
          {item?.userimage ? (
            <View
              style={{
                width: wp(7),
                marginLeft: wp(0.5),
                height: wp(7),
                overflow: 'hidden',
                borderRadius: wp(7) / 2,
              }}>
              <Image
                source={{uri: item?.userimage}}
                style={{width: '100%', height: '100%', resizeMode: 'cover'}}
              />
            </View>
          ) : (
            <View
              style={{
                width: wp(7),
                marginLeft: wp(0.5),
                height: wp(7),
                borderRadius: wp(7) / 2,
              }}>
              <MaterialCommunityIcons
                style={{marginTop: hp(0.5)}}
                name={'account-circle'}
                size={30}
                color={'#FACA4E'}
              />
              {/*  <Image
            source={appImages.profileImg}
            style={{width: '100%', height: '100%', resizeMode: 'cover'}}
          /> */}
            </View>
          )}

          <Text
            style={{
              fontSize: hp(1.5),
              marginLeft: wp(0.7),
              color: '#000000',
              fontWeight: 'bold',
              fontFamily: 'Inter',
            }}>
            {item.username}
          </Text>

          <View style={{marginLeft: wp(1)}}>
            <NonVerified />
          </View>
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
          console.log('Selected item:', item.id);
          if (item.id === 1) {
            navigation.navigate('ViewAllCategories');
            console.log('Log screen');
          } else if (item.id === 2) {
            setSelectedItemId(2);
            fetchLetterPublicGeneral();
            console.log('On Letter id', item.id);
          } else if (item.id === 3) {
            navigation.navigate('ViewAllCategoriesQAFI');
          } else if (item.id === 4) {
            navigation.navigate('ViewAllCategoriesGEBC');
          }
        }}>
        <Text
          style={[
            styles.textSearchDetails,
            {color: isSelected ? '#232323' : '#939393'},
          ]}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  const DiscScreen = () => {
    return (
      <View style={{flex: 1}}>
        <View
          style={{marginTop: hp(1.5), flexDirection: 'row', height: hp(18)}}>
          {topNewsData === undefined || topNewsData.length === 0 ? (
            <View
              //onPress={() => navigation.navigate('News')}
              style={{width: wp(35), height: '100%', borderRadius: wp(5)}}>
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
            </View>
          ) : (
            <View
              //onPress={() => navigation.navigate('News')}
              style={{width: wp(35), height: '100%', borderRadius: wp(5)}}>
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
            </View>
          )}

          <View style={{justifyContent: 'center', flex: 1}}>
            {/*   <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: hp(7),
                width: wp(40),
              }}>
              <View
                style={{
                  width: wp(10),
                  marginLeft: wp(3),
                  height: wp(10),
                  borderRadius: wp(10) / 2,
                }}>
                <MaterialCommunityIcons
                  style={{marginTop: hp(0.5)}}
                  name={'account-circle'}
                  size={30}
                  color={'#FACA4E'}
                />
              </View>

              <Text
                style={{
                  fontSize: hp(1.6),
                  marginLeft: wp(2),
                  color: '#000000',
                  fontWeight: 'bold',
                  fontFamily: 'Inter',
                }}>
                Usama
              </Text>

              <View style={{marginLeft: wp(1)}}>
                <Approved />
              </View>
            </View> */}

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: hp(7),
                width: wp(35),
              }}>
              <Text
                style={{
                  fontSize: hp(1.5),
                  marginLeft: wp(2.5),
                  fontFamily: 'Inter-Regular',
                  color: '#000000',
                }}>
                {topNewsData === undefined || topNewsData.length === 0
                  ? 'Does not contain any top news'
                  : topNewsData?.description}
              </Text>
            </View>
          </View>
        </View>

        <View style={{marginTop: hp(2), height: hp(23)}}>
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
            ) : (
              <>
                {newsData?.length === 0 ? (
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
                    showsVerticalScrollIndicator={false}
                    data={newsData}
                    horizontal
                    //keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => renderAvailableApps(item)}
                  />
                )}
              </>
            )}
          </View>
        </View>

        <View style={{height: hp(23)}}>
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
            ) : (
              <FlatList
                style={{flex: 1}}
                showsVerticalScrollIndicator={false}
                data={newsData}
                horizontal
                //keyExtractor={item => item.id.toString()}
                renderItem={({item}) => renderAvailableApps(item)}
              />
            )}
          </View>
        </View>

        <View style={{height: hp(23)}}>
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
            ) : (
              <FlatList
                style={{flex: 1}}
                showsVerticalScrollIndicator={false}
                data={newsData}
                horizontal
                //keyExtractor={item => item.id.toString()}
                renderItem={({item}) => renderAvailableApps(item)}
              />
            )}
          </View>
        </View>

        <View style={{height: hp(23)}}>
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
            ) : (
              <FlatList
                style={{flex: 1}}
                showsVerticalScrollIndicator={false}
                data={newsData}
                horizontal
                //keyExtractor={item => item.id.toString()}
                renderItem={({item}) => renderAvailableApps(item)}
              />
            )}
          </View>
        </View>
      </View>
    );
  };

  const QAFI = () => {
    console.log('Came to QAFI');
    return (
      <View style={{flex: 1}}>
        <View
          style={{marginTop: hp(1.5), flexDirection: 'row', height: hp(18)}}>
          <View
            onPress={() => navigation.navigate('News')}
            style={{width: wp(35), height: '100%', borderRadius: wp(5)}}>
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
          </View>

          <View style={{justifyContent: 'flex-end', flex: 1}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: hp(7),
                width: wp(40),
              }}>
              <View
                style={{
                  width: wp(10),
                  marginLeft: wp(3),
                  height: wp(10),
                  borderRadius: wp(10) / 2,
                }}>
                <MaterialCommunityIcons
                  style={{marginTop: hp(0.5)}}
                  name={'account-circle'}
                  size={30}
                  color={'#FACA4E'}
                />
                {/*  <Image
                  source={appImages.profileImg}
                  style={{width: '100%', height: '100%', resizeMode: 'cover'}}
                /> */}
              </View>

              <Text
                style={{
                  fontSize: hp(1.6),
                  marginLeft: wp(2),
                  color: '#000000',
                  fontWeight: 'bold',
                  fontFamily: 'Inter',
                }}>
                Usama
              </Text>

              <View style={{marginLeft: wp(1)}}>
                <Approved />
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: hp(7),
                width: wp(35),
              }}>
              <Text
                style={{
                  fontSize: hp(1.5),
                  marginLeft: wp(2.5),
                  fontFamily: 'Inter-Regular',
                  color: '#000000',
                }}>
                Explore the intricate web of global politics in this thought-
              </Text>
            </View>
          </View>
        </View>

        <View style={{marginTop: hp(2), height: hp(23)}}>
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
            ) : (
              <>
                {qafiData?.length === 0 ? (
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
                    showsVerticalScrollIndicator={false}
                    data={qafiData}
                    horizontal
                    //keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => renderAvailableAppsQAFI(item)}
                  />
                )}
              </>
            )}
          </View>
        </View>

        <View style={{height: hp(23)}}>
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
            ) : (
              <>
                {qafiData?.length === 0 ? (
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
                    showsVerticalScrollIndicator={false}
                    data={qafiData}
                    horizontal
                    //keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => renderAvailableAppsQAFI(item)}
                  />
                )}
              </>
            )}
          </View>
        </View>

        <View style={{height: hp(23)}}>
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
            ) : (
              <>
                {qafiData?.length === 0 ? (
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
                    showsVerticalScrollIndicator={false}
                    data={qafiData}
                    horizontal
                    //keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => renderAvailableAppsQAFI(item)}
                  />
                )}
              </>
            )}
          </View>
        </View>

        <View style={{height: hp(23)}}>
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
            ) : (
              <>
                {qafiData?.length === 0 ? (
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
                    showsVerticalScrollIndicator={false}
                    data={qafiData}
                    horizontal
                    //keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => renderAvailableAppsQAFI(item)}
                  />
                )}
              </>
            )}
          </View>
        </View>
      </View>
    );
  };

  const GEBC = () => {
    return (
      <View style={{flex: 1}}>
        <View
          style={{marginTop: hp(1.5), flexDirection: 'row', height: hp(18)}}>
          <View
            onPress={() => navigation.navigate('News')}
            style={{width: wp(35), height: '100%', borderRadius: wp(5)}}>
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
          </View>

          <View style={{justifyContent: 'flex-end', flex: 1}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: hp(7),
                width: wp(40),
              }}>
              <View
                style={{
                  width: wp(10),
                  marginLeft: wp(3),
                  height: wp(10),
                  borderRadius: wp(10) / 2,
                }}>
                {/* <Image
                  source={appImages.galleryPlaceHolder}
                  style={{width: '100%', height: '100%', resizeMode: 'cover'}}
                /> */}

                <MaterialCommunityIcons
                  style={{marginTop: hp(0.5)}}
                  name={'account-circle'}
                  size={28}
                  color={'#FACA4E'}
                />
              </View>

              <Text
                style={{
                  fontSize: hp(1.6),
                  marginLeft: wp(2),
                  color: '#000000',
                  fontWeight: 'bold',
                  fontFamily: 'Inter',
                }}>
                Usama
              </Text>

              <View style={{marginLeft: wp(1)}}>
                <Approved />
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: hp(7),
                width: wp(35),
              }}>
              <Text
                style={{
                  fontSize: hp(1.5),
                  marginLeft: wp(2.5),
                  fontFamily: 'Inter-Regular',
                  color: '#000000',
                }}>
                Explore the intricate web of global politics in this thought-
              </Text>
            </View>
          </View>
        </View>

        <View style={{marginTop: hp(2), height: hp(23)}}>
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
            ) : (
              <>
                {gebcData?.length === 0 ? (
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
                    showsVerticalScrollIndicator={false}
                    data={gebcData}
                    horizontal
                    //keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => renderAvailableAppsGEBC(item)}
                  />
                )}
              </>
            )}
          </View>
        </View>

        <View style={{height: hp(23)}}>
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
            ) : (
              <>
                {gebcData?.length === 0 ? (
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
                    showsVerticalScrollIndicator={false}
                    data={gebcData}
                    horizontal
                    //keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => renderAvailableAppsGEBC(item)}
                  />
                )}
              </>
            )}
          </View>
        </View>

        <View style={{height: hp(23)}}>
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
            ) : (
              <>
                {gebcData?.length === 0 ? (
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
                    showsVerticalScrollIndicator={false}
                    data={gebcData}
                    horizontal
                    //keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => renderAvailableAppsGEBC(item)}
                  />
                )}
              </>
            )}
          </View>
        </View>

        <View style={{height: hp(23)}}>
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
            ) : (
              <>
                {gebcData?.length === 0 ? (
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
                    showsVerticalScrollIndicator={false}
                    data={gebcData}
                    horizontal
                    //keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => renderAvailableAppsGEBC(item)}
                  />
                )}
              </>
            )}
          </View>
        </View>
      </View>
    );
  };

  const OpenLetters = () => {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            height: hp(21),
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}>
          <Image
            source={appImages.openLettersFirst}
            style={{resizeMode: 'contain', width: wp(55)}}
          />
        </View>

        <View style={{height: hp(21)}}>
          <Text style={{color: '#4A4A4A', fontWeight: 'bold', fontSize: hp(2)}}>
            Public (general)
          </Text>
          <FlatList
            style={{flex: 1}}
            contentContainerStyle={{alignItems: 'center'}}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={opensLettersPublicGeneralData}
            keyExtractor={item => item?.post_id.toString()}
            renderItem={({item}) => renderPublicGeneral(item)}
          />
        </View>

        <View style={{marginTop: hp(5), height: hp(21)}}>
          <Text style={{color: '#4A4A4A', fontWeight: 'bold', fontSize: hp(2)}}>
            Public (to authorities, celebrities, leaders)
          </Text>
          <FlatList
            style={{flex: 1}}
            contentContainerStyle={{alignItems: 'center'}}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={opensLettersPublicCelebrityData}
            keyExtractor={item => item?.post_id.toString()}
            renderItem={({item}) => renderPublicGeneral(item)}
          />
        </View>

        <View style={{marginTop: hp(5), height: hp(21)}}>
          <Text style={{color: '#4A4A4A', fontWeight: 'bold', fontSize: hp(2)}}>
            Private (to friends, peers, followers)
          </Text>
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
          {/* <FlatList
            style={{flex: 1}}
            contentContainerStyle={{alignItems: 'center'}}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={opensLettersPublicCelebrityData}
            keyExtractor={item => item?.post_id.toString()}
            renderItem={({item}) => renderPublicGeneral(item)}
          /> */}
        </View>

        <View style={{marginTop: hp(5), height: hp(21)}}>
          <Text style={{color: '#4A4A4A', fontWeight: 'bold', fontSize: hp(2)}}>
            Private (to authorities, celebrities, leaders){' '}
          </Text>

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
          {/*  <FlatList
            style={{flex: 1}}
            contentContainerStyle={{alignItems: 'center'}}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={opensLettersPublicCelebrityData}
            keyExtractor={item => item?.post_id.toString()}
            renderItem={({item}) => renderPublicGeneral(item)}
          /> */}
        </View>
      </View>
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
          onPressMenu={() => navigation.openDrawer()}
          onPressSearch={() => navigation.navigate('SearchAppsDisc')}
          showText={true}
          text={'Disc'}
          showSearch={true}
        />
      </View>

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

      <View style={{marginTop: hp(1), marginHorizontal: wp(8)}}>
        <Text style={{color: '#FACA4E', fontWeight: 'bold', fontSize: hp(2.3)}}>
          DISC
        </Text>
      </View>

      <View style={styles.latestSearchList}>
        <Text style={{color: '#232323', fontWeight: 'bold', fontSize: hp(2.1)}}>
          Top
        </Text>
        <FlatList
          style={{flex: 1}}
          contentContainerStyle={{alignItems: 'center'}}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={searches}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => renderSearches(item)}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          marginTop: hp(1),
          marginHorizontal: wp(8),
        }}>
        {selectedItemId === 1 ? (
          <DiscScreen />
        ) : selectedItemId === 2 ? (
          <OpenLetters />
        ) : selectedItemId === 3 ? (
          <QAFI />
        ) : selectedItemId === 4 ? (
          <GEBC />
        ) : null}
      </ScrollView>

      <TouchableOpacity
        onPress={() => goToScreen()}
        style={{position: 'absolute', bottom: 1, right: 25}}>
        <Add />
      </TouchableOpacity>

      <Toast ref={ref => Toast.setRef(ref)} />
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
    marginHorizontal: wp(8),
    //marginLeft: wp(5),
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
    width: wp(25),
    backgroundColor: '#F2F2F2',
    borderRadius: wp(5),
    height: hp(5),
  },
  textSearchDetails: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: hp(1.8),
  },
  textHeader: {
    fontSize: wp(5.7),
    color: '#333333',
    fontFamily: 'Inter',
    fontWeight: 'bold',
  },
});
