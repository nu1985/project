


import React, { Component } from 'react';
import { TextInput } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { StyleSheet } from 'react-native';


export default function TabSettingScreen() {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Setting</Text>
    </View>
  );
}




const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
    },
    separator: {
      marginVertical: 10,
      height: 1,
      width: '80%',
    },
  });
  
