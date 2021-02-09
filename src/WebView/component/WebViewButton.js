import React from 'react'
import { View, Text,Button,TouchableOpacity } from 'react-native'

const WebViewButton  = ({onBackPress,onForwardPress,canGoBack,canGoForward}) => {
  return <>
      <View style={[styles.container, !canGoBack && !canGoForward && styles.$hide]}>
        {canGoBack && (
          <TouchableOpacity style={styles.leftButtonStyle} onPress={onBackPress} canGoBack={canGoBack}>
          <Text>Go Back</Text>
          </TouchableOpacity>)
        }
        {canGoForward && (
          <TouchableOpacity style={styles.rightButtonStyle} onPress={onForwardPress} canGoForward={canGoForward}>
          <Text>Go Forward</Text>
          </TouchableOpacity>)
        }
      </View>
    </>
}
const styles = {
  $hide: {display:'none'},
  container:{
    height:60,
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center'
  },
  buttonStyle:{
    color:""
  },
  rightButtonStyle:{

  }
}



export default WebViewButton