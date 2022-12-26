/* eslint-disable prettier/prettier */
import React,{useEffect} from 'react';
import {View, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Signout = ({ navigation}) => {
    

        AsyncStorage.clear();
        navigation.replace('Login');
      //  console.log(navigation);
       
        return null;
      
};
export default Signout;
