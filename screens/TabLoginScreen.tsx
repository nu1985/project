


import React, { Component } from 'react';
import { TextInput } from 'react-native';

import { Text, View } from '../components/Themed';
import { StyleSheet } from 'react-native';


export default function TabLoginScreen() {
  const [value, onChangeText] = React.useState('Useless Placeholder');

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
      onChangeText={text => onChangeText(text)}
      value={value}
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
      fontSize: 20,
      fontWeight: 'bold',
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
  });
  
