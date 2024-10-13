import React from 'react';
import { View, StyleSheet } from 'react-native';

import { CommonActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import TodoScreen from '../screens/TodoScreen';

const Tab = createBottomTabNavigator();

export default function BottomNavigator() {
  return (
   <Tab.Navigator
   screenOptions={{
    tabBarActiveTintColor:"green",
   }}
   >
    <Tab.Screen
    options={{
      headerShown:false,
      tabBarLabel:"Space",
      tabBarIcon:({ focused,color,size }) => (
        <Icon name="hand-heart" size={26} color={focused? "green":"gray"} />
      ),
    }}
    name="Home" component={HomeScreen}/>
    <Tab.Screen
    options={{
      headerShown:false,
      tabBarLabel:"Todo",
      tabBarIcon:({ focused,color,size }) => (
        <Icon name="book-alphabet" size={26} color={focused? "green":"gray"} />
      ),
    }}
    name="Todo" component={TodoScreen}/>
    <Tab.Screen
    options={{
      headerShown:false,
      tabBarLabel:"Settings",
      tabBarIcon:({ focused,color,size }) => (
        <Icon name="cog" size={26} color={focused? "green":"gray"} />
      ),
    }}
    name="Settings" component={SettingsScreen}/>
   </Tab.Navigator>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});