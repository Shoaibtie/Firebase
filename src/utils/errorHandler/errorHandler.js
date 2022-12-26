/* eslint-disable prettier/prettier */
import {Alert} from 'react-native';

const ErrorHandler = {
  handelApiResponse: (response) => {
    Alert.alert(
        'Please login again',
        response,
        [
          {
            text: 'Ok',
          },
        ],
        {cancelable: false},
      );
  },
};

export default ErrorHandler;
