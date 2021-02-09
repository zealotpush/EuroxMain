/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { withNavigation, createSwitchNavigator, createCompatNavigatorFactory } from '@react-navigation/compat';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import Main from './src/Main'
import WebViewScreen from './src/webview/WebViewScreen'
import HomeScreen from './src/home/HomeScreen'
import Camera from './src/common/component/Camera'
import {Provider as WebviewProvider} from './src/common/context/webViewContext'
import {Provider as PermissionProvider} from './src/common/context/androidPermissionContext'
import navigationRef from './src/RootNavigation'


const mainFlow = createCompatNavigatorFactory(createStackNavigator)(
  {

    homeScreen: {screen: HomeScreen},
    webView: {screen: WebViewScreen},
    camera : {screen:Camera},
  }
)
const App = createSwitchNavigator(
  {
    main : mainFlow
  }
)



export default () => {

  return (
      <PermissionProvider>
        <WebviewProvider>
          <NavigationContainer ref={navigationRef} >
            <App />
          </NavigationContainer>
        </WebviewProvider>
      </PermissionProvider>
  )
}