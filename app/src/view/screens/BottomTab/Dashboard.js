import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Headers from '../../../assets/Custom/Headers';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default function Dashboard() {
  return (
    <View style={styles.container}>
      <Headers showIcon={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: wp(3),
    backgroundColor: 'white',
  },
});
