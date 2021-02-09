import createDataContext from '../createDataContext'
import RNExitApp from 'react-native-exit-app';
import Coremas from '../../native/coremas/index';
import { Alert } from 'react-native';

const permissionReducer = (state, action) => {
  switch(action.type){
    case 'androidPermissionsCheck' :
      return {...state, message: action.payload}
    case 'requestAndroidPermissions':
      return {...state, results: action.payload}
    case 'coremasAuth':
      return {...state, authMessage: action.payload}
    case 'coremasAuthCode':
      return {...state, code: action.payload}
    default :
      return state
  }
}

const coremasAuth = dispatch => {
  return async () => {
    try {
      const result = await Coremas.getResultMessage()
      const code = result?.result_code ? result.result_code.valueOf() : undefined
      const msg = result?.result_code ? JSON.stringify(result.result_msg) : undefined
      console.log(`위변조 모듈 응답 코드 : ${code} 메시지 : ${msg}`)
      if (code !== undefined){
        switch(code) {
          case "AD01F01":
            dispatch({type:'coremasAuth', payload: ` ${msg}`});
            dispatch({type:'coremasAuthCode', payload: `${code}`});
            Alert.alert('위변조 탐지 결과', `데이터 네크워크 사용이 불가합니다. 데이터 네트워크 상태를 확인하여 주시기 바랍니다. \n종료합니다.`, [
              {
                text: "확인",
                onPress: () => RNExitApp.exitApp()
              }
            ]);
            break;  
          case "AD01F02":
            dispatch({type:'coremasAuth', payload: ` ${msg}`});
            dispatch({type:'coremasAuthCode', payload: `${code}`});
            Alert.alert('위변조 탐지 결과', `서버 응답이 유효하지 않습니다. \n종료합니다.`, [
              {
                text: "확인",
                onPress: () => RNExitApp.exitApp()
              }
            ]);
            break;
          case "AD01F05":
            dispatch({type:'coremasAuth', payload: ` ${msg}`});
            dispatch({type:'coremasAuthCode', payload: `${code}`});
            Alert.alert('위변조 탐지 결과', `서버에 접속할 수 없습니다. \n종료합니다.`, [
              {
                text: "확인",
                onPress: () => RNExitApp.exitApp()
              }
            ]);
            break;
          case "AD01F06":
            dispatch({type:'coremasAuth', payload: ` ${msg}`});
            dispatch({type:'coremasAuthCode', payload: `${code}`});
            Alert.alert('위변조 탐지 결과', `서버에 데이터를 전송할 수 없습니다. \n종료합니다.`, [
              {
                text: "확인",
                onPress: () => RNExitApp.exitApp()
              }
            ]);
            break;
          case "AD01F07":
            dispatch({type:'coremasAuth', payload: ` ${msg}`});
            dispatch({type:'coremasAuthCode', payload: `${code}`});
            Alert.alert('위변조 탐지 결과', `서버로부터 데이터를 수신할 수 없습니다. \n종료합니다.`, [
              {
                text: "확인",
                onPress: () => RNExitApp.exitApp()
              }
            ]);
            break;
          case "AD01F08":
            dispatch({type:'coremasAuth', payload: ` ${msg}`});
            dispatch({type:'coremasAuthCode', payload: `${code}`});
            Alert.alert('위변조 탐지 결과', `앱 검증 정보가 유효하지 않습니다. \n종료합니다.`, [
              {
                text: "확인",
                onPress: () => RNExitApp.exitApp()
              }
            ]);
            break;
          case "AMM0100":
            dispatch({type:'coremasAuth', payload: ` ${msg}`});
            dispatch({type:'coremasAuthCode', payload: `${code}`});
            break;
          case "AMM0109":
            dispatch({type:'coremasAuth', payload: ` ${msg}`});
            dispatch({type:'coremasAuthCode', payload: `${code}`});
            Alert.alert('위변조 탐지 결과', `앱 인증에 실패하였습니다. \n종료합니다.`, [
              {
                text: "확인",
                onPress: () => RNExitApp.exitApp()
              }
            ]);
            break;
          case "AMM209":
            dispatch({type:'coremasAuth', payload: ` ${msg}`});
            dispatch({type:'coremasAuthCode', payload: `${code}`});
            Alert.alert('위변조 탐지 결과', `요청 정보가 유효하지 않습니다. \n종료합니다.`, [
              {
                text: "확인",
                onPress: () => RNExitApp.exitApp()
              }
            ]);
            break;
          case "AMM300":
            dispatch({type:'coremasAuth', payload: ` ${msg}`});
            dispatch({type:'coremasAuthCode', payload: `${code}`});
            break;
          case "AMM0309":
            dispatch({type:'coremasAuth', payload: ` ${msg}`});
            dispatch({type:'coremasAuthCode', payload: `${code}`});
            Alert.alert('위변조 탐지 결과', `앱 검증에 실패하였습니다. \n종료합니다.`, [
              {
                text: "확인",
                onPress: () => RNExitApp.exitApp()
              }
            ]);
            break;
          case "AMM0319":
            dispatch({type:'coremasAuth', payload: ` ${msg}`});
            dispatch({type:'coremasAuthCode', payload: `${code}`});
            Alert.alert('위변조 탐지 결과', `루팅 또는 탈옥 단말에서의 실행을 제한합니다. \n종료합니다.`, [
              {
                text: "확인",
                onPress: () => RNExitApp.exitApp()
              }
            ]);
            break;  
          case "AMM0329":
            dispatch({type:'coremasAuth', payload: ` ${msg}`});
            dispatch({type:'coremasAuthCode', payload: `${code}`});
            Alert.alert('위변조 탐지 결과', `루팅 또는 탈옥 단말에서의 실행을 제한합니다. \n종료합니다.`, [
              {
                text: "확인",
                onPress: () => RNExitApp.exitApp()
              }
            ]);
            break; 
          case "AMM0337":
            dispatch({type:'coremasAuth', payload: ` ${msg}`});
            dispatch({type:'coremasAuthCode', payload: `${code}`});
            Alert.alert('위변조 탐지 결과', `앱 토큰이 존재하지 않습니다. \n종료합니다.`, [
              {
                text: "확인",
                onPress: () => RNExitApp.exitApp()
              }
            ]);
            break;
          case "AMM0338":
            dispatch({type:'coremasAuth', payload: ` ${msg}`});
            dispatch({type:'coremasAuthCode', payload: `${code}`});
            Alert.alert('위변조 탐지 결과', `앱 토큰 유효기간이 지났습니다. \n종료합니다.`, [
              {
                text: "확인",
                onPress: () => RNExitApp.exitApp()
              }
            ]);
            break;
          case "AMM0339":
            dispatch({type:'coremasAuth', payload: ` ${msg}`});
            dispatch({type:'coremasAuthCode', payload: `${code}`});
            Alert.alert('위변조 탐지 결과', `앱 위변조 탐지되었습니다. \n종료합니다.`, [
              {
                text: "확인",
                onPress: () => RNExitApp.exitApp()
                // onPress: () => null
              }
            ]);
            break;
          case "AMM0349":
            dispatch({type:'coremasAuth', payload: ` ${msg}`});
            dispatch({type:'coremasAuthCode', payload: `${code}`});
            Alert.alert('위변조 탐지 결과', `블랙리스트에 등록된 앱이 설치되어 있으므로 실행을 제한합니다. \n종료합니다.`, [
              {
                text: "확인",
                onPress: () => RNExitApp.exitApp()
              }
            ]);
            break;
          case "AMM0359":
            dispatch({type:'coremasAuth', payload: ` ${msg}`});
            dispatch({type:'coremasAuthCode', payload: `${code}`});
            Alert.alert('위변조 탐지 결과', `블랙리스트에 등록된 단말에서의 실행을 제한합니다. \n종료합니다.`, [
              {
                text: "확인",
                onPress: () => RNExitApp.exitApp()
              }
            ]);
            break;
          case "AMM0410":
            dispatch({type:'coremasAuth', payload: ` ${msg}`});
            dispatch({type:'coremasAuthCode', payload: `${code}`});
            break;
          case "AMM0419":
            dispatch({type:'coremasAuth', payload: ` ${msg}`});
            dispatch({type:'coremasAuthCode', payload: `${code}`});
            Alert.alert('위변조 탐지 결과', `정책 송신에 실패하였습니다. \n종료합니다.`, [
              {
                text: "확인",
                onPress: () => RNExitApp.exitApp()
              }
            ]);
            break;
          default:
            dispatch({type:'coremasAuth', payload: ` ${msg}`});
            dispatch({type:'coremasAuthCode', payload: `${code}`});
            // Alert.alert('위변조 탐지 결과', `${msg}.`, [
            //   {
            //     text: "확인",
            //     onPress: () => null
            //   }
            // ]);
            break;
        }
      }
      return false
    } catch(e) {
      console.log(`위변조 모듈에 오류가 발생했습니다. ${e}`)
    }
  }
}

