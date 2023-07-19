import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Home from './Home'
import Coursedetails from './Coursedetails'
import CustomTabBarButton from '../Component/CustomComponents/CustomTabBarButton';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CourseVideoList from './CourseVideoList';
import ProfileScreen from './ProfileScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ms, s } from 'react-native-size-matters';
import metrics from '../Util/Metrics';
const HomeTab = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator  screenOptions={({ route }) => ({
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel:false,
        tabBarStyle:styles.tabbarStyle,
        tabBarActiveBackgroundColor:'pink',
        tabBarInactiveBackgroundColor:'green',
        
      })} initialRouteName="Home">
        <Tab.Screen name="Home" component={Home}  options={{tabBarIcon:({focused})=>{return(<Image style={{height:30,width:30}}
        source={focused ? require('../../assets/House.png'):require('../../assets/House-Selected.png')}/>)}
          ,headerShown:false,tabBarButton:props=> <CustomTabBarButton {...props}/>}}/>
        <Tab.Screen name="ProfileScreen" component={ProfileScreen} options={{tabBarIcon:({focused})=>{return(<Image style={{height:30,width:30}} 
        source={focused ? require('../../assets/UserCircle-Selected.png') : require('../../assets/UserCircle.png')}/>)}
          ,headerShown:false,tabBarButton:props=> <CustomTabBarButton {...props}/>}}/>
        
      </Tab.Navigator>  
   
  )
}

export default HomeTab

const styles = StyleSheet.create({
    tabbarStyle:{
        height:s(80),
        backgroundColor:'white',
        position:'absolute',
        bottom:0,
        borderTopWidth:0,
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        
      shadowOpacity: metrics.DeviceOS == 'ios' ? 0.10 : 0.20,
      shadowRadius: 16.0,
      elevation: 25,
    
      }
})