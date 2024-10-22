// import {
//   Dimensions,
//   Pressable,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import React, {useRef, useState} from 'react';
// import Video from 'react-native-video';
// import {Slider} from '@rneui/themed';
// import Rotate from '../../assets/images/rotate.svg';

// const {width} = Dimensions.get('screen');

// const NotesVideoPlayer = () => {
//   const videoRef = useRef(null);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [comments, setComments] = useState([]);
//   const [commentText, setCommentText] = useState('');
//   const [sliderWidth, setSliderWidth] = useState(0);
//   const [fullscreen, setFullScreen] = useState(false);

//   const commentColors = [
//     '#FFB6C1',
//     '#ADD8E6',
//     '#90EE90',
//     '#FFD700',
//     '#FF69B4',
//     '#FFDEAD',
//     '#D8BFD8',
//     '#87CEFA',
//     '#FFE4B5',
//     '#AFEEEE',
//     '#98FB98',
//     '#FFC0CB',
//     '#E6E6FA',
//     '#F0E68C',
//     '#FAFAD2',
//   ];

//   const onLoad = data => {
//     setDuration(data.duration);
//   };

//   const onProgress = data => {
//     setCurrentTime(data.currentTime);
//   };

//   const handleSliderValueChange = value => {
//     setCurrentTime(value);
//     if (videoRef.current) {
//       videoRef.current.seek(value);
//     }
//   };

//   const formatTime = time => {
//     const minutes = Math.floor(time / 60);
//     const seconds = Math.floor(time % 60);
//     return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
//   };

//   const addComment = () => {
//     if (commentText && currentTime !== 0) {
//       const randomIndex = Math.floor(Math.random() * commentColors.length);
//       setComments(prev => [
//         ...prev,
//         {
//           text: commentText,
//           timestamp: currentTime,
//           color: commentColors[randomIndex],
//         },
//       ]);
//       setCommentText('');
//     }
//   };

//   const handleCommentPress = timestamp => {
//     setCurrentTime(timestamp);
//     if (videoRef.current) {
//       videoRef.current.seek(timestamp);
//     }
//   };

//   const renderMarkers = () => {
//     return comments.map((comment, index) => {
//       const markerPosition = (comment.timestamp / duration) * sliderWidth;
//       return (
//         <TouchableOpacity
//           key={index}
//           style={[styles.marker, {left: markerPosition}]}
//           onPress={() => handleCommentPress(comment.timestamp)}>
//           <Text style={[styles.markerText, {color: comment.color}]}>•</Text>
//         </TouchableOpacity>
//       );
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <View style={{width: '100%'}}>
//         <View style={{height: '50%', width: '100%'}}>
//           <Video
//             ref={videoRef}
//             style={styles.video}
//             source={{
//               uri: 'https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8',
//             }}
//             onLoad={onLoad}
//             onProgress={onProgress}
//             onEnd={() => setCurrentTime(0)}
//           />
//           <Pressable
//             style={styles.rotateIcon}
//             onPress={() => setFullScreen(!fullscreen)}>
//             <Rotate width={30} height={30} />
//           </Pressable>
//         </View>
//         {fullscreen !== true && (
//           <>
//             <View style={styles.sliderContainer}>
//               <View style={styles.sliderWrapper}>
//                 <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
//                 <View
//                   style={{flex: 1, position: 'relative'}}
//                   onLayout={event => {
//                     const {width} = event.nativeEvent.layout;
//                     setSliderWidth(width);
//                   }}>
//                   <Slider
//                     style={{width: '100%', height: 40}}
//                     minimumValue={0}
//                     maximumValue={duration}
//                     value={currentTime}
//                     allowTouchTrack
//                     minimumTrackTintColor="#000000"
//                     maximumTrackTintColor="#CDCDCD"
//                     onValueChange={handleSliderValueChange}
//                     thumbTintColor="#007BFF"
//                   />

//                   {renderMarkers()}
//                 </View>
//                 <Text style={styles.timeText}>{formatTime(duration)}</Text>
//               </View>
//             </View>

//             <View style={styles.commentInputContainer}>
//               <TextInput
//                 style={styles.commentInput}
//                 value={commentText}
//                 onChangeText={setCommentText}
//                 placeholder="Add a comment..."
//               />
//               <TouchableOpacity onPress={addComment} style={styles.addButton}>
//                 <Text style={styles.addButtonText}>Add</Text>
//               </TouchableOpacity>
//             </View>

