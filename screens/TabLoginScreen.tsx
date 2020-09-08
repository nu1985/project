
import React, { Component } from 'react';
import { StyleSheet,TextInput,Image,Button,AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Text, View } from '../components/Themed';

export default function TabLoginScreen({ navigation }) {
  const [valueUser, user] = React.useState('');
  const [valuePassword, password] = React.useState('');

  function onSignin(){
    console.log(valueUser,valuePassword)
    let user ={
      user: valueUser,
      user_id: '230'
    }
    AsyncStorage.setItem('userProject',JSON.stringify(user))
    navigation.navigate('Root')
  }

  return (
    <View style={styles.container}>

      <Image source={require('./images/logo.png')} style={styles.images} resizeMode="cover"/>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <Text style={styles.title}>หมายเลขฌาปนกิจ</Text>
      <TextInput
        style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1 , borderRadius: 5, padding: 5}}
        onChangeText={text => user(text)}
        value={valueUser} 
        placeholder="หมายเลขฌาปนกิจ"
      />

      <Text style={styles.title}>รหัสผ่าน</Text>
      <TextInput
        style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1 , borderRadius: 5, padding: 5}}
        onChangeText={text => password(text)}
        value={valuePassword}
        placeholder="รหัสผ่าน"
      />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Button title="Sing In" onPress={()=> onSignin()} color="#007bff"/>

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
      textAlign: 'left'
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
    images: {
      width: 180,
      height: 180
    },
    btSignin: {
      padding: 5,
      backgroundColor: '#007bff'
    }
  });
  
