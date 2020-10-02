import Loading from '../components/Loading'
import React, { Component } from 'react';
import { StyleSheet,TextInput,Image,Button,AsyncStorage,TouchableOpacity,Alert,SafeAreaView, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import API from '../API'
import { Text, View } from '../components/Themed';
import { FontAwesome,MaterialCommunityIcons,AntDesign,Entypo } from '@expo/vector-icons';

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
    return (<>
      <View style={{width: '100%', height: 60, backgroundColor: '#cc66ff'}}></View>
      <SafeAreaView style={{flex: 1}}>
        <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>

          <View style={styles.container}>

            <Text style={{fontSize: 22, fontWeight: 'bold', marginTop: 50}}>ลงทะเบียน</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

            <Text style={styles.title}>ชื่อผู้ลงทะเบียน</Text>
            <View style={{flexDirection: 'row'}}>
              <TextInput
                style={{ height: 40, width: 320, borderColor: 'gray', borderWidth: 1 , borderRadius: 5, padding: 5, paddingLeft: 35}}
                onChangeText={text=> this.setState({name: text})}
                value={this.state.name} 
                placeholder="ชื่อผู้ลงทะเบียน"
              />
              <MaterialCommunityIcons name="face-profile" size={24} color="#cc66ff" style={{position: 'absolute', left: 5, alignSelf: 'center'}}/>
            </View>

            <Text style={styles.title}>หมายเลข ปชช.</Text>
            <View style={{flexDirection: 'row'}}>
              <TextInput
                keyboardType="number-pad"
                maxLength={13}
                style={{ height: 40, width: 320, borderColor: 'gray', borderWidth: 1 , borderRadius: 5, padding: 5, paddingLeft: 35}}
                onChangeText={text=> this.setState({id13: text})}
                value={this.state.id13} 
                placeholder="หมายเลข ปชช."
              />
              <AntDesign name="idcard" size={24} color="#cc66ff" style={{position: 'absolute', left: 5, alignSelf: 'center'}}/>
            </View>

            <Text style={styles.title}>Email</Text>
            <View style={{flexDirection: 'row'}}>
              <TextInput
                keyboardType="email-address"
                style={{ height: 40, width: 320, borderColor: 'gray', borderWidth: 1 , borderRadius: 5, padding: 5, paddingLeft: 35}}
                onChangeText={text=> this.setState({email: text})}
                value={this.state.email} 
                placeholder="Email"
              />
              <Entypo name="email" size={24} color="#cc66ff" style={{position: 'absolute', left: 5, alignSelf: 'center'}}/>
            </View>

            <Text style={styles.title}>เบอร์โทร</Text>
            <View style={{flexDirection: 'row'}}>
              <TextInput
                keyboardType="phone-pad"
                style={{ height: 40, width: 320, borderColor: 'gray', borderWidth: 1 , borderRadius: 5, padding: 5, paddingLeft: 35}}
                onChangeText={text=> this.setState({tel: text})}
                value={this.state.tel} 
                placeholder="เบอร์โทร"
              />
              <FontAwesome name="phone" size={24} color="#cc66ff" style={{position: 'absolute', left: 5, alignSelf: 'center'}}/>
            </View>

            <Text style={styles.title}>หมายเลขฌาปนกิจ</Text>
            <View style={{flexDirection: 'row'}}>
              <TextInput
                style={{ height: 40, width: 320, borderColor: 'gray', borderWidth: 1 , borderRadius: 5, padding: 5, paddingLeft: 35}}
                onChangeText={text=> this.setState({user: text})}
                value={this.state.user} 
                placeholder="หมายเลขฌาปนกิจ"
              />
              <FontAwesome name="user-circle-o" size={24} color="#cc66ff" style={{position: 'absolute', left: 5, alignSelf: 'center'}}/>
            </View>

            <Text style={styles.title}>รหัสผ่าน</Text>
            <View style={{flexDirection: 'row'}}>
              <TextInput
                secureTextEntry={true}
                style={{ height: 40, width: 320, borderColor: 'gray', borderWidth: 1 , borderRadius: 5, padding: 5, paddingLeft: 35}}
                onChangeText={text=> this.setState({password: text})}
                value={this.state.password}
                placeholder="รหัสผ่าน"
              />
              <MaterialCommunityIcons name="shield-key-outline" size={24} color="#cc66ff" style={{position: 'absolute', left: 5, alignSelf: 'center'}}/>
            </View>

            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

            <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 20}}>
              <TouchableOpacity onPress={()=> this.onSignup()} style={{paddingVertical: 10, paddingHorizontal: 30, backgroundColor: '#FF4B2B', borderRadius: 20}}>
                <Text style={{fontSize: 18, color: '#fff'}}>Sing Up</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=> this.props.navigation.navigate('Login')} style={{paddingVertical: 10, paddingHorizontal: 30}}>
                <Text style={{fontSize: 18, color: '#007bff'}}>Sing in</Text>
              </TouchableOpacity>
            </View>

          </View>

        </ScrollView>
        {this.state.isLoading && <Loading />}
      </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'left',
      width: 320,
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
