import {
  StyleSheet,
  FlatList,
  Text,
  StatusBar,
  Image,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Back from '../../assets/svg/back.svg';
import {appImages} from '../../assets/utilities/index';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Fontiso from 'react-native-vector-icons/Fontisto';

export default function SearchProducts({navigation}) {
  const [selectedItemId, setSelectedItemId] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');

  const [searches, setSearches] = useState([]);

  const [data, setData] = useState([]);

  const [filteredData, setFilteredData] = useState([]);

  const [loading, setLoading] = useState(false);

  const searchess = [
    {id: 1, title: 'Lense'},
    {id: 2, title: 'Shoes'},
    {id: 3, title: 'HeadPhones'},
    {id: 4, title: 'Lense'},
    {id: 5, title: 'Shoes'},
    {id: 6, title: 'HeadPhones'},
    {id: 7, title: 'Lense'},
    {id: 8, title: 'Shoes'},
    {id: 9, title: 'HeadPhones'},
    {id: 10, title: 'Lense'},
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
  useEffect(() => {
    // Make the API request and update the 'data' state
    fetchAll();
  }, []);

  const fetchAll = async () => {
    // Simulate loading
    setLoading(true);
    // Fetch data one by one
    await loadSearchesFromStorage();

    // Once all data is fetched, set loading to false
    setLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY5ODEyMzUxNSwiZXhwIjoxNzAwNzE1NTE1fQ.0JrofPFHubokiOAwlQWsL1rSuKdnadl9ERLrUnLkd_U';

    try {
      const response = await fetch(
        `https://watch-gotcha-be.mtechub.com/item/searchItems?name=${selectedItemId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      console.log('AllItems', result.letters);
      setData(result.letters); // Update the state with the fetched data
    } catch (error) {
      console.error('Error Trending:', error);
    }
    };

    fetchData();
  }, [selectedItemId]);

  const handleSearch = text => {
    console.log("data Search", data)
    const searchTerm = text.toLowerCase();

    const filteredApps = data.filter(app =>
      app.title.toLowerCase().includes(searchTerm),
    );
    setFilteredData(filteredApps);
  };

  const loadSearchesFromStorage = async () => {
    try {
      const savedSearches = await AsyncStorage.getItem('searchesProducts');
      if (savedSearches) {
        setSearches(JSON.parse(savedSearches));
      }
    } catch (error) {
      console.error('Error loading searches from storage:', error);
    }
  };


  const saveSearchTerm = async () => {

    console.log("Search Term", searchTerm)
    if (searchTerm.trim() === '') {
      return;
    }

    try {
      const newSearchTerm = {id: searches.length + 1, title: searchTerm};
      const updatedSearches = [...searches, newSearchTerm];

      await AsyncStorage.setItem('searchesProducts', JSON.stringify(updatedSearches));
      setSearches(updatedSearches);
      setSearchTerm(''); // Clear the input field
      fetchAll();
    } catch (error) {
      console.error('Error saving search term:', error);
    }
  };



  const renderSearches = item => {
    const isSelected = selectedItemId === item.title;

    return (
      <TouchableOpacity
        style={[
          styles.searchesDetails,
          {
            backgroundColor: isSelected ? '#FACA4E' : '#F2F2F2',
          },
        ]}
        onPress={() => {
          setSelectedItemId(item.title);
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
    console.log('Items images', item.images[0].image);

    return (
      <View
        style={{
          height: hp(18),
          flex: 1,
          borderRadius: wp(3),
          margin: 5,
        }}>
        <Image
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1, // Ensure it's on top of other elements
            flex: 1,
            width: '100%',
            height: '100%',
            borderRadius: wp(3),
            resizeMode: 'cover',
          }}
          source={{uri:'https://watch-gotcha-be.mtechub.com/'+ item.images[0].image}}
        />
        <View
            style={{
              position: 'absolute',
              top: hp(14.5),
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
                fontSize: hp(1.9),
                fontFamily: 'Inter-Medium',
                color: '#FFFFFF',
              }}>
              {item.title}
            </Text>
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
      <View style={styles.searchHeader}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
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
            onChangeText={text => {
              setSearchTerm(text);
              //setSelectedItemId(text)
              handleSearch(text);
            }}
            onSubmitEditing={() => {
              saveSearchTerm();
              // This code will execute when the "Okay" button is pressed
              //console.log("Good", searchTerm);
            }}
          />
        </View>
      </View>

      <Text style={styles.latestSearch}>Latest Search</Text>

      <View style={styles.latestSearchList}>
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

      <Text style={styles.latestSearch}>Top Searches</Text>

      <FlatList
        style={{marginTop: hp(3), marginHorizontal:wp(5), flex: 1}}
        showsVerticalScrollIndicator={false}
        data={data}
        keyExtractor={item => item.id.toString()}
        numColumns={3} // Set the number of columns to 3
        renderItem={({item}) => renderAvailableApps(item)}
      />
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
    marginTop: hp(8),
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
