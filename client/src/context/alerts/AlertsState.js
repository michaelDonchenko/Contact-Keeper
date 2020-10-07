import React, {useReducer} from 'react'
import AlertsContext from './alertsContext'
import AlertsReducer from './AlertsReducer'
import {SET_ALERT, REMOVE_ALERT} from '../types'

const AlertsState = props => {

  const initialState =  []

  const [state, dispatch] = useReducer(AlertsReducer, initialState)

  const setAlert = (msg) => {
      dispatch({
        type: SET_ALERT,
        payload: (msg)
      })
  }

  const removeAlert = () => {
    dispatch({
      type: REMOVE_ALERT,
    })
}


  return (
    <AlertsContext.Provider
    value={{
     alerts: state,
     setAlert,
     removeAlert,
    }}
    >
      {props.children}
    </AlertsContext.Provider>
  )

}

export default AlertsState