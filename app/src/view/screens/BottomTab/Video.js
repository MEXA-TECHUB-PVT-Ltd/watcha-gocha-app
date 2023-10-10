import {
  StyleSheet,
  FlatList,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Text,
  View,
} from 'react-native';
import React, {useState, useRef} from 'react';
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

import RBSheet from 'react-native-raw-bottom-sheet';

export default function Video({navigation}) {
  const [selectedItemId, setSelectedItemId] = useState(null);

  const [selectedItem, setSelectedItem] = useState('');

  const ref_RBSheetCamera = useRef(null);

  const takePhotoFromCamera = value => {
    ref_RBSheetCamera.current.close();
    setSelectedItem(value);
    navigation.navigate('UploadUpdateVideo');
  };

  const choosePhotoFromLibrary = value => {
    ref_RBSheetCamera.current.close();
    setSelectedItem(value);
    navigation.navigate('UploadUpdateVideo');
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
    console.log('Items', item);
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ViewVideo')}
        style={{width: wp(27), margin: 5}}>
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
            source={item.image}
          />
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
            {item.title}
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

      <View style={{marginTop: hp(5)}}>
        <Headers
          showListings={true}
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
            data={searches}
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
          <TouchableOpacity onPress={()=> navigation.navigate('ViewVideo')}  style={{width: wp(39), height: '100%', borderRadius: wp(5)}}>
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
              source={appImages.topSearches1}
            />
            <View
              style={{
                position: 'absolute',
                top: hp(15),
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
                name
              </Text>
            </View>
          </TouchableOpacity>

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
              Explore the intricate web of global politics in this
              thought-provoking video as we delve into the ever-shifting
              landscape of international diplomacy......
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
            <FlatList
              style={{flex: 1}}
              showsVerticalScrollIndicator={false}
              data={availableAppsVideo}
              horizontal
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => renderAvailableAppsVideo(item)}
            />
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
            <FlatList
              style={{flex: 1}}
              showsVerticalScrollIndicator={false}
              data={availableAppsVideo}
              horizontal
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => renderAvailableAppsVideo(item)}
            />
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
            <FlatList
              style={{flex: 1}}
              showsVerticalScrollIndicator={false}
              data={availableAppsVideo}
              horizontal
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => renderAvailableAppsVideo(item)}
            />
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
            <FlatList
              style={{flex: 1}}
              showsVerticalScrollIndicator={false}
              data={availableAppsVideo}
              horizontal
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => renderAvailableAppsVideo(item)}
            />
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
