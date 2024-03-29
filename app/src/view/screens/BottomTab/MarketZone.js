import {
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Text,
  View,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Fontiso from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RBSheet from 'react-native-raw-bottom-sheet';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';

import Headers from '../../../assets/Custom/Headers';
import {appImages} from '../../../assets/utilities';
import Add from '../../../assets/svg/AddMainScreen.svg';

export default function MarketZone({navigation}) {
  const [selectedItemId, setSelectedItemId] = useState(null);

  const [data, setData] = useState(null);

  const [authToken, setAuthToken] = useState('');

  const [dataElectronics, setDataElectronics] = useState(null);

  const isFocused = useIsFocused();

  const [dataVehicles, setDataVehicles] = useState(null);

  const [dataClothing, setDataClothing] = useState(null);

  //const [regions, setRegions] = useState(null);

  const [regions, setRegions] = useState(null);

  const [loading, setLoading] = useState(false);

  const [categoriesSelect, setCategorySelect] = useState([]);

  const [snackBarVisible, setSnackbarVisible] = useState(false);

  const [dataTopVideos, setDataTopVideos] = useState([]);

  const ref_RBSheetCamera = useRef(null);

  const RegionArea = ['Africa', 'Europe', 'Americas', 'Asia', 'Middle East'];

  useEffect(() => {
    // Make the API request and update the 'data' state
    if (selectedItemId === null) {
      setSelectedItemId('Africa');
    } else {
      fetchVideos();
    }
  }, [selectedItemId, isFocused]);

  const fetchVideos = async () => {
    // Simulate loading
    setLoading(true);
    // Fetch data one by one

    await getUserID();

    await fetchAll();

    await fetchTopVideos();

    await fetchElectronics();

    await fetchVehicles();

    await fetchClothing();
    // Once all data is fetched, set loading to false
    setLoading(false);
  };

  const getUserID = async () => {
    console.log('AT User Id');
    try {
      const result = await AsyncStorage.getItem('authToken ');
      if (result !== null) {
        setAuthToken(result);
        //await fetchRegion(result);
        await fetchCategory(result);
        console.log('user id retrieved:', result);
      }
    } catch (error) {
      // Handle errors here
      console.error('Error retrieving user ID:', error);
    }
  };

  const fetchAll = async () => {
    //console.log("Categry in id", selectedItemId)
    const token = authToken;

    try {
      const response = await fetch(
        'https://watch-gotcha-be.mtechub.com/item/getAllItems?page=1&limit=2',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      console.log('AllItems', result.AllItems);
      setData(result.AllItems); // Update the state with the fetched data
    } catch (error) {
      console.error('Error Trending:', error);
    }
  };

  const fetchElectronics = async () => {
    console.log('Categry in id', selectedItemId);
    const token = authToken;

    try {
      const response = await fetch(
        `https://watch-gotcha-be.mtechub.com/item/getAllItemByCategory/5?page=1&limit=5&region=${selectedItemId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      console.log(' s', result.AllItems);
      setDataElectronics(result.AllItems); // Update the state with the fetched data
    } catch (error) {
      console.error('Error Trending:', error);
    }
  };

  const fetchVehicles = async () => {
    //console.log("Categry in id", selectedItemId)
    const token = authToken;

    try {
      const response = await fetch(
        `https://watch-gotcha-be.mtechub.com/item/getAllItemByCategory/6?page=1&limit=5&region=${selectedItemId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      console.log('AllItems', result.AllItems);
      setDataVehicles(result.AllItems); // Update the state with the fetched data
    } catch (error) {
      console.error('Error Trending:', error);
    }
  };

  const fetchTopVideos = async () => {
    const token = authToken;

    try {
      const response = await fetch(
        `https://watch-gotcha-be.mtechub.com/top/app/top_item`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      console.log(
        'Resultings of Top Market Place',
        result.topitem[0]?.images[0]?.image,
      );
      setDataTopVideos(result.topitem[0]); // Update the state with the fetched data
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchClothing = async () => {
    //console.log("Categry in id", selectedItemId)
    const token = authToken;

    try {
      const response = await fetch(
        `https://watch-gotcha-be.mtechub.com/item/getAllItemByCategory/12?page=1&limit=5&region=${selectedItemId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      console.log('AllItems', result.AllItems);
      setDataClothing(result.AllItems); // Update the state with the fetched data
    } catch (error) {
      console.error('Error Trending:', error);
    }
  };

  const fetchRegion = async resultId => {
    //console.log("Categry in id", selectedItemId)
    const token = resultId;

    try {
      const response = await fetch(
        'https://watch-gotcha-be.mtechub.com/region/getAllRegion',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      console.log('AllItems', result.allRegion);
      setRegions(result.allRegion); // Update the state with the fetched data

      // await fetchCategory(resultId);
    } catch (error) {
      console.error('Error Trending:', error);
    }
  };
  const fetchCategory = async result => {
    console.log(' Categories Result', result);
    const token = result;

    try {
      const response = await fetch(
        'https://watch-gotcha-be.mtechub.com/itemCategory/getAllItemCategories?page=1&limit=5',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.ok) {
        const data = await response.json();

        console.log('Data ', data);

        // Use the data from the API to set the categories
        const categories = data.AllCategories.map(category => ({
          label: category.name, // Use the "name" property as the label
          value: category.id.toString(), // Convert "id" to a string for the value
        }));

        setCategorySelect(categories); // Update the state with the formatted category data

        console.log('Data Categories', categoriesSelect);
      } else {
        console.error(
          'Failed to fetch categories:',
          response.status,
          response.statusText,
        );
      }
    } catch (error) {
      console.error('Error:', error);
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

  const searches = [
    {id: 1, title: 'Africa'},
    {id: 2, title: 'Europe'},
    {id: 3, title: 'N America'},
    {id: 4, title: 'L. America'},
    {id: 5, title: 'Asia'},
    {id: 6, title: 'Middle East'},
    {id: 7, title: 'Carribean'},
  ];

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

  const goToScreen = () => {
    ref_RBSheetCamera.current.close();

    navigation.navigate('Sell');
  };

  const renderAvailableAppsMarket = item => {
    console.log('Items of market zone', item?.images[0]?.image);
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ProductDetails', {ProductDetails: item})
        }
        style={{width: wp(25.5), margin: 5}}>
        <View>
          {!item?.images[0]?.image ||
          item?.images[0]?.image === 'undefined' ||
          item?.images[0]?.image.startsWith('/') ? (
            <Image
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 1,
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
                height: hp(16),
                borderRadius: wp(2.5),
                resizeMode: 'cover',
              }}
              source={{uri: item?.images[0]?.image}}
            />
          )}
        </View>

        <View
          style={{
            position: 'absolute',
            top: hp(12),
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
              fontSize: hp(1.7),
              fontFamily: 'Inter',
              color: 'black',
              fontWeight: '700',
            }}>
            {item?.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderAvailableApps = item => {
    console.log('Items of market zone', item?.images[0]?.image);
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ProductDetails', {ProductDetails: item})
        }
        style={{width: wp(25.5), margin: 5}}>
        <View>
          {!item?.images[0]?.image ||
          item?.images[0]?.image === 'undefined' ||
          item?.images[0]?.image.startsWith('/') ? (
            <Image
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 1,
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
                height: hp(16),
                borderRadius: wp(2.5),
                resizeMode: 'cover',
              }}
              source={{uri: item?.images[0]?.image}}
            />
          )}
        </View>

        <View
          style={{
            position: 'absolute',
            top: hp(12),
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
              fontSize: hp(1.7),
              fontFamily: 'Inter',
              color: 'black',
              fontWeight: '700',
            }}>
            {item?.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderSearches = item => {
    console.log('Regions', item);
    const isSelected = selectedItemId === item;

    return (
      <TouchableOpacity
        style={[
          styles.searchesDetails,
          {
            backgroundColor: isSelected ? '#FACA4E' : '#F2F2F2',
          },
        ]}
        onPress={() => {
          setSelectedItemId(item);
          console.log('Selected item:', item);
        }}>
        <Text
          style={[
            styles.textSearchDetails,
            {color: isSelected ? '#232323' : '#939393'},
          ]}>
          {item}
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
          onPressListings={() => navigation.openDrawer()}
          showListings={true}
          showText={true}
          onPressSearch={() => navigation.navigate('SearchProducts')}
          text={'Market Zone'}
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

        <View style={{marginTop: hp(1), marginLeft: wp(5)}}>
          <Text
            style={{color: '#FACA4E', fontWeight: 'bold', fontSize: hp(2.3)}}>
            Market Zone
          </Text>
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
            //data={regions}
            data={RegionArea}
            //keyExtractor={item => item.id.toString()}
            renderItem={({item}) => renderSearches(item)}
          />
        </View>
        <View
          style={{marginTop: hp(1.5), flexDirection: 'row', height: hp(16)}}>
          <View style={{width: wp(43), height: '100%', borderRadius: wp(5)}}>
            {dataTopVideos.length===0?(<Image
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

            />):(
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
              source={{uri:dataTopVideos?.images[0]?.image}}

            />
            )}
            <View
              style={{
                position: 'absolute',
                top: hp(12),
                left: 7,
                //height: hp(3),
                //width: wp(21),
                //borderRadius: wp(3),
                //backgroundColor: '',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 2, // Ensure it's on top
              }}>
              <Text
              ellipsizeMode='tail'
              numberOfLines={1}
                style={{
                  fontSize: hp(2.5),
                  fontFamily: 'Inter-Medium',
                  color: 'black',
                  fontWeight: '700',
                }}>
                {dataTopVideos?.item_name}
              </Text>
            </View>
          </View>

          <View style={{justifyContent: 'flex-end', width: '50%'}}>
            <Text
              style={{
                fontSize: hp(1.5),
                marginLeft: wp(1),
                lineHeight: hp(2),
                fontFamily: 'Inter-Regular',
                color: '#000000',
                //fontWeight: '700',
              }}>
              {/*  Explore the intricate web of global politics in this
              thought-provoking video as we delve into the ever-shifting
              landscape of international diplomacy...... */}

              {dataTopVideos === undefined || dataTopVideos.length === 0
                ? 'No Top Pic Shown'
                : dataTopVideos?.description}
            </Text>
          </View>
        </View>

        <View style={{marginTop: hp(2), height: hp(23)}}>
          <Text
            style={{
              fontSize: hp(2.3),
              //marginLeft: wp(3),
              fontFamily: 'Inter',
              color: '#4A4A4A',
              fontWeight: 'bold',
            }}>
            {categoriesSelect[0]?.label}
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
            ) : (
              <>
                {dataClothing?.length === 0 ? (
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
                    data={dataClothing}
                    horizontal
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => renderAvailableApps(item)}
                  />
                )}
              </>
            )}
          </View>
        </View>

        <View style={{marginTop: hp(2), height: hp(23)}}>
          <Text
            style={{
              fontSize: hp(2.3),
              marginLeft: wp(3),
              fontFamily: 'Inter',
              color: '#4A4A4A',
              fontWeight: 'bold',
            }}>
            {categoriesSelect[1]?.label}
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
            ) : (
              <>
                {dataVehicles?.length === 0 ? (
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
                    data={dataVehicles}
                    horizontal
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => renderAvailableAppsMarket(item)}
                  />
                )}
              </>
            )}
          </View>
        </View>

        <View style={{marginTop: hp(2), height: hp(23)}}>
          <Text
            style={{
              fontSize: hp(2.3),
              marginLeft: wp(3),
              fontFamily: 'Inter',
              color: '#4A4A4A',
              fontWeight: 'bold',
            }}>
            {categoriesSelect[2]?.label}
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
            ) : (
              <>
                {dataElectronics?.length === 0 ? (
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
                    data={dataElectronics}
                    horizontal
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => renderAvailableApps(item)}
                  />
                )}
              </>
            )}
          </View>
        </View>

        <View style={{marginTop: hp(2), height: hp(23)}}>
          <Text
            style={{
              fontSize: hp(2.3),
              marginLeft: wp(3),
              fontFamily: 'Inter',
              color: '#4A4A4A',
              fontWeight: 'bold',
            }}>
            All other items
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
            ) : (
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
                ) : (
                  <FlatList
                    style={{flex: 1}}
                    showsHorizontalScrollIndicator={false}
                    data={data}
                    horizontal
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => renderAvailableAppsMarket(item)}
                  />
                )}
              </>
            )}
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={() => navigation.navigate('Sell')}
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
            height: hp(39),
          },
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: wp(8),
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'Inter-Medium',
              color: '#303030',
              fontSize: hp(2.3),
            }}>
            Select an option
          </Text>
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
            //flexDirection: 'row',
            justifyContent: 'space-evenly',
            //alignItems: 'center',
            //borderWidth: 3,
            marginTop: hp(3),
          }}>
          <TouchableOpacity
            onPress={() => goToScreen()}
            style={{flexDirection: 'row', marginHorizontal: wp(7)}}>
            <Text
              style={{
                fontFamily: 'Inter-Regular',
                color: '#656565',
                marginLeft: wp(3),
                fontSize: hp(2.1),
              }}>
              Phones And Electronics
            </Text>
          </TouchableOpacity>

          <View
            style={{
              height: hp(0.1),
              marginHorizontal: wp(8),
              marginTop: hp(3),
              backgroundColor: '#00000012',
            }}></View>

          <TouchableOpacity
            onPress={() => goToScreen()}
            style={{
              flexDirection: 'row',
              marginTop: hp(1.8),
              marginHorizontal: wp(7),
            }}>
            <Text
              style={{
                fontFamily: 'Inter-Regular',
                color: '#656565',
                marginLeft: wp(3),
                fontSize: hp(2.1),
              }}>
              Vehicle Parts
            </Text>
          </TouchableOpacity>

          <View
            style={{
              height: hp(0.1),
              marginHorizontal: wp(8),
              marginTop: hp(3),
              backgroundColor: '#00000012',
            }}></View>

          <TouchableOpacity
            onPress={() => goToScreen()}
            style={{
              flexDirection: 'row',
              marginTop: hp(1.8),
              marginHorizontal: wp(7),
            }}>
            <Text
              style={{
                fontFamily: 'Inter-Regular',
                color: '#656565',
                marginLeft: wp(3),
                fontSize: hp(2.1),
              }}>
              Clothing and Related item
            </Text>
          </TouchableOpacity>

          <View
            style={{
              height: hp(0.1),
              marginTop: hp(1.8),
              marginHorizontal: wp(8),
              marginTop: hp(3),
              backgroundColor: '#00000012',
            }}></View>

          <TouchableOpacity
            onPress={() => goToScreen()}
            style={{
              flexDirection: 'row',
              marginTop: hp(1.8),
              marginHorizontal: wp(7),
            }}>
            <Text
              style={{
                fontFamily: 'Inter-Regular',
                color: '#656565',
                marginLeft: wp(3),
                fontSize: hp(2.1),
              }}>
              All other items
            </Text>
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
    width: wp(30),
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
