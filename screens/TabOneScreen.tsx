// import * as React from 'react';
import React, { Component } from 'react';
import { StyleSheet, AsyncStorage, Button, SafeAreaView, ScrollView,Image} from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import API from '../API'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from 'expo-constants';

const api = API.create()

export default class TabOneScreen extends Component {

  constructor() {
    super();
    this.state = {
        profile: ''
    }
  }

  componentDidMount() {
    this.getProFile()
  }

  getProFile =async()=> {
    let user = await AsyncStorage.getItem('userProject')
    console.log(user)
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

  renderProfile(){
    const { profile } = this.state
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
            {profile.status_id === 1 ? 
            <Text style={styles.descValue}>รับสิทธิ์</Text>
            :
            <Text style={styles.descValue}>ไม่รับสิทธิ์</Text>
            }
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
            <Text style={styles.descValue}>{'รอบ ต้นปี-'+profile.years_up+'  เรียกเก็บ '+profile.money_before+' บาท'}</Text>
          </View>

          <View style={styles.listDesc}>
            <Text style={styles.descTitle}>สถานะการชำระ</Text>
            {profile.pay_check === "1" ? 
            <Text style={styles.descValue}>ตรวจสอบการชำระแล้ว</Text>
            :
            <Text style={styles.descValue}>ยังไม่ตรวจสอบการชำระ</Text>
            }
          </View>

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
  }
});

