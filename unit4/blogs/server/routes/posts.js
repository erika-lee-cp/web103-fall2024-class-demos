const express = require('express')
const BlogPosts = require('../controllers/posts.js')

const router = express.Router()

router.get('/posts', BlogPosts.getPosts)
router.get('/posts/:id', BlogPosts.getPostsById)
router.post('/posts', BlogPosts.createPost)
router.patch('/posts/:id', BlogPosts.updatePost)
router.delete('/posts/:id', BlogPosts.deletePost)

module.exports = router
