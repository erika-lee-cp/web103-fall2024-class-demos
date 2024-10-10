import { useState } from 'react'
import BlogPostsAPI from '../services/postsapi'

const NewPost = () => {

    const [post, setPost] = useState({id: 0, title: '', content: ''})

    const handleOnChange = (event) => {
        setPost({
            ...post,
            [event.target.name]: event.target.value
        })
    }

    const handleOnSubmit = async (event) => {
        event.preventDefault()
        await BlogPostsAPI.createPost(post)
        window.location = '/'
    }
    
    return (
        <form onSubmit={handleOnSubmit}>
            <h2>Create New Blog Post</h2>

            <label htmlFor='title'>
                Title
                <input type='text' id='title' name='title' value={post.title} placeholder='New blog post' onChange={handleOnChange} required />
            </label>

            <label htmlFor='content'>
                Content
                <textarea id='content' name='content' value={post.content} placeholder='Blog content' onChange={handleOnChange} required />
            </label>

            <button type='submit'>Submit</button>
        </form>
    )
}

export default NewPost
