
import React, { Component } from 'react';
import { StyleSheet,TextInput,Image,Button,AsyncStorage,TouchableOpacity,Alert,SafeAreaView, ScrollView, KeyboardAvoidingView, Platform,Modal } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import API from '../API'
import { Text, View } from '../components/Themed';
import ImageSlider from 'react-native-image-slider';

const api = API.create()

export default class TabLoginScreen extends Component {
  // const [valueUser, user] = React.useState('');
  // const [valuePassword, password] = React.useState('');

  constructor() {
    super();
    this.state = {
      user: '',
      password: '',
      gallary: [],
      modalForgot: false,

      cardId: '',
      telNo: '',
      userCode: '',
      newPassword: '',
    }
  }

  componentDidMount(){
    this.setGallary()
  }

  setGallary(){
    let gr = [
      'http://ca-comil.net/images_slide/1.jpg',
      'http://ca-comil.net/images_slide/2.jpg',
      'http://ca-comil.net/images_slide/3.jpg',
      'http://ca-comil.net/images_slide/4.jpg'
    ]
    this.setState({gallary: gr})
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

  forgotPassword(){
    const {cardId,telNo,userCode,newPassword} =this.state
    console.log(cardId,telNo,userCode,newPassword)
    this.setState({modalForgot: false})
  }

  render(){
    return (<>
      <View style={{width: '100%', height: 60, backgroundColor: '#cc66ff'}}></View>
      <SafeAreaView style={{flex: 1}}>
        
        <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
        
          <View style={styles.container}>
            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 40, paddingHorizontal: 50}}>
              <Image source={require('./images/logo.png')} style={styles.images} resizeMode="cover"/>
              <Text style={{fontSize: 30, marginLeft: 30, flex: 1}}>เข้าใช้งาน</Text>
            </View>
            
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <View style={{alignSelf: 'flex-start', paddingHorizontal: 50}}>
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
            </View>
            
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            
            <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 20}}>
              <TouchableOpacity onPress={()=> this.onSignin()} style={{paddingVertical: 10, paddingHorizontal: 30, backgroundColor: '#FF4B2B', borderRadius: 20}}>
                <Text style={{fontSize: 18, color: '#fff'}}>Sing In</Text>
              </TouchableOpacity>
              
              <TouchableOpacity onPress={()=> this.props.navigation.navigate('Signup')} style={{paddingVertical: 10, paddingHorizontal: 30}}>
                <Text style={{fontSize: 18, color: '#007bff'}}>Sing Up</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=> this.setState({modalForgot: true})} style={{paddingVertical: 10, paddingHorizontal: 30}}>
                <Text style={{fontSize: 18, color: '#000'}}>ลืมรหัสผ่าน ?</Text>
              </TouchableOpacity>
            </View>

          </View>

          <View style={{width: '100%', height: 200}}>
            <ImageSlider 
              loopBothSides
              autoPlayWithInterval={5000}
              images={this.state.gallary}
            />
          </View>
          
         </ScrollView>

         <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.modalForgot}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
        }}
        >
          <View style={styles.centeredView}>
            {/* <View style={styles.modalView}> */}
              <Image source={require('./images/logo.png')} style={styles.images} resizeMode="cover"/>
              <Text style={[{textAlign: 'center', color: '#000099'}]}>สำหรับสมาชิก ที่เคยลงทะเบียนในระบบ และลืมรหัสผ่าน</Text>
              <Text style={[{textAlign: 'center', color: '#000099'}]}>ต้องการรีเซตรหัสผ่านโปรดระบุข้อมูลให้ถูกต้อง</Text>
              <Text style={[{textAlign: 'center', color: '#000099'}]}>ตามที่เคยลงทะเบียน!</Text>

              <Text style={[styles.title,{marginTop: 20}]}>หมายเลข ปชช.</Text>
              <TextInput
                style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1 , borderRadius: 5, padding: 5}}
                onChangeText={text=> this.setState({cardId: text})}
                value={this.state.cardId}
                placeholder="หมายเลข ปชช."
              />
              <Text style={[styles.title,{marginTop: 20}]}>หมายเลขโทรศัพท์</Text>
              <TextInput
                style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1 , borderRadius: 5, padding: 5}}
                onChangeText={text=> this.setState({telNo: text})}
                value={this.state.telNo}
                placeholder="หมายเลขโทรศัพท์"
              />
              <Text style={[styles.title,{marginTop: 20}]}>หมายเลขฌาปนกิจ สสอท. (รหัสผู้ใช้)</Text>
              <TextInput
                style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1 , borderRadius: 5, padding: 5}}
                onChangeText={text=> this.setState({userCode: text})}
                value={this.state.userCode}
                placeholder="หมายเลขฌาปนกิจ สสอท. (รหัสผู้ใช้)"
              />
              <Text style={[styles.title,{marginTop: 20}]}>รหัสผ่านใหม่</Text>
              <TextInput
                secureTextEntry={true}
                style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1 , borderRadius: 5, padding: 5}}
                onChangeText={text=> this.setState({newPassword: text})}
                value={this.state.newPassword}
                placeholder="รหัสผ่านใหม่"
              />

              <View style={{flexDirection: 'row', marginTop: 20}}>
                <TouchableOpacity onPress={()=> this.setState({modalForgot: false,cardId: '',telNo: '',userCode: '',newPassword: ''})} style={{paddingVertical: 10, backgroundColor: '#FF4B2B', paddingHorizontal: 20, borderRadius: 5}}>
                  <Text style={{fontSize: 18, color: '#fff'}}>ยกเลิก</Text>
                </TouchableOpacity>
                <View style={{width: 20}}></View>
                <TouchableOpacity onPress={()=> this.forgotPassword()} style={{paddingVertical: 10, backgroundColor: '#007bff', paddingHorizontal: 20, borderRadius: 5}}>
                  <Text style={{fontSize: 18, color: '#fff'}}>รีเซตรหัสผ่าน</Text>
                </TouchableOpacity>
              </View>
          
            {/* </View> */}
          </View>
        </Modal>

      </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      // flex: 1,
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
      marginVertical: 20,
      height: 1,
      width: '80%',
    },
    images: {
      width: 50,
      height: 50,
      // marginTop: 80
    },
    btSignin: {
      padding: 5,
      backgroundColor: '#007bff'
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
  });
  
