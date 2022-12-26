/* eslint-disable prettier/prettier */

// import * as firebase from "firebase/app";

import {initializeApp} from 'firebase/app';

import {getDatabase} from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyBUVOEMi34Mudov7Qp009kiXOpV7Iw-aw0',

  authDomain: 'ecommerce-443b7.firebaseapp.com',

  projectId: 'ecommerce-443b7',

  storageBucket: 'ecommerce-443b7.appspot.com',

  messagingSenderId: '686741503613',

  appId: '1:686741503613:web:316aadc69a292d60dffb14',

  measurementId: 'G-3G2WBM9X2D',
};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

export {db};

// firebase.initializeApp(firebaseConfig);

// var database = firebase.database;

// export default database;
