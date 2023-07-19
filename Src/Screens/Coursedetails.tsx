import { ActivityIndicator, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import COLORS from '../Util/Colors'
import Fonts from '../Util/Fonts'
import Api from '../Service/Api'
import { ChaptersObj, chapter } from '../Constant/types'
import { ms } from 'react-native-size-matters'
import metrics from '../Util/Metrics'

const Coursedetails = (props:any) => {
  const [Loding,setLoding] = React.useState(false)
  const [chapters,setchapters] = React.useState<chapter[]>([]) 
   const [course_slug,setcourse_slug] = React.useState('')
  const [videocount,setvideocount] = React.useState(0)
  const [chaptercount,setchaptercount] = React.useState(0)
  const api = Api.create()
  const {route} = props
  const {params} = route
  var i = 1
  useEffect(()=>
  {
      setLoding(true)
      setcourse_slug(params.course_slug)
      GetCourses(params.course_slug)
  },[])
    //API calling and manage the response
  const GetCourses = async (course_slug:String) =>
  {
    api.Getchapters(course_slug).then((response) => {
      // console.log("Get Response Getchapters",response)
      if(response) {
        var Videocount = 0
        setchapters(response.chapters)
        response.chapters.forEach((data,index)=>{
          Videocount = Videocount + data.contents.length
        })
        setchaptercount(response.chapters.length)
        setvideocount(Videocount)
        setLoding(false)
        console.log('Videocount', Videocount)
      }
      // setmycourses(response.data.mycourses)
  }).catch()
  } 
  const Item = (chapter:chapter) => (
    <TouchableOpacity onPress={()=> 
      props.navigation.navigate('CourseVideoList',{chapter,course_slug,Banner:`${params.base_url}/${params.course_image}`})
    } style={{marginHorizontal:20}}>
    <View style={[styles.StyleCourse,{borderColor:COLORS.textborderColor,borderRadius:5,borderWidth:1,padding:2},{marginTop:chapter.indexx === 0 ? 0 : 15}]}>
      <Image style={styles.CourseImageStyle} source={{uri:"https://easyway.web-binary.com/front/images/logo-2.jpg"}}/>
      <View>
         <Text numberOfLines={2} style={styles.timelable}>{chapter.name}</Text>
         <View style={{height:15,flexDirection:'row'}}>
            <Image style={{height:12,width:12,marginLeft:10,alignSelf:'center'}} source={require('../../assets/PlayCircle.png')}/>
            <Text numberOfLines={2} style={[styles.videoCountlable]}>{`${chapter.contents.length} ${chapter.contents.length <= 1 ? "Video" : "Videos"}`}</Text>
         </View>
      </View>
      <Image style={{height:24,width:24,justifyContent:'center',alignSelf:'center',right:11,position:'absolute'}} source={require('../../assets/Chevron_Right.png')}/>
    </View>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView>
    <View style={styles.container} >
      <View style={{flex:1}}>
          <View style={{marginHorizontal:20}}>
            <View style={{marginTop:15}}>
              <Text style={styles.ScreenTitleName}>{params.course_name}</Text>
              <TouchableOpacity style={{height:40}} onPress={()=> props.navigation.goBack()}>
                  <Image style={styles.btnBackStyle}source={require('../../assets/Back.png')}></Image>
              </TouchableOpacity>
            </View>
            <View style={{width:'100%',height:ms(140),marginTop:ms(25),borderRadius:ms(5)}}>
              <Image resizeMode={'stretch'} 
                style={{borderRadius:ms(5),height:'100%',width:'100%',justifyContent:'center',alignSelf:'center',position:'absolute'}}
              source={{uri:`${params.base_url}/${params.course_image}`}}/>
              <Text style={styles.Chapter_Videolable}>{`${chaptercount} Chapters • ${videocount} Video`}</Text>
            </View> 
            <Text style={styles.CourseTitleName}>Chapters</Text>
          </View>
          {Loding ? 
            <View style={{flex:1,justifyContent:'center'}}>
            <ActivityIndicator size="large" color="#00ff00" />
          </View>
          :
            <FlatList
            alwaysBounceHorizontal={false}
            alwaysBounceVertical={false}
            bounces={false}
            data={chapters}
            renderItem={({item,index}) => <Item {...item} indexx={index}/>}
            keyExtractor={item => item.id}
            style={{marginBottom:0}}
          /> 
          }
          <View style={{height:5,backgroundColor:'rgba(0,0,0,0)'}}></View>
      </View>
      {/* <Text>Login</Text> */}
    </View>
  </SafeAreaView>
  )
}

export default Coursedetails

const styles = StyleSheet.create({
  
  btnBackStyle:{
    height:40,
    width:40,
    marginTop:5
 },
  container:{
    height:'100%',
    width:'100%',
    // paddingHorizontal:20,
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
    flexDirection:'row'
  },
  timelable:{
    ...Fonts.FontStyle.SSOnlyFont,
    fontSize:14,
    fontWeight:'500',
    marginTop:12,
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
    fontSize:10,
    fontWeight:'400',
    justifyContent:'center',
    textAlign:'center',
    alignSelf:'center',
    left:5
},
 Chapter_Videolable:{
  fontSize:ms(16),color:'white',position:'absolute',bottom:10,...Fonts.FontStyle.SSOnlyFont,fontWeight:'600',left:10
 }
})