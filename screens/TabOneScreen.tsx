// import * as React from 'react';
import React, { Component } from 'react';
import { StyleSheet, AsyncStorage, Button, SafeAreaView, ScrollView,Image, TouchableOpacity, Linking, Modal} from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import API from '../API'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from 'expo-constants';
import { WebView } from 'react-native-webview';

const api = API.create()

export default class TabOneScreen extends Component {

  constructor() {
    super();
    this.state = {
        profile: '',
        txtStatus: '',
        modalQr: false,
        qrUrl: '',
        payStatus: '',
        numpay: ''
    }
  }

  componentDidMount =async()=> {
    await this.getProFile()
    this.getStatus()
    this.getMemPay()
    this.getNumpay()
  }

  getProFile =async()=> {
    let user = await AsyncStorage.getItem('userProject')
    // console.log(user)
    if(user){
      let users = JSON.parse(user)
      let profiles = await api.getProfile(users.user_id)
    // console.log(profiles)
      if(profiles.status === 200){
        this.setState({profile: profiles.data})
      }
    }else{
      this.props.navigation.navigate('Login')
    } 
  }

  getMemPay =async()=> {
    const {profile} =this.state
    let yy = (new Date().getFullYear()) + 543
    // console.log(yy)
    let memberPay = await api.getMemberPay(profile.member_id)
    // console.log(memberPay)
    if(memberPay.status === 200){
      let isPay = false
      for(var i=0;i<memberPay.data.length;i++){
        if(memberPay.data[i].YPay === yy){
          isPay = true
        }
      }

      if(isPay){
        this.setState({payStatus: 'ตรวจสอบการชำระแล้ว'})
      }else{
        this.setState({payStatus: 'ยังไม่ตรวจสอบการชำระ'})
      }
    }
  }

  getStatus =async()=> {
    const {profile} = this.state
    let status = await api.getStatus()
    // console.log(status)
    if(status.status === 200){
      let statusList = status.data
      for(var i =0;i<statusList.length;i++){
        if(statusList[i].status_id === profile.status_id){
          this.setState({txtStatus: statusList[i].status_name})
        }
      }
    }
  }

  getNumpay =async()=> {
    const {profile} = this.state
    let numpay = await api.getNumPay()
    if(numpay.status === 200){
      let numpas = numpay.data
      for(var i =0;i<numpas.length;i++){
        if((numpas[i].datefirst_pay == profile.datefirst_pay) && (numpas[i].yearsfirst_pay == profile.yearsfirst_pay)){
          let yy = 'ต้นปี'
          if(numpas[i].years_pay_num > 1){
            yy = 'ระหว่างปี'
          }
          let text = 'รอบ ต้นปี-'+numpas[i].years_pay+'  เรียกเก็บ '+numpas[i].mon4_years+' บาท'
          this.setState({numpay: text})
        }
      }
    }
  }

  pressQrcode(){
    const {profile} = this.state
    let url = 'http://ca-comil.online/aspdata/printrecive_QRAPI_php.php?member_id='+profile.member_id+'&dead_pay1='+profile.dead_pay1+'&dead_pay2='+profile.dead_pay2
    this.setState({
      modalQr: true,
      qrUrl: url
    })
    // Linking.openURL(url);
  }

