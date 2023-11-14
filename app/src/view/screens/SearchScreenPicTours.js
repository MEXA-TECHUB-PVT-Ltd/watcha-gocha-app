import {
    StyleSheet,
    FlatList,
    ActivityIndicator,
    Text,
    Image,
    TextInput,
    View,
    TouchableOpacity,
  } from 'react-native';
  import React, {useState, useEffect} from 'react';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import Back from '../../assets/svg/back.svg';
  import {appImages} from '../../assets/utilities/index';
  import {
    heightPercentageToDP as hp,
    widthPercentageToDP,
    widthPercentageToDP as wp,
  } from 'react-native-responsive-screen';
  
  import axios from 'axios';
  
  import Fontiso from 'react-native-vector-icons/Fontisto';
  
  export default function SearchScreenPicTours({navigation}) {
    const [selectedItemId, setSelectedItemId] = useState(null);
  
    const [searchTerm, setSearchTerm] = useState('');
    const [searches, setSearches] = useState([]);
  
    const [data, setData] = useState([]);
  
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      // Make the API request and update the 'data' state
      fetchAll();
    }, []);
  
    const fetchAll = async () => {
      // Simulate loading
      setLoading(true);
      // Fetch data one by one
      await fetchTrendingVideos();
  
      await loadSearchesFromStorage();
  
      // Once all data is fetched, set loading to false
      setLoading(false);
    };
  
    const fetchTrendingVideos = async () => {
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY5ODEyMzUxNSwiZXhwIjoxNzAwNzE1NTE1fQ.0JrofPFHubokiOAwlQWsL1rSuKdnadl9ERLrUnLkd_U';
  
      try {
        const response = await fetch(
          `https://watch-gotcha-be.mtechub.com/top/getAllTopTour?page=1&limit=2`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
  
        const result = await response.json();
        console.log('Resultings', result.AllTours);
        setData(result.AllTours); // Update the state with the fetched data
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    const loadSearchesFromStorage = async () => {
      try {
        const savedSearches = await AsyncStorage.getItem('searches');
        if (savedSearches) {
          setSearches(JSON.parse(savedSearches));
        }
      } catch (error) {
        console.error('Error loading searches from storage:', error);
      }
    };
  
    const search = [
      {id: 1, title: 'John Doe'},
      {id: 2, title: 'Olivia'},
      {id: 3, title: 'Wiliam'},
      {id: 4, title: 'Mia Pat'},
      {id: 5, title: 'John Doe'},
      {id: 6, title: 'Olivia'},
      {id: 7, title: 'Wiliam'},
      {id: 8, title: 'Mia Pat'},
      {id: 9, title: 'Wiliam'},
      {id: 10, title: 'Mia Pat'},
    ];
  
    const availableApps = [
      {
        id: 1,
        title:
          'Explore the intricate web of global politics in this ever-shifting landscape of international diplomacy......',
        image: appImages.topSearches1,
      },
      {
        id: 2,
        title:
          'Explore the intricate web of global politics in this ever-shifting landscape of international diplomacy......',
        image: appImages.topSearches2,
      },
      {
        id: 3,
        title:
          'Explore the intricate web of global politics in this ever-shifting landscape of international diplomacy......',
        image: appImages.topSearches3,
      },
      {
        id: 4,
        title:
          'Explore the intricate web of global politics in this ever-shifting landscape of international diplomacy......',
        image: appImages.topSearches4,
      },
      {
        id: 5,
        title:
          'Explore the intricate web of global politics in this ever-shifting landscape of international diplomacy......',
        image: appImages.topSearches1,
      },
      {
        id: 6,
        title:
          'Explore the intricate web of global politics in this ever-shifting landscape of international diplomacy......',
        image: appImages.topSearches2,
      },
      {
        id: 7,
        title:
          'Explore the intricate web of global politics in this ever-shifting landscape of international diplomacy......',
        image: appImages.topSearches3,
      },
      {
        id: 8,
        title:
          'Explore the intricate web of global politics in this ever-shifting landscape of international diplomacy......',
        image: appImages.topSearches4,
      },
      {
        id: 9,
        title:
          'Explore the intricate web of global politics in this ever-shifting landscape of international diplomacy......',
        image: appImages.topSearches1,
      },
      {
        id: 10,
        title:
          'Explore the intricate web of global politics in this ever-shifting landscape of international diplomacy......',
        image: appImages.topSearches2,
      },
    ];
  
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
  
    const renderAvailableApps = item => {
      console.log('Items', item);
      return (
        <View
          style={{
            height: hp(14),
            //marginTop:hp(1),
            marginBottom: hp(1.5),
            flexDirection: 'row',
            //alignItems: 'center',
            marginHorizontal: wp(7),
            borderRadius: wp(3),
          }}>
          <View
            style={{
              height: hp(12),
              width: wp(25),
              borderRadius: wp(5),
              //borderWidth: 3,
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
              source={{uri:'https://watch-gotcha-be.mtechub.com'+item.image}}
            />
          </View>
  
          <Text
            style={{
              marginLeft: wp(3),
              fontSize: hp(1.6),
              lineHeight: 18,
              marginTop: hp(1.5),
              flex: 1,
              color: '#000000',
              fontFamily: 'Inter-Medium',
            }}>
            {item.description}
          </Text>
        </View>
      );
    };
  
    const saveSearchTerm = async () => {
      if (searchTerm.trim() === '') {
        return;
      }
  
      try {
        const newSearchTerm = {id: searches.length + 1, title: searchTerm};
        const updatedSearches = [...searches, newSearchTerm];
  
        await AsyncStorage.setItem('searches', JSON.stringify(updatedSearches));
        setSearches(updatedSearches);
        setSearchTerm(''); // Clear the input field
        fetchAll()
      } catch (error) {
        console.error('Error saving search term:', error);
      }
    };
  
    return (
      <View style={styles.container}>
        <View style={styles.searchHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Back width={20} height={20} style={{marginLeft: '1%'}} />
          </TouchableOpacity>
  
          <View style={styles.searchBar}>
            <Fontiso
              name={'search'}
              size={18}
              color={'#A8A8A8'}
              style={{marginLeft: wp(5)}}
            />
            <TextInput
              style={{flex: 1, marginLeft: wp(3)}}
              placeholder="Search here"
              value={searchTerm}
              onChangeText={(text) => setSearchTerm(text)}
              onSubmitEditing={() => {
                saveSearchTerm()
                // This code will execute when the "Okay" button is pressed
                //console.log("Good", searchTerm);
  
              }}
            />
          </View>
        </View>
  
        <Text style={styles.latestSearch}>Latest Searches</Text>
  
        <View style={styles.latestSearchList}>
          {searches.length > 0 ? (
            <FlatList
              style={{flex: 1}}
              contentContainerStyle={{alignItems: 'center'}}
              showsHorizontalScrollIndicator={false}
              horizontal
              data={searches}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => renderSearches(item)}
            />
          ) : (
            <Text
              style={{color: '#939393', fontSize: hp(1.8), alignSelf: 'center'}}>
              No recent searches found.
            </Text>
          )}
        </View>
  
        <Text style={styles.latestSearch}>Top Searches</Text>
  
        <FlatList
          style={{marginTop: hp(3), flex: 1}}
          showsVerticalScrollIndicator={false}
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => renderAvailableApps(item)}
        />
  
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
          {loading && <ActivityIndicator size="large" color="#FACA4E" />}
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
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
    searchBar: {
      height: hp(5.9),
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: wp(3.8),
      borderRadius: wp(5),
      borderWidth: 0.5,
      borderColor: '#00000017',
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
      marginLeft: wp(5),
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
  