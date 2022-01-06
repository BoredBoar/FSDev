const _ = require('lodash')

const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    if(blogs.length > 0) {
        return blogs.reduce((a, blog) => {return a + blog.likes},0)
    }
    return null
}

 const favoriteBlog = (blogs) => {
     return blogs.reduce((fav, blog) => {
        if(fav.likes >= blog.likes) {
            return fav
        } 
        return {title:blog.title, author:blog.author, likes:blog.likes}
     },{title:null, author:null, likes:0})
 }

 const mostBlogs = (blogs) => {
        blogsByAuthor = _.countBy(blogs, 'author')
        console.log(blogsByAuthor)
        const most = _.reduce(blogsByAuthor, (max, value, key) => {
            if(value > max.blogs) {
                return {author:key, blogs:value}
            }
            return max
        }, {author:null, blogs:0})
        console.log(most)
        return most
 }

 const mostLikes = (blogs) => {
     
 }
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
  }