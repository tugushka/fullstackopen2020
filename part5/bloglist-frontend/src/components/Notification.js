import React from 'react'

const Notification = ({notification, setNotification}) => {  
  console.log('notification', notification)
  if(notification){
    setTimeout( () => setNotification(''), 5000);
    return (
      <div style={{borderStyle:'solid'}} >
        {notification}
      </div>
    )
  }

  return (<></>)
}

export default Notification