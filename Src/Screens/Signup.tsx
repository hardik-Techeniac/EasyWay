import { StyleSheet, Text, View,SafeAreaView, TouchableOpacity, Image, TouchableWithoutFeedback, ScrollView,Alert, KeyboardAvoidingView, Platform } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import React, { useState } from 'react'
import ComInput from '../Component/ComInput'
import ComButton from '../Component/ComButton'
import Fonts from '../Util/Fonts'
import COLORS from '../Util/Colors'
import Api from '../Service/Api'
import { ms, s, vs } from 'react-native-size-matters'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { justAnAlert } from '../Util/alert'
import metrics from '../Util/Metrics'
const api = Api.create()
const Signup = (props:any) => {
 const insets = useSafeAreaInsets();
  const [Checked,SetChecked] = React.useState(false)
  const [Loding,setLoding] = React.useState(false)
  const [buttonDisabled,setbuttonDisabled] = React.useState(false)
  const [inputs,setInputs] = React.useState({
    email:'',
    username:'',
    password:'',
    cpassword:'',
    contactno:'',
  });
  const [errinputs,seterrInputs] = React.useState({
    erremail:'',
    errcpassword:'',
    errcontactno:'',
    errpassword:'',
    errusername:''
  });
  const handleOnChange = (newtext:String,inputtxt: any) => {
    setInputs(preStat => ({...preStat,[inputtxt]:newtext}))
    console.log('inputs',inputs)
  };
  const handleOnChangeError = (newtext:String,inputtxt: any) => {
    seterrInputs(preStat => ({...preStat,[inputtxt]:newtext}))
    console.log('handleOnChangeError',inputs)
  };
  //Performing all Api call for register user
const SubmitUser = async () =>
{
  let isvalid = isValidate()
  if(isvalid)
  {
    SetChecked(false)
    api.userRegister(inputs)
      .then((response) => {
        setLoding(false)
      if (response?.ok) {
          Alert.alert('Registration Succsesfull', 'Your account has been successfully created with us. Welcome aboard!', [
            {text: 'OK', onPress: () => props.navigation.goBack()},
          ]);
      } else {
        SetChecked(true)
        justAnAlert("Already Registered",response.data.message)
      }
    })
    .catch((err) => {
      
    });
  }
}

const isNameValid = () =>
{
  if (inputs.username.length > 0) {
    console.log('true')
    handleOnChangeError('','errusername')
  } else {
    console.log('else')
    handleOnChangeError('Please enter your name','errusername')
    return false;
  }
}
const isEmailValid = () =>
{
  if (inputs.email.length > 0) {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (reg.test(inputs.email)) {
        handleOnChangeError('','erremail')
      } else {
        handleOnChangeError('Please enter a valid email','erremail')
        return false;
      }
  } else {
    handleOnChangeError('Please enter your email','erremail')
    return false;
  }
}
const isContactnoValid = () =>
{
  if (inputs.contactno.length > 0) {
    const reg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
      if (reg.test(inputs.contactno)) {
        handleOnChangeError('','errcontactno')
      } else {
        handleOnChangeError('Invalid phone no','errcontactno')
        return false;
      }
    handleOnChangeError('','errcontactno')
  } else {
    handleOnChangeError('Please enter your number','errcontactno')
    return false;
  }
}
const isPasswordValid = () =>
{
  if (inputs.password.length > 0) {
    handleOnChangeError('','errpassword')
    const reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{8,}$/;
      if (reg.test(inputs.password)) {
        handleOnChangeError('','errpassword')
      } else {
        handleOnChangeError('8 characters 1 alphabet,1 digit,no space','errpassword')
        return false;
      }
  } else {
    handleOnChangeError('Please enter your password','errpassword')
    return false;
  }
}
const iSCpasswordValid = () =>
{
  if(inputs.password === inputs.cpassword)
  {
    handleOnChangeError('','errcpassword')
  }
  else
  {
    handleOnChangeError('Password not matched','errcpassword')
    return false;
  }
}
//performing all validation Register
const isValidate = () =>
{
  if (inputs.username.length > 0) {
    console.log('true')
    handleOnChangeError('','errusername')
  } else {
    console.log('else')
    handleOnChangeError('Please enter your name','errusername')
    return false;
  }
  if (inputs.email.length > 0) {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (reg.test(inputs.email)) {
        handleOnChangeError('','erremail')
      } else {
        handleOnChangeError('Please enter a valid email','erremail')
        return false;
      }
  } else {
    handleOnChangeError('Please enter your email','erremail')
    return false;
  }
  if (inputs.contactno.length > 0) {
    const reg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
      if (reg.test(inputs.contactno)) {
        handleOnChangeError('','errcontactno')
      } else {
        handleOnChangeError('Invalid phone no','errcontactno')
        return false;
      }
    handleOnChangeError('','errcontactno')
  } else {
    handleOnChangeError('Please enter your number','errcontactno')
    return false;
  }
  if (inputs.password.length > 0) {
    handleOnChangeError('','errpassword')
    const reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{8,}$/;
      if (reg.test(inputs.password)) {
        handleOnChangeError('','errpassword')
      } else {
        handleOnChangeError('8 characters 1 alphabet,1 digit,no space','errpassword')
        return false;
      }
  } else {
    handleOnChangeError('Please enter your password','errpassword')
    return false;
  }
  if (inputs.cpassword.length > 0) {
      handleOnChangeError('','errcpassword')
    } else {
      handleOnChangeError('Please enter your confirm password','errcpassword')
      return false;
    }
  if(inputs.password === inputs.cpassword)
  {
    handleOnChangeError('','errcpassword')
  }
  else
  {
    handleOnChangeError('Password not matched','errcpassword')
    return false;
  }
  return true;
}
  return (
    <SafeAreaView >
        <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
    <View style={styles.container} >
      <View style={{flex:1}}>
        <View style={{height:ms(40) - insets.top}}></View>
          <ScrollView
             keyboardShouldPersistTaps='handled'  
            contentContainerStyle={{
            height:metrics.screenHeight + s(90)
          }}>
          <View style={{paddingHorizontal:vs(20)}}>
            <TouchableOpacity style={{height:ms(40),width:ms(40),zIndex:1000,marginTop:0}} onPress={()=> props.navigation.goBack()}>
                    <Image style={styles.btnBackStyle}source={require('../../assets/Back.png')}></Image>
                </TouchableOpacity>
                <Text style={styles.LoginTitle}>Sign Up</Text>
                <View style={{height:'6%',marginTop:ms(15)}}>
                  <Text style={styles.LoginSubTitle}>Please enter your information below {"\n"}in order to login to your account</Text>
                </View>
                <ComInput lable={"Name"}  onBlur={ () => {isNameValid()} } error={errinputs.errusername} onChangeText={(text:string) => handleOnChange(text,'username')} placeholder={"Enter Your Name"}/>
                <ComInput lable={"Email"} onBlur={()=>isEmailValid()} error={errinputs.erremail} onChangeText={(text:string) => handleOnChange(text,'email')} placeholder={"Enter Your Email"}/>
                <ComInput lable={"Phone"} onBlur={()=>isContactnoValid()} error={errinputs.errcontactno} onChangeText={(text:string) => handleOnChange(text,'contactno')} placeholder={"Enter Your Phone"}/>
                <ComInput lable={"Password"} onFocus={()=>{}} onBlur={()=>isPasswordValid()} error={errinputs.errpassword} password onChangeText={(text:string) => handleOnChange(text,'password')} placeholder={"Enter Your Password"}/>
                <ComInput lable={"Confirm Password"} onBlur={()=>iSCpasswordValid()} error={errinputs.errcpassword} password onChangeText={(text:string) => handleOnChange(text,'cpassword')} placeholder={"Confirm Your Password"}/>
                <View style={{height:ms(40)}}></View>
                <View style={[styles.btnContainer,{backgroundColor:COLORS.white}]}>
                  <View style={{marginBottom:5,flexDirection:'row'}}>
                  <TouchableOpacity style={{height:ms(20),width:ms(20),justifyContent:'center'}} onPress={()=> Checked ? SetChecked(false) : SetChecked(true)}>
                        <Image style={{height:ms(18),width:ms(18)}}
                        source={Checked ? require('../../assets/checked.png') : require('../../assets/unchecked.png')}></Image>
                      </TouchableOpacity>
                      <Text style={{marginRight:ms(5),width:'85%'}}>
                        <Text style={styles.notes}>  I agree to the </Text>
                        <TouchableWithoutFeedback onPress={()=>console.log("Terms & Conditions")}><Text style={styles.textgreen}>Terms & Conditions</Text></TouchableWithoutFeedback>
                        <Text style={styles.notes}> and </Text>
                        <TouchableWithoutFeedback onPress={()=>console.log("Privacy Policy")} ><Text style={styles.textgreen}>Privacy Policy.</Text></TouchableWithoutFeedback>
                      </Text>
                  </View>
                  <View style={{marginTop:10}}><ComButton disabled={!Checked} title={"REGISTER"}onPress={()=>SubmitUser()}/></View>
                </View>
                <View style={{height:ms(40)}}></View>
          </View>
          </ScrollView>          
      </View>
      {/* <Text>Login</Text> */}
    </View>
    </KeyboardAvoidingView>
  </SafeAreaView>
  )
}
export default Signup

const styles = StyleSheet.create({
  notes:{
    fontSize:s(12),
    // ...Fonts.FontStyle.SSmallFont
  },
  textgreen:{
    color:COLORS.textGreen,
    ...Fonts.FontStyle.SSOnlyFont,
    fontSize:s(11)
  },
  btnBackStyle:{
    height:ms(40),
    width:ms(40),
 },
  container:{
    height:'100%',
    width:'100%',
    // paddingHorizontal:vs(20),
    backgroundColor:COLORS.backgroundColor
  },
  btnContainer:{
    // position:'absolute',
    bottom:ms(0),
    width:'100%',
  },
  LoginTitle:{
    ...Fonts.FontStyle.SSLoginTitle,
    alignSelf:'center',
    fontWeight:metrics.FontTitle,
    marginTop:-ms(40),
  },
  LoginSubTitle:{
    ...Fonts.FontStyle.SSLoginSubTitle,
    textAlign:'center',
  },
  ForgotPass:{
    margin:ms(10),
    textAlign:'right',
    color:COLORS.LoginsubTitle
  }
})