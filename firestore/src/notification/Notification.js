/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../redux/actions/authaction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';


const Notification = ({ navigation }) => {
    const [token, settoken] = useState(null);
    console.log('token=====>', token);
    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('store_getToken')
            console.log('value=====>', value);
            settoken(value);
            customer_filter(value);
        } catch (e) {
            // error reading value
        }
    }


    const dispatch = useDispatch();
    const handlenotification = filterdata => dispatch(actions.handlenotification({ filterdata, navigation }));
    const customer_filter = (token) => {
        const filterdata = {
            deviceId: token
        };
        handlenotification(filterdata);
    };

    const handleunreadnotification = filterdata => dispatch(actions.handleunreadnotification({ filterdata, navigation }));
    const unread_func = (noti_id) => {
        const filterdata = {
            id: noti_id
        };
        handleunreadnotification(filterdata);
        getData();
    };
    const Get_All_Notification = useSelector(state => state.product.notificationget);

    return (
        <View style={[styles.container, {
            // Try setting `flexDirection` to `"row"`.
            flexDirection: "column"
        }]}>

            <ScrollView style={{ flex: 1 }}>
                {Get_All_Notification.record && Get_All_Notification.record.map((item, index) => {
                    //  console.log('Get_All_Notification=====>', item._id);
                    return (

                        <View key={`country${index}`}
                            style={{ backgroundColor: '#fff' }}
                        >
                            {
                                item.isChecked == 0 ?
                                    <View style={{
                                        backgroundColor: '#fff'
                                    }}>

                                        <TouchableOpacity
                                        //  onPress={() => alert(item._id)}
                                            onPress={() =>unread_func(item._id)}
                                            style={{
                                                alignItems: 'center', flexDirection: 'row',
                                                flex: 1, elevation: 5, padding: 10, borderRadius: 10, backgroundColor: '#dbd7d7', margin: 10,
                                            }}>
                                            <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center' }}>
                                                <Icon name='bell' size={25} />
                                            </View>
                                            <View>
                                                <Text style={{ marginLeft: 20, fontSize: 20, fontWeight: '600' }}>{item.notification[0].title}</Text>
                                                <Text style={{ marginLeft: 20, fontSize: 15, fontWeight: '400' }}>{item.notification[0].body}</Text>
                                            </View>

                                        </TouchableOpacity>
                                    </View>
                                    :
                                    <View>
                                        <TouchableOpacity
                                            onPress={() => alert(item._id)}
                                            style={{
                                                alignItems: 'center', flexDirection: 'row',
                                                flex: 1, elevation: 5, padding: 10, borderRadius: 10, backgroundColor: '#fff', margin: 10,
                                            }}>
                                            <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center' }}>
                                                <Icon name='bell-slash' size={25} />
                                            </View>
                                            <View>
                                                <Text style={{ marginLeft: 20, fontSize: 20, fontWeight: '600' }}>{item.notification[0].title}</Text>
                                                <Text style={{ marginLeft: 20, fontSize: 15, fontWeight: '400' }}>{item.notification[0].body}</Text>
                                            </View>

                                        </TouchableOpacity>

                                    </View>
                            }
                        </View>

                    )
                })}
            </ScrollView>
        </View>
    );
};

export default Notification;
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
});
