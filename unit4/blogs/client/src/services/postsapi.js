import { request } from '../utilities/api'

const postsURL = '/api/posts'

const getAllPosts = () => request('GET', postsURL)
const getPostsById = (id) => request('GET', `${postsURL}/${id}`)
const createPost = (post) => request('POST', postsURL, post)
const updatePost = (post) => request('PATCH', `${postsURL}/${post.id}`, post)
const deletePost = (id) => request('DELETE', `${postsURL}/${id}`)

export default {
    getAllPosts,
    getPostsById,
    createPost,
    updatePost,
    deletePost
}