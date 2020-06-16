const blogHelper = require('../src/utils/test/blog_test_helper');
const supertest = require('supertest');
const mongoose = require('mongoose');
const Blog = require('./../src/models/blog');
const api = supertest(require('./../src/app'));

beforeEach(async () => {
  await Blog.deleteMany({});

  for(const blog of blogHelper.initialBlogs) {
    const blogObject = new Blog(blog);
    await blogObject.save();
  }
})

describe('total likes', () => {  
  test('total likes of blogs', async () => {
    const result = await blogHelper.totalLikes(blogHelper.initialBlogs);
    expect(result).toBe(36);
  })
})

describe('favorite blog', () => {
  test('find the favorite blog', async () => {
    //Didn't consider a situation where there can be more than one blogs with same most likes
    const result = await blogHelper.favoriteBlog(blogHelper.initialBlogs);
    const expectedBlog = { _id: "5a422b3a1b54a676234d17f9", title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12, __v: 0 }
    expect(result).toEqual(expectedBlog);
  })
})

describe('author with most blog', () => {
  test('author with most blog', async () => {
    const result = await blogHelper.mostBlogs(blogHelper.initialBlogs);
    const expectedAuthor = {
      author: "Robert C. Martin",
      blogs: 3
    }
    expect(result).toEqual(expectedAuthor);
  })
})

describe('author with most likes', () => {
  test('author with most likes', async () => {
    const result = await blogHelper.mostLikes(blogHelper.initialBlogs);
    const expectedAuthor = {
      author: "Edsger W. Dijkstra",
      likes: 17
    }
    expect(result).toEqual(expectedAuthor);
  })
})

describe('GET methods', () => {
  test('All notes are returned', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/ );
    expect(response.body).toHaveLength(blogHelper.initialBlogs.length);
  })
})

describe('check if blog id exists', () => {
  test('check if blog id exists', async () => {
    const response = await api.get('/api/blogs')

    response.body.forEach(blog => {
      expect(blog.id).toBeDefined();
    })
  })
})

describe('Addition of blog', () => {
  test('Addition of single blog', async () => {
    const token = await blogHelper.getNewToken(api);
    const newBlog = {
      "title": "ayy blog",
      "author": "anon",
      "url": "ayy-blog",
      "likes": "0",
    }

    const totalBlogsBefore = (await blogHelper.getBlogs()).length;

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201);
    
    const totalBlogs = (await blogHelper.getBlogs()).length;

    expect(totalBlogs).toBe(totalBlogsBefore+1);
  })

  test('check if field likes exist', async () => {
    const token = await blogHelper.getNewToken(api);
    const newBlog = {
      "title": "ayy blog",
      "author": "anon",
      "url": "ayy-blog",
    }
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201);

      expect(response.body.likes).toBeDefined();
      expect(response.body.likes).toBe(0);
  })

  test('check if added blog is malformed', async () => {
    const token = await blogHelper.getNewToken(api);
    const newBlogs = [
      {
      "title": "",
      "author": "anon",
      "url": "ayy-blog",
      },
      {
      "title": "ayy blog",
      "author": "anon",
      "url": "",
      },
      {
      },
    ]
    for(newBlog of newBlogs) {
      const response = await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(newBlog)
        .expect(400);
    }

    const blogs = await blogHelper.getBlogs()
    expect(blogs.length).toBe(blogHelper.initialBlogs.length);
  })

  test('Check if token is not exists or malformed', async () => {
    const newBlog = {
      "title": "ayy blog",
      "author": "anon",
      "url": "ayy-blog",
      "likes": "0",
    }

    const totalBlogsBefore = (await blogHelper.getBlogs()).length;

    // Without token
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401);
    
    // With malformed or non-existing token
    await api
      .post('/api/blogs')
      .set('Authentication', `bearer dummy`)
      .send(newBlog)
      .expect(401);
    
    const totalBlogs = (await blogHelper.getBlogs()).length;

    expect(totalBlogs).toBe(totalBlogsBefore);
  })
})

afterAll(() => {
  mongoose.connection.close();
})