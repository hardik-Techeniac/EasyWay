import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { CommonActions } from '@react-navigation/native';
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ms, vs } from 'react-native-size-matters';
import COLORS from '../Util/Colors';
import Fonts from '../Util/Fonts';
import ComInput from '../Component/ComInput';
import ComButton from '../Component/ComButton';
import Api from '../Service/Api';
import { ApiCall, justAnAlert } from '../Util/alert';
import metrics from '../Util/Metrics';
const ChangePassword = (props:any) => {
 const {params}= props.route
 const insets = useSafeAreaInsets();
 const [inputs,setInputs] = React.useState({
  password:'',
  cpassword:'',
  code:'',
  errpassword:'',
  errcpassword:'',
  errcode:'',
});
    const handleOnChange = (newtext:String,inputtxt:String) => {
      setInputs(preStat => ({...preStat,[inputtxt]:newtext}))
    };
    function PasswordResetSuccess()
    {
      Alert.alert('Password Reset', 'Your password change successful', [
        {text: 'OK', onPress: () => {
          Reset()
        }},
      ]);
    }
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
    function resetpassword()
    {
      if(isValidate(inputs))
      {
        if (inputs.code.length > 0) {
          handleOnChange('','errcode')
        }
        else 
        {
          handleOnChange('Please Enter Code','errcode')
          return false;
        }
        ApiCall.ResetPassword(inputs).then((Response)=>{
          console.log("resetpassword",Response)
          if(Response.ok)
          {
            PasswordResetSuccess()
          }
          else
          {
            justAnAlert("Error","Your code is Wrong")
          }
        })
      } 
    } 
    function changePassword()
    {
      if(isValidate(inputs))
      {
        ApiCall.ChangePassword(inputs).then((Response)=>{
           console.log("changePassword",Response)
          if(Response.ok)
          {
            justAnAlert("Password Changes","Your password changes successfully") 
          }
          else
          {
            justAnAlert("Error","Somethig went wrong")
          }
        })
      } 
    }
    const isValidate = ({password,cpassword}:any) =>
    {
        if (password.length > 0) {
          handleOnChange('','errpassword')
        }
        else 
        {
          handleOnChange('Enter your password','errpassword')
          return false;
        }
        if (cpassword.length > 0) {
          handleOnChange('','errcpassword')
        }
        else 
        {
          handleOnChange('Enter confirm password','errcpassword')
          return false;
        }
        if(password === cpassword)
        {
          handleOnChange('','errcpassword')
        }
        else
        {
          handleOnChange('Password not matched','errcpassword')
          return false;
        }
       
        return true;
    }
  return (
      <SafeAreaView>
         <View style={styles.container}>
          <ScrollView 
          keyboardShouldPersistTaps='handled'
          automaticallyAdjustKeyboardInsets={true}>
            <View style={{marginTop:15}}>
            <TouchableOpacity style={{height:40}} onPress={()=> props.navigation.goBack()}>
                <Image style={styles.btnBackStyle}source={require('../../assets/Back.png')}></Image>
            </TouchableOpacity>
           </View>
            <Text style={styles.TitleText}>Create new password</Text>
            <Text style={styles.SubTitleText}>Your new password must be diffrent from previuos </Text>
            <ComInput lable={"Password"} error={inputs.errpassword} password onChangeText={(text: String) => handleOnChange(text,'password')} placeholder={"Enter Your Password"}/>
            <ComInput lable={"Confirm Password"} error={inputs.errcpassword} password onChangeText={(text: String) => handleOnChange(text,'cpassword')} placeholder={"Enter Your Password"}/>
            <View style={{display:params === 'ProfileScreen' ? 'none' : 'flex'}}>
              <ComInput lable={"Code"} Code error={inputs.errcode} onChangeText={(text: String) => handleOnChange(text,'code')} placeholder={"Enter the code recived by Email"}/>
            </View>
            <View style={{height:30}}></View>
          </ScrollView>
        <ComButton title={"Change Password"} CustomeStyle={styles.btnContainer} onPress={()=> params === 'ProfileScreen' ? changePassword() : resetpassword()}/>
       </View>
      </SafeAreaView>
  )
}

export default ChangePassword

const styles = StyleSheet.create({
  container:{
    height:'100%',
    width:'100%',
    paddingHorizontal:vs(20),
    backgroundColor:COLORS.backgroundColor
  },
  btnBackStyle:{
    height:ms(40),
    width:ms(40),
 },
 TitleText:{
  ...Fonts.FontStyle.SSOnlyFont,
  fontSize:ms(26),
  fontWeight:metrics.FontTitle,
  lineHeight:ms(28),
  marginTop:ms(25),
  color:COLORS.black
 },
 SubTitleText:{
  ...Fonts.FontStyle.SSOnlyFont,
  fontSize:ms(14),
  fontWeight:'400',
  lineHeight:ms(26),
  marginTop:ms(0)
 },
 btnContainer:{
  position:'absolute',
  bottom:20,
  width:'100%',
  alignSelf:'center'
},
})