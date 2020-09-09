import React, { Component } from 'react';
import { StyleSheet, AsyncStorage, Button, SafeAreaView, ScrollView,Image} from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import API from '../API'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from 'expo-constants';

const api = API.create()

export default class TabTwoScreen extends Component {

  constructor() {
    super();
    this.state = {
        profile: '',
        txtStatus: ''
    }
  }

  componentDidMount =async()=> {
    await this.getProFile()
    this.getStatus()
  }

  getProFile =async()=> {
    let user = await AsyncStorage.getItem('userProject')
    console.log(user)
    if(user){
      let users = JSON.parse(user)
      let profiles = await api.getProfile(users.user_id)
    console.log(profiles)
      if(profiles.status === 200){
        this.setState({profile: profiles.data})
      }
    }else{
      this.props.navigation.navigate('Login')
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

  renderProfile(){
    const { profile } = this.state
    if(profile !== ''){
      return (
        <View style={{alignItems: 'center', padding: 10}}>

          <View style={styles.listDesc}>
            <Text style={styles.descTitle}>คำนำหน้า ชื่อ-สกุล</Text>
            <Text style={styles.descValue}>{profile.rang_name+profile.Name+' '+profile.lastname}</Text>
          </View>

          <View style={styles.listDesc}>
            <Text style={styles.descTitle}>หมายเลข ปชช.</Text>
            <Text style={styles.descValue}>{profile.id_13}</Text>
          </View>

          <View style={styles.listDesc}>
            <Text style={styles.descTitle}>วันเกิด</Text>
            <Text style={styles.descValue}>{profile.birth+' อายุ '+profile.age}</Text>
            <Text style={styles.descTitle}>เพศ</Text>
            <Text style={styles.descValue}>{profile.type_name222}</Text>
          </View>

          <View style={styles.listDesc}>
            <Text style={styles.descTitle}>ประเภทสมาชิก</Text>
            <Text style={styles.descValue}>{profile.position}</Text>
            <Text style={styles.descTitle}>ศูนย์ประสานงาน</Text>
            <Text style={styles.descValue}>{profile.tumbon_id}</Text>
          </View>

          <View style={styles.listDesc}>
            <Text style={styles.descTitle}>ที่อยู่(ที่ติดต่อได้)</Text>
            <Text style={styles.descValue}>{profile.remark1}</Text>
          </View>

          <View style={styles.listDesc}>
            <Text style={styles.descTitle}>ที่อยู่ตามทะเบียนบ้าน</Text>
            <Text style={styles.descValue}>{profile.remark1}</Text>
          </View>

          <View style={styles.listDesc}>
            <Text style={styles.descTitle}>ชื่อธนาคาร</Text>
            <Text style={styles.descValue}>-</Text>
            <Text style={styles.descTitle}>สาขา</Text>
            <Text style={styles.descValue}>-</Text>
          </View>

          <View style={styles.listDesc}>
            <Text style={styles.descTitle}>หมายเลขบัญชี</Text>
            <Text style={styles.descValue}>-</Text>
          </View>

          <View style={styles.listDesc}>
            <Text style={styles.descTitle}>โทรศัพท์มือถือ</Text>
            <Text style={styles.descValue}>{profile.tel}</Text>
          
            <Text style={styles.descTitle}>ผลการอนุมัติ</Text>
            <Text style={styles.descValue}>อนุมัติ</Text>
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
            <Text style={styles.descTitle}>สถานะภาพสมรส</Text>
            <Text style={styles.descValue}>-</Text>

            <Text style={styles.descTitle}>ชื่อสามีหรือภรรยา</Text>
            <Text style={styles.descValue}>-</Text>
          </View>

          <View style={styles.listDesc}>
            <Text style={styles.descTitle}>ชื่อผู้จัดการศพ</Text>
            <Text style={styles.descValue}>-</Text>
          </View>

          
          <Text style={{backgroundColor: '#ddd', width: '100%', textAlign: 'center'}}>ข้อมูลผู้รับเงินสงเคราะห์</Text>
          <View style={{backgroundColor: '#545454', width: '100%'}}>
            <View style={styles.titleListDead}>
              <Text style={{width: 40, textAlign: 'center'}}>ลำดับ</Text>
              <Text style={{flex: 1, textAlign: 'center'}}>ชื่อ-สกุล</Text>
              <Text style={{width: 80, textAlign: 'center'}}>ความสัมพันธ์</Text>
              <Text style={{width: 80, textAlign: 'center'}}>เลข ปชช.</Text>
              <Text style={{flex: 1, textAlign: 'center'}}>ที่อยู่</Text>
            </View>
            {profile.name_dead1 !== '' &&
            <View style={styles.listDesc}>
              <Text style={{width: 40, textAlign: 'center'}}>1</Text>
              <Text style={{flex: 1, textAlign: 'center'}}>{profile.name_dead1}</Text>
              <Text style={{width: 80, textAlign: 'center'}}>{profile.re1}</Text>
              <Text style={{width: 80, textAlign: 'center'}}>{profile.name_dead1_id13}</Text>
              <Text style={{flex: 1, textAlign: 'center'}}>{profile.add_name_dead1}</Text>
            </View>
            }
            {profile.name_dead2 !== '' &&
            <View style={styles.listDesc}>
              <Text style={{width: 40, textAlign: 'center'}}>2</Text>
              <Text style={{flex: 1, textAlign: 'center'}}>{profile.name_dead2}</Text>
              <Text style={{width: 80, textAlign: 'center'}}>{profile.re2}</Text>
              <Text style={{width: 80, textAlign: 'center'}}>{profile.name_dead2_id13}</Text>
              <Text style={{flex: 1, textAlign: 'center'}}>{profile.add_name_dead2}</Text>
            </View>
            }
            {profile.name_dead3 !== '' &&
            <View style={styles.listDesc}>
              <Text style={{width: 40, textAlign: 'center'}}>3</Text>
              <Text style={{flex: 1, textAlign: 'center'}}>{profile.name_dead3}</Text>
              <Text style={{width: 80, textAlign: 'center'}}>{profile.re3}</Text>
              <Text style={{width: 80, textAlign: 'center'}}>{profile.name_dead3_id13}</Text>
              <Text style={{flex: 1, textAlign: 'center'}}>{profile.add_name_dead3}</Text>
            </View>
            }
            {profile.name_dead4 !== '' &&
            <View style={styles.listDesc}>
              <Text style={{width: 40, textAlign: 'center'}}>4</Text>
              <Text style={{flex: 1, textAlign: 'center'}}>{profile.name_dead4}</Text>
              <Text style={{width: 80, textAlign: 'center'}}>{profile.re4}</Text>
              <Text style={{width: 80, textAlign: 'center'}}>{profile.name_dead4_id13}</Text>
              <Text style={{flex: 1, textAlign: 'center'}}>{profile.add_name_dead4}</Text>
            </View>
            }
            {profile.name_dead5 !== '' &&
            <View style={styles.listDesc}>
              <Text style={{width: 40, textAlign: 'center'}}>5</Text>
              <Text style={{flex: 1, textAlign: 'center'}}>{profile.name_dead5}</Text>
              <Text style={{width: 80, textAlign: 'center'}}>{profile.re5}</Text>
              <Text style={{width: 80, textAlign: 'center'}}>{profile.name_dead5_id13}</Text>
              <Text style={{flex: 1, textAlign: 'center'}}>{profile.add_name_dead5}</Text>
            </View>
            }
            {profile.name_dead6 !== '' &&
            <View style={styles.listDesc}>
              <Text style={{width: 40, textAlign: 'center'}}>6</Text>
              <Text style={{flex: 1, textAlign: 'center'}}>{profile.name_dead6}</Text>
              <Text style={{width: 80, textAlign: 'center'}}>{profile.re6}</Text>
              <Text style={{width: 80, textAlign: 'center'}}>{profile.name_dead6_id13}</Text>
              <Text style={{flex: 1, textAlign: 'center'}}>{profile.add_name_dead6}</Text>
            </View>
            }

          </View>
          <Text style={{backgroundColor: '#ddd', width: '100%'}}>กรณีเปลี่ยนสถานะ</Text>

          <View style={styles.listDesc}>
            <Text style={styles.descTitle}>สถานะสมาชิก</Text>
            <Text style={styles.descValue}>{this.state.txtStatus}</Text>
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
    alignItems: 'flex-start'
  },
  descTitle: {
    color: '#545454',
    marginRight: 5
  },
  descValue: {
    flex: 1
  },
  titleListDead: {
    flexDirection: 'row',
    backgroundColor: '#CCCCFF',
  }
});