//             <View style={styles.commentsContainer}>
//               {comments.map((comment, index) => (
//                 <TouchableOpacity
//                   key={index}
//                   style={[styles.comments, {backgroundColor: comment.color}]}
//                   onPress={() => handleCommentPress(comment.timestamp)}>
//                   <Text style={styles.commentText}>
//                     {formatTime(comment.timestamp)}: {comment.text}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </View>
//           </>
//         )}
//       </View>
//     </View>
//   );
// };

// export default NotesVideoPlayer;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     marginTop: '5%',
//   },
//   video: {
//     width: '100%',
//     height: '100%',
//     backgroundColor: 'black',
//   },
//   sliderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   sliderWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   timeText: {
//     color: 'black',
//   },
//   commentInputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 10,
//     paddingHorizontal: 10,
//   },
//   commentInput: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: '#CDCDCD',
//     padding: 5,
//     borderRadius: 5,
//   },
//   addButton: {
//     marginLeft: 10,
//     backgroundColor: '#007BFF',
//     padding: 10,
//     borderRadius: 5,
//   },
//   addButtonText: {
//     color: 'white',
//   },
//   commentsContainer: {
//     maxHeight: 100,
//     marginVertical: 10,
//     paddingHorizontal: 10,
//   },
//   commentText: {
//     color: 'black',
//     paddingVertical: 5,
//   },
//   marker: {
//     position: 'absolute',
//     top: '15%',
//     backgroundColor: 'transparent',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   markerText: {
//     fontSize: 20,
//   },
//   comments: {
//     marginTop: 10,
//     paddingVertical: 10,
//     borderRadius: 5,
//     paddingHorizontal: 5,
//   },
//   rotateIcon: {
//     position: 'absolute',
//     right: 20,
//     bottom: 20,
//   },
// });

import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Video from 'react-native-video';
import {Slider} from '@rneui/themed';
import Rotate from '../../assets/images/rotate.svg';
import Orientation from 'react-native-orientation-locker';

const {width, height} = Dimensions.get('screen');

