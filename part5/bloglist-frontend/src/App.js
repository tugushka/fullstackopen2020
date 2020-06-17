import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  
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
    console.log('username', username);
    console.log('password', password);
    try{  
      const user = await loginService.login(username, password)

      console.log('user', user);
      setUser(user);
    } catch( error ) {
      console.log('error', error.message);
    }
  }

  return (
    <>
      { user === null 
        ? 
          (
            <div>
              <h4>Log in to application</h4>
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
              <p>{user.name} logged in</p>
              {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
              )}
            </div>
          )
      }
    </>
  )
}

export default App