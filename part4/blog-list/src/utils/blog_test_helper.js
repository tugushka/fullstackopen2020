const initialBlogs = [ { _id: "5a422a851b54a676234d17f7", title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7, __v: 0 }, { _id: "5a422aa71b54a676234d17f8", title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", likes: 5, __v: 0 }, { _id: "5a422b3a1b54a676234d17f9", title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12, __v: 0 }, { _id: "5a422b891b54a676234d17fa", title: "First class tests", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", likes: 10, __v: 0 }, { _id: "5a422ba71b54a676234d17fb", title: "TDD harms architecture", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", likes: 0, __v: 0 }, { _id: "5a422bc61b54a676234d17fc", title: "Type wars", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", likes: 2, __v: 0 }]

const totalLikes = (blogs) => {
  return blogs.reduce( (sum, blog) => sum+blog.likes, 0 );
}

const favoriteBlog = (blogs) => {
  const mostLikes = blogs.reduce( (cur_max, blog) => Math.max(cur_max, blog.likes), 0 );
  return blogs.find( blog => blog.likes === mostLikes );
}

const mostBlogs = (blogs) => {
  const blogAuthors = blogs
    .reduce( (authors, blog) => {
      const indexOfAuthor = authors.findIndex( author => author.author === blog.author );
      if( indexOfAuthor !== -1 ) {
        authors[indexOfAuthor].blogs ++;
        return authors;
      } else {
        return authors.concat({author: blog.author, blogs: 1});
      }
    }, [])

  const authorWithMostBlog = blogAuthors
    .reduce(
      (cur_author, author) => cur_author.blogs > author.blogs ? cur_author : author,
      {author: '', blogs: 0}
    )
  
  return authorWithMostBlog;
}

const mostLikes = (blogs) => {
  const blogAuthors = blogs
    .reduce( (authors, blog) => {
      const indexOfAuthor = authors.findIndex( author => author.author === blog.author );
      if( indexOfAuthor !== -1 ) {
        authors[indexOfAuthor].likes += blog.likes;
        return authors;
      } else {
        return authors.concat({author: blog.author, likes: blog.likes});
      }
    }, [])

  const authorWithMostLikes = blogAuthors
    .reduce(
      (cur_author, author) => cur_author.likes > author.likes ? cur_author : author,
      {author: '', likes: 0}
    )  
  return authorWithMostLikes;
}

module.exports = {totalLikes, favoriteBlog, mostBlogs, mostLikes, initialBlogs};