import React, { useRef, useContext,useEffect,useState } from 'react'
import { BackHandler,Alert } from 'react-native'
import {WebView} from 'react-native-webview'
import {Context as webViewContnext} from '../common/context/webViewContext'
import WebViewButton from './component/WebViewButton'
import ActivityIndicatorScreen from './component/ActivityIndicatorScreen'
import { Context as WebviewContext } from '../common/context/webViewContext'
import CookieManager from '@react-native-community/cookies';
import RNExitApp from 'react-native-exit-app';
import RNFS from 'react-native-fs'
import Spinner from 'react-native-loading-spinner-overlay';
import PdfScreen from '../pdf/pdfScreen'
const WebViewScreen = ({navigation}) => {
  const { state:{location}, getGeolocation } = useContext(WebviewContext);
  const [modalVisible , setModalVisible] = useState(false)
  const [pdfVisible, setPdfVisible ] = useState(false) 
  const [pdfUrl, setPdfUrl] = useState('')
  const webViewRef = useRef();

  // const globalUrl = 'http://ibizweb.iptime.org:61160'
  // const webviewTargetUrl = 'http://ibizweb.iptime.org:61160/login/loginForm.do'
  // const webviewMainUrl = 'http://ibizweb.iptime.org:61160/app/main/index.do'
  // const cookieUrl = 'http://ibizweb.iptime.org:61160/app/main/index.do'

  const globalUrl = 'https://l-eurox.com'
  const cookieUrl = 'https://l-eurox.com'
  const webviewTargetUrl = 'https://l-eurox.com/login/loginForm.do'
  const webviewMainUrl = 'https://l-eurox.com/app/main/index.do'

  const receivedEvent = async (event) => {
    const downloadBegin = (response) => {
      if(response.statusCode === 200) {
        setModalVisible(true)
      }
    }
    try{
      const data = JSON.parse(event.nativeEvent.data)
      const { action , param, url } = data
      if(action === 'root'){
        Alert.alert("Eurox App", "종료하시겠습니까?", [
          {
            text: "취소",
            onPress: () => null,
            style: "cancel"
          },
          { text: "종료", onPress: () => RNExitApp.exitApp() }
        ]);
      } 
      else if (action === "fileDownload") {
        console.log('dfsf', param)
        const _fromUrl = `${globalUrl}${url}?id=${param.id}&seq=${param.seq}&_csrf=${param._csrf}`
        await RNFS.downloadFile({
          fromUrl: _fromUrl,
          toFile: RNFS.DownloadDirectoryPath + `/${param.fileName}`,
          progressDivider:0,
          begin: downloadBegin,
        }).promise.then((response) => {
          if (response.statusCode == 200) {
            setInterval(()=> {
              setModalVisible(false)
            },2000)
          } else {
            alert('SERVER ERROR');
          }
        })
        .catch((error) => {
          console.log(error)
        })
      }
      else if(action === "pdfView") {
        const pdfUrl = `${globalUrl}${url}?EQUIP_CD=${param.EQUIP_CD}&EQUIP_MANUFACT_CD=${param.EQUIP_MANUFACT_CD}&EQUIP_MGMT_NO=${param.EQUIP_MGMT_NO}&SEQ=${param.SEQ}`
        setPdfUrl(pdfUrl)
        pdfVisible ? setPdfVisible(false) : setPdfVisible(true)
      } 
    } catch(e){
      console.log('postmessage has error ',e)
    }
  }

  const handleBackPress = () => {
    const INJECTED_JAVASCRIPT = `$(".btn_back").click()`;
    if(webViewRef.current.startUrl.indexOf(webviewTargetUrl) === 0) {
      Alert.alert("Eurox App", "종료하시겠습니까?", [
        {
          text: "취소",
          onPress: () => null,
          style: "cancel"
        },
        { text: "종료", onPress: () => RNExitApp.exitApp() }
      ]);
      return false
    } else if(webViewRef.current.startUrl.indexOf(webviewMainUrl) === 0) {
      webViewRef.current.injectJavaScript(INJECTED_JAVASCRIPT);
    } else {
      webViewRef.current.goBack()
    }
  }

  useEffect(() => {
    const backAction = () => {
      handleBackPress()
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
  })

  const Cookie = async (location) => {
    await CookieManager.set(cookieUrl, {
      name: 'lat',
      value: `${location[0]}`,
      version: '1',
    })
    await CookieManager.set(cookieUrl, {
      name: 'lng',
      value: `${location[1]}`,
      version: '1',
    })
    await CookieManager.get(cookieUrl).then((result) => {
      console.log(`lat` , result.lat)
      console.log(`lng` , result.lng)
    });    
  }

  useEffect(() => {
    getGeolocation();
  },[])

  useEffect(() => {
    Cookie(location);
  },[location])
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, [navigation]);

  return (
    <>
      <Spinner
        visible={modalVisible}
        textContent={'DownLoading...'}
        textStyle={{color:'#0059b3'}}
        color='#0059b3'
      />
      <WebView 
        source={{ 
          uri: webviewTargetUrl
        }} 
        ref={webViewRef}
        originWhitelist={['*']}
        startInLoadingState={true}
        renderLoading={() => <ActivityIndicatorScreen />}
        onError={(event) => {
          alert(`알 수 없는 문제로 웹페이지를 로드하지 못했습니다. ${event.nativeEvent.description}`);
          navigation.goBack()
        }}
        // userAgent="Mozilla/5.0 (Linux; Android 9; SM-N971N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36"
        javaScriptCanOpenWindowsAutomatically={true}
        allowFileAccessFromFileURLs={true}
        allowUniversalAccessFromFileURLs={true}
        domStorageEnabled={true}
        scalesPageToFit={false}
        geolocationEnabled={true}
        JavaScriptEnabled={true}
        setSupportMultipleWindows={false}
        thirdPartyCookiesEnabled={true}
        mixedContentMode='always'
        allowFileAccess={true}
        onMessage={(event) => {
          receivedEvent(event)
        }}
      />
      <PdfScreen visible={pdfVisible} pdfUrl={pdfUrl} navigation={navigation} />
    </>    
  )
}

export default WebViewScreen
