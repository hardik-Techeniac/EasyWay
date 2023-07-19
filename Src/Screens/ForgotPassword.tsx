import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { ms, vs } from 'react-native-size-matters'
import COLORS from '../Util/Colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Fonts from '../Util/Fonts';
import ComInput from '../Component/ComInput';
import ComButton from '../Component/ComButton';
import Api from '../Service/Api';
import { justAnAlert } from '../Util/alert';
import metrics from '../Util/Metrics';
const ForgotPassword = (props:any) => {

  const api = Api.create()
  const insets = useSafeAreaInsets();
  const [inputs,setInputs] = React.useState({
    email:'',
    erremail:'',
  });
  const handleOnChange = (newtext:String,inputtxt:String) => {
    setInputs(preStat => ({...preStat,[inputtxt]:newtext}))
  };
  useEffect(()=>{
    setInputs({email:'',
    erremail:''})
  },[])
  function SendEmail(data:any)
  {
    if(isValidate(data))
    {

      console.log("----------",data)
      api.ForgotPassword(inputs).then((response)=>
      {
        if(response.ok)
        {
          props.navigation.navigate('ChangePassword')   
        }
        else 
        {
          console.log(response)
          justAnAlert("Error",response.data.message)
        }
      }
      ).catch((error)=>
        console.log("Respost",error)
      )
    }
  }
const isValidate = ({email}:any) =>
{
  if (email.length > 0) {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (reg.test(email)) {
        handleOnChange('','erremail')
      } else {
        handleOnChange('Please enter a valid email','erremail')
        return false;
      }
  } else {
    handleOnChange('Please enter your email','erremail')
    return false;
  }
  return true;
}
  return (
    <SafeAreaView>
    <View style={styles.container}>
         <View style={{marginTop:15}}>
            <TouchableOpacity style={{height:40}} onPress={()=> props.navigation.goBack()}>
                <Image style={styles.btnBackStyle}source={require('../../assets/Back.png')}></Image>
            </TouchableOpacity>
          </View>
        <Text style={styles.TitleText}>Reset password</Text>
        <Text style={styles.SubTitleText}>Enter the email associated with your account and we’ll send an email with instructions to reset your password </Text>
        <ComInput lable={"Email"} error={inputs.erremail} onChangeText={text => handleOnChange(text,'email')} placeholder={"Enter Your Username"}/>
        <ComButton title={"Send instructions"} CustomeStyle={styles.btnContainer} onPress={()=> SendEmail(inputs)}/>
    </View>
    </SafeAreaView>
  )
}

export default ForgotPassword

const styles = StyleSheet.create({
  btnBackStyle:{
    height:ms(40),
    width:ms(40),
 },
  container:{
    height:'100%',
    width:'100%',
    paddingHorizontal:vs(20),
    backgroundColor:COLORS.backgroundColor
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
    marginTop:ms(0),
   },
   btnContainer:{
    position:'absolute',
    bottom:20,
    width:'100%',
    alignSelf:'center'
  },
})