import {
  StyleSheet,
  FlatList,
  Text,
  Image,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Back from '../../assets/svg/back.svg';
import {appImages} from '../../assets/utilities/index';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Fontiso from 'react-native-vector-icons/Fontisto';

export default function SearchScreen({navigation}) {
  const [selectedItemId, setSelectedItemId] = useState(null);

  const searches = [
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
    {id: 1, title: 'Explore the intricate web of global politics in this ever-shifting landscape of international diplomacy......', image: appImages.topSearches1},
    {id: 2, title: 'Explore the intricate web of global politics in this ever-shifting landscape of international diplomacy......', image: appImages.topSearches2},
    {id: 3, title: 'Explore the intricate web of global politics in this ever-shifting landscape of international diplomacy......', image: appImages.topSearches3},
    {id: 4, title: 'Explore the intricate web of global politics in this ever-shifting landscape of international diplomacy......', image: appImages.topSearches4},
    {id: 5, title: 'Explore the intricate web of global politics in this ever-shifting landscape of international diplomacy......', image: appImages.topSearches1},
    {id: 6, title: 'Explore the intricate web of global politics in this ever-shifting landscape of international diplomacy......', image: appImages.topSearches2},
    {id: 7, title: 'Explore the intricate web of global politics in this ever-shifting landscape of international diplomacy......', image: appImages.topSearches3},
    {id: 8, title: 'Explore the intricate web of global politics in this ever-shifting landscape of international diplomacy......', image: appImages.topSearches4},
    {id: 9, title: 'Explore the intricate web of global politics in this ever-shifting landscape of international diplomacy......', image: appImages.topSearches1},
    {id: 10, title: 'Explore the intricate web of global politics in this ever-shifting landscape of international diplomacy......', image: appImages.topSearches2},
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
            source={item.image}
          />
        </View>

        <Text
          style={{
            marginLeft: wp(3),
            flex: 1,
            color: '#333333',
            fontFamily: 'Inter',
          }}>
          {item.title}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
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
        style={{marginTop: hp(3), flex: 1}}
        showsVerticalScrollIndicator={false}
        data={availableApps}
        keyExtractor={item => item.id.toString()}
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
