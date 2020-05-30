import React from 'react'
import '../index.css'

const Notification = ({notification, setNotification}) => {
  if( notification == null ) {
    return <></>
  }
  setTimeout(() => setNotification(null), 5000);
  return (
    <div className={notification.type}>{notification.message}</div>
  )
}

export default Notification
