/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import ImageUrl from '../constants/imageUrl';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  labelLogin,
  labelEmail,
  labelPassword,
  labelForgot,
  labelSignUp,
  errormsgpassword,
  errormsgpasswordeight,
  errormsgpasswordspaces,
  errormsgpasswordvalid,
  errormsgemail,
  errormsgemailvalid,
} from '../constants/string';
import * as actions from '../redux/actions/authaction';
import {Color} from '../constants/ColorSheet';
import Loader from '../utils/Loader';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {db, app} from '../../firebase-config';
import {ref, onValue, push, update, remove} from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Login = ({navigation}) => {
  const [showpass, setpass] = useState(true);

  const Passwordshow = () => {
    setpass(false);
  };
  const Passwordhide = () => {
    setpass(true);
  };
  const [UserName, setUserName] = useState('');
  const [Password, setPassword] = useState('');

  const [UserNameError, setUserNameError] = useState('');
  const [PasswordError, setPasswordError] = useState('');
  const [loaderuse, setloaderuse] = useState(false);

  const dispatch = useDispatch();
  const handleLogin = data => dispatch(actions.handleLogin({data, navigation}));

  const handleSubmit = async () => {
    //###############-- UserName --############
    // var reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var reg =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    var passw = new RegExp(
      '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})',
    );
    var UserNameValid = false;
    if (UserName.length === 0) {
      setUserNameError(errormsgemail);
    } else if (reg.test(UserName) === false) {
      setUserNameError(errormsgemailvalid);
    } else {
      setUserNameError('');
      UserNameValid = true;
    }

    //###############-- Password --############

    var passwordValid = false;
    if (Password.length === 0) {
      setPasswordError(errormsgpassword);
    } else if (Password.length < 8) {
      setPasswordError(errormsgpasswordeight);
    } else if (Password.indexOf(' ') >= 0) {
      setPasswordError(errormsgpasswordspaces);
    } else if (passw.test(Password) === false) {
      setPasswordError(errormsgpasswordvalid);
    } else {
      setPasswordError('');
      passwordValid = true;
    }
    if (UserNameValid && passwordValid) {
      Login();
    }
  };
  const Login = async () => {
    setloaderuse(true);

    await auth()
      .signInWithEmailAndPassword(UserName, Password)

      //.createUserWithEmailAndPassword(email, password)

      .then(res => {
        {
          setloaderuse(false);
          console.log(res);
          handleLogin(res.user);
          AsyncStorage.setItem('Token', res.user.uid);
        }
      })

      .catch(error => {
        console.log('errorewrewtete', error);

        switch (error.code) {
          case 'auth/user-not-found':
            setloaderuse(false);

            setUserNameError('User does not exist');

            console.log('User does not exist');

            break;

          case 'auth/wrong-password':
            setloaderuse(false);

            setPasswordError('Invalid password! Please enter correct password');

            console.log('Invalid password! Please enter correct password');

            break;

          case 'auth/too-many-requests':
            setloaderuse(false);

            setUserNameError(
              'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password, or you can try again later',
            );

            console.log(
              'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password, or you can try again later',
            );

            break;

          default:
            break;
        }
      });
  };
  return (
    <View style={styles.container}>
      {loaderuse ? <Loader /> : null}

      <ImageBackground source={ImageUrl.background} style={styles.img}>
        <View style={styles.section}>
          <TextInput
            style={styles.input}
            placeholder={labelEmail}
            placeholderTextColor={Color.TEXT_COLOR}
            onChangeText={text => setUserName(text)}
            maxLength={50}
            value={UserName}
          />
          {UserNameError.length > 0 ? (
            <Text style={styles.errcolor}>{UserNameError}</Text>
          ) : null}
          <View style={styles.inputView}>
            <TextInput
              placeholder={labelPassword}
              style={styles.ViewText}
              placeholderTextColor={Color.TEXT_COLOR}
              secureTextEntry={showpass}
              onChangeText={text => setPassword(text)}
              value={Password}
            />
            {showpass === true ? (
              <TouchableOpacity onPress={() => Passwordshow()}>
                <Image source={ImageUrl.Eye} style={styles.eyeIcon} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => Passwordhide()}>
                <Image source={ImageUrl.OpenEye} style={styles.eyeIcon} />
              </TouchableOpacity>
            )}
          </View>
          {PasswordError.length > 0 ? (
            <Text style={styles.errcolor}>{PasswordError}</Text>
          ) : null}

          <View style={styles.ButtonView}>
            <TouchableOpacity
              style={styles.ButtonTouchable}
              onPress={() => handleSubmit()}>
              <Text style={styles.ButtonText}>{labelLogin}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.LoginButtonSection}>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <View style={styles.signupview}>
                <Text style={styles.signup}>{labelSignUp}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    width: '100%',
    height: '65%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 2,
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    marginTop: 20,
    borderRadius: 10,
    borderColor: Color.INPUT_TEXT_BORDER,
    color: Color.TEXT_COLOR,
  },
  inputView: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: Color.INPUT_TEXT_BORDER,
    color: Color.TEXT_COLOR,
  },
  ViewText: {
    height: 40,
    borderColor: '#adadad',
    width: '80%',
    color: Color.TEXT_COLOR,
  },
  img: {
    // marginBottom: 50,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  ButtonView: {
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 20,
  },
  ButtonTouchable: {
    padding: 9,
    backgroundColor: '#E87511',
    width: '100%',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  ButtonText: {
    color: '#fff',
    fontSize: 25,
    fontWeight: '500',
  },
  LoginButtonSection: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    marginTop: 8,
  },
  forgot: {
    color: '#ba0000',
    fontSize: 15,
    fontWeight: 'bold',
  },
  signupview: {
    height: 40,
    width: 100,
    backgroundColor: '#4E8803',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signup: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  eyeIcon: {
    height: 25,
    width: 25,
  },
  errcolor: {
    color: Color.RED_COLOR,
    marginLeft: 25,
  },
});
