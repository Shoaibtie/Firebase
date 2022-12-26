/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import {LogBox} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import {ROOT, UNDEFINED} from './src/constants/string';
import Reducer from './src/redux/reducers/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainNavigation from './src/navigation/MainNavigation';
LogBox.ignoreLogs([
  "ViewPropTypes will be removed",
  "ColorPropType will be removed",
  ]);
const persistConfig = {
  key: ROOT,
  storage: AsyncStorage,
  blacklist: [],
};

const enhancers = [
  applyMiddleware(
    thunkMiddleware,
    createLogger({
      collapsed: true,
      predicate: () => __DEV__,
    }),
  ),
];

const composeEnhancers =
  (__DEV__ &&
    typeof window !== UNDEFINED &&
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()) ||
  compose;

const enhancer = composeEnhancers(...enhancers);

const persistedReducer = persistReducer(persistConfig, Reducer);

const store = createStore(persistedReducer, {}, enhancer);
let persistor = persistStore(store);

function App() {
  return (

    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <MainNavigation />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
