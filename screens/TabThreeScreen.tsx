


import React, { Component } from 'react';
import { TextInput } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { StyleSheet } from 'react-native';


export default function TabThreeScreen() {
  const [value, onChangeText] = React.useState('ชื่อผู้สมัคร');
  const [value2, onChangeText2] = React.useState('หมายเลข ปชช.');

  return (
    <View style={styles.container}>

    <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    <Text style={styles.title}>ชื่อผู้สมัครใช้บริการ</Text>

    <TextInput
      style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={text => onChangeText(text)}
      value={value} 
    />
    <Text style={styles.title}>หมายเลข ปชช.</Text>

    <TextInput
      style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={text => onChangeText2(text)}
      value={value2}
    />


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
  
