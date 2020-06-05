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

module.exports = {dummy, totalLikes, favoriteBlog};