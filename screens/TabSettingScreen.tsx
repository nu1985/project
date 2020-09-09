import Loading from '../components/Loading'
import React, { Component } from 'react';
import { StyleSheet,TextInput,Image,Button,AsyncStorage,TouchableOpacity,Alert,SafeAreaView, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import API from '../API'
import { Text, View } from '../components/Themed';

const api = API.create()

export default class TabSettingScreen extends Component {
  // const [valueUser, user] = React.useState('');
  // const [valuePassword, password] = React.useState('');

  constructor() {
    super();
    this.state = {
      isLoading: false,
      prprofile: '',
      name: '',
      lname: '',
      id13: '',
      email: '',
      tel:'',
      user: '',
      password: '',
    }
  }

  componentDidMount() {
    // this.getProFile()
    this.getUser()
  }

  // getProFile =async()=> {
  //   let user = await AsyncStorage.getItem('userProject')
  //   // console.log(user)
  //   if(user){
  //     let users = JSON.parse(user)
  //     let profiles = await api.getProfile(users.user_id)
  //   // console.log(profiles)
  //     if(profiles.status === 200){
  //       this.setState({
  //         profile: profiles.data,
  //         name: profiles.data.Name,
  //         lname: profiles.data.lastname,
  //         id13: profiles.data.id_13,
  //         email: profiles.data.Email,
  //         tel: profiles.data.tel,
  //         user: profiles.data.member_id,
  //         password: profiles.data.password1,
  //       })
  //     }
  //   }else{
  //     this.props.navigation.navigate('Login')
  //   } 
  // }

  getUser =async()=> {
    let user = await api.getUserLogin()
    console.log(user)
    if(user.status === 200){
      this.setState({
        profile: user.data,
        name: user.data.firstname,
        lname: user.data.lastname,
        id13: user.data.provider_ids,
        email: user.data.email,
        tel: user.data.provider,
        user: user.data.username,
        password: user.data.password,
      })
    }
  }

  onEdit =async()=> {
    if(this.state.name === '') return Alert.alert('','กรุณากรอกชื่อผู้ลงทะเบียน')
    if(this.state.lname === '') return Alert.alert('','กรุณากรอกนามสกุล')
    // if(this.state.id13 === '') return Alert.alert('','กรุณากรอกหมายเลข ปชช.')
    if(this.state.email === '') return Alert.alert('','กรุณากรอก Email')
    if(this.state.tel === '') return Alert.alert('','กรุณากรอกเบอร์โทร')
    // if(this.state.user === '') return Alert.alert('','กรุณากรอกหมายเลขฌาปนกิจ')
    if(this.state.password === '') return Alert.alert('','กรุณากรอกรหัสผ่าน')

    this.setState({isLoading: true})
    let data = {
      firstname: this.state.name,
      lastname: this.state.lname,
      email: this.state.email,
      password: this.state.password,
      provider_data : this.state.tel
    }
    let update = await api.updateUser(data)
    this.setState({isLoading: false})
    console.log(update)
    // let user ={
    //   user: valueUser,
    //   user_id: '230'
    // }
    // AsyncStorage.setItem('userProject',JSON.stringify(user))
    // navigation.navigate('Root')
  }

  render(){
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>

          <View style={styles.container}>

            <Text style={styles.title}>ชื่อผู้ลงทะเบียน</Text>
            <TextInput
              style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1 , borderRadius: 5, padding: 5}}
              onChangeText={text=> this.setState({name: text})}
              value={this.state.name} 
              placeholder="ชื่อผู้ลงทะเบียน"
            />

            <Text style={styles.title}>นามสกุล</Text>
            <TextInput
              style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1 , borderRadius: 5, padding: 5}}
              onChangeText={text=> this.setState({lname: text})}
              value={this.state.lname} 
              placeholder="นามสกุล"
            />

            <Text style={styles.title}>หมายเลข ปชช.</Text>
            <TextInput
              editable={false}
              keyboardType="number-pad"
              style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1 , borderRadius: 5, padding: 5, backgroundColor: '#ddd'}}
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
              editable={false}
              style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1 , borderRadius: 5, padding: 5, backgroundColor: '#ddd'}}
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
            <TouchableOpacity onPress={()=> this.onEdit()} style={{paddingVertical: 10, paddingHorizontal: 20, backgroundColor: '#007bff', borderRadius: 5}}>
              <Text style={{fontSize: 18, color: '#fff'}}>แก้ไขข้อมูล</Text>
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
