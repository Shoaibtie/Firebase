/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import DashboardHeader from '../Header/dashboardheader';
import {Color} from '../../constants/ColorSheet';
import {DASHBOARD_LIST} from './JSON_DATA';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../../redux/actions/authaction';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
const Dashboard = ({navigation}) => {
  const [show, sethide] = useState(true);
  const [Productdata, setProductdata] = useState(null);
  // const [imageUrl, setImageUrl] = useState(undefined);
  const dispatch = useDispatch();

  // useEffect(()=>{
  //   Firestoreall();
  // },[])
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      Firestoreall();
      //Put your Data loading function here instead of my loadData()
    });

    return unsubscribe;
  }, [navigation]);
  const handleLogOut = () => {
    Alert.alert(
      'Logout',
      'Are you sure want to logout?',
      [
        {text: 'Yes', onPress: () => clearAsync()},
        {
          text: 'No',
          onPress: () => console.log('No button clicked'),
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  const clearAsync = async () => {
    try {
      const loginData = [];
      sethide(false);
      dispatch(actions.handleLogout(loginData));

      await AsyncStorage.clear();
    } catch (e) {
      console.log('error in logout', e);
    }
  };

  const Firestoreall = () => {
    const Comment = [];
    firestore()
      .collection('Product')
      .get()
      .then(querySnapshot => {
        //  console.log('Total users: ', querySnapshot.documentSnapshot.data());

        querySnapshot.forEach(documentSnapshot => {
          const {Name, Price, offerprice} = documentSnapshot.data();
          storage()
            .ref('/' + documentSnapshot.data().Image) //name in storage in firebase console
            .getDownloadURL()
            .then(url => {
              //setImageUrl(url);
              Comment.push({
                key: documentSnapshot.id,
                Image: url,
                Name,
                Price,
                offerprice,
              });
              setProductdata(Comment);
            });
        });
      });
  };

  const handledetOut = (item) => {
    Alert.alert(
      'Delete',
      'Are you sure want to Delete?',
      [
        {text: 'Yes', onPress: () => deletefunc(item)},
        {
          text: 'No',
          onPress: () => console.log('No button clicked'),
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
      },
    );
  };
const deletefunc = (id) => {
  firestore().collection('Product')
  .doc(id)
  .delete()
  .then(() => {
    Firestoreall();
    console.log('User deleted!');
  });
}
  return (
    <View style={{flex: 1}}>
      {/* <DashboardHeader title="Dashboard" /> */}
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          height: 50,
          backgroundColor: '#858585',
          flexDirection: 'row-reverse',
          paddingHorizontal: 10,
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => handleLogOut()}
          style={{
            height: 30,
            width: 70,
            backgroundColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color:'#fff'}}>Logout</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('ProductAdd')}
          style={{
            height: 30,
            width: 50,
            backgroundColor: 'green',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 20,
          }}>
          <Text style={{color:'#fff'}}>Add</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.main_view}>
        <FlatList
          data={Productdata}
          keyExtractor={item => item.key.toString()}
          renderItem={({item, index}) => (
            <View style={styles.main_flatlist_view}>
              <View
                style={{
                  width: '100%',
                  height: 70,
                  backgroundColor: '#fff',
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    height: 70,
                    width: '30%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    style={{height: 50, width: 50}}
                    source={{uri: item.Image}}
                  />
                </View>
                <View
                  style={{height: 70, width: '70%', justifyContent: 'center'}}>
                  <Text style={{fontSize: 15, fontWeight: '500'}}>
                    {item.Name}
                  </Text>
                  <Text>Price -{item.Price}</Text>
                  <Text>Offer Price -{item.offerprice}</Text>
                </View>
              </View>
              <View style={{width: '100%', height: 50, flexDirection: 'row'}}>
                <TouchableOpacity
                onPress={()=>navigation.navigate("Productedit",{itemid:item.key})}
                  style={{
                    width: '50%',
                    height: 50,
                    backgroundColor: 'white',
                    borderRightWidth: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderTopWidth: 1,
                  }}>
                  <Text style={{fontSize: 20, fontWeight: '500'}}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                onPress={()=>handledetOut(item.key)}
                  style={{
                    width: '50%',
                    height: 50,
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderTopWidth: 1,
                  }}>
                  <Text style={{fontSize: 20, fontWeight: '500'}}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};
export default Dashboard;

const styles = StyleSheet.create({
  main_view: {
    width: '100%',
    flex:0.9,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  main_flatlist_view: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 10,
  },
  icon_view: {
    backgroundColor: '#fff',
    height: 100,
    width: 100,
    borderRadius: 100 * 2,
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  text_view: {
    paddingLeft: 20,
    marginTop: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
