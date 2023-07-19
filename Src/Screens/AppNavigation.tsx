import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import SplashScr from './SplashScr';
import Coursedetails from './Coursedetails';
import CourseVideoList from './CourseVideoList';
import COLORS from '../Util/Colors';
import HomeTab from './HomeTab';
import ComVideo from '../Component/CustomComponents/ComVideo';
import Sandbox from '../Component/CustomComponents/ComVideo';
import ChangePassword from './ChangePassword';
import ForgotPassword from './ForgotPassword';
import ProfileScreen from './ProfileScreen';
const Stack = createNativeStackNavigator();
  //Manage all navigation opration 
const AppNavigation = () => {
  return (
        <NavigationContainer>
                <Stack.Navigator initialRouteName='SplashScr' screenOptions={{gestureEnabled: false}}>
                <Stack.Screen name="SplashScr" component={SplashScr} options={ {headerShown: false,contentStyle:{backgroundColor:COLORS.backgroundColor}}}/>
                <Stack.Screen name="Home" component={Home} options={ {headerShown: false,contentStyle:{backgroundColor:COLORS.backgroundColor}}}/>
                <Stack.Screen name="Login" component={Login} options={ {headerShown: false,contentStyle:{backgroundColor:COLORS.backgroundColor}}}/>
                <Stack.Screen name="Signup" component={Signup} options={ {headerShown: false,contentStyle:{backgroundColor:COLORS.backgroundColor}}}/>
                <Stack.Screen name="Coursedetails" component={Coursedetails} options={ {headerShown: false,contentStyle:{backgroundColor:COLORS.backgroundColor}}}/>
                <Stack.Screen name="CourseVideoList" component={CourseVideoList} options={ {headerShown: false,contentStyle:{backgroundColor:COLORS.backgroundColor}}}/>
                <Stack.Screen name="HomeTab" component={HomeTab} options={ {headerShown: false,contentStyle:{backgroundColor:COLORS.backgroundColor}}}/>     
                <Stack.Screen name="ComVideo" component={ComVideo} options={ {headerShown: false,contentStyle:{backgroundColor:COLORS.backgroundColor}}}/>           
                <Stack.Screen name="ChangePassword" component={ChangePassword} options={ {headerShown: false,contentStyle:{backgroundColor:COLORS.backgroundColor}}}/>    
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={ {headerShown: false,contentStyle:{backgroundColor:COLORS.backgroundColor}}}/>  
                <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={ {headerShown: false,contentStyle:{backgroundColor:COLORS.backgroundColor}}}/>       
         </Stack.Navigator>
        </NavigationContainer>
  )
}

export default AppNavigation

const styles = StyleSheet.create({})