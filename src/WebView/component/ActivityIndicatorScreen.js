import React ,{ useState} from 'react'
import {ActivityIndicator, StyleSheet,View} from 'react-native'


const ActivityIndicatorScreen = () => {

  return (
    <View style={styles.activityIndicatorStyle}>
      <ActivityIndicator 
        color="#0059b3"
        size={70}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  activityIndicatorStyle: {
    flex: 1,
    position: 'absolute',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
});


export default ActivityIndicatorScreen