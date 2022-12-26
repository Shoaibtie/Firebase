/* eslint-disable prettier/prettier */
/* eslint-disable no-unreachable */
/* eslint-disable prettier/prettier */
const INITIAL_STATE = {
    isLoggedIn: false,
    isLoading: false,
    userData: {},
    error: undefined,
  };
  
  export default function register(state = INITIAL_STATE, action) {
    switch (action.type) {
      case 'LOGIN_ATTEMPT':
        return {
          ...state,
          isLoading: true,
          isLoggedIn: false,
        };
        break;
      case 'REGISTER_SUCCESS':
        return {
          ...state,
          isLoading: false,
          isLoggedIn: true,
          userData: action.userData,
          error: undefined,
        };
        break;
      case 'LOGIN_FAILED':
        return {
          ...state,
          isLoading: false,
          isLoggedIn: false,
          error: action.error,
        };
        break;
      case 'LOGOUT':
        return {
          ...state,
          isLoading: false,
          isLoggedIn: false,
        };
        break;
      default:
        return state;
    }
  }
  