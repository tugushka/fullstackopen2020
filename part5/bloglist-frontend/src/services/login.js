const axios = require('axios');
const baseUrl = '/api/login';

const login = async (username, password) => {
  const resp = await axios.post(baseUrl, {username, password})
  return resp.data;
}

module.exports = {
  login
}