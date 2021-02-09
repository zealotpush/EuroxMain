import React ,{useContext,useEffect,useState,useLayoutEffect,useCallback}from 'react'
import { View,PermissionsAndroid,Text,BackHandler,Alert, Image,Button, ActivityIndicator, StyleSheet } from 'react-native'
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions'
import {Context as AndroidPermissionContext} from '../common/context/androidPermissionContext'
import { RNCamera } from 'react-native-camera';
import CameraRoll from "@react-native-community/cameraroll";
import RNExitApp from 'react-native-exit-app';
import Camera from '../common/component/Camera';
import Icon from 'react-native-vector-icons/FontAwesome';
import Coremas from '../native/coremas/index';
import backgroundIcon from "../common/public/backgroundImage/login_object.png"
import FetchComponent from './component/useFetch' 
export default function HomeScreen({navigation}) {
  const { state, androidPermissionsCheck,requestAndroidPermissions,coremasAuth } = useContext(AndroidPermissionContext)
  const [ authResult , setAuthResult ] = useState(false);
 
  useLayoutEffect(() => {
    navigation.setOptions({
      // headerTitleAlign:'center',
      // title: 'Eurox',
      // headerStyle:{
      //   backgroundColor:'#0059b3'
      // },
      // headerTitleStyle:{
      //   fontWeight:'bold'
      // },
      // headerTintColor:'#fff',
        headerShown: false
    });
  }, [navigation]);

  useEffect(() => {
    const auth = async () => {
      await Coremas.checkApp();

    }
    auth();
    setTimeout(() => {
      coremasAuth()
      setAuthResult(true)
    }, 6000)
  }, [])
  
  useEffect(() => {
    requestAndroidPermissions({PermissionsAndroid})

    const backAction = () => {
      Alert.alert("Eurox App", "종료하시겠습니까?", [
        {
          text: "취소",
          onPress: () => null,
          style: "cancel"
        },
        { text: "종료", onPress: () => RNExitApp.exitApp() }
      ]);
      return true;
    };

    BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    )
    return () => BackHandler.removeEventListener(
      "hardwareBackPress",
      backAction
    );
  },[])

  return (
    <>
      
      <View style={{flex: 0.9, flexDirection:"column", justifyContent:"center", alignItems: "center", backgroundColor: "#bdccdb" }}>
        <View style={margin}>
          <Image source={backgroundIcon} style={{ width: 80, height: 80, resizeMode:"contain" }}/>
        </View>
        <View style={margin}>

          <Text style={{fontWeight: 'bold', fontSize:30, color: "#0059b3" }}>
            Eurox Mobile
          </Text>
        </View>
        <View style={margin} />
        <View style={margin}>
          <Text style={{fontWeight: 'bold', fontSize:15, }}>
            유록스 주문관리 시스템에 오신걸 환영합니다.
          </Text>
        </View>
        <View style={margin} />
        <View style={{margin: 5 ,justifyContent:"center", alignItems:"center"}}>
          <Text style={{fontWeight: 'bold', fontSize:13, }}>{state.results ?  `앱이 권한을 가지고 있습니다. 계속 진행해 주십시오.`: `앱의 권한을 획득해야합니다. 허용 버튼을 눌러주십시오. 권한 다시 묻지 않기를 선택하시면 앱을 다시 설치해야 합니다.` } </Text>
        </View>
        <View style={margin}>
          {
            authResult 
            ?
            <>
              {state.results ? 
              <Icon.Button
                name="check-circle"
                onPress={() => navigation.navigate('webView')}
                style={{backgroundColor:'#0059b3'}}
              >
                유록스 접속하기
              </Icon.Button>
              : 
              <Icon.Button 
                name='check-circle'
                onPress={() => requestAndroidPermissions({PermissionsAndroid})}
                style={{backgroundColor:'#0059b3'}}
              >
                권한 얻기
              </Icon.Button>
              }
            </>
            :
            <>
              <View style={{margin: 5, flexDirection:'row', justifyContent:"center", alignItems:"center"}}>
                <ActivityIndicator size="large" color="#0059b3" />
                <Text style={{fontWeight: 'bold', fontSize:13 }}>
                  위변조 검사중입니다.
                </Text>
              </View>
            </>
          }
        </View>   
        {/* <View style={margin}>
          <Icon.Button 
            name="camera"  
            onPress={() => navigation.navigate('main',{screen:'camera'})}
            style={{backgroundColor:'#0059b3'}}
          >
            카메라 찍기
          </Icon.Button>
        </View> */}
        {/* <View style={margin}>
          <Text>위변조 결과 : {state.authMessage}</Text>
          <Text>위변조 결과 : {state.code}</Text>
        </View>  */}
      </View>
      <View style={{ flex:0.1, backgroundColor: "#bdccdb", justifyContent:"center", alignItems:"center"}}>
        <View style={{ width:"90%", height: 1, backgroundColor: "#bfbfbf", }} />
        <View style={{margin:5, justifyContent:"center", alignItems:"center"}}>
          <Text style={{ fontWeight: 'bold', fontSize:15, color: "#bfbfbf"}}>Lotte fine chemical</Text>
        </View>
      </View>

    </>
  )
}

const margin = {
  margin: 5
}
