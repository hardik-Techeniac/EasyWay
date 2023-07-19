import { ActivityIndicator, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import Fonts from '../Util/Fonts';
import COLORS from '../Util/Colors';
import Api from '../Service/Api';
import { UserType, MyCourses } from '../Constant/types';
import { ms } from 'react-native-size-matters';
import CurrentUserObj from '../Mobxstate/CurrentUser';
import metrics from '../Util/Metrics';
import ProgressiveImage from '../Component/progressive-image';

const Home = (props:any) => {
  const api = Api.create()
  const [Loding,setLoding] = React.useState(false)
  let [mycourses,setmycourses] = React.useState<UserType[]>([])
  useEffect(()=>
  {
    setLoding(true)
    GetCourses()
    GetUser()
  },[])
  const GetUser = async () =>
  {
    api.CurrenUserDetail().then((response)=>{
    if(response.ok)
      {
        console.log("---------------------------------",response)
        CurrentUserObj.updateUserMobx(response.data) 
        console.log("------------CurrentUserObj---------------------",CurrentUserObj.user.name)
      }
    }).catch()
  }
  const GetCourses = async () =>
  {
    api.Usercourse().then((response) => {
      if(response) {
        setmycourses(response.mycourses)
        setLoding(false)
      }
  }).catch(()=> setLoding(false))
  }
  const Item = ({data}:any) => (
    <TouchableOpacity onPress={()=>
      props.navigation.navigate('Coursedetails',data)
    }>
    <View style={[styles.StyleCourse,{borderColor:COLORS.textborderColor,borderRadius:5,borderWidth:1,padding:2}]}>
    <ProgressiveImage style={styles.CourceListImage} 
                  uri={`${data.base_url+"/"+data.course_image}`} 
                  resizeMode='contain'/>
      {/* <Image    
      style={{aspectRatio:1/1,marginTop:-1,marginLeft:-2,height:ms(60),width:ms(60),justifyContent:'center',alignSelf:'center',borderRadius:ms(5)}} 
      source={{uri:`${data.base_url+"/"+data.course_image}`}}
      defaultSource={{ uri: 'https://easyway.web-binary.com/front/images/logo-2.jpg' }}
      /> */}
      <View style={{justifyContent:'center'}}>
         {/* <Text numberOfLines={1} style={styles.timelable}>-3hr  15min</Text> */}
         <Text numberOfLines={1} style={styles.courseListName}>{data.course_name}</Text>
      </View>
      <Image style={{height:ms(28),width:ms(28),justifyContent:'center',alignSelf:'center',right:ms(11),position:'absolute'}} source={require('../../assets/Chevron_Right.png')}/>
    </View>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={{flex:1,backgroundColor:COLORS.white}}>
    <View style={{flex:1,backgroundColor:COLORS.backgroundColor}}>
      <View style={{marginHorizontal:ms(24),marginTop:0}}>
          <View style={styles.topView}>
              <Image  style={{height:ms(52),width:ms(52),borderRadius:ms(26)}} source={require('../../assets/Profile.png')}/>
              <View style={{justifyContent:'center',marginTop:6}}>
                <Text style={styles.textGM}>Hello</Text>
                <Text style={styles.textName}>{CurrentUserObj.user.name}</Text>
              </View>
          </View>
           <Text style={styles.CourseTitleName}>Courses</Text>
            <View style={{height:'100%'}}>
              {(mycourses.length > 0) ?
                <FlatList
                 alwaysBounceHorizontal={false}
                  alwaysBounceVertical={false}
                  bounces={false}
                data={mycourses}
                renderItem={({item}) => <Item data={item} />}
                />
                :
                <View style={{height:'50%',justifyContent:'center'}}>
                  <Text style={styles.DataNoFound}>{Loding == false ? "Contact Adiminstrator to obtain courses" : ""}</Text>
                </View>
              }
              
              {Loding && 
                (<View >
                  <ActivityIndicator size="large" />
                </View>)
              }
            </View>
      </View>
    </View>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  topView:{
    marginTop:ms(15),
    width:'100%',
    height:ms(48),
    flexDirection:'row',
  },
  textGM:{
    ...Fonts.FontStyle.SSmallFont,
    color:COLORS.grey,
    marginLeft:ms(15),
    marginBottom:-ms(5)
    // marginTop:18,
  },
  textName:{
    ...Fonts.FontStyle.SSHomeName,
    // marginTop:5,
    fontWeight:metrics.FontTitle,
    marginLeft:ms(15),
    marginTop:ms(2)
  },
  CourseTitleName:{
    ...Fonts.FontStyle.SSCourceTitle,
    marginTop:ms(20),
    fontWeight:metrics.FontTitle,
  },
  searchContainer:{
    borderRadius:ms(5),
    borderColor:COLORS.grey,
    borderWidth:ms(1),
    height:ms(46),
    marginTop:ms(20)
  },
  StyleCourse:{
    height:ms(62),
    marginTop:ms(15),
    flexDirection:'row'
  },
  timelable:{
    ...Fonts.FontStyle.SSmallFont,
    fontWeight:'400',
    marginTop:ms(10),
    left:ms(14)
   },
   courseListName:{
    ...Fonts.FontStyle.courseListName,
    left:ms(10),
    fontWeight:'500',
   },
   DataNoFound:{
    ...Fonts.FontStyle.SSCourceTitle,
    marginTop:ms(5),
    fontWeight:metrics.FontTitle,
    alignSelf:'center',
    justifyContent:'center'
   },
   CourceListImage:{aspectRatio:1/1,marginTop:-1,marginLeft:-2,height:ms(60),width:ms(60),justifyContent:'center',alignSelf:'center',borderRadius:ms(5)}

})