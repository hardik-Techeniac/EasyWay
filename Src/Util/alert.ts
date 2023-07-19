import { Alert } from "react-native";
import Api from "../Service/Api";

export const ApiCall = Api.create()

export const justAnAlert = (Title:String,Description:String) => {
    Alert.alert(`${Title}`, `${Description}`, [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
 };