import { ActivityIndicator, FlatList, Image, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect } from 'react'
import COLORS from '../Util/Colors'
import Fonts from '../Util/Fonts'
import { chapter, content } from '../Constant/types'
import Api from '../Service/Api'
import { videoUrl } from '../Constant/Constat'
import { ms } from 'react-native-size-matters'
import metrics from '../Util/Metrics'
const CourseVideoList = (props:any) => {
  const [Loding,setLoding] = React.useState(false)
  const [contents,setcontents] = React.useState<content[]>([]) 
  const api = Api.create()
  const {route} = props
  const {params} = route
  const chapterobj = params.chapter as chapter
  useEffect(()=>
  { 
    setLoding(true)
    console.log("params--+",params.Banner)
    console.log(chapterobj.slug)
    console.log(params.course_slug)
    GetCourses(params.course_slug+"/"+chapterobj.slug)
  },[])
  const GetCourses = async (course_slug:String) =>
  {
    api.GetSinglechapter(course_slug).then((response) => {
      console.log('response1')
      if(response) {
        setLoding(false)
        console.log(response.chapter.contents)
        setcontents(response.chapter.contents)
      }
  }).catch()
  }
  const Item = (contents:content) => (
    <TouchableOpacity onPress={()=> 
     props.navigation.navigate('ComVideo',videoUrl+contents.file_name)
    }>
    <View style={[styles.StyleCourse,{borderColor:COLORS.textborderColor,borderRadius:5,borderWidth:1,padding:2}]}>
      <Image style={styles.CourseImageStyle} source={{uri:"https://easyway.web-binary.com/front/images/logo-2.jpg"}}/>
      <View style={{justifyContent:'center'}}>
         <Text numberOfLines={2} style={styles.timelable}>{contents.title}</Text>
      </View>
      <Image style={{height:24,width:24,justifyContent:'center',alignSelf:'center',right:20,position:'absolute'}} source={require('../../assets/Play.png')}/>
    </View>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView>
     <View style={styles.container} >
      <View style={{flex:1}}>
          <View style={{marginTop:15}}>
            <Text style={styles.ScreenTitleName}>{chapterobj.name}</Text>
            <TouchableOpacity style={{height:40}} onPress={()=> props.navigation.goBack()}>
                <Image style={styles.btnBackStyle}source={require('../../assets/Back.png')}></Image>
            </TouchableOpacity>
          </View>
          <View style={{width:'100%',height:ms(140),marginTop:ms(25),borderRadius:5}}>
            <Image resizeMode={'stretch'} style={{height:'100%',borderRadius:ms(5),width:'100%',justifyContent:'center',alignSelf:'center',position:'absolute'}} 
            source={{uri:params.Banner}}/>
            <Text style={styles.videoCountlable}>{`${contents.length} Lectures`}</Text>
          </View> 
          <Text style={styles.CourseTitleName}>Lecturers</Text>
          {Loding ?
            <View style={{flex:1,justifyContent:'center'}}>
            <ActivityIndicator size="large" color="#00ff00" />
           </View>
           :
           <FlatList
            alwaysBounceHorizontal={false}
            alwaysBounceVertical={false}
            bounces={false}
            data={contents}
            renderItem={({item}) => <Item {...item} />}
            keyExtractor={item => item.id}
          />
          }
      </View>
    </View>
  </SafeAreaView>
  )
}

export default CourseVideoList

const styles = StyleSheet.create({
  
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    backgroundColor:'#0000005E',
  },
  btnBackStyle:{
    height:40,
    width:40,
    marginTop:5
 },
  container:{
    height:'100%',
    width:'100%',
    paddingHorizontal:20,
    backgroundColor:COLORS.backgroundColor,
  },
  ScreenTitleName:{
    ...Fonts.FontStyle.SScreenMainTitle,
    marginTop:10,
    fontWeight:metrics.FontTitle,
    position:'absolute',
    justifyContent:'center',
    alignSelf:'center'
  },
  StyleCourse:{
    height:ms(62),
    marginTop:ms(15),
    flexDirection:'row'
  },
  timelable:{
    ...Fonts.FontStyle.SSOnlyFont,
    fontSize:14,
    fontWeight:'500',
    left:ms(10),
    color:COLORS.black
   },
  CourseTitleName:{
    ...Fonts.FontStyle.SSCourceTitle,
    marginTop:ms(25),
    marginBottom:ms(15),
    fontWeight:metrics.FontTitle,
  },
  CourseImageStyle:{
    height:ms(50),width:ms(50),justifyContent:'center',alignSelf:'center',marginLeft:0
  },
  videoCountlable:
  {
    ...Fonts.FontStyle.SSCourceTitle,
    fontSize:20,
    fontWeight:'400',
    left:20,
    color:'white',
    position:'absolute',
    bottom:10
  },
})