import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { CommonActions } from '@react-navigation/native';
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import COLORS from '../Util/Colors'
import Fonts from '../Util/Fonts'
import ComInput from '../Component/ComInput'
import {launchImageLibrary} from 'react-native-image-picker';
import { ms, s } from 'react-native-size-matters'
import Api from '../Service/Api'
import UesrMob1 from '../Mobxstate/UesrMob'
import { justAnAlert } from '../Util/alert'
import CurrentUser from '../Mobxstate/CurrentUser'
import { CurrentUserType } from '../Constant/types'
import metrics from '../Util/Metrics';
const ProfileScreen = (props:any) => {
    const CuUser = CurrentUser.user as CurrentUserType
    const api = Api.create()
    const [ImageUrl,setImageUrl] = React.useState('')
    const [isDisplayDeletepopup,setDeletepopup] = useState(false)
    const [isDisplayLogoutpopup,setLogoutpopup] = useState(false)

    const ImagePicker = async () =>
    {
        launchImageLibrary({},async (response:any) =>
        {
            setImageUrl(response.assets[0].uri)
        })
    }
    
    const [inputs,setInputs] = React.useState({
      password:'',
    });
    const handleOnChange = (newtext:String,inputtxt:String) => {
      setInputs(preStat => ({...preStat,[inputtxt]:newtext}))
    };
   
function Reset()
    {
      props.navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            { name: 'Login' },
          ],
        })
      );
    }
    function DeleteAccout() {
      api.DeleteUser(inputs).then((Response)=>
       {
        console.log("Delte - Response",Response)
        if(Response.ok)
        {
            setDeletepopup(false)
            setLogoutpopup(false)
            UesrMob1.removeUserMobx()
            CurrentUser.removeUserMobx()
            Reset()
        }
        else 
        {
          justAnAlert("Error",Response.data.message)
        }
       }
      ).catch()
      // justAnAlert("TEst","hiiii")
    }
    function LogoutUser()
    {
       
      let res = api.userLogut().then((res)=>{
        console.log(res)
        if(res.ok)
        {
            setLogoutpopup(false)
            UesrMob1.removeUserMobx()
            CurrentUser.removeUserMobx()
            Reset()
        }
        else
        {
            setLogoutpopup(false)
            justAnAlert("Error",`${res.data.message}`)
        }
      }).catch((err)=>
      console.log("Error")
      )
    }
  return (
    <SafeAreaView style={{flex:1,backgroundColor:COLORS.white}}>
        <View style={{height:"100%",width:'100%',backgroundColor:COLORS.white,paddingHorizontal:20}}>
            <View style={{height:50,justifyContent:'center'}}>
                <Text style={styles.ScreenTitleName}>Profile</Text>
                <TouchableOpacity style={{position:'absolute',right:0}} onPress={()=> setDeletepopup(true)}>
                    <Image style={{height:24,width:24,justifyContent:'center'}}source={require('../../assets/delete.png')}></Image>
                </TouchableOpacity>
            </View>
            <View style={{height:ms(120),width:'100%',justifyContent:'center',alignItems:'center'}}>
                <View style={{height:100,width:100,alignItems:'center',justifyContent:'center'}}>
                    <Image style={[styles.ImagePickStyle]}
                    source={ImageUrl == "" ? require('../../assets/Profile.png') : {uri:ImageUrl}}
                    ></Image>
                    <TouchableOpacity style={{position:'absolute',right:5,bottom:5}} onPress={()=> ImagePicker()}>
                        <Image style={{height:24,width:24,justifyContent:'center',resizeMode: 'contain',}}source={require('../../assets/EditImage.png')}></Image>
                    </TouchableOpacity>
                </View>
            </View>
            {/* <View style={{height:1,width:'100%',backgroundColor:'red'}}></View> */}
            <ComInput lable={"Name"} value={`${CuUser.name}`} editable={false} placeholder={"Enter Your Name"}/>
            <ComInput lable={"Email or Phone"} value={CuUser.email} editable={false} placeholder={"Enter Your Name"}/>
            <View style={{flexDirection:'row',height:44,marginTop:15}}>
                <TouchableOpacity style={[styles.Logoutbtn,{right:0}]} onPress={()=>setLogoutpopup(true)}>
                     <Text style={styles.LogoutText}>Logout</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={[styles.Logoutbtn,{left:0}]} onPress={()=> props.navigation.navigate('ChangePassword',props.route.name)}>
                  <Text style={styles.LogoutText}>Change Password</Text>
                 </TouchableOpacity>

            </View>
          {/* Model for the Logout Poppup */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={isDisplayLogoutpopup}
                onRequestClose={() => {
                }}>
                <View style={[styles.centeredView]}>
                    <View style={{height:150,backgroundColor:COLORS.white,width:'80%',borderRadius:5,justifyContent:'center'}}>
                     <Text style={[styles.popupTitle,{marginTop:0}]}>Are you sure?</Text>
                      <View style={{marginTop:15,height:55,width:'100%',justifyContent:'space-evenly',flexDirection:'row',padding:8}}>
                        <TouchableOpacity style={[{backgroundColor:'white',width:'40%',height:'100%'},styles.shadow]} onPress={()=>{
                          setLogoutpopup(false)
                        }}>
                         <Text style={[styles.popupbtnText,{color:COLORS.black}]}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[{backgroundColor:'red',width:'40%',height:'100%',alignItems:'center'},styles.shadow]} onPress={()=>LogoutUser()}>
                            <Text style={[styles.popupbtnText,{color:COLORS.white}]}>Logout</Text>
                        </TouchableOpacity>
                      </View>  
                    </View>
                </View>
            </Modal>
             {/* Model for the Delete Poppup */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={isDisplayDeletepopup}
                onRequestClose={() => {
                }}>
                <View style={styles.centeredView}>
                    <View style={{height:250,backgroundColor:COLORS.white,width:'85%',borderRadius:5,marginTop:-50}}>
                     <Text style={styles.popupTitle}>Delete Account</Text>
                     <View style={{height:40,marginTop:0}}>
                         <Text style={styles.LoginSubTitle}>You’ll permanently lose {"\n"}your account</Text>
                    </View>
                    <View style={{height:50}}>
                      <View style={{marginTop:-20,marginHorizontal:20}}>
                        <ComInput lable={"Password"} password onChangeText={text => handleOnChange(text,'password')} placeholder={"Enter Your Password"}/>
                      </View>
                    </View>
                      <View style={{position:'absolute',bottom:20,height:55,width:'100%',justifyContent:'space-evenly',flexDirection:'row',padding:8}}>
                        <TouchableOpacity style={[{backgroundColor:'white',width:'40%',height:'100%'},styles.shadow]} onPress={()=> setDeletepopup(false)}>
                            <Text style={[styles.popupbtnText,{color:COLORS.black}]}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[{backgroundColor:'red',width:'40%',height:'100%',alignItems:'center'},styles.shadow]}
                         onPress={()=> DeleteAccout()}>
                            <Text style={[styles.popupbtnText,{color:COLORS.white}]}>Delete</Text>
                        </TouchableOpacity>
                      </View>  
                    </View>
                </View>
            </Modal>
            
        </View>
    </SafeAreaView>
  )
}
export function Reset()
{
  props.navigation.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [
        { name: 'Login' },
      ],
    })
  );
}
export default ProfileScreen

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#0000005E'
      },
    ImagePickStyle:{
        height:90,
        width:90,
        borderRadius:45
    },
    btnBackStyle:{
        height:40,
        width:40,
     },
     ScreenTitleName:{
        ...Fonts.FontStyle.SScreenMainTitle,
        marginTop:10,
        fontWeight:'600',
        position:'absolute',
        justifyContent:'center',
        alignSelf:'center'
      },
      popupTitle:{
        ...Fonts.FontStyle.SSOnlyFont,
        fontSize:18,
        fontWeight:metrics.FontTitle,
        textAlign:'center',
        marginTop:16,
        color:COLORS.black
      },
      LoginSubTitle:{
        ...Fonts.FontStyle.SSLoginSubTitle,
        textAlign:'center',
        lineHeight:20
      },
      button: {
        height:45,
        width:85,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 50,
        paddingRight: 50,
        backgroundColor: 'red',
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.8,
        elevation: 6,
        shadowRadius: 15 ,
        shadowOffset : { width: 1, height: 13},
      },
      ButtonText:{
        ...Fonts.FontStyle.SSOnlyFont,
     },
      space:{
        width:40
      },
      Logoutbtn:{
        position:'absolute',width:'48%',backgroundColor:COLORS.btnGreen,height:44,borderRadius:5,alignItems:'center',justifyContent:'center'
      },
      LogoutText:{
        ...Fonts.FontStyle.SSOnlyFont,
        fontSize: s(14),
        fontWeight:metrics.FontTitle,
        alignSelf:'center',
        justifyContent:'center',
        color:COLORS.white
      },
      popupbtnText:{
        ...Fonts.FontStyle.SSOnlyFont,
        fontSize: s(16),
        fontWeight:'400',
        textAlign:'center',
        lineHeight:40,
      },
      shadow: {  
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0.5 },
        shadowOpacity: 0.8,
        shadowRadius: 1,  
        elevation: 5,
      }
})