  renderProfile(){
    const { profile, payStatus, numpay } = this.state
    if(profile !== ''){
      return (
        <View style={{alignItems: 'center', padding: 10}}>
          <Image source={require('./images/account.png')} style={styles.images} resizeMode="cover"/>

          <View style={styles.listDesc}>
            <Text style={styles.descTitle}>คำนำหน้า ชื่อ-สกุล</Text>
            <Text style={styles.descValue}>{profile.rang_name+profile.Name+' '+profile.lastname}</Text>
          </View>

          <View style={styles.listDesc}>
            <Text style={styles.descTitle}>หมายเลข ปชช.</Text>
            <Text style={styles.descValue}>{profile.id_13}</Text>
          </View>

          <View style={styles.listDesc}>
            <Text style={styles.descTitle}>สถานะสมาชิก</Text>
      <     Text style={styles.descValue}>{this.state.txtStatus}</Text>
          </View>

          <View style={styles.listDesc}>
            <Text style={styles.descTitle}>วันเกิด</Text>
            <Text style={styles.descValue}>{profile.birth+' อายุ '+profile.age}</Text>
          </View>

          <View style={styles.listDesc}>
            <Text style={styles.descTitle}>เพศ</Text>
            <Text style={styles.descValue}>{profile.type_name222}</Text>
          </View>

          <View style={styles.listDesc}>
            <Text style={styles.descTitle}>ประเภทสมาชิก</Text>
            <Text style={styles.descValue}>{profile.position}</Text>
          </View>

          <View style={styles.listDesc}>
            <Text style={styles.descTitle}>ศูนย์ประสานงาน</Text>
            <Text style={styles.descValue}>{profile.tumbon_id}</Text>
          </View>

          <View style={styles.listDesc}>
            <Text style={styles.descTitle}>ที่อยู่(ที่ติดต่อได้)</Text>
            <Text style={styles.descValue}>{profile.remark1}</Text>
          </View>

          <View style={styles.listDesc}>
            <Text style={styles.descTitle}>วันที่สมัคร</Text>
            <Text style={styles.descValue}>{profile.date_first}</Text>
          
            <Text style={[styles.descTitle,{flex: 1}]}>วันที่อนุมัติ</Text>
            <Text style={styles.descValue}>{profile.date_first1}</Text>
          </View>

          <View style={styles.listDesc}>
            <Text style={[styles.descTitle,{flex: 1}]}>รอบอนุมัติสมัครที่</Text>
            <Text style={styles.descValue}>{profile.datefirst_pay+'/'+profile.yearsfirst_pay}</Text>
            <Text style={[styles.descTitle,{flex: 1}]}>วันที่ส่งเงินคงสภาพ</Text>
            <Text style={styles.descValue}>{profile.date_continue}</Text>
          </View>

          <View style={styles.listDesc}>
            <Text style={styles.descTitle}>เงินคงสภาพ</Text>
            <Text style={styles.descValue}>{numpay}</Text>
          </View>

          <View style={styles.listDesc}>
            <Text style={styles.descTitle}>สถานะการชำระ</Text>
            <Text style={styles.descValue}>{payStatus}</Text>
          </View>

          <TouchableOpacity onPress={()=> this.pressQrcode()} style={{marginTop: 40 , alignItems: 'center'}}>
            <Image source={require('./images/qrscan.png')} style={{width: 60, height: 60}} resizeMode="cover"/>
            <Text>สแกน QR เพื่อโอนเงิน</Text>
          </TouchableOpacity>
        </View>
      )
    }else{
      return <Text>No data</Text>
    }
  }

  static navigationOptions = ({ navigation }) => {
    const { state: { params = {} } } = navigation;
    return {
      title: 'HOME',
    };
  }

  render() {
    // React.useLayoutEffect(() => {
    //   navigation.setOptions({
    //     headerLeft: () => (
    //       <Text>MENU</Text>
    //     ),
    //   });
    // }, [navigation]);
    return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {this.renderProfile()}
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.modalQr}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
        }}
        >
          <WebView source={{ uri: this.state.qrUrl }} />
          <View style={{backgroundColor: '#fff', padding: 20}}>
            <TouchableOpacity onPress={()=> this.setState({modalQr: false})} style={styles.btClose}>
              <Text style={{fontSize: 18, color: '#fff'}}>CLOSE</Text>
            </TouchableOpacity>
          </View>
        </Modal>

    </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    margin: 10,
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
  images: {
    height: 100,
    width: 100,
    borderRadius: 50
  },
  listDesc:{
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center'
  },
  descTitle: {
    color: '#545454',
    marginRight: 5
  },
  descValue: {
    flex: 1
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
  btClose: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: '#007bff',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10
  }
});

