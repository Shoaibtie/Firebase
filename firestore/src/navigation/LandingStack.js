
import * as React from 'react';
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from '../screens/Dashboard/dashboard';
import ProductAdd from '../screens/Dashboard/ProductAdd';
import Productedit from '../screens/Dashboard/productedit';



const Stack = createNativeStackNavigator();

const LandingStack = () => {
  return (
   
      <Stack.Navigator>
        <Stack.Screen name="Dashboard" component={Dashboard} options={{headerShown:false}}/>
        <Stack.Screen name="ProductAdd" component={ProductAdd} options={{headerShown:false}}/>
        <Stack.Screen name="Productedit" component={Productedit} options={{headerShown:false}}/>
      </Stack.Navigator>
   
  );
}


export default LandingStack;