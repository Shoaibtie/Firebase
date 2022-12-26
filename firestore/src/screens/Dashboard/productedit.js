/* eslint-disable quotes */

/* eslint-disable prettier/prettier */

/* eslint-disable no-unused-vars */

import React, {useState, useEffect} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  PermissionsAndroid,
  View,
  Platform,
  Image,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';

import auth from '@react-native-firebase/auth';

import * as ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

import * as Progress from 'react-native-progress';

const Productedit = ({route, navigation}) => {
  const {itemid} = route.params;
  useEffect(() => {
    newdataaa();
  }, []);
  const newdataaa = async () => {
    const users = await firestore().collection('Product').get();
    const user = await firestore().collection('Product').doc(itemid).get();
    console.log('user=======>', user.data());

    storage()
    .ref('/' + user.data().Image) //name in storage in firebase console
    .getDownloadURL()
    .then((url) => {
      setImageUrl(url);
    })
    .catch((e) => console.log('Errors while downloading => ', e));

    setEditdata(user.data());
    setName(user.data().Name)
    setPrice(user.data().Price)
    setofferprice(user.data().offerprice)
    setimagepath(user.data().Image)
  };

  const [Editdata, setEditdata] = useState(null);

  const [Name, setName] = useState('');

  const [image, setImage] = useState(null);

  const [imagepath, setimagepath] = useState(null);

  const [Price, setPrice] = useState('');

  const [offerprice, setofferprice] = useState('');

  const [uploading, setUploading] = useState(false);

  const [transferred, setTransferred] = useState(0);
  const [imageUrl, setImageUrl] = useState(undefined);

  const [UserNameError, setUserNameError] = useState('');
  const [PriceError, setPriceError] = useState('');
  const [offerPriceError, setofferPriceError] = useState('');
  const [imageError, setimageError] = useState('');

  const handleSubmit = async () => {
    //###############-- UserName --############
    // var reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var reg =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    var passw = new RegExp(
      '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})',
    );
    var NameValid = false;
    if (Name.length === 0) {
      setUserNameError('Enter the Name!');
    } else {
      setUserNameError('');
      NameValid = true;
    }

    //###############-- Password --############

    var PriceValid = false;
    if (Price.length === 0) {
      setPriceError('Enter the Price!');
    } else {
      setPriceError('');
      PriceValid = true;
    }
    var offerpriceValid = false;
    if (offerprice.length === 0) {
      setofferPriceError('Enter the Offer Price!');
    } else {
      setofferPriceError('');
      offerpriceValid = true;
    }
    var imageValid = false;
    if (imagepath == null) {
      setimageError('Upload the image!');
    } else {
      setimageError('');
      imageValid = true;
    }

    if (NameValid && PriceValid && offerpriceValid && imageValid) {
      register();
    }
  };

  const register = () => {
    firestore()
      .collection('Product')
      .doc(itemid)
      .update({
        Name: Name,

        Image: imagepath,

        Price: Price,

        offerprice: offerprice,
      })

      .then(() => {
        setName('');

        setimagepath(null);

        setPrice('');

        setofferprice('');

        navigation.navigate("Dashboard")
      });
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,

        {
          title: 'App Camera Permission',

          message: 'App needs access to your camera ',

          buttonNeutral: 'Ask Me Later',

          buttonNegative: 'Cancel',

          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        selectImage();

        console.log('Camera permission given');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const selectImage = () => {
    const options = {
      maxWidth: 2000,

      maxHeight: 2000,

      storageOptions: {
        skipBackup: true,

        path: 'images',
      },
    };

    ImagePicker.launchImageLibrary(options, response => {
      console.log('response==>', response.assets[0].uri);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.assets[0].uri};

        console.log(source);
        setImage(source);
        setimagepath(null)
      }
    });
  };

  const uploadImage = async () => {
    const {uri} = image;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    setimagepath(filename);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

    setUploading(true);

    setTransferred(0);

    const task = storage()
      .ref(filename)

      .putFile(uploadUri);

    // set progress state

    task.on('state_changed', snapshot => {
      setTransferred(
        Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000,
      );
    });

    try {
      await task;
    } catch (e) {
      console.error(e);
    }

    setUploading(false);

    // alert(
    //   'Photo uploaded!',

    //   'Your photo has been uploaded to Firebase Cloud Storage!',
    // );

    setImage(null);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 10,
      }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Dashboard')}
        style={{
          height: 30,
          width: 50,
          backgroundColor: 'green',
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 20,
        }}>
        <Text style={{color: '#fff'}}>Back</Text>
      </TouchableOpacity>
      <View style={{alignItems: 'center', paddingVertical: 10}}>
        <Text style={{fontWeight: '500', fontSize: 25, color: '#000000'}}>
          Edit Product
        </Text>
      </View>
      <ScrollView>
        <View style={{paddingVertical: 10}}>
          <TextInput
            placeholder="Name"
            style={{borderWidth: 1}}
            onChangeText={text => setName(text)}
            value={Name}
          />
          {UserNameError.length > 0 ? (
            <Text style={styles.errcolor}>{UserNameError}</Text>
          ) : null}
        </View>

        <View style={{paddingVertical: 10}}>
          <TextInput
            placeholder="Price"
            style={{borderWidth: 1}}
            onChangeText={text => setPrice(text)}
            maxLength={7}
            keyboardType="number-pad"
            value={Price}
          />
          {PriceError.length > 0 ? (
            <Text style={styles.errcolor}>{PriceError}</Text>
          ) : null}
        </View>

        <View style={{paddingVertical: 10}}>
          <TextInput
            placeholder="Offer Price"
            style={{borderWidth: 1}}
            maxLength={7}
            keyboardType="number-pad"
            onChangeText={text => setofferprice(text)}
            value={offerprice}
          />
          {offerPriceError.length > 0 ? (
            <Text style={styles.errcolor}>{offerPriceError}</Text>
          ) : null}
        </View>

        <View style={{paddingVertical: 10}}>
          <TouchableOpacity
            style={styles.selectButton}
            onPress={() => requestCameraPermission()}>
            <Text style={styles.buttonText}>Pick an image</Text>
          </TouchableOpacity>

          <View style={styles.imageContainer}>
            {image !== null ? (
              <Image source={{uri: image.uri}} style={styles.imageBox} />
            ) : null}

            {uploading ? (
              <View style={styles.progressBarContainer}>
                <Progress.Bar progress={transferred} width={300} />
              </View>
            ) : (
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={() => uploadImage()}>
                <Text style={styles.buttonText}>Upload image</Text>
              </TouchableOpacity>
            )}
            {imageError.length > 0 ? (
              <Text style={styles.errcolor}>{imageError}</Text>
            ) : null}
          </View>
        </View>

        <View style={{paddingVertical: 10}}>
          <TouchableOpacity
            onPress={() => handleSubmit()}
            style={{
              backgroundColor: 'red',
              height: 50,
              width: '100%',

              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#fff', fontSize: 20, fontWeight: '500'}}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,

    paddingHorizontal: 24,
  },

  sectionTitle: {
    fontSize: 24,

    fontWeight: '600',
  },

  sectionDescription: {
    marginTop: 8,

    fontSize: 18,

    fontWeight: '400',
  },

  highlight: {
    fontWeight: '700',
  },

  container: {
    flex: 1,

    alignItems: 'center',

    backgroundColor: '#bbded6',
  },

  selectButton: {
    borderRadius: 5,

    width: 150,

    height: 50,

    backgroundColor: '#8ac6d1',

    alignItems: 'center',

    justifyContent: 'center',
  },

  uploadButton: {
    borderRadius: 5,

    width: 150,

    height: 50,

    backgroundColor: '#ffb6b9',

    alignItems: 'center',

    justifyContent: 'center',

    marginTop: 20,
  },

  buttonText: {
    color: 'white',

    fontSize: 18,

    fontWeight: 'bold',
  },

  imageContainer: {
    marginTop: 30,

    marginBottom: 50,

    alignItems: 'center',
  },

  progressBarContainer: {
    marginTop: 20,
  },

  imageBox: {
    width: 300,

    height: 300,
  },
  errcolor: {
    color: 'red',
    //marginLeft: 25,
  },
});

export default Productedit;
