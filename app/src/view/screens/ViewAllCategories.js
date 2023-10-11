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

import Headers from '../../assets/Custom/Headers';
import {appImages} from '../../assets/utilities';
import Add from '../../assets/svg/AddMainScreen.svg';

export default function ViewAllCategories({navigation}) {
  const [selectedItemId, setSelectedItemId] = useState(null);

  const searches = [
    {id: 1, title: 'Politics'},
    {id: 2, title: 'Sports'},
    {id: 3, title: 'Business'},
    {id: 4, title: 'Finance'},
    {id: 5, title: 'Tech'},
    {id: 6, title: 'Health'},
    {id: 7, title: 'Culture'},
  ];

  const renderSearches = item => {
    console.log('Items', item);
    const isSelected = selectedItemId === item.id;

    return (
      <TouchableOpacity
        style={[
          styles.searchesDetails,
          {
            backgroundColor: isSelected ? '#FACA4E' : 'white',
          },
        ]}
        onPress={() => {
          setSelectedItemId(item.id);
          console.log('Selected item:', item.title);
        }}>
        <Text style={isSelected ? styles.textColorSelected : styles.textColor}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content" // You can set the StatusBar text color to dark or light
      />
      <View style={{marginTop: hp(5)}}>
        <Headers showBackIcon={true} onPress={()=>navigation.goBack()} showText={true} text={'Categories'} />
      </View>

      <View style={{flex:1, marginTop:hp(5), alignItems:'center'}}>

      <FlatList
        //style={{flex: 1}}
        //contentContainerStyle={{alignItems: 'center'}}
        showsHorizontalScrollIndicator={false}
        numColumns={2}
        data={searches}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => renderSearches(item)}
      />

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchesDetails: {
    borderWidth: 1,
    borderColor: '#00000017',
    margin: 5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(3),
    width: wp(37),
    height: hp(7),
  },
  textColor: {
    fontSize: hp(2.1),
    color: '#00000017',
    fontFamily: 'Inter-Bold',
  },
  textColorSelected: {
    fontSize: hp(2.1),
    color: '#232323',
    fontFamily: 'Inter-Bold',

  },
});
