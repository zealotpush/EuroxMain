import createDataContext from "../createDataContext"
import Geolocation from 'react-native-geolocation-service';

const webviewReducer = (state, action) => {
  switch(action.type){
    case 'back' :
      return {...state, backButton:action.payload}
    case 'getGeolocation':
      return {...state, location: action.payload}
    default:
      return state
  }
}

const back = dispatch => {
  return async (ref) => {
    try{
      const refAction = ref.current.goBack()
      dispatch({type:'back', payload: refAction})
    }
    catch(error){
      console.log(error)
    }
  }
}

const getGeolocation = dispatch => {
  return async () => {
    try{
      const geolocationResult = await Geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords

          dispatch({   type:'getGeolocation', payload:[latitude,longitude] })
        },
        (error) => {
          console.log(error)
        },
        { enableHighAccuracy: true, distanceFilter:0, interval: 50000, fastestInterval: 15000 }
      );
    }
    catch(error) {
      console.log(error)
    }
  }
}
export const {Provider, Context} = createDataContext(
  webviewReducer,
  {back,getGeolocation},
  { backButton: undefined ,location: [] }
)