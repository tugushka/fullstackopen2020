const User = require('../../models/user');
const initialUsers = [
  {
    username: "hello 1",
    name: "name of hello",
    password: "11111"
  },
  {
    username: "hello 2",
    name: "",
    password: "11111"
  },
  {
    username: "hello 3",
    name: "gurav",
    password: "11111"
  },
]

const usersInDb = async () => {
  return User.find({});
}

module.exports = {
  initialUsers,
  usersInDb
}