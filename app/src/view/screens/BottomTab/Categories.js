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
// hover apps

import {InstalledApps} from 'react-native-launcher-kit';
import Swiper from 'react-native-swiper';

//------------------------\\
export default function Categories({navigation}) {
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [dataApps, setData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [flatListKey, setFlatListKey] = useState(Date.now()); // Add a key for the FlatList

  useEffect(() => {
    const fetchData = async () => {
      const installedApps = InstalledApps.getSortedApps();
      const packageNames = installedApps.map(app => app.label);
      const packageImages = installedApps.map(app => app.icon);

      const packageDataArray = packageNames.map((packageName, index) => ({
        label: packageName,
        image: packageImages[index],
      }));

      setData(packageDataArray);
      setIsLoading(false);
    };

    fetchData();
  }, []);

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
    console.log("item at first", item?.label)
    return (
      <DraxView
        style={styles.items}
        draggingStyle={{opacity: 0.5}}
        dragReleasedStyle={{opacity: 1}}
        onDragStart={() => {
          console.log('start drag');
        }}
        onDragEnd={({dragged: data}) => onDragEnd(data, dataApps)}>
        <Image
          style={{width: 30, height: 30}}
          source={{uri: `data:image/png;base64,${item?.image}`}}
        />
        <Text style={{color: '#000000', fontSize: hp(1.3), fontWeight: 'bold'}}>
          {item?.label}
        </Text>
      </DraxView>
    );
  };

  const renderFavouriteApps = item => {
    console.log('Items', item);
    return (
      <DraxView
        draggingStyle={{opacity: 0.5}}
        dragReleasedStyle={{opacity: 1}}
        onDragStart={() => {
          console.log('start drag');
        }}
        onDragEnd={({dragged: data}) => onDragEnd(data, favouriteApps)}
        style={{
          height: hp(8),
          width: wp(15),
          margin: 2.8,
        }}>
        <Image source={item?.image} />
      </DraxView>
      /* 
draggingStyle={{opacity: 0.5}}
dragReleasedStyle={{opacity: 1}}

onDragEnd={({dragged: data}) => onDragEnd(data, favouriteApps)} */
    );
  };

  const renderAvailableApps = item => {
    console.log('Items', item);
    return (
      <View
        style={{
          height: hp(8),
          width: wp(15),
          margin: 2.8,
        }}>
        <Image source={item?.image} />
      </View>
    );

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
    <DraxProvider>
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
              data={availableApps}
              keyExtractor={item => item.id.toString()}
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
                  <DraxView key={index} style={{flex: 1, borderWidth: 1,
                    marginHorizontal: wp(2.3),
                    marginTop: hp(3),
                    borderColor: '#00000017',
                    borderRadius: wp(3),}}>
                    
                      <FlatList
                        data={dataApps.slice(
                          index * itemsPerPage,
                          (index + 1) * itemsPerPage,
                        )}
                        numColumns={5}
                        keyExtractor={(item, itemIndex) =>
                          `${index}-${itemIndex}`
                        }
                        renderItem={({item}) => renderApps(item)}
                      />
                  </DraxView>
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

          <View style={{marginTop: hp(5), height: hp(20)}}>
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
                //keyExtractor={item => item.id.toString()}
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
                //keyExtractor={item => item.id.toString()}
                numColumns={5} // Set the number of columns to 3
                renderItem={({item}) => renderFavouriteApps(item)}
              />
            </View>
          </View>

          <View
            style={{marginTop: hp(8), marginBottom: hp(10), height: hp(20)}}>
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
                //keyExtractor={item => item.id.toString()}
                numColumns={5} // Set the number of columns to 3
                renderItem={({item}) => renderFavouriteApps(item)}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </DraxProvider>
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
  items: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //borderWidth: 1,
    borderColor: 'black',
    padding: 10,
  },
});