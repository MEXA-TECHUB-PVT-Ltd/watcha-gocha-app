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
  import Fontiso from 'react-native-vector-icons/Fontisto';
  import Entypo from 'react-native-vector-icons/Entypo';
  
  import Headers from '../../../assets/Custom/Headers';
  import {appImages} from '../../../assets/utilities';
  import Add from '../../../assets/svg/AddMainScreen.svg'
  export default function MarketZone({navigation}) {
    const [selectedItemId, setSelectedItemId] = useState(null);
  
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
        <TouchableOpacity onPress={()=>navigation.navigate("ProductDetails")} style={{width: wp(25.5),margin:5}}>
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
                borderRadius: wp(2.5),
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
                fontSize: hp(1.7),
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
  
        <Headers onPressListings={()=>navigation.openDrawer()} showListings={true} showText={true} onPressSearch={()=>navigation.navigate("SearchProducts")} text={'Market Zone'} showSearch={true}/>

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

          <View style={{marginTop:hp(1), marginLeft:wp(5)}}>

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
              data={searches}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => renderSearches(item)}
            />
          </View>
          <View style={{marginTop: hp(1.5), flexDirection:'row', height: hp(16)}}>
            <TouchableOpacity onPress={()=>navigation.navigate("ProductDetails")} style={{width: wp(43), height: '100%', borderRadius: wp(5)}}>
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
                    fontSize: hp(2.5),
                    fontFamily: 'Inter-Medium',
                    color: '#FFFFFF',
                    fontWeight: '700',
                  }}>
                  Name
                </Text>
              </View>
  
            </TouchableOpacity>
            
            <View style={{justifyContent:'flex-end',width:'50%'}}>
            <Text
              style={{
                fontSize: hp(1.5),
                marginLeft: wp(1),
                lineHeight: hp(2),
                fontFamily: 'Inter-Regular',
                color: '#000000',
                //fontWeight: '700',
              }}>
              Explore the intricate web of global politics in this
              thought-provoking video as we delve into the ever-shifting landscape
              of international diplomacy......
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
                data={availableApps}
                horizontal
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => renderAvailableApps(item)}
              />
            </View>
          </View>
  
  
          <View style={{ marginTop:hp(2),height: hp(23)}}>
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
                data={availableApps}
                horizontal
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => renderAvailableApps(item)}
              />
            </View>
          </View>
  
  
          <View style={{marginTop:hp(2),height: hp(23)}}>
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
                data={availableApps}
                horizontal
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => renderAvailableApps(item)}
              />
            </View>
          </View>
  
          <View style={{marginTop:hp(2),height: hp(23)}}>
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
                data={availableApps}
                horizontal
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => renderAvailableApps(item)}
              />
            </View>
          </View>

          
  
  
         
        </ScrollView>

        <TouchableOpacity onPress={()=>navigation.navigate("Sell")} style={{position:'absolute',bottom:1, right:25}}>
           <Add/>
          </TouchableOpacity>
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
  