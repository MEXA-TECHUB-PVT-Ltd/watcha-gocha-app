import {
  StyleSheet,
  FlatList,
  Image,
  Modal,
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
import Entypo from 'react-native-vector-icons/Entypo';

import Fontiso from 'react-native-vector-icons/Fontisto';
import Headers from '../../../assets/Custom/Headers';
import Approved from '../../../assets/svg/Approved';
import Chat from '../../../assets/svg/Chat.svg';

import {appImages} from '../../../assets/utilities';

//---------------- IMPORTS OF DASHBOARD ----------------------\\

import {InstalledApps, RNLauncherKitHelper} from 'react-native-launcher-kit';
import Swiper from 'react-native-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useIsFocused} from '@react-navigation/native';

//------------------------------------------------\\

//----------------- IMPORT VIDE0 -------------------\\

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Add from '../../../assets/svg/AddMainScreen.svg';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';

import RBSheet from 'react-native-raw-bottom-sheet';




//----------------------------------------------------\\

//------------------IMPORT OF DISC --------------------\\



import Toast from 'react-native-toast-message';

import NonVerified from '../../../assets/svg/NonVerified.svg';


//-----------------------------------------------------\\

//-----------------IMPORTS OF PIC TOUR------------------\\

  //NOTHING NEW

//--------------------------------------------------------\\

export default function Dashboard({navigation, route}) {

  //----------------- CATEGORY ----------------------\\

  const [selectedItemId, setSelectedItemId] = useState(null);
  const [dataApps, setData] = useState([]);
  const [isLongPress, setIsLongPress] = useState(false);

  const [unUsedLocal, setUnUsedLocal] = useState([]);

  const [unusedApps, setUnusedApps] = useState([]);

  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);

  const [isCancelRemoveModalVisible, setIsCancelRemoveModalVisible] =
    useState(false);

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
      // AsyncStorage.removeItem('topData');
    }
  }, [favouriteData, isFocused]); // Run this effect whenever favouriteData changes

  //------------------------------------\\

  //-------------------Use Effect Top Apps---------\\

  useEffect(() => {
    if (isFocused) {
      // Load topData from AsyncStorage when the component mounts
      const loadTopData = async () => {
        //await AsyncStorage.removeItem('topData');
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

  //------------------Use Effect Filtered Apps----------------\\

  useEffect(() => {
    const fetchUsedData = async () => {
      const lastUsageDate = new Date().toISOString();

      const installedApps = InstalledApps.getSortedApps();
      const packageNames = installedApps.map(app => app.label);
      const packageImages = installedApps.map(app => app.icon);
      const packageBundle = installedApps.map(app => app.packageName);
      const packageDataArray = packageNames.map((packageName, index) => ({
        label: packageName,
        bundle: packageBundle[index],
        image: packageImages[index],
        date: lastUsageDate,
      }));

      setUnusedApps(packageDataArray);

      await AsyncStorage.setItem(
        'comparisonDate',
        JSON.stringify(packageDataArray),
      );
      setIsLoading(false);
    };

    fetchUsedData();
  }, []);

  const filterUnusedApps = async apps => {
    const currentDate = new Date();
    const threeWeeksAgo = new Date(currentDate - 21 * 24 * 60 * 60 * 1000); // Three weeks ago

    const unusedAppsData = [];

    for (const app of apps) {
      const storedAppInfo = await AsyncStorage.getItem(`appInfo_${app}`);
      let appInfo;

      if (storedAppInfo) {
        appInfo = JSON.parse(storedAppInfo);
        //console.log("APp Info", appInfo)
      } else {
        // Store app information for the first time

        appInfo = {
          label: app, // Assuming app is the package name if not change it to the correct property
          bundle: app,
          image: app.icon, // You might want to fetch and store the icon as well
        };

        await AsyncStorage.setItem(`appInfo_${app}`, JSON.stringify(appInfo));
      }

      const lastUsageDate = await AsyncStorage.getItem(`lastUsageDate_${app}`);

      if (!lastUsageDate || new Date(lastUsageDate) < threeWeeksAgo) {
        unusedAppsData.push({
          label: appInfo.label,
          bundle: appInfo.bundle,
          image: appInfo.image,
        });
      }
    }

    //console.log("Unused Apps", unusedAppsData);

    return unusedAppsData;
  };

  //------------------------------------------------------------\\

  const itemsPerPage = 10; // Change this to set the number of items per screen
  const screens = Math.ceil(dataApps.length / itemsPerPage);

  const screenFavourite = Math.ceil(favouriteData.length / itemsPerPage);

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
        //await RNLauncherKitHelper.launchApplication(item.bundle);

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

          //----------------------\\

          /* const lastUsageDate = new Date().toISOString();

          // Fetch existing data from AsyncStorage
          const existingDataString = await AsyncStorage.getItem(
            'comparisonDate',
          );
          const existingData = existingDataString
            ? JSON.parse(existingDataString)
            : [];

          // Find the index of the object with matching bundle
          const indexToUpdate = existingData.findIndex(
            entry => entry.bundle === item.bundle,
          );

          // Update the existing data with the new date value for the matching object
          const updatedData = [
            ...existingData.slice(0, indexToUpdate), // items before the matched item
            {
              ...existingData[indexToUpdate],
              date: lastUsageDate,
            },
            ...existingData.slice(indexToUpdate + 1), // items after the matched item
          ];

          // Save the updated data back in AsyncStorage
          await AsyncStorage.setItem(
            'comparisonDate',
            JSON.stringify(updatedData),
          );
 */

          await RNLauncherKitHelper.launchApplication(item.bundle);
          //---------------------\\
        } else {
          // If the app is not in the array, add it with count 1
          const newTopData = [
            ...topData.slice(0, 5), // Keep the first 5 items
            {
              label: item.label,
              bundle: item.bundle,
              image: item.image,
              count: 1,
            },
          ];

          setTopData(newTopData);

          /* const lastUsageDate = new Date().toISOString();

          // Fetch existing data from AsyncStorage
          const existingDataString = await AsyncStorage.getItem(
            'comparisonDate',
          );
          const existingData = existingDataString
            ? JSON.parse(existingDataString)
            : [];

          // Find the index of the object with matching bundle
          const indexToUpdate = existingData.findIndex(
            entry => entry.bundle === item.bundle,
          );

          // Update the existing data with the new date value for the matching object
          const updatedData = [
            ...existingData.slice(0, indexToUpdate), // items before the matched item
            {
              ...existingData[indexToUpdate],
              date: lastUsageDate,
            },
            ...existingData.slice(indexToUpdate + 1), // items after the matched item
          ];

          // Save the updated data back in AsyncStorage
          await AsyncStorage.setItem(
            'comparisonDate',
            JSON.stringify(updatedData),
          ); */

          await RNLauncherKitHelper.launchApplication(item.bundle);
        }
      } catch (error) {
        console.error('Error opening the app:', error);

        /* const lastUsageDate = new Date().toISOString();

        // Fetch existing data from AsyncStorage
        const existingDataString = await AsyncStorage.getItem('comparisonDate');
        const existingData = existingDataString
          ? JSON.parse(existingDataString)
          : [];

        // Find the index of the object with matching bundle
        const indexToUpdate = existingData.findIndex(
          entry => entry.bundle === item.bundle,
        );

        // Update the existing data with the new date value for the matching object
        const updatedData = [
          ...existingData.slice(0, indexToUpdate), // items before the matched item
          {
            ...existingData[indexToUpdate],
            date: lastUsageDate,
          },
          ...existingData.slice(indexToUpdate + 1), // items after the matched item
        ];

        // Save the updated data back in AsyncStorage
        await AsyncStorage.setItem(
          'comparisonDate',
          JSON.stringify(updatedData),
        ); */
        await RNLauncherKitHelper.launchApplication(item.bundle);
        //await RNLauncherKitHelper.launchApplication(items); // Assuming 'item.label' is the package name
      }
    };

    return (
      <TouchableOpacity
        onLongPress={() => {
          setIsLongPress(true);
          setIsCancelModalVisible(true);
          setFavouriteItem(item);
        }}
        onPress={() => openApp(item?.bundle)}
        style={styles.items}>
        <Image
          style={{width: 43, height: 43}}
          source={{uri: `data:image/png;base64,${item?.image}`}}
        />
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              color: '#000000',
              textAlign: 'center',
              fontSize: hp(1.2),
              fontWeight: 'bold',
            }}
            ellipsizeMode="tail"
            numberOfLines={1}>
            {item?.label}
          </Text>
        </View>
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
          setIsCancelRemoveModalVisible(true);
          setRemoveFavouriteItem(item);
        }}
        //onPress={() => openApp(item?.bundle)}
        style={styles.items}>
        <Image
          style={{width: 30, height: 30}}
          source={{uri: `data:image/png;base64,${item?.image}`}}
        />
        <Text
          style={{
            color: '#000000',
            textAlign: 'center',
            fontSize: hp(1.2),
            fontWeight: 'bold',
          }}
          ellipsizeMode="tail"
          numberOfLines={1}>
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
        <View style={{height: hp(6.5)}}>
          <Image
            style={{width: wp(10), height: hp(5)}}
            resizeMode="contain"
            source={{uri: `data:image/png;base64,${item?.image}`}}
          />
        </View>
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

  const closeRequestModal = () => {
    setIsLongPress(false);
    setIsCancelModalVisible(false);
  };

  const closeRequestRemoveModal = () => {
    setIsLongPressRemove(false);
    setIsCancelRemoveModalVisible(false);
  };
 
  //---------------------------------------------------\\

  //--------------------Video---------------------------\\


  const [selectedItemVideoId, setSelectedItemVideoId] = useState(8);

  const [loading, setLoading] = useState(false);

  const [topVideoImage, setTopVideoImage] = useState('');

  const [topVideoText, setTopVideoText] = useState('');

  const [searchesData, setSearches] = useState('');

  const [authToken, setAuthToken] = useState('');

  const [imageInfo, setImageInfo] = useState(null);

  const [selectedItem, setSelectedItem] = useState('');

  const [data, setVideoData] = useState([]);

  const [dataLatestVideos, setDataLatestVideos] = useState([]);

  const [dataTopVideos, setDataTopVideos] = useState([]);

  const [dataMostViewedVideos, setMostViewedVideos] = useState([]);

  const [dataMostCommentedVideos, setMostCommentedVideos] = useState([]);

  const ref_RBSheetCamera = useRef(null);

  useEffect(() => {
    // Make the API request and update the 'data' state
    fetchVideos();
  }, [selectedItemVideoId]);

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
    console.log('Categry in id', selectedItemVideoId);
    console.log("Id's", authToken);

    const token = authToken;

    try {
      const response = await fetch(
        `https://watch-gotcha-be.mtechub.com/xpi/getTrendingVideosByCategory/${selectedItemVideoId}?page=1&limit=5`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      console.log('Resultings', result.Videos);
      setVideoData(result.Videos); // Update the state with the fetched data
    } catch (error) {
      console.error('Error Trending:', error);
    }
  };

  const fetchLatestVideos = async () => {
    const token = authToken;

    try {
      const response = await fetch(
        `https://watch-gotcha-be.mtechub.com/xpi/getAllRecentVideosByCategory/${selectedItemVideoId}?page=1&limit=2`,
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
        `https://watch-gotcha-be.mtechub.com/top/app/top_video/6`,
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
        `https://watch-gotcha-be.mtechub.com/xpi/getMostViewedVideosByCategory/${selectedItemVideoId}?page=1&limit=5`,
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
        `https://watch-gotcha-be.mtechub.com/xpi/getMostCommentedVideosByCategory/${selectedItemVideoId}?page=1&limit=5`,
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
        'https://watch-gotcha-be.mtechub.com/videoCategory/getAllVideoCategories?page=1&limit=5',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      console.log('Search Results', result.AllCategories);
      setSearches(result.AllCategories); // Update the state with the fetched data

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

  const renderSearchesVideo = item => {
    console.log('Items', item);
    const isSelected = selectedItemVideoId === item.id;

    return (
      <TouchableOpacity
        style={[
          styles.searchesDetails,
          {
            backgroundColor: isSelected ? '#FACA4E' : '#F2F2F2',
          },
        ]}
        onPress={() => {
          setSelectedItemVideoId(item.id);
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

  //-------------------------------------------------------\\

  //-------------------- DISC ------------------------------\\

  const [selectedItemDiscId, setSelectedItemDiscId] = useState(1);

  const [categoryIdNews, setCategoryIdNews] = useState(null);

  const [loadingDisc, setLoadingDisc] = useState(false);

  const isFocusedDisc = useIsFocused();

  const [newsData, setNewsData] = useState([]);

  const [authTokenDisc, setAuthTokenDisc] = useState('');

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
    if (isFocusedDisc) {
    getUserDiscID(); // Call the async function
    }
  }, [NewsCategory, isFocusedDisc]); // Include 'id' in the dependency array

  const getUserDiscID = async () => {
    try {
      const result = await AsyncStorage.getItem('authToken ');
      if (result !== null) {
        setAuthTokenDisc(result);
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
        setLoadingDisc(true);
        setSelectedItemDiscId(1);
        console.log('Category Id News is ', NewsCategory);
        // Fetch data one by one
        await fetchNews();

        // Once all data is fetched, set loading to false
        setLoadingDisc(false);
      } else if (Type === 'QAFI') {
        setLoadingDisc(true);
        setSelectedItemDiscId(3);
        console.log('Category Id QAFI is ', NewsCategory);
        // Fetch data one by one
        await fetchQAFI();

        // Once all data is fetched, set loading to false
        setLoadingDisc(false);
      } else if (Type === 'GEBC') {
        setLoadingDisc(true);
        setSelectedItemDiscId(4);
        console.log('Category Id QAFI is ', NewsCategory);
        // Fetch data one by one
        await fetchGEBC();

        // Once all data is fetched, set loading to false
        setLoadingDisc(false);
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
    console.log("News Called");
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
    console.log('Item', item);
    const imageUrl = item.images && item.images[0]
    ? (item.images[0].startsWith('/fileUpload')
        ? `https://watch-gotcha-be.mtechub.com${item.images[0]}`
        : item.images[0])
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
            source={{ uri: imageUrl }}
          />
        ) : (
          // Show dummy image if item.images is null or undefined
          <Image
            style={{
              height: hp(12),
              width: wp(23),
            }}
            source={appImages.galleryPlaceHolder}
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
    if (selectedItemDiscId === 2) {
      navigation.navigate('PostLetterInfo');
    } else if (selectedItemDiscId === 1) {
      navigation.navigate('PostOnNews');
    } else if (selectedItemDiscId === 3) {
      navigation.navigate('QAFI');
    } else if (selectedItemDiscId === 4) {
      navigation.navigate('GEBC');
    }
  };

  //Disc Screen

  const searchesDisc = [
    {id: 1, title: 'On News'},
    {id: 2, title: 'Open Letters'},
    {id: 3, title: 'QAFI'},
    {id: 4, title: 'GEBC'},
  ];

  const renderAvailableDiscApps = item => {
    console.log('Items of News', item);
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('News', {News: item})}
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
            source={appImages.galleryPlaceHolder}
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

  const renderAvailableAppsDiscQAFI = item => {
    console.log('Items of QAFI', item);
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('News', {News: item})}
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
            source={appImages.galleryPlaceHolder}
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
          <View
            style={{
              width: wp(7),
              marginLeft: wp(0.5),
              height: wp(7),
              borderRadius: wp(7) / 2,
            }}>
            {/* <Image
              source={appImages.profileImg}
              style={{width: '100%', height: '100%', resizeMode: 'cover'}}
            /> */}

            <MaterialCommunityIcons
              //style={{marginTop: hp(0.5)}}
              name={'account-circle'}
              size={25}
              color={'#FACA4E'}
            />
          </View>

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

  const renderAvailableAppsDiscGEBC = item => {
    console.log('Items of News', item);
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('News', {News: item})}
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
            source={appImages.galleryPlaceHolder}
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
          <View
            style={{
              width: wp(7),
              marginLeft: wp(0.5),
              height: wp(7),
              borderRadius: wp(7) / 2,
            }}>
            {/* <Image
              source={appImages.profileImg}
              style={{width: '100%', height: '100%', resizeMode: 'cover'}}
            /> */}

            <MaterialCommunityIcons
              //style={{marginTop: hp(0.5)}}
              name={'account-circle'}
              size={25}
              color={'#FACA4E'}
            />
          </View>

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

  const renderDiscSearches = item => {
    console.log('Items', item);
    const isSelected = selectedItemDiscId === item.id;

    return (
      <TouchableOpacity
        style={[
          styles.searchesDetailsDisc,
          {
            backgroundColor: isSelected ? '#FACA4E' : '#F2F2F2',
          },
        ]}
        onPress={() => {
          setSelectedItemDiscId(item.id);
          console.log('Selected item:', item.id);
          if (item.id === 1) {
            navigation.navigate('ViewAllCategoriesDashboard');
            console.log('Log screen');
          } else if (item.id === 2) {
            setSelectedItemDiscId(2);
            fetchLetterPublicGeneral();
            console.log('On Letter id', item.id);
          } else if (item.id === 3) {
            navigation.navigate('ViewAllCategoriesQAFIDashboard');
          } else if (item.id === 4) {
            navigation.navigate('ViewAllCategoriesGEBCDashboard');
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
                {/* <Image
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
          {loadingDisc === true ? (
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
                renderItem={({item}) => renderAvailableDiscApps(item)}
              />
              )}
              </>
            )}
          
          </View>
        </View>

        <View style={{height: hp(23)}}>
          <View style={{marginTop: hp(1), height: '100%'}}>
            {loadingDisc === true ? (
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
                renderItem={({item}) => renderAvailableDiscApps(item)}
              />
            )}
          </View>
        </View>

        <View style={{height: hp(23)}}>
          <View style={{marginTop: hp(1), height: '100%'}}>
            {loadingDisc === true ? (
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
                renderItem={({item}) => renderAvailableDiscApps(item)}
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
                renderItem={({item}) => renderAvailableDiscApps(item)}
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
              <FlatList
                style={{flex: 1}}
                showsVerticalScrollIndicator={false}
                data={qafiData}
                horizontal
                //keyExtractor={item => item.id.toString()}
                renderItem={({item}) => renderAvailableAppsDiscQAFI(item)}
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
                data={qafiData}
                horizontal
                //keyExtractor={item => item.id.toString()}
                renderItem={({item}) => renderAvailableAppsDiscQAFI(item)}
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
                data={qafiData}
                horizontal
                //keyExtractor={item => item.id.toString()}
                renderItem={({item}) => renderAvailableAppsDiscQAFI(item)}
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
                data={qafiData}
                horizontal
                //keyExtractor={item => item.id.toString()}
                renderItem={({item}) => renderAvailableAppsDiscQAFI(item)}
              />
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
              <FlatList
                style={{flex: 1}}
                showsVerticalScrollIndicator={false}
                data={gebcData}
                horizontal
                //keyExtractor={item => item.id.toString()}
                renderItem={({item}) => renderAvailableAppsDiscGEBC(item)}
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
                data={gebcData}
                horizontal
                //keyExtractor={item => item.id.toString()}
                renderItem={({item}) => renderAvailableAppsDiscGEBC(item)}
              />
            )}
          </View>
        </View>

        <View style={{height: hp(23)}}>
          <View style={{marginTop: hp(1), height: '100%'}}>
            {loadingDisc === true ? (
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
                data={gebcData}
                horizontal
                //keyExtractor={item => item.id.toString()}
                renderItem={({item}) => renderAvailableAppsDiscGEBC(item)}
              />
            )}
          </View>
        </View>

        <View style={{height: hp(23)}}>
          <View style={{marginTop: hp(1), height: '100%'}}>
            {loadingDisc === true ? (
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
                data={gebcData}
                horizontal
                //keyExtractor={item => item.id.toString()}
                renderItem={({item}) => renderAvailableAppsDiscGEBC(item)}
              />
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



  //---------------------------------------------------------\\

  //--------------------PIC TOURS ----------------------------\\

  const [selectedItemPicsId, setSelectedItemPicsId] = useState(9);

  const [imagePicInfo, setImagePicInfo] = useState(null);

  const [loadingPics, setLoadingPics] = useState(false);

  const [searchesDataPics, setSearchesPics] = useState('');

  const [selectedItemPics, setSelectedItemPics] = useState('');

  const [dataPics, setDataPics] = useState([]);

  const [dataLatestPics, setDataLatestPics] = useState([]);

  const [dataMostViewedPics, setMostViewedPics] = useState([]);

  const [dataMostCommentedPics, setMostCommentedPics] = useState([]);

  const [dataToppics, setDataTopPics] = useState([]);

  const [authTokenPics, setAuthTokenPics] = useState('');

  const ref_RBSheetCameraPics = useRef(null);

  useEffect(() => {
    // Make the API request and update the 'data' state
    fetchVideosPics();
  }, [selectedItemPicsId]);

  const fetchVideosPics = async () => {
    // Simulate loading
    setLoadingPics(true);

    // Fetch data one by one
    await getUserIDPics();
    await fetchTrendingPics();
    await fetchTopPics();
    await fetchLatestPics();
    await fetchMostViewedPics();
    await fetchMostCommentedPics();

    // Once all data is fetched, set loading to false
    setLoadingPics(false);
  };

  const getUserIDPics = async () => {
    console.log('AT User Id');
    try {
      const result = await AsyncStorage.getItem('authToken ');
      if (result !== null) {
        setAuthTokenPics(result);
        await fetchCategoryPics(result);
        console.log('user id retrieved:', result);
      }
    } catch (error) {
      // Handle errors here
      console.error('Error retrieving user ID:', error);
    }
  };

  const fetchCategoryPics = async result => {
    const token = result;

    try {
      const response = await fetch(
        'https://watch-gotcha-be.mtechub.com/picCategory/getAllPicCategories?page=1&limit=5',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      console.log('Search Results', result.AllCategories);
      setSearchesPics(result.AllCategories); // Update the state with the fetched data
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchTrendingPics = async () => {
    console.log('selected id trending videos', authTokenPics);
    const token = authTokenPics;

    try {
      const response = await fetch(
        `https://watch-gotcha-be.mtechub.com/picTour/getAllTrendingToursByCategory/${selectedItemPicsId}?page=1&limit=5`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      console.log('Resultings Pics Tourzs', result.Tours);
      setDataPics(result.Tours); // Update the state with the fetched data
    } catch (error) {
      console.error('Error Trending:', error);
    }
  };

  const fetchLatestPics = async () => {
    console.log('selected id latest videos', authTokenPics);

    const token = authTokenPics;

    try {
      const response = await fetch(
        `https://watch-gotcha-be.mtechub.com/picTour/getAllRecentVideosByCategory/${selectedItemPicsId}?page=1&limit=5`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      console.log('Resultings', result.Tours);
      setDataLatestPics(result.Tours); // Update the state with the fetched data
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchMostViewedPics = async () => {
    console.log('selected id most viewed videos', authTokenPics);

    const token = authTokenPics;

    try {
      const response = await fetch(
        `https://watch-gotcha-be.mtechub.com/picTour/getMostViewedToursByCategory/${selectedItemPicsId}?page=1&limit=5`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      console.log('Resultings Most Viewed', result.Tours);
      setMostViewedPics(result.Tours); // Update the state with the fetched data
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchTopPics = async () => {

    console.log("Category Top Videos", selectedItemPicsId )
    const token = authToken;

    try {
      const response = await fetch(
        `https://watch-gotcha-be.mtechub.com/top/getSpecificTopTourByCategory/${selectedItemPicsId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      console.log('Resultings of Top Videossss', result.topTour[0]);
      setDataTopPics(result.topVideo[0]); // Update the state with the fetched data
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const fetchMostCommentedPics = async () => {
    console.log('selected most commented videos', authTokenPics);

    const token = authToken;

    try {
      const response = await fetch(
        `https://watch-gotcha-be.mtechub.com/picTour/getMostCommentedToursByCategory/${selectedItemPicsId}?page=1&limit=5`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      console.log('Resultings', result.Tours);
      setMostCommentedPics(result.Tours); // Update the state with the fetched data
    } catch (error) {
      console.error('Error:', error);
    }
  };

  //pics search

  const renderSearchesPic = item => {
    console.log('Items', item);
    const isSelected = selectedItemPicsId === item.id;

    return (
      <TouchableOpacity
        style={[
          styles.searchesDetails,
          {
            backgroundColor: isSelected ? '#FACA4E' : '#F2F2F2',
          },
        ]}
        onPress={() => {
          setSelectedItemPicsId(item.id);
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

  

  const renderAvailableAppsPics = item => {
    console.log('Items of Pics', item);
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('PicDetails', {picData: item})}
        style={{width: wp(27), margin: 5}}>
        <View>
          {!item.image || item.image === 'undefined'  || item.image.startsWith('/') ? (
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
                zIndex: 1,
                width: '100%',
                height: hp(12),
                borderRadius: wp(1),
                resizeMode: 'cover',
              }}
              source={{uri: item.image}}
            />
          )}

          {/* <Image
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
            source={appImages.topSearches1}
          /> */}
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: wp(0.5),
            marginTop: hp(12.5),
          }}>
          <Text
            style={{
              fontSize: hp(1.5),
              fontFamily: 'Inter-Regular',
              color: '#000000',
              width: wp(23),
            }}>
            {item.name}
          </Text>

          <Entypo name={'dots-three-vertical'} size={14} color={'#4A4A4A'} />
        </View>
      </TouchableOpacity>
    );
  };

  const takePhotoFromCameraPics = async value => {
    setSelectedItemPics(value);
    launchCamera(
      {
        mediaType: 'Photo',
        //videoQuality: 'medium',
      },
      response => {
        console.log('image here', response);
        if (!response.didCancel) {
          if (response.assets && response.assets.length > 0) {
            setLoadingPics(true);
             setImagePicInfo(response.assets[0]);
            ref_RBSheetCameraPics.current.close();
            setLoadingPics(false);

            navigation.navigate('UploadUpdatePic', {Video: response.assets[0]});
          } else if (response.uri) {
            ref_RBSheetCameraPics.current.close();
            setLoadingPics(false);

            navigation.navigate('UploadUpdatePic', {Video: response.assets[0]});
          }
        }
        ref_RBSheetCameraPics.current.close();
        setLoadingPics(false);

        navigation.navigate('UploadUpdatePic', {Video: response.assets[0]});
      },
    );
  };

  const choosePhotoFromLibraryPics = value => {
    setSelectedItemPics(value);
    launchImageLibrary({mediaType: 'Photo'}, response => {
      console.log('image here', response);
      if (!response.didCancel && response.assets.length > 0) {
        /*  console.log('Response', response.assets[0]);
        setImageUri(response.assets[0].uri);
        setImageInfo(response.assets[0]); */
        setLoadingPics(true);
        setImagePicInfo(response.assets[0]);
        ref_RBSheetCameraPics.current.close();
        setLoadingPics(false);

        navigation.navigate('UploadUpdatePic', {Video: response.assets[0]});
      }

      ref_RBSheetCameraPics.current.close();
      setLoadingPics(false);

      navigation.navigate('UploadUpdatePic', {Video: response.assets[0]});
    });
  };

  //------------------------------------------------------------\\


  //--------------------- MARKET ZONE ----------------------------\\

  const [selectedItemIdMarket, setSelectedItemIdMarket] = useState(null);

  const [dataMarket, setDataMarket] = useState(null);

  const [authTokenMarket, setAuthTokenMarket] = useState('');

  const [dataElectronicsMarket, setDataElectronicsMarket] = useState(null);

  const [dataVehiclesMarket, setDataVehiclesMarket] = useState(null);

  const [dataClothingMarket, setDataClothingMarket] = useState(null);

  const [loadingMarket, setLoadingMarket] = useState(false);

  const [categoriesSelectMarket, setCategorySelectMarket] = useState([]);
  
  const [dataTopVideosMarket, setDataTopVideosMarket] = useState([]);

  const RegionArea = [
    'Africa',
    'Europe',
    'Americas',
    'Asia',
    'Middle East',
  ];

  useEffect(() => {
    // Make the API request and update the 'data' state
    fetchMarket();
  }, [selectedItemIdMarket]);

  const fetchMarket = async () => {
    // Simulate loading
    setLoadingMarket(true);
    // Fetch data one by one

    await getUserIDMarket();

    await fetchAllMarket();

    await fetchTopMarket();

    await fetchElectronicsMarket();

    await fetchVehiclesMarket();

    await fetchClothingMarket();
    // Once all data is fetched, set loading to false
    setLoadingMarket(false);
  };

  const getUserIDMarket = async () => {
    console.log('AT User Id');
    try {
      const result = await AsyncStorage.getItem('authToken ');
      if (result !== null) {
        setAuthTokenMarket(result);
        //await fetchRegion(result);
        await fetchCategoryMarket(result);
        console.log('user id retrieved:', result);
      }
    } catch (error) {
      // Handle errors here
      console.error('Error retrieving user ID:', error);
    }
  };

  const fetchAllMarket = async () => {
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
      setDataMarket(result.AllItems); // Update the state with the fetched data
    } catch (error) {
      console.error('Error Trending:', error);
    }
  };

  const fetchElectronicsMarket = async () => {
    console.log('Categry in id', selectedItemId);
    const token = authToken;

    try {
      const response = await fetch(
        `https://watch-gotcha-be.mtechub.com/item/getAllItemByCategory/5?page=1&limit=5&region=${selectedItemIdMarket}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      console.log(' s', result.AllItems);
      setDataElectronicsMarket(result.AllItems); // Update the state with the fetched data
    } catch (error) {
      console.error('Error Trending:', error);
    }
  };

  const fetchVehiclesMarket = async () => {
    //console.log("Categry in id", selectedItemId)
    const token = authToken;

    try {
      const response = await fetch(
        `https://watch-gotcha-be.mtechub.com/item/getAllItemByCategory/6?page=1&limit=5&region=${selectedItemIdMarket}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      console.log('AllItems', result.AllItems);
      setDataVehiclesMarket(result.AllItems); // Update the state with the fetched data
    } catch (error) {
      console.error('Error Trending:', error);
    }
  };

  const fetchTopMarket = async () => {
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
      setDataTopVideosMarket(result.topitem[0]); // Update the state with the fetched data
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchClothingMarket = async () => {
    //console.log("Categry in id", selectedItemId)
    const token = authToken;

    try {
      const response = await fetch(
        `https://watch-gotcha-be.mtechub.com/item/getAllItemByCategory/7?page=1&limit=5&region=${selectedItemIdMarket}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      console.log('AllItems', result.AllItems);
      setDataClothingMarket(result.AllItems); // Update the state with the fetched data
    } catch (error) {
      console.error('Error Trending:', error);
    }
  };

  const fetchRegionMarket = async resultId => {
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
      setRegionsMarket(result.allRegion); // Update the state with the fetched data

      // await fetchCategory(resultId);
    } catch (error) {
      console.error('Error Trending:', error);
    }
  };
  const fetchCategoryMarket = async result => {
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

        setCategorySelectMarket(categories); // Update the state with the formatted category data

        console.log('Data Categories', categoriesSelectMarket);
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


  const searchesMarket = [
    {id: 1, title: 'Africa'},
    {id: 2, title: 'Europe'},
    {id: 3, title: 'N America'},
    {id: 4, title: 'L. America'},
    {id: 5, title: 'Asia'},
    {id: 6, title: 'Middle East'},
    {id: 7, title: 'Carribean'},
  ];

  

  

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


  const renderSearchesMarket = item => {
    console.log('Regions', item);
    const isSelected = selectedItemIdMarket === item;

    return (
      <TouchableOpacity
        style={[
          styles.searchesDetails,
          {
            backgroundColor: isSelected ? '#FACA4E' : '#F2F2F2',
          },
        ]}
        onPress={() => {
          setSelectedItemIdMarket(item);
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

  //----------------------------------------------------------------\\
  
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
          showLogo={true}
          onPressListings={()=>navigation.openDrawer()}
          onPressProfile={() => navigation.navigate('ViewProfile')}
          showProfileImage={true}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{flex: 1, marginHorizontal: wp(5)}}>
        <View style={styles.searchBar}>
          {/* Home */}
          <Fontiso
            name={'search'}
            size={18}
            color={'#A8A8A8'}
            style={{marginLeft: wp(5)}}
          />
          <TextInput
            style={{flex: 1, marginLeft: wp(3)}}
            placeholder="Search here"
          />
        </View>     

      
       {/* //-------------- Category ---------------------\\ */}
    
       <Modal
        transparent={true}
        animationType="fade"
        visible={isLongPress}
        onRequestClose={() => setIsLongPress(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => {
                if (favouriteItem) {
                  const isItemInFavourites = favouriteData.some(
                    item => item.bundle === favouriteItem.bundle,
                  );

                  if (isItemInFavourites) {
                    console.log('Item is already in favourites');
                  } else {
                    setFavouriteData(prevData => [...prevData, favouriteItem]);
                    console.log(
                      'Add to Favorites pressed for:',
                      favouriteItem.label,
                    );
                  }

                  setIsLongPress(false);
                }
              }}
              style={styles.overlayButton}>
              <Text style={{color: 'white'}}>Add to Favorites</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (favouriteItem) {
                  const updatedInstallData = dataApps.filter(
                    item => item.bundle !== favouriteItem.bundle,
                  );
                  setData(updatedInstallData);
                  setIsCancelModalVisible(false);
                  setIsLongPress(false);
                }
              }}
              style={styles.overlayButton}>
              <Text style={{color: 'white'}}>
                Remove From Wotcha Gotcha App
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {isCancelModalVisible && (
          <TouchableOpacity
            onPress={() => closeRequestModal()}
            style={styles.modalContentCross}>
            <Entypo name={'cross'} size={18} color={'black'} />
          </TouchableOpacity>
        )}
      </Modal>

      {/* Modal Of Cross Button */}
      {/*  <Modal
        transparent={true}
        animationType="slide"
        visible={isCancelModalVisible}
        onRequestClose={() => closeRequestModal()}> */}

      <Modal
        transparent={true}
        animationType="fade"
        visible={isLongPressRemove}
        onRequestClose={() => setIsLongPressRemove(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
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

            <TouchableOpacity
              onPress={() => {
                if (removeFavouriteItem) {
                  const updatedInstallData = dataApps.filter(
                    item => item.bundle !== removeFavouriteItem.bundle,
                  );
                  setData(updatedInstallData);
                  setIsCancelModalVisible(false);
                  setIsLongPressRemove(false);
                } else {
                  setIsCancelModalVisible(false);
                  setIsLongPressRemove(false);
                }
              }}
              style={styles.overlayButton}>
              <Text style={{color: 'white'}}>
                Remove From Wotcha Gotcha App
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {isCancelRemoveModalVisible && (
          <TouchableOpacity
            onPress={() => closeRequestRemoveModal()}
            style={styles.modalContentCross}>
            <Entypo name={'cross'} size={18} color={'black'} />
          </TouchableOpacity>
        )}
      </Modal>

      {/*  </Modal> */}

      {/* //------------------------\\ */}

      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content" // You can set the StatusBar text color to dark or light
      />

      <View style={{marginTop: hp(5)}}>
      </View>
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

        <Text
          style={{
            fontFamily: 'Inter-Medium',
            fontWeight: 'bold',
            fontSize: hp(2.3),
            color: 'black',
            marginLeft: wp(3),
          }}>
          Top
        </Text>

        {/*  <View style={styles.latestSearchList}>
          <FlatList
            style={{flex: 1}}
            contentContainerStyle={{alignItems: 'center'}}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={searches}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => renderSearches(item)}
          />
        </View> */}

        <View
          style={{
            marginTop: hp(2),
            marginLeft: wp(3),
            height: hp(20),
            width: wp(53),
          }}>
            
          <FlatList
            style={{margin: 8, flex: 1}}
            //contentContainerStyle={{marginBottom:hp(5)}}
            showsVerticalScrollIndicator={false}
            data={topData}
            //keyExtractor={item => item.id.toString()}
            numColumns={3} // Set the number of columns to 3
            renderItem={({item}) => renderAvailableApps(item)}
          />
        </View>

        <View style={{marginTop: hp(1), height: hp(25)}}>
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
            <View style={{flex: 1}}>
              <FlatList
                data={dataApps.slice(0, Math.ceil(dataApps.length / 2))}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, itemIndex) => `${itemIndex}`}
                renderItem={({item}) => renderApps(item)}
                contentContainerStyle={{
                  borderWidth: 1,
                  marginRight: wp(2.3),
                  marginTop: hp(3),
                  borderColor: '#00000017',
                  borderRadius: wp(3),
                }}
              />

              <FlatList
                data={dataApps.slice(Math.ceil(dataApps.length / 2))}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, itemIndex) => `${itemIndex}`}
                renderItem={({item}) => renderApps(item)}
                contentContainerStyle={{
                  borderWidth: 1,
                  marginRight: wp(2.3),
                  marginTop: hp(3),
                  borderColor: '#00000017',
                  borderRadius: wp(3),
                }}
              />
            </View>
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
            {/* <View
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
            </View> */}

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

        {/* <View style={{marginTop: hp(5), height: hp(37)}}>
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
        </View> */}

        <View style={{marginTop: hp(1), height: hp(20)}}>
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
            <FlatList
              data={favouriteData}
              horizontal
              showsHorizontalScrollIndicator={false}
              //keyExtractor={(item, itemIndex) => `${itemIndex}`}
              renderItem={({item}) => renderFavouritesApps(item)}
              contentContainerStyle={{
                borderWidth: 1,
                marginRight: wp(2.3),
                marginTop: hp(3),
                borderColor: '#00000017',
                borderRadius: wp(3),
              }}
            />
          )}
        </View>

        <View style={{marginTop: hp(1), marginBottom: hp(5), height: hp(25)}}>
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
            <View style={{flex: 1}}>
               <FlatList
              data={dataApps.slice(0, Math.ceil(dataApps.length / 2))}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, itemIndex) => `${itemIndex}`}
              renderItem={({item}) => renderApps(item)}
              contentContainerStyle={{
                borderWidth: 1,
                marginRight: wp(2.3),
                marginTop: hp(3),
                borderColor: '#00000017',
                borderRadius: wp(3),
              }}
            />
        
            <FlatList
              data={dataApps.slice(Math.ceil(dataApps.length / 2))}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, itemIndex) => `${itemIndex}`}
              renderItem={({item}) => renderApps(item)}
              contentContainerStyle={{
                borderWidth: 1,
                marginRight: wp(2.3),
                marginTop: hp(3),
                borderColor: '#00000017',
                borderRadius: wp(3),
              }}
            /> 
            </View>
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
      

       

        {/* //-----------------------------------------------\\ */}



        {/* //------------------- VIDEO ---------------------------\\ */}
        
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

        <View style={styles.latestSearchListVideo}>
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
            renderItem={({item}) => renderSearchesVideo(item)}
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
                top: hp(14),
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
              marginTop: hp(5),
              height: hp(12.8),
              width: '55%',
              marginHorizontal: wp(1.5),
            }}>
            <Text
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
            ) : (
              <FlatList
                style={{flex: 1}}
                showsHorizontalScrollIndicator={false}
                data={data}
                horizontal
                //keyExtractor={item => item.id.toString()}
                renderItem={({item}) => renderAvailableAppsVideo(item)}
              />
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
          </View>
        </View>



        {/* //-------------------------------------------------------------\\ */}

        {/* Disc */}
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

      <View style={styles.latestSearchListDisc}>
        <Text style={{color: '#232323', fontWeight: 'bold', fontSize: hp(2.1)}}>
          Top
        </Text>
        <FlatList
          style={{flex: 1}}
          contentContainerStyle={{alignItems: 'center'}}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={searchesDisc}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => renderDiscSearches(item)}
        />
      </View>

      {selectedItemDiscId === 1 ? (
          <DiscScreen />
        ) : selectedItemDiscId === 2 ? (
          <OpenLetters />
        ) : selectedItemDiscId === 3 ? (
          <QAFI />
        ) : selectedItemDiscId === 4 ? (
          <GEBC />
        ) : null}

        {/* Pic Tours */}
        
        <View
          style={{
            height: hp(18),
            marginTop: hp(-3.8),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{width: wp(60), resizeMode: 'contain'}}
            source={appImages.bannerAds}
          />
        </View>

        <Text
          style={{
            color: '#FACA4E',
            marginLeft: wp(3),
            fontFamily: 'Inter-Bold',
            fontSize: hp(2.3),
          }}>
          Pic Tours
        </Text>

        <View style={[styles.latestSearchListPicss, {marginLeft: wp(3)}]}>
          <Text
            style={{color: '#232323', fontWeight: 'bold', fontSize: hp(2.1)}}>
            Top
          </Text>
          <FlatList
            style={{flex: 1}}
            contentContainerStyle={{alignItems: 'center'}}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={searchesDataPics}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => renderSearchesPic(item)}
          />
        </View>
        <View
          style={{marginTop: hp(1.5), flexDirection: 'row', height: hp(18)}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('PicDetails')}
            style={{
              width: wp(35),
              marginLeft: wp(2.5),
              height: '100%',
              borderRadius: wp(5),
            }}>
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
                top: hp(14),
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
                  fontSize: hp(1.6),
                  fontFamily: 'Inter',
                  color: '#FFFFFF',
                  fontWeight: '700',
                }}>
                 {dataToppics?.pic_category_name}
              </Text>
            </View>
          </TouchableOpacity>

          <View style={{marginTop: hp(0.8), marginLeft: wp(3), width: '35%'}}>
            <Text
              style={{
                fontSize: hp(1.6),
                marginLeft: wp(1),
                lineHeight: 15.5,
                marginTop:hp(5),
                fontFamily: 'Inter-Regular',
                color: '#000000',
                //fontWeight: '700',
              }}>
                
                {dataToppics.length===0? "No Top Pic Shown": dataToppics?.description} 
            </Text>
          </View>
        </View>

        <View style={{marginTop: hp(1.5), height: hp(23)}}>
          <Text
            style={{
              fontSize: hp(2.3),
              marginLeft: wp(2.5),
              fontFamily: 'Inter',
              color: '#4A4A4A',
              fontWeight: 'bold',
            }}>
            Trending
          </Text>

          <View style={{marginTop: hp(1), height: '100%'}}>
            {loadingPics === true ? (
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
                showsHorizontalScrollIndicator={false}
                data={dataPics}
                horizontal
                //keyExtractor={item => item.id.toString()}
                renderItem={({item}) => renderAvailableAppsPics(item)}
              />
            )}
          </View>
        </View>

        <View style={{marginTop: hp(3), height: hp(23)}}>
          <Text
            style={{
              fontSize: hp(2.3),
              marginLeft: wp(3),
              fontFamily: 'Inter',
              color: '#4A4A4A',
              fontWeight: 'bold',
            }}>
            Latest Pics
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
              <FlatList
                style={{flex: 1}}
                showsHorizontalScrollIndicator={false}
                data={dataLatestPics}
                horizontal
                // keyExtractor={item => item.id.toString()}
                renderItem={({item}) => renderAvailableAppsPics(item)}
              />
            )}
          </View>
        </View>

        <View style={{marginTop: hp(3), height: hp(23)}}>
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
            ) : (
              <FlatList
                style={{flex: 1}}
                showsHorizontalScrollIndicator={false}
                data={dataMostViewedPics}
                horizontal
                //keyExtractor={item => item.id.toString()}
                renderItem={({item}) => renderAvailableAppsPics(item)}
              />
            )}
          </View>
        </View>

        <View style={{marginTop: hp(3), height: hp(23)}}>
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
            {loadingPics === true ? (
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
                showsHorizontalScrollIndicator={false}
                data={dataMostCommentedPics}
                horizontal
                //keyExtractor={item => item.id.toString()}
                renderItem={({item}) => renderAvailableAppsPics(item)}
              />
            )}
          </View>
        </View>

        {/* //-------------\\ */}

        {/* Market Zone */}     

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

        <View style={styles.latestSearchListMarket}>
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
            renderItem={({item}) => renderSearchesMarket(item)}
          />
        </View>
        <View
          style={{marginTop: hp(1.5), flexDirection: 'row', height: hp(16)}}>
          <View style={{width: wp(43), height: '100%', borderRadius: wp(5)}}>
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
                top: hp(14),
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
                  fontSize: hp(2.5),
                  fontFamily: 'Inter-Medium',
                  color: 'black',
                  fontWeight: '700',
                }}>
                {dataTopVideosMarket?.item_name}
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

              {dataTopVideosMarket.length === 0
                ? 'No Top Pic Shown'
                : dataTopVideosMarket?.description}
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
            {categoriesSelectMarket[0]?.label}
          </Text>

          <View style={{marginTop: hp(1), height: '100%'}}>
            {loadingMarket === true ? (
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
                {dataClothingMarket?.length === 0 ? (
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
                    data={dataClothingMarket}
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
            {categoriesSelectMarket[1]?.label}
          </Text>

          <View style={{marginTop: hp(1), height: '100%'}}>
            {loadingMarket === true ? (
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
                {dataVehiclesMarket?.length === 0 ? (
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
                    data={dataVehiclesMarket}
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
            {categoriesSelectMarket[2]?.label}
          </Text>

          <View style={{marginTop: hp(1), height: '100%'}}>
            {loadingMarket === true ? (
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
                {dataElectronicsMarket?.length === 0 ? (
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
                    data={dataElectronicsMarket}
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
            All other items
          </Text>

          <View style={{marginTop: hp(1), height: '100%'}}>
            {loadingMarket === true ? (
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
                {dataMarket?.length === 0 ? (
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
                    data={dataMarket}
                    horizontal
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => renderAvailableAppsMarket(item)}
                  />
                )}
              </>
            )}
          </View>
        </View>  

        {/* //---------------------\\ */}

        {/* //------------\\ */}
      </ScrollView>

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
    //marginHorizontal: wp(3),
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
    marginTop: hp(2.1),
    height: hp(7),
    marginLeft: wp(5),
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
  latestSearchList: {
    marginTop: hp(2.1),
    height: hp(7),
    //marginLeft: wp(5),
  },
  searchesDetails: {
    flexDirection: 'row',
    marginLeft: wp(3),
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(23),
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

  // Category Styles
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
    //marginHorizontal: wp(5),
    justifyContent: 'center',
    marginTop: hp(5),
    borderRadius: 5,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },

  modalContent: {
    //   width: '80%',
    //justifyContent:'center',
    //alignItems:'center',
    //borderWidth:3,
    //backgroundColor: 'rgba(0, 0, 0, 0.7)',
    backgroundColor: 'transparent',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },

  modalContentCross: {
    position: 'absolute',
    backgroundColor: 'white',
    top: 18,
    zIndex: 999,
    right: 16,
    width: wp(10),
    height: wp(10),
    borderRadius: wp(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  //---------------\\

  //video styles
  latestSearchListVideo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(2.1),
    height: hp(7),
    marginLeft: wp(5),
    //borderWidth: 3,
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

  // Disc Styles
  searchesDetailsDisc: {
    flexDirection: 'row',
    marginLeft: wp(3),
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(25),
    backgroundColor: '#F2F2F2',
    borderRadius: wp(5),
    height: hp(5),
  },
  latestSearchListDisc: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(2.1),
    height: hp(7),
    marginHorizontal: wp(8),
    //marginLeft: wp(5),
    //borderWidth: 3,
  },

  //---------------\\

  // Pic tour styles

  latestSearchListPicss: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(2.1),
    height: hp(7),
    marginLeft: wp(5),
    //borderWidth: 3,
  },



  //----------------\\
  //Market Zone

  latestSearchListMarket: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(2.1),
    height: hp(7),
    marginLeft: wp(5),
    //borderWidth: 3,
  }

});