const NotesVideoPlayer = () => {
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [sliderWidth, setSliderWidth] = useState(0);
  const [fullscreen, setFullScreen] = useState(false);
  const [isSeekBarVisible, setIsSeekBarVisible] = useState(false);
  const hideSeekBarTimeout = useRef(null);
  const [pause, setpause] = useState(false);

  const commentColors = [
    '#FFB6C1',
    '#ADD8E6',
    '#90EE90',
    '#FFD700',
    '#FF69B4',
    '#FFDEAD',
    '#D8BFD8',
    '#87CEFA',
    '#FFE4B5',
    '#AFEEEE',
    '#98FB98',
    '#FFC0CB',
    '#E6E6FA',
    '#F0E68C',
    '#FAFAD2',
  ];

  const onLoad = data => {
    setDuration(data.duration);
  };

  const onProgress = data => {
    setCurrentTime(data.currentTime);
  };

  const handleSliderValueChange = value => {
    setCurrentTime(value);
    if (videoRef.current) {
      videoRef.current.seek(value);
    }
  };

  const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const addComment = () => {
    if (commentText && currentTime !== 0) {
      const randomIndex = Math.floor(Math.random() * commentColors.length);
      setComments(prev => [
        ...prev,
        {
          text: commentText,
          timestamp: currentTime,
          color: commentColors[randomIndex],
        },
      ]);
      setCommentText('');
    }
  };

  const handleCommentPress = timestamp => {
    setCurrentTime(timestamp);
    if (videoRef.current) {
      videoRef.current.seek(timestamp);
    }
  };

  const renderMarkers = () => {
    return comments.map((comment, index) => {
      const markerPosition = (comment.timestamp / duration) * sliderWidth;
      return (
        <TouchableOpacity
          key={index}
          style={[styles.marker, {left: markerPosition}]}
          onPress={() => handleCommentPress(comment.timestamp)}>
          <Text style={[styles.markerText, {color: comment.color}]}>•</Text>
        </TouchableOpacity>
      );
    });
  };

  const toggleFullScreen = () => {
    if (fullscreen) {
      Orientation.lockToPortrait();
    } else {
      Orientation.lockToLandscape();
    }
    setFullScreen(!fullscreen);
  };

  const renderItem = ({item, index}) => {
    return (
      <Pressable
        key={index}
        style={[styles.comments, {backgroundColor: item?.color}]}
        onPress={() => handleCommentPress(item.timestamp)}>
        <Text style={styles.commentText}>
          {formatTime(item.timestamp)}: {item.text}
        </Text>
      </Pressable>
    );
  };
  const showSeekBar = () => {
    if (hideSeekBarTimeout.current) {
      clearTimeout(hideSeekBarTimeout.current);
    }
    setIsSeekBarVisible(!isSeekBarVisible);
    hideSeekBarTimeout.current = setTimeout(() => {
      setIsSeekBarVisible(false);
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (hideSeekBarTimeout.current) {
        clearTimeout(hideSeekBarTimeout.current);
      }
    };
  }, []);
  return (
    <View style={fullscreen ? styles.fullscreenContainer : styles.container}>
      <StatusBar hidden />
      <View style={{width: '100%', height: '100%'}}>
        <Pressable
          onPress={showSeekBar}
          style={[styles.videoWrapper, {height: fullscreen ? width : '50%'}]}>
          <Video
            ref={videoRef}
            resizeMode="contain"
            paused={pause}
            style={[
              styles.video,
              {width: '100%', height: fullscreen ? width : '100%'},
            ]}
            source={{
              uri: 'https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8',
            }}
            onLoad={onLoad}
            onProgress={onProgress}
            onEnd={() => setCurrentTime(0)}
          />
          {isSeekBarVisible && (
            <>
              <View style={styles.playPauseContainer}>
                {!pause ? (
                  <Pressable
                    style={{zIndex: 999}}
                    onPress={() => setpause(!pause)}>
                    <Image
                      source={require('../../assets/images/pause.png')}
                      style={styles.playPauseIcon}
                      tintColor={'#fff'}
                    />
                  </Pressable>
                ) : (
                  <Pressable
                    style={{zIndex: 999}}
                    onPress={() => setpause(!pause)}>
                    <Image
                      source={require('../../assets/images/play-buttton.png')}
                      style={styles.playPauseIcon}
                      tintColor={'#fff'}
                    />
                  </Pressable>
                )}
              </View>
              <Pressable style={styles.rotateIcon} onPress={toggleFullScreen}>
                <Rotate width={30} height={30} />
              </Pressable>
              <View
                style={[
                  styles.sliderContainer,
                  {bottom: fullscreen ? 30 : 20},
                ]}>
                <View style={styles.sliderWrapper}>
                  <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
                  <View
                    style={{flex: 1}}
                    onLayout={event => {
                      const {width} = event.nativeEvent.layout;
                      setSliderWidth(width);
                    }}>
                    <Slider
                      style={{width: '100%', height: 40}}
                      minimumValue={0}
                      maximumValue={duration}
                      value={currentTime}
                      allowTouchTrack
                      thumbStyle={{height: 20, width: 20}}
                      minimumTrackTintColor="#FFFFFF"
                      maximumTrackTintColor="#CDCDCD"
                      onValueChange={handleSliderValueChange}
                      thumbTintColor="#007BFF"
                    />

                    {renderMarkers()}
                  </View>
                  <Text style={styles.timeText}>{formatTime(duration)}</Text>
                </View>
              </View>
            </>
          )}
        </Pressable>

        {!fullscreen && (
          <View style={{flex: 1}}>
            <View style={styles.commentInputContainer}>
              <TextInput
                style={styles.commentInput}
                value={commentText}
                onChangeText={setCommentText}
                placeholder="Add a comment..."
              />
              <TouchableOpacity onPress={addComment} style={styles.addButton}>
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.commentsContainer}>
              <FlatList
                keyExtractor={(_, index) => index}
                showsVerticalScrollIndicator={false}
                data={comments}
                renderItem={renderItem}
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default NotesVideoPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  fullscreenContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  videoWrapper: {
    width: '100%',
    justifyContent: 'flex-start',
  },
  video: {
    backgroundColor: 'black',
  },
  sliderContainer: {
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
  },
  sliderWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeText: {
    color: '#fff',
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CDCDCD',
    padding: 5,
    borderRadius: 5,
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
  },
  commentsContainer: {
    marginVertical: 10,
    paddingHorizontal: 10,
    flex: 1,
    height: '100%',
  },
  commentText: {
    color: 'black',
    paddingVertical: 5,
  },
  marker: {
    position: 'absolute',
    top: '15%',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerText: {
    fontSize: 20,
  },
  comments: {
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 5,
    paddingHorizontal: 5,
  },
  rotateIcon: {
    position: 'absolute',
    right: 20,
    top: '15%',
  },
  playPauseContainer: {
    position: 'absolute',
    top: '45%',
    alignItems: 'center',
    alignSelf: 'center',
    bottom: 0,
  },
  playPauseIcon: {width: 50, height: 50},
});
