import React, { useState, useEffect } from 'react'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(JSON.parse(window.localStorage.getItem('loggedBlogUser')));
  const [notification, setNotification] = useState('');

  useEffect(() => {
    if( user !== null ) {
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )
    }
  }, [user])

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log('Handling submit');
    try{  
      const user = await loginService.login(username, password)
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user));

      console.log('user', user);
      setUsername('');
      setPassword('');
      setUser(user);
    } catch( error ) {
      console.log('error', error.message);
      setNotification('wrong username or password');
    }
  }

  const handleLogout = async (event) => {
    console.log('Logging out');
    setNotification(`${user.username} logged out`);
    setUser(null);
    window.localStorage.removeItem('loggedBlogUser');
  }

  return (
    <>
      { user === null 
        ? 
          (
            <div>
              <h4>Log in to application</h4>
              <Notification notification={notification} setNotification={setNotification}/>
              <form onSubmit={handleLogin}>
                <div>username <input value={username} onChange={(event) => {setUsername(event.target.value)}} /> </div>
                <div>password <input value={password} type="password" onChange={(event) => setPassword(event.target.value)} /> </div>
                <button>Login</button>
              </form>
            </div>
          )
        :
          (
            <div>
              <h4>Blogs</h4>
              <Notification notification={notification} setNotification={setNotification}/>
              <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
              <BlogForm userToken={user.token} setNotification={setNotification}/>
              <div>
                {blogs.map(blog =>
                  <Blog key={blog.id} blog={blog} />
                )}
              </div>
            </div>
          )
      }
    </>
  )
}

export default App