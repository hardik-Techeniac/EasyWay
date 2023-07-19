import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
// import Video from 'react-native-video';
// import Video from 'react-native-video-player'
import VideoPlayer from 'react-native-video-controls';
import metrics from '../../Util/Metrics'
const ComVideo = (props) => {
  useEffect(()=>{
    console.log("ComVideo---",props.route.params)
  },[])
  return (
        <View style={styles.videoContainer}>
        <VideoPlayer
          source={{uri: props.route.params}}
          navigator={props.navigator}
          onBack={() => props.navigation.goBack()}
          disableFullscreen={true}
        />
        {/* <Video
              video={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
              fullScreenOnLongPress={true}
              fullscreen={true}
              autoplay={true}
                videoWidth={1600}
                videoHeight={metrics.screenHeight}
                thumbnail={{ uri: 'https://i.picsum.photos/id/866/1600/900.jpg' }}/> */}
    {/* <Video
        source={{uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'}}
        ref={(ref) => {
            this._player = ref
        }}                                      
        style={styles.video}/> */}
    </View>
  )
}

export default ComVideo

const styles = StyleSheet.create({
  videoContainer: {
    flex: 1,
    backgroundColor: 'black',
},
video: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
},
})