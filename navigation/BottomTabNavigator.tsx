import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import TabThreeScreen from '../screens/TabThreeScreen';
import TabSettingScreen from '../screens/TabSettingScreen';

import { Button,Text,TouchableOpacity,AsyncStorage } from 'react-native';

import { BottomTabParamList, TabOneParamList, TabTwoParamList, TabThreeParamList, TabLoginParamList , TabSignupParamList } from '../types';


const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (

    
    <BottomTab.Navigator
      
    initialRouteName="TabOne"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Home"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-home" color={color} />,
        }}
      />

      <BottomTab.Screen
        name="Member"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-person" color={color} />,
        }}
      />

      <BottomTab.Screen
        name="Money"
        component={TabThreeNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-cash" color={color} />,
        }}
      />

      <BottomTab.Screen
        name="Setting"
        component={TabSettingNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-settings" color={color} />,
        }}
      />



    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return  <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
  
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator({navigation}) {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={TabOneScreen}
        options={{
          headerTitle: 'หน้าหลัก',
          headerLeft: () => (<Text></Text>),
          headerRight: () => (
            <TouchableOpacity style={{padding: 5}} onPress={async()=> {
              await AsyncStorage.removeItem('userProject')
              navigation.navigate('Login')
            }}>
              <TabBarIcon name="ios-log-out"/>
            </TouchableOpacity>
          ),
        }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator({navigation}) {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ 
          headerTitle: 'สมาชิก',
          headerLeft: () => (<Text></Text>),
          headerRight: () => (
            <TouchableOpacity style={{padding: 5}} onPress={async()=> {
              await AsyncStorage.removeItem('userProject')
              navigation.navigate('Login')
            }}>
              <TabBarIcon name="ios-log-out"/>
            </TouchableOpacity>
          ),
        }}
      />
    </TabTwoStack.Navigator>
  );
}


const TabThreeStack = createStackNavigator<TabThreeParamList>();

function TabThreeNavigator({navigation}) {
  return (
    <TabThreeStack.Navigator>
      <TabThreeStack.Screen
        name="TabThreeScreen"
        component={TabThreeScreen}
        options={{ 
          headerTitle: 'รายการชำระเงิน',
          headerLeft: () => (<Text></Text>),
          headerRight: () => (
            <TouchableOpacity style={{padding: 5}} onPress={async()=> {
              await AsyncStorage.removeItem('userProject')
              navigation.navigate('Login')
            }}>
              <TabBarIcon name="ios-log-out"/>
            </TouchableOpacity>
          ),
        }}
      />
    </TabThreeStack.Navigator>
  );
}



const TabSettingStack = createStackNavigator<TabLoginParamList>();

function TabSettingNavigator({navigation}) {
  return (
    <TabSettingStack.Navigator>
      <TabSettingStack.Screen
        name="TabSettingScreen"
        component={TabSettingScreen}
        options={{ 
          headerTitle: 'ตั้งค่าข้อมูล',
          headerLeft: () => (<Text></Text>),
          headerRight: () => (
            <TouchableOpacity style={{padding: 5}} onPress={async()=> {
              await AsyncStorage.removeItem('userProject')
              navigation.navigate('Login')
            }}>
              <TabBarIcon name="ios-log-out"/>
            </TouchableOpacity>
          ),
        }}
      />
    </TabSettingStack.Navigator>
  );
}
