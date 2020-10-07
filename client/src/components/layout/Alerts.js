import React, { useContext } from 'react'
import AlertsContext from '../../context/alerts/alertsContext'


const Alerts = () => {

  const alertsContext = useContext(AlertsContext)

  return (
    alertsContext.alerts.length > 0 && 
    alertsContext.alerts.map(alert => (
      <div className='alert alert-danger'>
        {alert}
      </div>
    ))
   
  )

}

export default Alerts
