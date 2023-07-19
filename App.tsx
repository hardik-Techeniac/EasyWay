import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './Src/Screens/Login';
import Signup from './Src/Screens/Signup';
import SplashScr from './Src/Screens/SplashScr';
import Coursedetails from './Src/Screens/Coursedetails';
import CourseVideoList from './Src/Screens/CourseVideoList';
import HomeTab from './Src/Screens/HomeTab';
import ChangePassword from './Src/Screens/ChangePassword';
import ForgotPassword from './Src/Screens/ForgotPassword';
import ProfileScreen from './Src/Screens/ProfileScreen';
import Home from './Src/Screens/Home';
import ComVideo from './Src/Component/CustomComponents/ComVideo';
import COLORS from './Src/Util/Colors';
const Stack = createNativeStackNavigator();
const App = () => {
  return (
   <View style={{flex:1,backgroundColor:COLORS.btnGreen}}>
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
   </View>
  )
}

export default App

const styles = StyleSheet.create({})