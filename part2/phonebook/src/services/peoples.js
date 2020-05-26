import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl);
}

const create = (newPerson) => {
  return axios.post(baseUrl, newPerson);
}

const update = (person, id) => {
  return axios.put(`${baseUrl}/${id}`, person);
}

export default {getAll, create, update}