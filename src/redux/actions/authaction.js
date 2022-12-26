/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiRequest from '../../network/api';
import API from '../../network/env';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import toastModule from '../../utils/toastModule/tosatAlert';
import { useSelector } from 'react-redux';
import { LOGOUT } from '../../constants/string';
// ---------------- Set loader status -------------------------//
export function isDataLoading(isLoading) {
  return {
    type: 'LOADER_STATUS',
    isLoading,
  };
}
// ========== Handle Registration API ===================//
export const handleRegistration = registerData => async dispatch => {
  // console.log('registerData', registerData.data);
  dispatch(isDataLoading(true));
  const response = await apiRequest(API.registrationURL, 'POST', registerData.data);

  //  console.log('response of registrartion', response);
  dispatch(isDataLoading(false));
  if (response) {
    toastModule.toastMessageBox(response.message);
    dispatch(registerSuccess(response));
    if (response.status_code === 200) {
      registerData.navigation.navigate('Login');
    }
  }
};

export function registerSuccess(userData) {
  return {
    type: 'REGISTER_SUCCESS',
    userData,
  };
}


// ========== Handle Login API ===================//
export const handleLogin = loginData => async dispatch => {
console.log('loginData=========>',loginData);
  // dispatch(isDataLoading(true));
  // // const response = await apiRequest(API.loginDataURL, 'POST', loginData.data);
  // dispatch(isDataLoading(false));

  if (loginData) {
    AsyncStorage.setItem('Token', loginData.data.uid);
    dispatch(loginSuccess(loginData));
  }
};



export function loginSuccess(loginData) {
  // console.log("loginData===>>>", loginData)
  return {
    type: 'LOGIN_SUCCESS',
    loginData,
  };
}



// ------------------ Logout function  ------------------------------ //
export const handleLogout = loginData => async dispatch => {
  dispatch(isDataLoading(true));
  dispatch(isDataLoading(false));
  dispatch(loginSuccess(loginData));
};
