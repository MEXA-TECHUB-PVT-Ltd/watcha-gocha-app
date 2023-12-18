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
import React, {useState, useEffect} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Fontiso from 'react-native-vector-icons/Fontisto';
import Headers from '../../../assets/Custom/Headers';
import {appImages} from '../../../assets/utilities';
import {DraxProvider, DraxView} from 'react-native-drax';
import {BlurView} from '@react-native-community/blur';

// hover apps

import {InstalledApps, RNLauncherKitHelper} from 'react-native-launcher-kit';
import Swiper from 'react-native-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useIsFocused} from '@react-navigation/native';

//------------------------\\
export default function Categories({navigation}) {
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [dataApps, setData] = useState([]);
  const [isLongPress, setIsLongPress] = useState(false);

  const [isLongPressRemove, setIsLongPressRemove] = useState(false);

  const [favouriteItem, setFavouriteItem] = useState(null);
  const [removeFavouriteItem, setRemoveFavouriteItem] = useState(null);

  const [favouriteData, setFavouriteData] = useState([]);

  const isFocused = useIsFocused();

  const [topData, setTopData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [flatListKey, setFlatListKey] = useState(Date.now()); // Add a key for the FlatList

  useEffect(() => {
    const fetchData = async () => {
      const installedApps = InstalledApps.getSortedApps();
      const packageNames = installedApps.map(app => app.label);
      const packageImages = installedApps.map(app => app.icon);
      const packageBundle = installedApps.map(app => app.packageName);
      const packageDataArray = packageNames.map((packageName, index) => ({
        label: packageName,
        bundle: packageBundle[index],
        image: packageImages[index],
      }));

      setData(packageDataArray);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  //-------------- Use Effect-------------------\\

  useEffect(() => {
    if (isFocused) {
      // Load favouriteData from AsyncStorage when the component mounts
      const loadFavouriteData = async () => {
        try {
          const storedData = await AsyncStorage.getItem('favouriteData');
          if (storedData) {
            const parsedData = JSON.parse(storedData);
            setFavouriteData(parsedData);
          }
        } catch (error) {
          console.error(
            'Error loading favourite data from AsyncStorage:',
            error,
          );
        }
      };

      loadFavouriteData();
    }
  }, [isFocused]); // Run this effect only once when the component mounts

  useEffect(() => {
    if (isFocused) {
      // Save favouriteData to AsyncStorage whenever it changes
      const saveFavouriteData = async () => {
        try {
          await AsyncStorage.setItem(
            'favouriteData',
            JSON.stringify(favouriteData),
          );
        } catch (error) {
          console.error('Error saving favourite data to AsyncStorage:', error);
        }
      };
      saveFavouriteData();
      //AsyncStorage.removeItem('topData');
    }
  }, [favouriteData, isFocused]); // Run this effect whenever favouriteData changes

  //------------------------------------\\

  //-------------------Use Effect Top Apps---------\\

  useEffect(() => {
    if (isFocused) {
      // Load topData from AsyncStorage when the component mounts
      const loadTopData = async () => {
        try {
          const storedData = await AsyncStorage.getItem('topData');
          if (storedData) {
            const parsedData = JSON.parse(storedData);
            setTopData(parsedData);
          }
        } catch (error) {
          console.error('Error loading top data from AsyncStorage:', error);
        }
      };

      loadTopData();
    }
  }, [isFocused]); // Run this effect only once when the component mounts

  useEffect(() => {
    if (isFocused) {
      // Save topData to AsyncStorage whenever it changes
      const saveTopData = async () => {
        try {
          await AsyncStorage.setItem('topData', JSON.stringify(topData));
        } catch (error) {
          console.error('Error saving top data to AsyncStorage:', error);
        }
      };

      saveTopData();
    }
  }, [topData]); // Run this effect whenever topData changes

  //---------------------------------------------\\

  const itemsPerPage = 10; // Change this to set the number of items per screen
  const screens = Math.ceil(dataApps.length / itemsPerPage);

  /* const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
 */

  const [availableApps, setAvailableApps] = useState([
    {id: 11, title: 'SnapChat', image: appImages.snapchat},
    {id: 21, title: 'Gmail', image: appImages.gmail},
    {id: 31, title: 'Pinterest', image: appImages.pinterest},
    {id: 41, title: 'LinkedIn', image: appImages.linkedIn},
    {id: 51, title: 'Calendar', image: appImages.calendar},
    {id: 61, title: 'SnapChat', image: appImages.snapchat},
  ]);
  const [favouriteApps, setFavouriteApps] = useState([
    {id: 1, title: 'SnapChat', image: appImages.snapchat},
    {id: 2, title: 'Gmail', image: appImages.gmail},
    {id: 3, title: 'Pinterest', image: appImages.pinterest},
    {id: 4, title: 'LinkedIn', image: appImages.linkedIn},
    {id: 5, title: 'Calendar', image: appImages.calendar},
    {id: 6, title: 'SnapChat', image: appImages.snapchat},
    {id: 7, title: 'SnapChat', image: appImages.snapchat},
    {id: 8, title: 'Gmail', image: appImages.gmail},
    {id: 9, title: 'Pinterest', image: appImages.pinterest},
    {id: 10, title: 'LinkedIn', image: appImages.linkedIn},
  ]);

  /*  const availableApps = [
    
  ]; */

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

  /* const favouriteApps = [
    
  ]; */

  const onDragEnd = (data, targetList, item) => {
    console.log('data list', data);
    console.log('target list item', item);

    // Handle the item drop here
    // Update the target list based on the dragged item data
    // You might want to implement your own logic here
    const updatedList = [...targetList, item];

    // Update the state and use the callback to log the updated state
    setFavouriteApps(updatedList, () => {
      console.log('On drag ends FavouriteList', favouriteApps);
    });

    setFlatListKey(Date.now()); // Update the key to force re-render
  };

  const renderApps = item => {
    //console.log('item at first', item);
    const openApp = async items => {
      try {
        // Launch the application
        await RNLauncherKitHelper.launchApplication(item.bundle);

        // Check if the app is already in the topData array
        const appIndex = topData.findIndex(app => app.bundle === item.bundle);

        if (appIndex !== -1) {
          // If the app is already in the array, update the count
          const updatedTopData = [...topData];
          updatedTopData[appIndex] = {
            ...updatedTopData[appIndex],
            count: updatedTopData[appIndex].count + 1,
          };

          setTopData(updatedTopData);
        } else {
          // If the app is not in the array, add it with count 1
          setTopData(prevData => [
            ...prevData,
            {
              label: item.label,
              bundle: item.bundle,
              image: item.image,
              count: 1,
            },
          ]);
        }

        await RNLauncherKitHelper.launchApplication(items); // Assuming 'item.label' is the package name
      } catch (error) {
        console.error('Error opening the app:', error);
        await RNLauncherKitHelper.launchApplication(items); // Assuming 'item.label' is the package name
      }
    };

    return (
      <TouchableOpacity
        onLongPress={() => {
          setIsLongPress(true);
          setFavouriteItem(item);
        }}
        onPress={() => openApp(item?.bundle)}
        style={styles.items}>
        <Image
          style={{width: 30, height: 30}}
          source={{uri: `data:image/png;base64,${item?.image}`}}
        />
        <Text style={{color: '#000000', fontSize: hp(1.3), fontWeight: 'bold'}}>
          {item?.label}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderFavouritesApps = item => {
    //console.log('item at first', item);
    const openApp = async items => {
      try {
        // Launch the application
        await RNLauncherKitHelper.launchApplication(item.bundle);

        // Check if the app is already in the topData array
        const appIndex = topData.findIndex(app => app.bundle === item.bundle);

        if (appIndex !== -1) {
          // If the app is already in the array, update the count
          const updatedTopData = [...topData];
          updatedTopData[appIndex] = {
            ...updatedTopData[appIndex],
            count: updatedTopData[appIndex].count + 1,
          };

          setTopData(updatedTopData);
        } else {
          // If the app is not in the array, add it with count 1
          setTopData(prevData => [
            ...prevData,
            {
              label: item.label,
              bundle: item.bundle,
              image: item.image,
              count: 1,
            },
          ]);
        }

        await RNLauncherKitHelper.launchApplication(items); // Assuming 'item.label' is the package name
      } catch (error) {
        console.error('Error opening the app:', error);
        await RNLauncherKitHelper.launchApplication(items); // Assuming 'item.label' is the package name
      }
    };

    return (
      <TouchableOpacity
        onLongPress={() => {
          setIsLongPressRemove(true);
          setRemoveFavouriteItem(item);
        }}
        //onPress={() => openApp(item?.bundle)}
        style={styles.items}>
        <Image
          style={{width: 30, height: 30}}
          source={{uri: `data:image/png;base64,${item?.image}`}}
        />
        <Text style={{color: '#000000', fontSize: hp(1.3), fontWeight: 'bold'}}>
          {item?.label}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderFavouriteApps = item => {
    console.log('Items', item);
    return (
      <View
        onDragEnd={({dragged: data}) => onDragEnd(data, favouriteApps)}
        style={{
          height: hp(8),
          width: wp(15),
          margin: 2.8,
        }}>
        <Image source={item?.image} />
      </View>
      /* 
draggingStyle={{opacity: 0.5}}
dragReleasedStyle={{opacity: 1}}

onDragEnd={({dragged: data}) => onDragEnd(data, favouriteApps)} */
    );
  };

  const renderAvailableApps = item => {
    // Render the item only if count is equal to 2
    if (item.count >= 2) {
      return (
        <Image
          style={{width: 30, height: 30}}
          source={{uri: `data:image/png;base64,${item?.image}`}}
        />
      );
    } else {
      // Return null or an empty view if count is not equal to 2
      return null;
    }

    /* draggingStyle={{opacity: 0.5}}
    dragReleasedStyle={{opacity: 1}}
    onDragStart={() => console.log('Drag started for item:', item)}
    onDragEnd={({dragged: data}) => onDragEnd(data, favouriteApps, item)} */
  };

  const onDragOverFlatList = (
    data,
    viewMetadata,
    sourceViewMetadata,
    touchPosition,
  ) => {
    // Check if the dragged item is over the FlatList
    // You can use viewMetadata, sourceViewMetadata, or touchPosition to determine the position
    // and decide whether it's over the FlatList or not
    const isOverFlatList = true; // Implement your logic here

    if (isOverFlatList) {
      // Trigger the logic to update the state or perform other actions
      console.log('Dragged item is over the FlatList', data);
    }
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
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isLongPress === true ? 'rgba(0, 0, 0, 0.5)' : 'white',
      }}>
      {isLongPress && (
        <TouchableOpacity
          onPress={() => {
            // Handle your overlay button action (e.g., add to favorites)

            /*  if (favouriteItem) {
                  setFavouriteData((prevData) => [...prevData, favouriteItem]);
                  console.log('Add to Favorites pressed for:');
                  setIsLongPress(false);
                } */

            if (favouriteItem) {
              // Check if the item already exists in favouriteData
              const isItemInFavourites = favouriteData.some(
                item => item.bundle === favouriteItem.bundle,
              );

              console.log('Favourite Item', isItemInFavourites);

              if (isItemInFavourites) {
                // Item already exists, display a message or handle it as needed
                console.log('Item is already in favourites');
              } else {
                // Item doesn't exist, add it to favouriteData
                setFavouriteData(prevData => [...prevData, favouriteItem]);
                console.log('Add to Favorites pressed for:');
              }

              setIsLongPress(false);
            }
          }}
          style={styles.overlayButton}>
          <Text style={{color: 'white'}}>Add to Favorites</Text>
          {/* <BlurView
            style={styles.absolute}
            blurType="light"
            blurAmount={10}
            reducedTransparencyFallbackColor="white"
          /> */}
        </TouchableOpacity>
      )}

      {isLongPressRemove && (
        <TouchableOpacity
          onPress={() => {
            // Handle your overlay button action (e.g., add to favorites)

            /*  if (favouriteItem) {
                  setFavouriteData((prevData) => [...prevData, favouriteItem]);
                  console.log('Add to Favorites pressed for:');
                  setIsLongPress(false);
                } */

            if (removeFavouriteItem) {
              // Check if the item already exists in favouriteData
              const isItemInFavourites = favouriteData.some(
                item => item.bundle === removeFavouriteItem.bundle,
              );

              console.log('Favourite Item', isItemInFavourites);

              if (isItemInFavourites) {
                // Item already exists, remove it from favouriteData
                const updatedFavouriteData = favouriteData.filter(
                  item => item.bundle !== removeFavouriteItem.bundle,
                );
                setFavouriteData(updatedFavouriteData);

                console.log('Item removed from favourites');
              } else {
                // Item doesn't exist, add it to favouriteData
                setFavouriteData(prevData => [...prevData, favouriteItem]);
                console.log('Add to Favorites pressed for:');
              }

              setIsLongPressRemove(false);
            }
          }}
          style={styles.overlayButton}>
          <Text style={{color: 'white'}}>Remove Favorites</Text>
        </TouchableOpacity>
      )}

      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content" // You can set the StatusBar text color to dark or light
      />

      <View style={{marginTop: hp(5)}}>
        <Headers
          showListings={true}
          onPressListings={() => navigation.openDrawer()}
          showSearch={true}
          onPressSearch={() => navigation.navigate('SearchApps')}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{flex: 1, marginHorizontal: wp(5)}}>
        <View
          style={{
            height: hp(18),
            marginTop: hp(-1.3),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{width: wp(60), resizeMode: 'contain'}}
            source={appImages.bannerAds}
          />
        </View>

        <View style={styles.latestSearchList}>
          <Text style={{fontFamily: 'Inter-Medium', marginLeft: wp(-1.5)}}>
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

        <View
          style={{
            marginTop: hp(2),
            marginLeft: wp(3),
            height: hp(20),
            width: wp(53),
          }}>
          <FlatList
            style={{margin: 8, flex: 1}}
            showsVerticalScrollIndicator={false}
            data={topData}
            //keyExtractor={item => item.id.toString()}
            numColumns={3} // Set the number of columns to 3
            renderItem={({item}) => renderAvailableApps(item)}
          />
        </View>

        <View style={{marginTop: hp(2), height: hp(37)}}>
          <Text
            style={{
              fontSize: hp(2.3),
              marginLeft: wp(3),
              fontFamily: 'Inter-Bold',
              color: '#4A4A4A',
              fontWeight: 'bold',
            }}>
            Phone Based Apps
          </Text>

          {isLoading ? (
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
            <Swiper showsPagination={screens > 1}>
              {[...Array(screens)].map((_, index) => (
                <View
                  key={index}
                  style={{
                    flex: 1,
                    borderWidth: 1,
                    marginHorizontal: wp(2.3),
                    marginTop: hp(3),
                    borderColor: '#00000017',
                    borderRadius: wp(3),
                  }}>
                  <FlatList
                    data={dataApps.slice(
                      index * itemsPerPage,
                      (index + 1) * itemsPerPage,
                    )}
                    numColumns={5}
                    keyExtractor={(item, itemIndex) => `${index}-${itemIndex}`}
                    renderItem={({item}) => renderApps(item)}
                  />
                </View>
              ))}
            </Swiper>
          )}

          {/* <View
              style={{
                borderWidth: 1,
                marginHorizontal: wp(2.3),
                marginTop: hp(3),
                height: hp(28),
                borderColor: '#00000017',
                borderRadius: wp(3),
              }}>
              <DraxView
                style={{flex: 1}}
                onReceiveDragDrop={({dragged: {payload}}) => {
                  console.log(`recieved ${payload}`);
                }}>
                <FlatList
                  key={flatListKey} // Set the key prop for the FlatList
                  style={{margin: 8, flex: 1}}
                  showsVerticalScrollIndicator={false}
                  data={favouriteApps}
                  keyExtractor={item => item?.id.toString()}
                  numColumns={5} // Set the number of columns to 3
                  renderItem={({item}) => renderFavouriteApps(item)}
                />
              </DraxView>
            </View> */}
        </View>

        <View style={{height: hp(8), justifyContent: 'center'}}>
          <View
            style={{
              height: hp(7),
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              //borderWidth: 1,
              marginHorizontal: wp(12),
            }}>
            <View
              style={{
                height: hp(5),
                alignItems: 'center',
                justifyContent: 'center',
                width: wp(18),
                borderWidth: 1,
                borderRadius: wp(3),
              }}>
              <Text
                style={{
                  fontSize: hp(1.5),
                  textAlign: 'center',
                  fontFamily: 'Inter-Bold',
                  color: '#4A4A4A',
                  fontWeight: 'bold',
                }}>
                Add To Favourites
              </Text>
            </View>

            {/* <View
                style={{
                  height: hp(5),
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: wp(18),
                  borderWidth: 1,
                  borderRadius: wp(3),
                }}></View> */}
          </View>
        </View>

        <View style={{marginTop: hp(5), height: hp(37)}}>
          <Text
            style={{
              fontSize: hp(2.3),
              marginLeft: wp(3),
              fontFamily: 'Inter-Bold',
              color: '#4A4A4A',
              fontWeight: 'bold',
            }}>
            New Added Apps
          </Text>

          {isLoading ? (
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
            <Swiper showsPagination={screens > 1}>
              {[...Array(screens)].map((_, index) => (
                <View
                  key={index}
                  style={{
                    flex: 1,
                    borderWidth: 1,
                    marginHorizontal: wp(2.3),
                    marginTop: hp(3),
                    borderColor: '#00000017',
                    borderRadius: wp(3),
                  }}>
                  <FlatList
                    data={dataApps.slice(
                      index * itemsPerPage,
                      (index + 1) * itemsPerPage,
                    )}
                    numColumns={5}
                    keyExtractor={(item, itemIndex) => `${index}-${itemIndex}`}
                    renderItem={({item}) => renderApps(item)}
                  />
                </View>
              ))}
            </Swiper>
          )}
        </View>

        <View style={{marginTop: hp(10), height: hp(20)}}>
          <Text
            style={{
              fontSize: hp(2.3),
              marginLeft: wp(3),
              fontFamily: 'Inter-Bold',
              color: '#4A4A4A',
              fontWeight: 'bold',
            }}>
            Favourite Apps
          </Text>
          {isLoading ? (
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
            <Swiper showsPagination={screens > 1}>
              {[...Array(screens)].map((_, index) => (
                <View
                  key={index}
                  style={{
                    flex: 1,
                    borderWidth: 1,
                    marginHorizontal: wp(2.3),
                    marginTop: hp(3),
                    borderColor: '#00000017',
                    borderRadius: wp(3),
                  }}>
                  <FlatList
                    data={favouriteData.slice(
                      index * itemsPerPage,
                      (index + 1) * itemsPerPage,
                    )}
                    numColumns={5}
                    keyExtractor={(item, itemIndex) => `${index}-${itemIndex}`}
                    renderItem={({item}) => renderFavouritesApps(item)}
                  />
                </View>
              ))}
            </Swiper>
          )}
        </View>

        <View style={{marginTop: hp(5), height: hp(37)}}>
          <Text
            style={{
              fontSize: hp(2.3),
              marginLeft: wp(3),
              fontFamily: 'Inter-Bold',
              color: '#4A4A4A',
              fontWeight: 'bold',
            }}>
            Unused Apps
          </Text>

          {isLoading ? (
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
            <Swiper showsPagination={screens > 1}>
              {[...Array(screens)].map((_, index) => (
                <View
                  key={index}
                  style={{
                    flex: 1,
                    borderWidth: 1,
                    marginHorizontal: wp(2.3),
                    marginTop: hp(3),
                    borderColor: '#00000017',
                    borderRadius: wp(3),
                  }}>
                  <FlatList
                    data={dataApps.slice(
                      index * itemsPerPage,
                      (index + 1) * itemsPerPage,
                    )}
                    numColumns={5}
                    keyExtractor={(item, itemIndex) => `${index}-${itemIndex}`}
                    renderItem={({item}) => renderApps(item)}
                  />
                </View>
              ))}
            </Swiper>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
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
  items: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //borderWidth: 1,
    borderColor: 'black',
    padding: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  overlayButton: {
    backgroundColor: '#FACA4E',
    padding: 10,
    alignItems: 'center',
    marginHorizontal: wp(30),
    justifyContent: 'center',
    marginTop: hp(5),
    borderRadius: 5,
  },

  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
