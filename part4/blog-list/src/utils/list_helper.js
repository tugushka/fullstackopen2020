const dummy = (blogs) => {
  return 1;
}

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
  console.log('blogAuthors', blogAuthors);

  const authorWithMostBlog = blogAuthors
    .reduce(
      (cur_author, author) => cur_author.blogs > author.blogs ? cur_author : author,
      {author: '', blogs: 0}
    )

  console.log('authorWithMostBlog', authorWithMostBlog);
  
  return authorWithMostBlog;
}

module.exports = {dummy, totalLikes, favoriteBlog, mostBlogs};