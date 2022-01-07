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
        const most = _.reduce(blogsByAuthor, (max, value, key) => {
            if(value > max.blogs) {
                return {author:key, blogs:value}
            }
            return max
        }, {author:null, blogs:0})
        return most
 }

 const mostLikes = (blogs) => {
     const totals = _.reduce(blogs, (totalLikes, blog) => {
        totalLikes[blog.author] = ((totalLikes[blog.author] || 0) + blog.likes)
        return totalLikes
     },{})
     const most = _.reduce(totals, (max, value, key) => {
        if(value > max.likes) {
            return {author:key, likes:value}
        }
        return max
     },{author:null,likes:0})
     return most
 }
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }