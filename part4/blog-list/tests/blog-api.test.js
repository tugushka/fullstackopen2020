const blogHelper = require('../src/utils/blog_test_helper');
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
  test('total likes of blogs', () => {
    const result = blogHelper.totalLikes(blogHelper.initialBlogs);
    expect(result).toBe(36);
  })
})

describe('favorite blog', () => {
  test('find the favorite blog', () => {
    //Didn't consider a situation where there can be more than one blogs with same most likes
    const result = blogHelper.favoriteBlog(blogHelper.initialBlogs);
    const expectedBlog = { _id: "5a422b3a1b54a676234d17f9", title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12, __v: 0 }
    expect(result).toEqual(expectedBlog);
  })
})

describe('author with most blog', () => {
  test('author with most blog', () => {
    const result = blogHelper.mostBlogs(blogHelper.initialBlogs);
    const expectedAuthor = {
      author: "Robert C. Martin",
      blogs: 3
    }
    expect(result).toEqual(expectedAuthor);
  })
})

describe('author with most likes', () => {
  test('author with most likes', () => {
    const result = blogHelper.mostLikes(blogHelper.initialBlogs);
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
    const newBlog = {
      "title": "ayy blog",
      "author": "anon",
      "url": "ayy-blog",
      "likes": "0"
    }

    const totalBlogsBefore = (await blogHelper.getBlogs()).length;

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201);
    
    const totalBlogs = (await blogHelper.getBlogs()).length;

    expect(totalBlogs).toBe(totalBlogsBefore+1);
  })
})

afterAll(() => {
  mongoose.connection.close();
})