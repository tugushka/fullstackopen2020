const supertest = require('supertest');
const mongoose = require('mongoose');
const User = require('./../src/models/user');
const api = supertest(require('./../src/app'));
const userHelper = require('./../src/utils/test/user-test-helper');

beforeEach(async () => {
  await User.deleteMany({});
  console.log('Test starting');
  for( user of userHelper.initialUsers ) {
    const newUser = new User(user);
    await newUser.save();
  }
  console.log('Initial users added');
})

describe('Addition of users', () => {
  test('Prevent storing request without username or password', async () => {
    const newUsers = [
      {
        username: '',
        name: 'name',
        password: '',
      },
      {
      },
      {
        username: 'hello',
        name: '',
        password : '',
      },
      {
        username: '',
        name: 'name',
        password: 'hello password',
      }
    ]
    for(newUser of newUsers) {
      await api
        .post('/api/users/')
        .send(newUser)
        .expect(400)
    }

    expect( (await userHelper.usersInDb()).length ).toBe(userHelper.initialUsers.length)
  })

  test('Prevent storing request with length of username or password less than 3', async () => {
    const newUsers = [
      {
        username: '12',
        name: 'name',
        password: '99999999',
      },
      {
        username: '22222222',
        password: 'he',
      },
      {
        name: 'name',
        password : '999999',
      },
      {
        username: '22',
        password: 'he',
      }
    ]
    for(newUser of newUsers) {
      await api
        .post('/api/users/')
        .send(newUser)
        .expect(400)
    }

    expect( (await userHelper.usersInDb()).length ).toBe(userHelper.initialUsers.length)
  })
})

afterAll(() => {
  mongoose.connection.close();
})