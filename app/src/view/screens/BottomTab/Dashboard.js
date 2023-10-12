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
import React, {useState} from 'react';
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

export default function Dashboard({navigation}) {
  const [selectedItemId, setSelectedItemId] = useState(null);

  const [selectedItemVideoId, setSelectedItemVideoId] = useState(null);

  const [selectedItemDiscId, setSelectedItemDiscId] = useState(null);

  const [selectedItemPicsId, setSelectedItemPicsId] = useState(null);

  const [selectedItemMarketId, setSelectedItemMarketId] = useState(null);

  const availableApps = [
    {id: 1, title: 'SnapChat', image: appImages.snapchat},
    {id: 2, title: 'Gmail', image: appImages.gmail},
    {id: 3, title: 'Pinterest', image: appImages.pinterest},
    {id: 4, title: 'LinkedIn', image: appImages.linkedIn},
    {id: 5, title: 'Calendar', image: appImages.calendar},
    {id: 6, title: 'SnapChat', image: appImages.snapchat},
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

  const searchesVideo = [
    {id: 1, title: 'Comedy'},
    {id: 2, title: 'TV'},
    {id: 3, title: 'Religion'},
    {id: 4, title: 'Kids'},
    {id: 5, title: 'Parodies'},
    {id: 6, title: 'Educational'},
    {id: 7, title: 'Creativity'},
    {id: 8, title: 'Pranks'},
    {id: 9, title: 'Unboxing'},
    {id: 10, title: 'Vlogs'},
    {id: 11, title: 'Animals'},
    {id: 12, title: 'Tutorials'},
    {id: 13, title: 'Celebrities'},

  ];

  const renderAvailableApps = item => {
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
        <Image
          style={{width: wp(11), height: hp(11), resizeMode: 'contain'}}
          source={item.image}
        />
      </View>
    );
  };

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
        <Image
          style={{width: wp(11), height: hp(11), resizeMode: 'contain'}}
          source={item.image}
        />
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

  //Video

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

  const renderAvailableAppsVideo = item => {
    console.log('Items', item);
    return (
      <TouchableOpacity  onPress={() => navigation.navigate('ViewVideo')} style={{width: wp(27), margin: 5}}>
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
          <Text style={{fontSize: hp(1.5), fontFamily:'Inter-Regular', color:'#000000', width: wp(23)}}>
            {item.title}
          </Text>

          <Entypo name={'dots-three-vertical'} size={14} color={'#4A4A4A'} />
        </View>
      </TouchableOpacity>
    );
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
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  //----------------\\

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
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  //---------------\\

  //Disc

  const availableAppsDisc = [
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

  //Market Zone

  const searchesPics = [
    {id: 1, title: 'Funny'},
    {id: 2, title: 'Sports'},
    {id: 3, title: 'Historic'},
    {id: 4, title: 'Technology'},
    {id: 5, title: 'Celebrities'},
    {id: 6, title: 'Animals'},
    {id: 7, title: 'Beauty & Fashion'},
    {id: 8, title: 'People'},
    {id: 9, title: 'Food'},
    {id: 8, title: 'Science'},
    {id: 9, title: 'Nature'},
    {id: 10, title: 'Travel'},
    {id:11, title: 'Art'},






  ];

  //------------\\

  //Disc Screen

  const searchesDisc = [
    {id: 1, title: 'On News'},
    {id: 2, title: 'Open Letters'},
    {id: 3, title: 'QAFI'},
    {id: 4, title: 'GEBC'},
  ];

  const renderAvailableAppsDisc = item => {
    console.log('Items', item);
    return (
      <TouchableOpacity onPress={()=>navigation.navigate("News")} style={{width: wp(27), margin: 5}}>
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
            marginTop: hp(12),
            height: hp(7),
            width: wp(40),
          }}>
          <View
            style={{
              width: wp(7),
              marginLeft: wp(0.5),
              height: wp(7),
              borderRadius: wp(7) / 2,
            }}>
            <Image
              source={appImages.profileImg}
              style={{width: '100%', height: '100%', resizeMode: 'cover'}}
            />
          </View>

          <Text
            style={{
              fontSize: hp(1.6),
              marginLeft: wp(0.7),
              color: '#000000',
              fontWeight: 'bold',
              fontFamily: 'Inter',
            }}>
            John Doe
          </Text>

          <View style={{marginLeft: wp(1)}}>
            <Approved />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderSearchesDisc = item => {
    console.log('Items', item);
    const isSelected = selectedItemId === item.id;

    return (
      <TouchableOpacity
        style={[
          styles.searchesDetails,
          {
            backgroundColor: isSelected ? '#FACA4E' : '#F2F2F2',
            width:wp(25)
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

  const DiscScreenDisc = () => {
    return (
      <View style={{flex: 1}}>
        <View
          style={{marginTop: hp(1.5), flexDirection: 'row', height: hp(18)}}>
          <View style={{width: wp(40), height: '100%', borderRadius: wp(5)}}>
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
                <Image
                  source={appImages.profileImg}
                  style={{width: '100%', height: '100%', resizeMode: 'cover'}}
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
                John Doe
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
                width: wp(40),
              }}>
              <Text
                style={{
                  fontSize: hp(1.5),
                  marginLeft: wp(2.5),
                  fontWeight: 'bold',
                  fontFamily: 'Inter',
                  color: '#000000',
                }}>
                Explore the intricate web of global politics in this thought-
              </Text>
            </View>
          </View>
        </View>

        <View style={{marginTop: hp(2), height: hp(23)}}>
          <View style={{marginTop: hp(1), height: '100%'}}>
            <FlatList
              style={{flex: 1}}
              showsVerticalScrollIndicator={false}
              data={availableApps}
              horizontal
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => renderAvailableApps(item)}
            />
          </View>
        </View>

        <View style={{height: hp(23)}}>
          <View style={{marginTop: hp(1), height: '100%'}}>
            <FlatList
              style={{flex: 1}}
              showsVerticalScrollIndicator={false}
              data={availableApps}
              horizontal
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => renderAvailableApps(item)}
            />
          </View>
        </View>

        <View style={{height: hp(23)}}>
          <View style={{marginTop: hp(1), height: '100%'}}>
            <FlatList
              style={{flex: 1}}
              showsVerticalScrollIndicator={false}
              data={availableApps}
              horizontal
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => renderAvailableApps(item)}
            />
          </View>
        </View>

        <View style={{height: hp(23)}}>
          <View style={{marginTop: hp(1), height: '100%'}}>
            <FlatList
              style={{flex: 1}}
              showsVerticalScrollIndicator={false}
              data={availableApps}
              horizontal
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => renderAvailableApps(item)}
            />
          </View>
        </View>
      </View>
    );
  };

  const OpenLettersDisc = () => {
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
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Image
              source={appImages.OpenLetter}
              style={{resizeMode: 'contain', width: wp(39)}}
            />

            <Image
              source={appImages.OpenLetter}
              style={{resizeMode: 'contain', width: wp(39)}}
            />
          </View>
        </View>

        <View style={{marginTop: hp(5), height: hp(21)}}>
          <Text style={{color: '#4A4A4A', fontWeight: 'bold', fontSize: hp(2)}}>
            Public (to authorities, celebrities, leaders)
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Image
              source={appImages.OpenLetter}
              style={{resizeMode: 'contain', width: wp(39)}}
            />

            <Image
              source={appImages.OpenLetter}
              style={{resizeMode: 'contain', width: wp(39)}}
            />
          </View>
        </View>

        <View style={{marginTop: hp(5), height: hp(21)}}>
          <Text style={{color: '#4A4A4A', fontWeight: 'bold', fontSize: hp(2)}}>
            Private (to friends, peers, followers)
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Image
              source={appImages.OpenLetter}
              style={{resizeMode: 'contain', width: wp(39)}}
            />

            <Image
              source={appImages.OpenLetter}
              style={{resizeMode: 'contain', width: wp(39)}}
            />
          </View>
        </View>

        <View style={{marginTop: hp(5), height: hp(21)}}>
          <Text style={{color: '#4A4A4A', fontWeight: 'bold', fontSize: hp(2)}}>
            Private (to authorities, celebrities, leaders){' '}
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Image
              source={appImages.OpenLetter}
              style={{resizeMode: 'contain', width: wp(39)}}
            />

            <Image
              source={appImages.OpenLetter}
              style={{resizeMode: 'contain', width: wp(39)}}
            />
          </View>
        </View>
      </View>
    );
  };

  //----------------\\

  //Market Zone

  const availableAppsMarketZone = [
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

  const searchesMarketZone = [
    {id: 1, title: 'Africa'},
    {id: 2, title: 'Europe'},
    {id: 3, title: 'N America'},
    {id: 4, title: 'L. America'},
    {id: 5, title: 'Asia'},
    {id: 6, title: 'Middle East'},
    {id: 7, title: 'Carribean'},
  ];

  const renderAvailableAppsMarketZone = item => {
    console.log('Items', item);

    return (
      <TouchableOpacity onPress={()=>navigation.navigate('ProductDetails')} style={{width: wp(27), margin: 5}}>
        <View>
          <Image
            style={{
              position: 'absolute',
              top: 0,
              left: 0,

              zIndex: 1, // Ensure it's on top of other elements
              //flex: 1,
              width: '100%',
              height: hp(16),
              borderRadius: wp(1),
              resizeMode: 'cover',
            }}
            source={item.image}
          />
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
              fontSize: hp(1.6),
              fontFamily: 'Inter',
              color: '#FFFFFF',
              fontWeight: '700',
            }}>
            {item.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderSearchesMarketZone = item => {
    console.log('Items', item);
    const isSelected = selectedItemMarketId === item.id;

    return (
      <TouchableOpacity
        style={[
          styles.searchesDetails,
          {
            backgroundColor: isSelected ? '#FACA4E' : '#F2F2F2',
          },
        ]}
        onPress={() => {
          setSelectedItemMarketId(item.id);
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

  //----------------------\\

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

        <View style={styles.latestSearchList}>
          <Text style={{fontFamily: 'Inter-Medium', marginLeft: wp(-2)}}>
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

        <View style={{marginTop: hp(2), height: hp(20), width: wp(53)}}>
          <FlatList
            style={{margin: 8, flex: 1}}
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
              style={{marginLeft: wp(2), flex: 1}}
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
              style={{marginLeft: wp(2.5), flex: 1}}
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
              style={{marginLeft: wp(2.5), flex: 1}}
              showsVerticalScrollIndicator={false}
              data={favouriteApps}
              keyExtractor={item => item.id.toString()}
              numColumns={5} // Set the number of columns to 3
              renderItem={({item}) => renderFavouriteApps(item)}
            />
          </View>
        </View>

        <View style={{marginTop: hp(8), marginBottom: hp(10), height: hp(20)}}>
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
              style={{marginLeft: wp(2.5), flex: 1}}
              showsVerticalScrollIndicator={false}
              data={favouriteApps}
              keyExtractor={item => item.id.toString()}
              numColumns={5} // Set the number of columns to 3
              renderItem={({item}) => renderFavouriteApps(item)}
            />
          </View>
        </View>

        {/* Video */}

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
          Pi/3.14 Videos
        </Text>

        <View style={[styles.latestSearchList, {marginLeft: wp(2.5)}]}>
          <Text
            style={{color: '#232323', fontWeight: 'bold', fontSize: hp(2.1)}}>
            Top
          </Text>
          <FlatList
            style={{flex: 1}}
            contentContainerStyle={{alignItems: 'center'}}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={searchesVideo}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => renderSearchesVideo(item)}
          />
        </View>
        <View
          style={{
            marginTop: hp(1.5),
            marginLeft: wp(2.5),
            flexDirection: 'row',
            height: hp(18),
          }}>
          <TouchableOpacity onPress={()=> navigation.navigate('ViewVideo')} style={{width: wp(35), height: '100%', borderRadius: wp(5)}}>
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

          <View style={{marginTop: hp(0.8), marginLeft: wp(3), width: '35%'}}>
            <Text
              style={{
                fontSize: hp(1.6),
                marginLeft: wp(1),
                lineHeight: 15.5,
                fontFamily: 'Inter-Regular',
                color: '#000000',
                //fontWeight: '700',
              }}>
              Explore the intricate web of global politics in this
              thought-provoking video as we delve into the ever-shifting
              landscape of
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

        <View style={{marginTop:hp(2.1),height: hp(23)}}>
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

        <View style={{marginTop:hp(2.1),height: hp(23)}}>
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

        <View style={{marginTop:hp(2.1),height: hp(23)}}>
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

        {/* //--------------\\ */}

        {/* Disc */}

        <View style={{flex: 1}}>
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

          <View style={{marginTop: hp(1), marginHorizontal: wp(3)}}>
            <Text
              style={{color: '#FACA4E', fontWeight: 'bold', fontSize: hp(2.3)}}>
              DISC
            </Text>
          </View>

          <View style={[styles.latestSearchList, {marginLeft:wp(3)}]}>
            <Text
              style={{color: '#232323', fontWeight: 'bold', fontSize: hp(2.1)}}>
              Top
            </Text>
            <FlatList
              style={{flex: 1}}
              contentContainerStyle={{alignItems: 'center'}}
              showsHorizontalScrollIndicator={false}
              horizontal
              data={searchesDisc}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => renderSearchesDisc(item)}
            />
          </View>

          <View 
            style={{marginTop: hp(1.5), flexDirection: 'row', height: hp(18)}}>
            <TouchableOpacity onPress={()=>navigation.navigate("News")} style={{width: wp(35), marginLeft:wp(2), height: '100%', borderRadius: wp(5)}}>
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
            </TouchableOpacity>

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
                  <Image
                    source={appImages.profileImg}
                    style={{width: '100%', height: '100%', resizeMode: 'cover'}}
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
                  John Doe
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
                  marginLeft:wp(1.5),
                  width: wp(35),
                }}>
                <Text
                  style={{
                    fontSize: hp(1.5),
                    lineHeight:hp(2.3),
                    marginLeft: wp(2.5),
                    //fontWeight: 'Inter_Regular',
                    fontFamily: 'Inter_Regular',
                    color: '#000000',
                  }}>
                  Explore the intricate web of global politics in this thought-
                </Text>
              </View>
            </View>
          </View>

          <View style={{marginTop: hp(2), height: hp(23)}}>
            <View style={{marginTop: hp(1), height: '100%'}}>
              <FlatList
                style={{flex: 1}}
                showsVerticalScrollIndicator={false}
                data={availableAppsDisc}
                horizontal
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => renderAvailableAppsDisc(item)}
              />
            </View>
          </View>

          <View style={{height: hp(23)}}>
            <View style={{marginTop: hp(1), height: '100%'}}>
              <FlatList
                style={{flex: 1}}
                showsVerticalScrollIndicator={false}
                data={availableAppsDisc}
                horizontal
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => renderAvailableAppsDisc(item)}
              />
            </View>
          </View>
        </View>

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

        <View style={[styles.latestSearchList,{marginLeft:wp(3)}]}>
          <Text
            style={{color: '#232323', fontWeight: 'bold', fontSize: hp(2.1)}}>
            Top
          </Text>
          <FlatList
            style={{flex: 1}}
            contentContainerStyle={{alignItems: 'center'}}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={searchesPics}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => renderSearchesPic(item)}
          />
        </View>
        <View
          style={{marginTop: hp(1.5), flexDirection: 'row', height: hp(18)}}>
          <TouchableOpacity onPress={()=>navigation.navigate("ViewVideo")} style={{width: wp(35),  marginLeft: wp(2.5), height: '100%', borderRadius: wp(5)}}>
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
                name
              </Text>
            </View>
          </TouchableOpacity>

          <View style={{marginTop: hp(0.8), marginLeft: wp(3), width: '35%'}}>
          <Text
              style={{
                fontSize: hp(1.6),
                marginLeft: wp(1),
                lineHeight: 15.5,
                fontFamily: 'Inter-Regular',
                color: '#000000',
                //fontWeight: '700',
              }}>
              Explore the intricate web of global politics in this
              thought-provoking video as we delve into the ever-shifting
              landscape of
            </Text>
          </View>
        </View>

        <View
          style={{marginTop: hp(1.5), height: hp(23)}}>
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

        <View style={{marginTop:hp(3),height: hp(23)}}>
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

        <View style={{marginTop:hp(3),height: hp(23)}}>
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

        <View style={{marginTop:hp(3),height: hp(23)}}>
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

        <View style={{marginTop: hp(1), marginLeft: wp(3)}}>
          <Text
            style={{color: '#FACA4E', fontWeight: 'bold', fontSize: hp(2.3)}}>
            Market Zone
          </Text>
        </View>

        <View style={[styles.latestSearchList,{marginLeft:wp(3)}]}>
          <Text
            style={{color: '#232323', fontWeight: 'bold', fontSize: hp(2.1)}}>
            Top
          </Text>
          <FlatList
            style={{flex: 1}}
            contentContainerStyle={{alignItems: 'center'}}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={searchesMarketZone}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => renderSearchesMarketZone(item)}
          />
        </View>
        <View
          style={{marginTop: hp(1.5), marginLeft: wp(2.5), flexDirection: 'row', height: hp(18)}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ProductDetails')}
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
              source={appImages.topSearches1}
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
                name
              </Text>
            </View>
          </TouchableOpacity>

          <View style={{marginTop: hp(0.8), marginLeft: wp(3), width: '35%'}}>
            <Text
              style={{
                fontSize: hp(1.6),
                marginLeft: wp(1),
                lineHeight: 15.5,
                fontFamily: 'Inter-Regular',
                color: '#000000',
                //fontWeight: '700',
              }}>
              Explore the intricate web of global politics in this
              thought-provoking video as we delve into the ever-shifting
              landscape of
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
            Phones and Entertainment
          </Text>

          <View style={{marginTop: hp(1), height: '100%'}}>
            <FlatList
              style={{flex: 1}}
              showsVerticalScrollIndicator={false}
              data={availableAppsMarketZone}
              horizontal
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => renderAvailableAppsMarketZone(item)}
            />
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
            Vehicle and parts
          </Text>

          <View style={{marginTop: hp(1), height: '100%'}}>
            <FlatList
              style={{flex: 1}}
              showsVerticalScrollIndicator={false}
              data={availableAppsMarketZone}
              horizontal
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => renderAvailableAppsMarketZone(item)}
            />
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
            Clothing and related items
          </Text>

          <View style={{marginTop: hp(1), height: '100%'}}>
            <FlatList
              style={{flex: 1}}
              showsVerticalScrollIndicator={false}
              data={availableAppsMarketZone}
              horizontal
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => renderAvailableAppsMarketZone(item)}
            />
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
            <FlatList
              style={{flex: 1}}
              showsVerticalScrollIndicator={false}
              data={availableAppsMarketZone}
              horizontal
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => renderAvailableAppsMarketZone(item)}
            />
          </View>
        </View>

       

        {/* //---------------------\\ */}

        {/* //------------\\ */}
      </ScrollView>

      <TouchableOpacity
        onPress={() => navigation.navigate("ChatScreen")}
        style={{position: 'absolute', bottom: 1, right: 20}}>
       <Chat/>
      </TouchableOpacity>
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

  //video styles
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

  //Market Zone

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
