import Loading from '../components/Loading'
import React, { Component } from 'react';
import { StyleSheet,TextInput,Image,Button,AsyncStorage,TouchableOpacity,Alert,SafeAreaView, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import API from '../API'
import { Text, View } from '../components/Themed';

const api = API.create()

export default class TabSignupScreen extends Component {
  // const [valueUser, user] = React.useState('');
  // const [valuePassword, password] = React.useState('');

  constructor() {
    super();
    this.state = {
      isLoading: false,
      name: '',
      lname: '',
      id13: '',
      email: '',
      tel:'',
      user: '',
      password: '',
    }
  }

  onSignup =async()=> {
    if(this.state.name === '') return Alert.alert('','กรุณากรอกชื่อผู้ลงทะเบียน')
    // if(this.state.lname === '') return Alert.alert('','กรุณากรอกนามสกุล')
    if(this.state.id13 === '') return Alert.alert('','กรุณากรอกหมายเลข ปชช.')
    if(this.state.email === '') return Alert.alert('','กรุณากรอก Email')
    if(this.state.tel === '') return Alert.alert('','กรุณากรอกเบอร์โทร')
    if(this.state.user === '') return Alert.alert('','กรุณากรอกหมายเลขฌาปนกิจ')
    if(this.state.password === '') return Alert.alert('','กรุณากรอกรหัสผ่าน')

    this.setState({isLoading: true})
    let data = {
      firstname: this.state.name,
      // lastname: this.state.lname,
      email: this.state.email,
      username: this.state.user,
      password: this.state.password,
      provider_ids : this.state.id13,
      provider_data : this.state.tel
    }
  //console.log(data)
    let signup = await api.signup(data)
    this.setState({isLoading: false})
    console.log(signup)
    if(signup.status === 200){
      Alert.alert('Success')
      this.props.navigation.navigate('Login')
    }else{
      Alert.alert('Signup fail',signup.data.msg)
    }
  }

  render(){
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>

          <View style={styles.container}>

            <Text style={{fontSize: 22, fontWeight: 'bold', marginTop: 50}}>ลงทะเบียน</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

            <Text style={styles.title}>ชื่อผู้ลงทะเบียน</Text>
            <TextInput
              style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1 , borderRadius: 5, padding: 5}}
              onChangeText={text=> this.setState({name: text})}
              value={this.state.name} 
              placeholder="ชื่อผู้ลงทะเบียน"
            />

            {/* <Text style={styles.title}>นามสกุล</Text>
            <TextInput
              style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1 , borderRadius: 5, padding: 5}}
              onChangeText={text=> this.setState({lname: text})}
              value={this.state.lname} 
              placeholder="นามสกุล"
            /> */}

            <Text style={styles.title}>หมายเลข ปชช.</Text>
            <TextInput
              keyboardType="number-pad"
              maxLength={13}
              style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1 , borderRadius: 5, padding: 5}}
              onChangeText={text=> this.setState({id13: text})}
              value={this.state.id13} 
              placeholder="หมายเลข ปชช."
            />

            <Text style={styles.title}>Email</Text>
            <TextInput
              keyboardType="email-address"
              style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1 , borderRadius: 5, padding: 5}}
              onChangeText={text=> this.setState({email: text})}
              value={this.state.email} 
              placeholder="Email"
            />

            <Text style={styles.title}>เบอร์โทร</Text>
            <TextInput
              keyboardType="phone-pad"
              style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1 , borderRadius: 5, padding: 5}}
              onChangeText={text=> this.setState({tel: text})}
              value={this.state.tel} 
              placeholder="เบอร์โทร"
            />

            <Text style={styles.title}>หมายเลขฌาปนกิจ</Text>
            <TextInput
              style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1 , borderRadius: 5, padding: 5}}
              onChangeText={text=> this.setState({user: text})}
              value={this.state.user} 
              placeholder="หมายเลขฌาปนกิจ"
            />

            <Text style={styles.title}>รหัสผ่าน</Text>
            <TextInput
              secureTextEntry={true}
              style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1 , borderRadius: 5, padding: 5}}
              onChangeText={text=> this.setState({password: text})}
              value={this.state.password}
              placeholder="รหัสผ่าน"
            />
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <TouchableOpacity onPress={()=> this.onSignup()} style={{paddingVertical: 10, paddingHorizontal: 20, backgroundColor: '#007bff', borderRadius: 5}}>
              <Text style={{fontSize: 18, color: '#fff'}}>Sing Up</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=> this.props.navigation.navigate('Login')} style={{paddingVertical: 10, paddingHorizontal: 20, marginTop: 20}}>
              <Text style={{fontSize: 18, color: '#007bff'}}>Sing in</Text>
            </TouchableOpacity>

          </View>

        </ScrollView>
        {this.state.isLoading && <Loading />}
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
      width: 300,
      marginTop: 10
    },
    separator: {
      marginVertical: 10,
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
