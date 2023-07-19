import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import {s, ms} from 'react-native-size-matters';
import React from 'react'
import COLORS from '../Util/Colors'
import Fonts from '../Util/Fonts'
const ComInput = (props) => {
const {lable,password,error,value,editable,Code} = props
const [hidePassword,sethidePassword] = React.useState(password)
  console.log(lable,"------",error)
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{lable}</Text>
       <View style={styles.inputStyle}>
          {!value &&
              <TextInput
              placeholderTextColor="#6D6D78" 
              secureTextEntry={hidePassword}
              autoCorrect={false}
              keyboardType = {lable === 'Code' ? 'number-pad' : 'default'}
              // onFocus={(data) => {
              //   console.log("+++++++++",data)
              // }}
              style={styles.inputText}
              {...props}
            />
          }
          {value &&
            <TextInput
            placeholderTextColor="#6D6D78" 
            secureTextEntry={hidePassword}
            autoCorrect={false}
            value=''
            style={styles.inputText}
            {...props}
          />
          }
          {password && 
          (<View style={styles.hideShowContainer}>
               <TouchableOpacity editable={editable} selectTextOnFocus={editable} style={styles.hideShowbtn} onPress={()=> hidePassword ? sethidePassword(false) : sethidePassword(true)}>
                 <Image style={styles.hideShowbtn} source={hidePassword ? require('../../assets/eye-no.png') : require('../../assets/eye.png')}/>
              </TouchableOpacity>
          </View>)
          }
       </View>
       {error &&
        <Text style={[{...Fonts.FontStyle.SSmallError},{display:error === "" ? 'none' : 'flex'}]}>{error}</Text>
       }
       {/* <Text style={[{...Fonts.FontStyle.SSmallError},{display:error === "" ? 'none' : 'flex'}]}>{error}</Text> */}
    </View>
  )
}

export default ComInput
const styles = StyleSheet.create({
    hideShowContainer:{
      position:'absolute',
      height:'100%',
      alignSelf:'flex-end',
      justifyContent:'center',
      alignItems:'center',
      right:ms(10)
   },
    hideShowbtn:{
      height:ms(24),
      width:ms(24),
    },
    inputStyle:{
      borderColor:COLORS.borderColor,
      borderWidth:ms(1),
      borderRadius:ms(5),
      height:ms(50),
      marginTop:ms(5),
    },
    placeholderTextColor:{
      color:'black'
    },
    inputText:{
      justifyContent:'center',
      height:'100%',
      left:ms(10),
      color:COLORS.black
    },
    container:{
      marginTop:ms(24),
    },
    label:{
       ...Fonts.FontStyle.SSinputTitle,
       

    }
})