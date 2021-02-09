import React from 'react'
import {Button, View, Text, StyleSheet, TouchableOpacity,PermissionsAndroid, Platform } from 'react-native'
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/FontAwesome';
import CameraRoll from "@react-native-community/cameraroll";
const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'lightgreen',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Text>Waiting</Text>
  </View>
);

export default function Camera({navigation}) {
  // async function hasAndroidPermission() {
  //   const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

  //   const hasPermission = await PermissionsAndroid.check(permission);
  //   if (hasPermission) {
  //     return true;
  //   }
  //   console.log('hasPermission',hasPermission)
  //   const status = await PermissionsAndroid.request(permission);
  //   return status === 'granted';
  // }
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, [navigation]);


  const takePicture = async (camera) => {
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options)
      .then((result) => {
        console.log(result)
        CameraRoll.save(result.uri);
      })
  };

  return (
    <View style={styles.container}>
    <RNCamera
      style={styles.preview}
      type={RNCamera.Constants.Type.back}
      flashMode={RNCamera.Constants.FlashMode.on}
      captureAudio={false}
      androidCameraPermissionOptions={{
        title: 'Permission to use camera',
        message: 'We need your permission to use your camera',
        buttonPositive: 'Ok',
        buttonNegative: 'Cancel',
      }}
      androidRecordAudioPermissionOptions={{
        title: 'Permission to use audio recording',
        message: 'We need your permission to use your audio',
        buttonPositive: 'Ok',
        buttonNegative: 'Cancel',
      }}
    >
      {({ camera, status, recordAudioPermissionStatus }) => {
        if (status !== 'READY') return <PendingView />;
        return (
          <View style={styles.capture}>


            <Icon.Button name="dot-circle-o" size={40} onPress={() => takePicture(camera)} style={{backgroundColor:'#4169E1'}}>
              <Text style={{ fontSize: 20, color:'#fff'}}> 사진찍기 </Text>
            </Icon.Button>
          </View>
        );
      }}
    </RNCamera>
  </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    borderRadius:50,
    backgroundColor:'#4169E1',
    justifyContent:'center', 
    alignItems:'center',
    height:100,
    marginBottom:30,
    padding:10
  },
});
