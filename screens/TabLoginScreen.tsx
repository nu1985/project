
import React, { Component } from 'react';
import { StyleSheet,TextInput,Image,Button,AsyncStorage,TouchableOpacity,Alert,SafeAreaView, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import API from '../API'
import { Text, View } from '../components/Themed';

const api = API.create()

export default class TabLoginScreen extends Component {
  // const [valueUser, user] = React.useState('');
  // const [valuePassword, password] = React.useState('');

  constructor() {
    super();
    this.state = {
      user: '',
      password: '',
    }
  }

  onSignin =async()=> {

    if(this.state.user === '') return Alert.alert('','กรุณากรอกหมายเลขฌาปนกิจ')
    if(this.state.password === '') return Alert.alert('','กรุณากรอกรหัสผ่าน')

    console.log(this.state.user,this.state.password)
    let data = {
      username: this.state.user,
      password: this.state.password
    }
    let login = await api.login(data)
    console.log(login)
    if(login.status === 200){
      let user ={
        user: login.data,
        user_id: login.data.username
      }
      await AsyncStorage.setItem('userProject',JSON.stringify(user))
      this.props.navigation.navigate('Root')
    }else{
      Alert.alert('Login fail',login.data.msg)
    }
    
    // let user ={
    //   user: "Test user",
    //   user_id: '230'
    // }
    // await AsyncStorage.setItem('userProject',JSON.stringify(user))
    // this.props.navigation.navigate('Root')
  }

  render(){
    return (
      <SafeAreaView style={{flex: 1}}>
        {/* <ScrollView style={{flex: 1, backgroundColor: '#fff'}}> */}
        
          <View style={styles.container}>
            <Image source={require('./images/logo.png')} style={styles.images} resizeMode="cover"/>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            
            <Text style={styles.title}>หมายเลขฌาปนกิจ</Text>
            <TextInput
              style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1 , borderRadius: 5, padding: 5}}
              onChangeText={text=> this.setState({user: text})}
              value={this.state.user}
              placeholder="หมายเลขฌาปนกิจ"
            />

            <Text style={styles.title}>รหัสผ่าน</Text>
              <TextInput
                style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1 , borderRadius: 5, padding: 5}}
                onChangeText={text=> this.setState({password: text})}
                value={this.state.password}
                placeholder="รหัสผ่าน"
                // autoFocus={true}
              />
            
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

            <TouchableOpacity onPress={()=> this.onSignin()} style={{paddingVertical: 10, paddingHorizontal: 30, backgroundColor: '#FF4B2B', borderRadius: 20}}>
              <Text style={{fontSize: 18, color: '#fff'}}>Sing In</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('Signup')} style={{paddingVertical: 10, paddingHorizontal: 20, marginTop: 20}}>
              <Text style={{fontSize: 18, color: '#007bff'}}>Sing Up</Text>
            </TouchableOpacity>

          </View>
          
         {/* </ScrollView> */}
      </SafeAreaView>
    );
  }
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
      textAlign: 'left',
      width: 300
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
    images: {
      width: 180,
      height: 180,
      marginTop: 80
    },
    btSignin: {
      padding: 5,
      backgroundColor: '#007bff'
    }
  });
  
