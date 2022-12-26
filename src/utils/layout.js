/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {StyleSheet, SafeAreaView, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

class Layout extends Component {
  render() {
    return (
      <View style={Styles.container}>
        <SafeAreaView style={Styles.section}>
          <KeyboardAwareScrollView>
            {this.props.children}
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f4f2',
  },
  section:{flex: 1},
});

export default Layout;
