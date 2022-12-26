import React, {useState} from 'react';
import {View, Text} from 'react-native';
import Splash from '../screens/welcome';
import DefineNavigation from './DefineNavigation';

const MainNavigation = () => {
  const [isLoad, setIsLoad] = useState(true);

  setTimeout(() => {
    setIsLoad(false);
  },3000 );

  return <>
  {
  isLoad ? <Splash/> : <DefineNavigation/>
  }
  </>;
};

export default MainNavigation;
