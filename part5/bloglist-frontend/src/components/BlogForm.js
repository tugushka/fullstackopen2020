import React, {useState} from 'react'
import blogService from './../services/blogs'

const BlogForm = ({userToken, setNotification}) => {
  const [title,setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleStoreBlog = async (event) => {
    event.preventDefault();
    try {
      await blogService.store({title, author, url}, userToken);

      setNotification(`a new blog ${title} by ${author} added`);
    } catch(error) {
      setNotification(`Error occured while storing the new blog`);
      console.log('Error: ', error.message);
    }
  }

  return (
    <div>
      <h4>Create new blog</h4>
      <form onSubmit={handleStoreBlog}>
        <div>title:<input value={title} onChange={event => setTitle(event.target.value)}/></div>
        <div>author:<input value={author} onChange={event => setAuthor(event.target.value)}/></div>
        <div>url:<input value={url} onChange={event => setUrl(event.target.value)}/></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default BlogForm