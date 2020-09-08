import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import TabThreeScreen from '../screens/TabThreeScreen';
import TabLoginScreen from '../screens/TabLoginScreen';
import TabSignupScreen from '../screens/TabSignupScreen';

import { BottomTabParamList, TabOneParamList, TabTwoParamList, TabThreeParamList, TabLoginParamList , TabSignupParamList } from '../types';


const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (

    
    <BottomTab.Navigator
      
    initialRouteName="TabOne"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="TabOne"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-home" color={color} />,
        }}
      />

      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-person" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="TabThree"
        component={TabThreeNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-settings" color={color} />,
        }}
      />

<BottomTab.Screen
        name="TabLogin"
        component={TabLoginNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-log-in" color={color} />,
        }}
      />


<BottomTab.Screen
        name="TabSignup"
        component={TabSignupNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-log-in" color={color} />,
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

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={TabOneScreen}
        options={{ headerTitle: 'หน้าหลัก' }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: 'สมาชิก' }}
      />
    </TabTwoStack.Navigator>
  );
}


const TabThreeStack = createStackNavigator<TabThreeParamList>();

function TabThreeNavigator() {
  return (
    <TabThreeStack.Navigator>
      <TabThreeStack.Screen
        name="TabThreeScreen"
        component={TabThreeScreen}
        options={{ headerTitle: 'ตั้งค่าข้อมูล' }}
      />
    </TabThreeStack.Navigator>
  );
}



const TabLoginStack = createStackNavigator<TabLoginParamList>();

function TabLoginNavigator() {
  return (
    <TabLoginStack.Navigator>
      <TabLoginStack.Screen
        name="TabLoginScreen"
        component={TabLoginScreen}
        options={{ headerTitle: 'Login' }}
      />
    </TabLoginStack.Navigator>
  );
}




const TabSignupStack = createStackNavigator<TabSignupParamList>();

function TabSignupNavigator() {
  return (
    <TabSignupStack.Navigator>
      <TabSignupStack.Screen
        name="TabSignupScreen"
        component={TabSignupScreen}
        options={{ headerTitle: 'Sign Up' }}
      />
    </TabSignupStack.Navigator>
  );
}