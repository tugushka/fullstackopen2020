import React from 'react'
import '../index.css'

const Notification = ({notification}) => {
  if( notification == null ) {
    return <></>
  }
  return (
    <div className={notification.type}>{notification.message}</div>
  )
}

export default Notification
