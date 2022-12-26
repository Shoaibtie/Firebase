import React, {useState,useEffect} from 'react';
import {View, ActivityIndicator,StyleSheet} from 'react-native';
import LandingStack from './LandingStack';
import AuthNavigation from './AuthNavigation';
import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../redux/actions/authaction';


const DefineNavigation = () => {
  const loginData = useSelector(state => state.auth.loginData);
 console.log('loginData',loginData);
  const [token, setToken] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    //console.log('Root-navigation-token', loginData.token);
    if(!loginData.data){
      setToken(false);
    }else{
      //handleMainCategoryFilter();
      setToken(true);
      
    }
    
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  });

  // Fetch Category DATA
  // const dispatch = useDispatch();
  // const handleMainCategoryFilter = data => dispatch(actions.handleMainCategoryFilter(data));

  if (isLoading) {
    return (
      <View style={styles.ActivityLoader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <>
  {
  token ? <LandingStack/> : <AuthNavigation/>
  }
  </>;
};



export default DefineNavigation;
const styles = StyleSheet.create({
  ActivityLoader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});