const androidPermissionsCheck = dispatch => {
  return async ({PERMISSIONS,RESULTS,check}, callback) => {
    await check(PERMISSIONS.ANDROID.CAMERA).then((result)=>{
      console.log(result)
      switch(result) {
        case RESULTS.UNAVAILABLE:
          dispatch({type:'androidPermissionsCheck', payload: '이 기기에서는 카메라 권한을 승인 할 수 없습니다. 종료합니다.'})
          break;
        case RESULTS.DENIED:
          dispatch({type:'androidPermissionsCheck', payload: '이 기기에서는 카메라 권한 승인이 거절되었습니다. 종료합니다.'})
          break;
        case RESULTS.LIMITED:
          dispatch({type:'androidPermissionsCheck', payload: '이 기기에서는 카메라 권한이 제한됩니다. 종료합니다.'})
          break;
        case RESULTS.GRANTED:
          dispatch({type:'androidPermissionsCheck', payload: '이 기기에서는 카메라 권한이 승인되었습니다. 계속진행하십시오'})
          break;
        case RESULTS.BLOCKED:
          dispatch({type:'androidPermissionsCheck', payload: '이 기기에서는 카메라 권한이 막혔습니다. 종료합니다.'})
          break;
      }
    })
  }
}
const requestAndroidPermissions = dispatch => {
 return async ({PermissionsAndroid}) => {
  const allPermissions = [
    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    PermissionsAndroid.PERMISSIONS.CAMERA,
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
  ]
  try {
    const granted = await PermissionsAndroid.requestMultiple(allPermissions)
      .then(results => {
        console.log(results)
        const values = Object.values(results).find(element => element !== 'granted')
  
        return values
      })
    if (granted === undefined) {
      dispatch({type:'requestAndroidPermissions', payload: true})
    } else{
      dispatch({type:'requestAndroidPermissions', payload: false})
    }
  } catch(error){
    dispatch({type:'requestAndroidPermissions', payload: false})
  }
 }
}

export const {Provider, Context} = createDataContext(
  permissionReducer,
  { androidPermissionsCheck,requestAndroidPermissions, coremasAuth },
  { message:'', results:false, authMessage:'', code:'' } 
)