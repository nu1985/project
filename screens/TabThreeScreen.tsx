import React, { Component } from 'react';
import { StyleSheet, AsyncStorage, Button, SafeAreaView, ScrollView,Image} from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import API from '../API'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from 'expo-constants';

const api = API.create()

export default class TabThreeScreen extends Component {

  constructor() {
    super();
    this.state = {
      moneyList: ''
    }
  }

  componentDidMount() {
    this.getMemPay()
  }

  getMemPay =async()=> {
    let user = await AsyncStorage.getItem('userProject')
    // let rr = [
    //   {n:'0'},{n:'1'},{n:'2'}
    // ]
    // this.setState({moneyList: rr})
    
    if(user){
      let users = JSON.parse(user)
      let memberPay = await api.getMemberPay(users.user_id)
      console.log(memberPay)
      if(memberPay.status === 200){
        this.setState({moneyList: memberPay.data})
      }
    } 
  }

  renderMoney(){
    const { moneyList } = this.state
    if(moneyList !== ''){
      let items = []
      let amount = 0
      for(var i=0;i<moneyList.length;i++){
        amount = amount+moneyList[i].money_pay4
        items.push(
          // <View style={i%2 === 0 ? {backgroundColor:  '#fff', width: '100%',} : {backgroundColor:  '#ddd', width: '100%'}} key={i}>
          <View style={{backgroundColor:  '#000', width: '100%'}} key={i}>
            <View style={[styles.listDesc,i%2 === 0 ? {backgroundColor:  '#fff'} : {backgroundColor:  '#ddd'}]}>
              <Text style={styles.descTitle}>ว.ด.ป.</Text>
              <Text style={styles.descValue}>{moneyList[i].date_to_pay}</Text>
              <View style={{width: 10}}></View>
              <Text style={styles.descTitle}>จำนวนเงิน</Text>
              <Text style={styles.descValue}>{moneyList[i].money_pay4}</Text>
            </View>
            <View style={[styles.titleListDead,,i%2 === 0 ? {backgroundColor:  '#fff'} : {backgroundColor:  '#ddd'}]}>
              <Text style={{flex: 2, textAlign: 'center'}}>รายการ</Text>
              <Text style={{flex: 1, textAlign: 'center'}}>จ่ายเงินสงเคราะห์</Text>
              <Text style={{flex: 1, textAlign: 'center'}}>เงินสงเคราะห์ล่วงหน้าคงเหลือ</Text>
            </View>
        
            <View style={[styles.titleListMoney,i%2 === 0 ? {backgroundColor:  '#fff'} : {backgroundColor:  '#ddd'}]}>
              <View style={[{flex: 2, borderRightWidth: 1, borderRightColor: '#545454'},i%2 === 0 ? {backgroundColor:  '#fff'} : {backgroundColor:  '#ddd'}]}>
                <View style={[styles.listDesc,,i%2 === 0 ? {backgroundColor:  '#fff'} : {backgroundColor:  '#ddd'}]}>
                  <Text style={styles.descTitle}>เงินค่าสมัคร</Text>
                  <Text style={styles.descValue}>-</Text>
                </View>
                <View style={[styles.listDesc,i%2 === 0 ? {backgroundColor:  '#fff'} : {backgroundColor:  '#ddd'}]}>
                  <Text style={styles.descTitle}>เงินค่าบำรุง</Text>
                  <Text style={styles.descValue}>{moneyList[i].money_pay2}</Text>
                </View>
                <View style={[styles.listDesc,i%2 === 0 ? {backgroundColor:  '#fff'} : {backgroundColor:  '#ddd'}]}>
                  <Text style={styles.descTitle}>เงินสงเคราะห์ล่วงหน้า</Text>
                  <Text style={styles.descValue}>{moneyList[i].money_pay4}</Text>
                </View>
                <View style={[styles.listDesc,i%2 === 0 ? {backgroundColor:  '#fff'} : {backgroundColor:  '#ddd'}]}>
                  <Text style={styles.descTitle}>เงินอื่นๆ</Text>
                  <Text style={styles.descValue}>-</Text>
                </View>
                
              </View>
              <View style={[{flex: 1, borderRightWidth: 1, borderRightColor: '#545454'},i%2 === 0 ? {backgroundColor:  '#fff'} : {backgroundColor:  '#ddd'}]}>
                <View style={[styles.listDesc,i%2 === 0 ? {backgroundColor:  '#fff'} : {backgroundColor:  '#ddd'}]}>
                  <Text style={styles.descTitle}>ศพที่</Text>
                  <Text style={styles.descValue}>-</Text>
                </View>
                <View style={[styles.listDesc,i%2 === 0 ? {backgroundColor:  '#fff'} : {backgroundColor:  '#ddd'}]}>
                  <Text style={styles.descTitle}>เป็นเงิน</Text>
                  <Text style={styles.descValue}>-</Text>
                </View>
              </View>
              <Text style={{flex: 1, textAlign: 'center'}}>{moneyList[i].money_pay4}</Text>
            </View>
          </View>
        )
      }
      return (
        <View style={{alignItems: 'center', padding: 10, flex: 1}}>

          {items}

          <View style={styles.listDesc}>
            <Text style={styles.descTitle}>เงินสงเคราะห์ล่วงหน้าคงเหลือ</Text>
            <Text style={styles.descValue}>{amount}</Text>
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
        {this.renderMoney()}
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
    alignItems: 'flex-start',
    padding: 5,
  },
  descTitle: {
    color: '#545454',
    marginRight: 5,
    flex: 1
  },
  descValue: {
    flex: 1,
    textAlign: "right"
  },
  titleListDead: {
    flexDirection: 'row'
  },
  titleListMoney: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  }
});