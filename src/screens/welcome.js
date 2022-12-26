/* eslint-disable prettier/prettier */
import * as React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import ImageUrl from '../constants/imageUrl';


function Welcome({navigation}) {
  return (
    <View style={styles.container}>
      <Image source={ImageUrl.splash} style={styles.image} />
    </View>
  );
}

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
  },
});
