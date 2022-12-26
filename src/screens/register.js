/* eslint-disable prettier/prettier */
/* eslint-disable eqeqeq */
/* eslint-disable no-useless-escape */
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ImageUrl from '../constants/imageUrl';
import {
  RegisterHeading1,
  RegisterHeading2,
  RegisterAlready,
  RegisterFirstName,
  RegisterLastName,
  RegisterEmail,
  RegisterContact,
  Registerpass,
  Registerconfimpass,
  labelLogin,
  errormsgfirstname,
  errormsgfirstnamespaces,
  errormsglastname,
  errormsglastnamespaces,
  errormsgemail,
  errormsgemailvalid,
  errormsgcontact,
  errormsgcontactvalid,
  errormsgpassword,
  errormsgpasswordeight,
  errormsgpasswordspaces,
  errormsgpasswordvalid,
  errormsgconfpassword,
  errormsgconfpasswordmatch,
} from '../constants/string';
import Layout from '../utils/layout';
import { Color } from '../constants/ColorSheet';
import * as actions from '../redux/actions/authaction';
import Loader from '../utils/Loader';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {db, app} from '../../firebase-config';
import {ref, onValue, push, update, remove} from 'firebase/database';
const Register = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const [showpass, setpass] = useState(true);
  const [showconfpass, setconfpass] = useState(true);

  const Passwordshow = () => {
    setpass(false);
  };
  const Passwordhide = () => {
    setpass(true);
  };
  const Passwordconfshow = () => {
    setconfpass(false);
  };
  const Passwordconfhide = () => {
    setconfpass(true);
  };

  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');


  const [EmailError, setEmailError] = useState('');
  const [PasswordError, setPasswordError] = useState('');
  const [ConfirmPasswordError, setConfirmPasswordError] = useState('');

  const dispatch = useDispatch();
  const handleRegistration = data =>
    dispatch(actions.handleRegistration({ data, navigation }));

  const handleSubmit = async () => {

    var reg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

    var passw = new RegExp(
      '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})',
    );




    // ###### Email Name ########

    var EmailValid = false;
    if (Email.length === 0) {
      setEmailError(errormsgemail);
    } else if (reg.test(Email) === false) {
      setEmailError(errormsgemailvalid);
    } else {
      setEmailError('');
      EmailValid = true;
    }


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

    var confpasswordValid = false;
    if (ConfirmPassword.length === 0) {
      setConfirmPasswordError(errormsgconfpassword);
    } else if (ConfirmPassword !== Password) {
      setConfirmPasswordError(errormsgconfpasswordmatch);
    } else {
      setConfirmPasswordError('');
      confpasswordValid = true;
    }

    if (
      EmailValid &&
      passwordValid &&
      confpasswordValid
    ) {
      const data = {
        email: Email,
        password: Password,
      };
    //  setLoading(true);
    register();
   //   handleRegistration(data);
   
    }
  };
  
  const register = async () => {

    await auth().createUserWithEmailAndPassword(Email, Password)

      .then((res) => {

        // res.user.sendEmailVerification()

        console.log('User account created & signed in!', res);

        // const userid = res?.user?.uid

        // push(ref(db, 'user'), {

        //     UserUid: userid,

        //     firstn: firstn,

        //     lastn: lastn,

        //     Company: compnyn,

        //     email: email,

        // });

        //  setloder(false)

        console.log("Verification Email Sent")

        navigation.navigate('Login')

      })

      .catch(error => {

        if (error.code === 'auth/email-already-in-use') {
          // setloder(false)
          alert("That email address is already in use!")
          console.log('That email address is already in use!', error.code);
        }
        if (error.code === 'auth/invalid-email') {
          // setloder(false)
          alert("That email address is invalid!")
          console.log('That email address is invalid!');
        }
        console.error(error);

      });


  }




  return (
  <View style={{flex:1,alignItems:"center"}}>
      <View style={styles.container}>
        {/* <Loader loading={isLoader} /> */}
          <Text style={styles.heading1}>{RegisterHeading1}</Text>
          <Text style={styles.heading2}>{RegisterHeading2}</Text>
        </View>
        <View>
       
          <View style={styles.emailview}>
            <View style={styles.emailsection}>
              <TextInput
                style={styles.email}
                placeholder={RegisterEmail}
                placeholderTextColor={Color.TEXT_COLOR}
                onChangeText={text => setEmail(text)}
                value={Email}
                maxLength={50}
                keyboardType={'email-address'}
              />
              {EmailError.length > 0 ? (
                <Text style={styles.errcolor}>{EmailError}</Text>
              ) : null}
            </View>
          </View>
          
          <View style={styles.emailview}>
            <View style={styles.emailsection}>
              <View style={styles.password}>
                <TextInput
                  style={styles.textpassword}
                  placeholder={Registerpass}
                  placeholderTextColor={Color.TEXT_COLOR}
                  secureTextEntry={showpass}
                  onChangeText={text => setPassword(text)}
                  maxLength={20}
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
            </View>
          </View>
          <View style={styles.emailview}>
            <View style={styles.emailsection}>
              <View style={styles.password}>
                <TextInput
                  style={styles.textpassword}
                  placeholder={Registerconfimpass}
                  placeholderTextColor={Color.TEXT_COLOR}
                  secureTextEntry={showconfpass}
                  onChangeText={text => setConfirmPassword(text)}
                  maxLength={20}
                  value={ConfirmPassword}
                />
                {showconfpass === true ? (
                  <TouchableOpacity onPress={() => Passwordconfshow()}>
                    <Image source={ImageUrl.Eye} style={styles.eyeIcon} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => Passwordconfhide()}>
                    <Image source={ImageUrl.OpenEye} style={styles.eyeIcon} />
                  </TouchableOpacity>
                )}
              </View>
              {ConfirmPasswordError.length > 0 ? (
                <Text style={styles.errcolor}>{ConfirmPasswordError}</Text>
              ) : null}
            </View>
          </View>

          <View style={styles.ButtonView}>
            <TouchableOpacity
              style={styles.ButtonTouchable}
              onPress={() => handleSubmit()}>
              <Text style={styles.ButtonText}>Sign up</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.ButtonView}>
            <Text style={{ color: Color.TEXT_COLOR }}>{RegisterAlready}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.logincolor}> {labelLogin}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
  );
};
export default Register;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  section: {
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 60,
    marginLeft: 8,
  },
  heading1: {
    fontSize: 30,
    fontWeight: '700',
    color: '#00478E',
  },
  heading2: {
    fontSize: 15,
    fontWeight: 'normal',
    color: '#00478E',
  },
  inputView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    marginTop: 20,
  },
  firstnameview: {
    width: '45%',
  },
  firstnamelabel: {
    marginLeft: 5,
    color: Color.TEXT_COLOR,
  },
  firstname: {
    borderWidth: 1,
    width: '100%',
    borderRadius: 10,
    paddingLeft: 10,
    marginTop: 10,
    borderColor: Color.INPUT_TEXT_BORDER,
    color: Color.TEXT_COLOR,
  },
  Lastnameview: {
    width: '45%',
  },
  Lastnamelabel: {
    marginLeft: 5,
    color: Color.TEXT_COLOR,
  },
  Lastname: {
    borderWidth: 1,
    width: '100%',
    borderRadius: 10,
    marginTop: 10,
    borderColor: Color.INPUT_TEXT_BORDER,
    color: Color.TEXT_COLOR,
  },
  emailview: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  emailsection: {
    width: '95%',
  },
  emaillabel: {
    marginLeft: 5,
    marginTop: 10,
    color: Color.TEXT_COLOR,
  },
  email: {
    borderWidth: 1,
    width: '100%',
    borderRadius: 10,
    paddingLeft: 10,
    marginTop: 10,
    borderColor: Color.INPUT_TEXT_BORDER,
    color: Color.TEXT_COLOR,
  },
  password: {
    borderWidth: 1,
    width: '100%',
    borderRadius: 10,
    marginTop: 10,
    borderColor: Color.INPUT_TEXT_BORDER,
    color: Color.TEXT_COLOR,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  textpassword: { width: '90%' },

  ButtonView: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
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
  eyeIcon: {
    height: 25,
    width: 25,
  },
  errcolor: {
    color: Color.RED_COLOR,
  },
  logincolor: {
    color: Color.RED_LIGHT,
  },
});
