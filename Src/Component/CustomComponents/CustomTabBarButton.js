import { StyleSheet, Text, TouchableOpacity, View,Animated, Image } from 'react-native'
import { Dimensions, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React,{useRef,useEffect} from 'react'
import Fonts from '../../Util/Fonts';
import { ms, s } from 'react-native-size-matters';
//Custome component for the Bottom bar 
const CustomTabBarButton = props => {
const {children,accessibilityState,onPress} = props;
  let AnimScal = useRef(new Animated.Value(0.01)).current; // Initial 
  console.log("Custome Compoment",children)
  const insets = useSafeAreaInsets();
  const handleAnimationUp = () => {
    AnimScal.setValue(0)
    Animated.timing(AnimScal, {
    toValue: 1,
    duration: 200,
    useNativeDriver: true,
    
  }).start();
  }
  function ButtonPress() {
    onPress();
    accessibilityState.selected ?  handleAnimationUp() : handleAnimationDown()
   
  }
  useEffect(()=>{
    // console.log("insets.bottom",insets.bottom);
    handleAnimationUp()
  },[])
  const handleAnimationDown = () => {
    // console.log(accessibilityState.selected)
    AnimScal.setValue(0)
    Animated.timing(AnimScal, {
    toValue: 1,
    duration: 200,
    useNativeDriver: true,
  }).start();
  }
    if(accessibilityState.selected)
    {
      return (
        <TouchableOpacity style={[styles.activeBtn]} onPress={ButtonPress}>
          <View style={{marginTop:Platform.OS === 'ios' ? ms(insets.bottom < 34 ? 5 : 20) : ms(5)}}>
            {children}
          </View>
          <Image style={{height:ms(14),width:ms(40), position:'absolute',bottom:Platform.OS === 'ios' ? - ms(insets.bottom < 34 ? 0 : 30): -ms(0)}}source={require('../../../assets/Indicators.png')}/>
        </TouchableOpacity>
        
      )
    }
    else 
    {
      return (
        <TouchableOpacity style={[styles.activeBtn]} onPress={ButtonPress}>
          <View style={{marginTop:Platform.OS === 'ios' ? ms(insets.bottom < 34 ? 20 : 20) :  ms(5)}}>
            {children}
          </View>
        </TouchableOpacity>
      )
    }
    
 
  }

export default CustomTabBarButton

const styles = StyleSheet.create({
  activeBtn: {
    flex: 1,
    // position: 'absolute',
    top: 0,
    width: 50,
    // height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
  },
  inactiveBtn: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  

})