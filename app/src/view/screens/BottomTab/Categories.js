import {StyleSheet, FlatList, Image, StatusBar, TouchableOpacity, ScrollView, TextInput, Text, View} from 'react-native';
import React,{useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Fontiso from 'react-native-vector-icons/Fontisto';
import Headers from '../../../assets/Custom/Headers';
import { appImages } from '../../../assets/utilities';

export default function Categories({navigation}) {
  const [selectedItemId, setSelectedItemId] = useState(null);

  const availableApps = [
    {id: 1, title: 'SnapChat', image: appImages.snapchat },
    {id: 2, title: 'Gmail', image: appImages.gmail},
    {id: 3, title: 'Pinterest', image: appImages.pinterest},
    {id: 4, title: 'LinkedIn', image: appImages.linkedIn},
    {id: 5, title: 'Calendar', image: appImages.calendar},
    {id: 6, title: 'SnapChat', image: appImages.snapchat},
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

  const favouriteApps = [
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
  ];

  const renderFavouriteApps = item => {
    console.log('Items', item);
    return (
      <View
        style={{
          height: hp(8),
          width: wp(15),
          //flex: 1,
          //borderRadius: wp(3),
          margin: 2.8,
        }}>
        <Image source={item.image} />
      </View>
    );
  };


  const renderAvailableApps = item => {
    console.log('Items', item);
    return (
      <View
        style={{
          height: hp(8),
          width:wp(15),
          //flex: 1,
          //borderRadius: wp(3),
          margin: 2.8,
        }}>
       <Image source={item.image}/>
         
      </View>
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
          {item.title}
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
      <View style={{marginTop:hp(5)}}>

        <Headers showListings={true} showSearch={true} onPressSearch={()=>navigation.navigate("SearchApps")} />

      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={{flex:1, marginHorizontal:wp(3)}}>
     
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

      <View style={{marginTop:hp(2), marginLeft:wp(3), height:hp(20), width:wp(53) }}>
      <FlatList
        style={{margin:8,flex: 1}}
        showsVerticalScrollIndicator={false}
        data={availableApps}
        keyExtractor={item => item.id.toString()}
        numColumns={3} // Set the number of columns to 3
        renderItem={({item}) => renderAvailableApps(item)}
      />
      </View>


      <View style={{marginTop: hp(2), height: hp(20)}}>
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

          <View
            style={{
              borderWidth: 1,
              marginHorizontal: wp(2.3),
              marginTop: hp(3),
              height: hp(20),
              borderColor: '#00000017',
              borderRadius: wp(3),
            }}>
            <FlatList
              style={{margin: 8, flex: 1}}
              showsVerticalScrollIndicator={false}
              data={favouriteApps}
              keyExtractor={item => item.id.toString()}
              numColumns={5} // Set the number of columns to 3
              renderItem={({item}) => renderFavouriteApps(item)}
            />
          </View>
        </View>

        <View style={{marginTop: hp(8), height: hp(20)}}>
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

          <View
            style={{
              borderWidth: 1,
              marginHorizontal: wp(2.3),
              marginTop: hp(3),
              height: hp(20),
              borderColor: '#00000017',
              borderRadius: wp(3),
            }}>
            <FlatList
              style={{margin: 8, flex: 1}}
              showsVerticalScrollIndicator={false}
              data={favouriteApps}
              keyExtractor={item => item.id.toString()}
              numColumns={5} // Set the number of columns to 3
              renderItem={({item}) => renderFavouriteApps(item)}
            />
          </View>
        </View>

        <View style={{marginTop: hp(8), height: hp(20)}}>
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

          <View
            style={{
              borderWidth: 1,
              marginHorizontal: wp(2.3),
              //marginBottom:hp(50),
              marginTop: hp(3),
              height: hp(20),
              borderColor: '#00000017',
              borderRadius: wp(3),
            }}>
            <FlatList
              style={{margin: 8, flex: 1}}
              showsVerticalScrollIndicator={false}
              data={favouriteApps}
              keyExtractor={item => item.id.toString()}
              numColumns={5} // Set the number of columns to 3
              renderItem={({item}) => renderFavouriteApps(item)}
            />
          </View>
        </View>

        <View style={{marginTop: hp(8), marginBottom:hp(10), height: hp(20)}}>
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

          <View
            style={{
              borderWidth: 1,
              marginHorizontal: wp(2.3),
              //marginBottom:hp(50),
              marginTop: hp(3),
              height: hp(20),
              borderColor: '#00000017',
              borderRadius: wp(3),
            }}>
            <FlatList
              style={{margin: 8, flex: 1}}
              showsVerticalScrollIndicator={false}
              data={favouriteApps}
              keyExtractor={item => item.id.toString()}
              numColumns={5} // Set the number of columns to 3
              renderItem={({item}) => renderFavouriteApps(item)}
            />
          </View>
        </View>
      </ScrollView>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: wp(3),
    backgroundColor: 'white',
  },searchBar: {
    height: hp(5.9),
    marginTop:hp(3),
    flex: 1,
    backgroundColor:'#F2F2F2',
    flexDirection: 'row',
    alignItems: 'center',
    //marginLeft: wp(3.8),
    borderRadius: wp(5),
    borderWidth: 0.5,
    borderColor: '#00000017',
  }, latestSearchList: {
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
