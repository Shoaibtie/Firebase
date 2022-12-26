import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Productsubcategory from '../screens/HomeScreens/productsubcategory';
import MyDrawer from './Drawer';
import Product from '../screens/HomeScreens/product';
import ProductDetails from '../screens/HomeScreens/productdetails';
import DrawerInsideStack from './DrawerInsideStack';
import DrawerOrderStack from './DrawerOrderStack';
import DrawerTodayFollowups from './DrawerTodayFollowups';
import CustomerStack from './CustomerStack';
import MyCustomerStack from './MyCustomerStack';

const Stack = createNativeStackNavigator();

const DashboardNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyDrawer"
        component={MyDrawer}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Productsubcategory"
        component={Productsubcategory}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Product"
        component={Product}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{headerShown: false}}
      />
       <Stack.Screen
        name="DrawerInsideStack"
        component={DrawerInsideStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DrawerOrderStack"
        component={DrawerOrderStack}
        options={{headerShown: false}}
      />
       <Stack.Screen
        name="DrawerTodayFollowups"
        component={DrawerTodayFollowups}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CustomerStack"
        component={CustomerStack}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default DashboardNavigation;
