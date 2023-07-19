import { StyleSheet, Text, View,SafeAreaView, TouchableOpacity,ActivityIndicator,KeyboardAvoidingView } from 'react-native'
import { CommonActions } from '@react-navigation/native';
import React from 'react'
import ComInput from '../Component/ComInput'
import ComButton from '../Component/ComButton'
import Fonts from '../Util/Fonts'
import COLORS from '../Util/Colors'
import Api from '../Service/Api'
import UesrMob from '../Mobxstate/UesrMob'
import { ms,s } from 'react-native-size-matters'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { justAnAlert } from '../Util/alert'
import metrics from '../Util/Metrics';
import { ScrollView } from 'react-native';


const api = Api.create()
const Login = (props) => {
  const insets = useSafeAreaInsets();
  const [Loding,setLoding] = React.useState(false)
  const [inputs,setInputs] = React.useState({
    email:'',
    password:'',
    erroremail:'',
    errorpassword:''
    
  });
  const handleOnChange = (newtext,inputtxt) => {
    setInputs(preStat => ({...preStat,[inputtxt]:newtext}))
    console.log('inputs',inputs.email)
  };
const GetAccount = async () =>
{console.log(inputs)
  if (isValidate())
  {
    setLoding(true)
    api.authenticate(inputs.email,inputs.password)
      .then((response) => {
        setLoding(false)
      if (response?.ok) {
        console.log("Data Stored in mobx -",response.data)
        UesrMob.updateUserMobx(response.data)
        props.navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [
              { name: 'HomeTab' },
            ],
          })
        );
        // props.navigation.navigate('HomeTab');
      } else {
        justAnAlert("Error",response.data.message)
        console.log("API REJECT",response)
      }
    })
    .catch((err) => {
      setLoding(false)
      reject(err);
    });
  }
  else
  {
    console.log("Login failed")
  }
}
const isEmailValidate = () =>
{
  if (inputs.email.length > 0) {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (reg.test(inputs.email)) {
        handleOnChange('','erroremail')
      } else {
        handleOnChange('Please enter a valid email','erroremail')
        return false;
      }
  } else {
    handleOnChange('Please enter your email','erroremail')
    return false;
  }
}
const isPasswordValidate = () =>
{
  if (inputs.password.length > 0) {
    handleOnChange('','errorpassword')
    return false
    } else {
      handleOnChange('Please enter your password','errorpassword')
      return false;
    }
}
const isValidate = () =>
{
  if (inputs.email.length > 0) {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (reg.test(inputs.email)) {
        handleOnChange('','erroremail')
      } else {
        handleOnChange('Please enter a valid email','erroremail')
        return false;
      }
  } else {
    handleOnChange('Please enter your email','erroremail')
    return false;
  }
  if (inputs.password.length > 0) {
      handleOnChange('','errorpassword')
    } else {
      handleOnChange('Please enter your password','errorpassword')
      return false;
    }
  return true;
}
  return (
    <SafeAreaView>
      <KeyboardAvoidingView>
      <View style={styles.container} >
        <View style={{flex:1}}>
            <View style={{height:ms(20) - insets.top}}></View>
            <View style={{height:'10%'}}>
              <TouchableOpacity style={{width:120,position:'absolute',right:20,margin:ms(10)}} onPress={()=> props.navigation.navigate('Signup')}>
                <Text style={styles.textStyleCreate}>Create Account</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
             keyboardShouldPersistTaps='handled'
            contentContainerStyle={{
            height:metrics.screenHeight - s(metrics.screenHeight/3)
            }}>
            <View style={{paddingHorizontal:20}}>
            <Text style={styles.LoginTitle}>Log In</Text>
            <View style={{height:'10%',marginTop:15}}>
               <Text style={styles.LoginSubTitle}>Please enter your information below {"\n"}in order to login to your account</Text>
            </View>
            <ComInput onBlur={()=>isEmailValidate()} lable={"Email"} error={inputs.erroremail} onChangeText={text => handleOnChange(text,'email')} placeholder={"Enter Your Email"}/>
            <ComInput onBlur={()=>isPasswordValidate()} lable={"Password"} error={inputs.errorpassword} password onChangeText={text => handleOnChange(text,'password')} placeholder={"Enter Your Password"}/>
            <TouchableOpacity onPress={()=> props.navigation.navigate('ForgotPassword')}>
               <Text style={styles.ForgotPass}>Forgot Password?</Text> 
            </TouchableOpacity>
            </View>    
            </ScrollView>
             <View style={{flex:1,marginHorizontal:20}}>
             <ComButton title={"LOGIN"} CustomeStyle={styles.btnContainer} onPress={()=>GetAccount()}/>
             </View>
         
           
        </View>
        {Loding && 
        (<View style={[styles.container1, styles.horizontal]}>
          <ActivityIndicator size="large" />
        </View>)
         }
        {/* <Text>Login</Text> */}
      </View>
      </KeyboardAvoidingView>
  </SafeAreaView>
  )
} 
export default Login

const styles = StyleSheet.create({
  container:{
    height:'100%',
    width:'100%',
  },
  btnContainer:{
    position:'absolute',
    bottom:20,
    width:'100%',
  },
  textStyleCreate:{
    textAlign:'right',
    textDecorationLine: 'underline',
    ...Fonts.FontStyle.SSCreateAccount,
    color:COLORS.black,
    width:ms(140),
    right:ms(15)
  },
  LoginTitle:{
    fontFamily:"poppins",
    alignSelf:'center',
    fontWeight: metrics.FontTitle ,
    fontSize:25,
    color:COLORS.black
  },
  LoginSubTitle:{
    ...Fonts.FontStyle.SSLoginSubTitle,
    textAlign:'center',
  },
  ForgotPass:{
    marginTop:10,
    margin:0,
    textAlign:'right',
    color:COLORS.LoginsubTitle
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
    position:'absolute',
    height:'100%',
    width:'100%'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
})