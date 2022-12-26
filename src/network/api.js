/* eslint-disable prettier/prettier */
import axios from 'axios';

import API from '../network/env';
import toastModule from '../utils/toastModule/tosatAlert';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ErrorHandler from '../utils/errorHandler/errorHandler';

const apiRequest = async (
  url,
  method = 'GET',
  body = undefined,
) => {
 // console.log('url', url);
  // debugger
  try {
  //  console.log('body', body);

    const userToken = await AsyncStorage.getItem('userToken');
    let params = {
      method: method,
      url:
        method === 'POST'
          ? API.baseURI + url
          : method === 'GET' && body != undefined
          ? API.baseURI + url + body.data
          : API.baseURI + url,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
    };

    console.log('method==>',method);
    if (method === 'POST' && body) {
      params.data = body;
    }
    else if (method === 'PUT' && body) {
      params.data = body;
    }
    const response = await axios(params);
    // console.log('@@@@@Response', response);
    // console.log('@@@@@Response', response.data);
    // console.log('@@@@@Response', response.status);
   
    if (response && response.data && response.status === 200 ) {
    
      if (response.data.status_code === 200) {
        return response.data;
      } else if (response.data.status_code === 201) {
        toastModule.toastMessageBox('Error');
        // return response.data;
      } else if (response.data.status_code === 400) {
         console.log('response.data.status_code', response);
        toastModule.toastMessageBox(response.data.message);
        //return response.data;
      } else if (response.data.status_code === 401) {
        toastModule.toastMessageBox(response.data.message);
        //return response.data;
      } else if (response.data.status_code === 402) {
        toastModule.toastMessageBox('Error');
        // return response.data;
      } else if (response.data.status_code === 404) {
        toastModule.toastMessageBox('Error');
        // return response.data;
      } else if (response.data.status_code === 409) {
      //  console.log('response.data.status_code', response.data.status_code);
        toastModule.toastMessageBox(response.data.message);
        //  return response.data;
      } else if (response.data.status_code === 422) {
        toastModule.toastMessageBox('Error');
        // return response.data;
      }
      else if (response.data.status_code === 502) {
        toastModule.toastMessageBox('Error');
        // return response.data;
      } else {
        toastModule.toastMessageBox('Error');
        // return response;
      }
    } else {
      toastModule.toastMessageBox('Error');
    }
  } catch (err) {
   console.log('err', err);
    if (err && err.response && err.response.data) {
      toastModule.toastMessageBox('Error');
     // return err.response.data;
    } else {
      toastModule.toastMessageBox('Error');
      // return {status: false};
    }
  }
};

export default apiRequest;
