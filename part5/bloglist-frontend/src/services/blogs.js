import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const req = await axios.get(baseUrl)
  return req.data
}

const store = async (blog, token) => {
  const config = {
    headers : {
      Authorization: `bearer ${token}`
    }
  }
  await axios.post(baseUrl, blog, config)
}

export default {
  getAll,
  store
}