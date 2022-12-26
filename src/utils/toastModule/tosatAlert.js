/* eslint-disable prettier/prettier */
import Toast from 'react-native-simple-toast';

const toastAlert = {
    toastMessageBox: message => {
        Toast.show(message,Toast.LONG);
    },
  };

  export default toastAlert;