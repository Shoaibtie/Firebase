/* eslint-disable prettier/prettier */
import {combineReducers} from 'redux';
import loader from './loaderReducer';
import auth from './authReducer';
import register from './registerReducer';
import customer from './customerReducer';
import product from './productReducer';


const rootReducer = combineReducers({
  loader,
  auth,
  register,
  customer,
  product,
});

export default rootReducer;
