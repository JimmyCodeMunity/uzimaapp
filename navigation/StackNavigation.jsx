import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import SplashScreen from '../screens/SplashScreen'
import IntroScreen from '../screens/IntroScreen'
import HomeScreen from '../screens/HomeScreen'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import SettingsScreen from '../screens/SettingsScreen'
import PlanScreen from '../screens/PlanScreen'
import PaymentScreen from '../screens/PaymentScreen'
import BottomNavigator from './BottomNavigation'
import VoiceScreen from '../screens/VoiceScreen'
import ChatScreen from '../screens/ChatScreen'


const Stack = createStackNavigator()

const StackNavigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown:false}}/>
            <Stack.Screen name="Intro" component={IntroScreen} options={{headerShown:false}}/>
            <Stack.Screen name="Landing" component={BottomNavigator} options={{headerShown:false}}/>
            <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
            <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown:false,presentation:'modal'}}/>
            
            <Stack.Screen name="Plans" component={PlanScreen} options={{headerShown:false,presentation:'modal'}}/>
            <Stack.Screen name="Payment" component={PaymentScreen} options={{headerShown:false}}/>
            <Stack.Screen name="Voice" component={VoiceScreen} options={{headerShown:false,presentation:'modal'}}/>
            <Stack.Screen name="UzimaChat" component={ChatScreen} options={{headerShown:false,presentation:'fullscreenModal'}}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigation