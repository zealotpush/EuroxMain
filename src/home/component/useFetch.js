import React, {useState, useEffect, useContext} from 'react'
import {Text} from 'react-native'

const FetchComponent = ({coremasAuth, coremasState}) => {

  const [coreState, setCoreState] = useState(undefined);
  
  const authFetch = async () => {
    const response = await coremasAuth();
    console.log('fetchCompoennt coremas response', coremasState.authMessage)
    setCoreState(coremasState.authMessage)
  }

  useEffect(() => {
    authFetch();
    if (coreState === undefined){
      setTimeout(() => {
        authFetch();
      },3000)
    }
  },[coreState])

  return (<Text>{coreState ? coreState : `no response${coreState}` }</Text>)
}

export default FetchComponent