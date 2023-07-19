import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import COLORS from '../Util/Colors'
import Fonts from '../Util/Fonts'

const ComButton = (props) => {
    const {title,CustomeStyle,disabled} = props
  return (
    <TouchableOpacity 
    style={[styles.combtn,CustomeStyle,disabled && styles.btnDisabled]}
    {...props}
    disabled={disabled}>
        <Text style={[styles.title]}>{title}</Text>
    </TouchableOpacity>
  )
}

export default ComButton

const styles = StyleSheet.create({
    combtn:{
        height:56,
        backgroundColor:COLORS.btnGreen,
        borderRadius:5,
    },
    title:{
        ...Fonts.FontStyle.SSBtntitle,
    },
    btnDisabled:{
        opacity:0.7
    }
})