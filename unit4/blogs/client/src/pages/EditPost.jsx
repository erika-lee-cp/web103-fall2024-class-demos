import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import BlogPostsAPI from '../services/postsapi'

const EditPost = () => {

    const [post, setPost] = useState({id: 0, title: '', content: ''})
    const { id } = useParams()

    useEffect(() => {
        (async () => {
            try {
                const data = await BlogPostsAPI.getPostsById(id)
                setPost(data)
            } catch (error) {
                throw error
            }
        }) ()
    }, [id])

    const handleOnChange = (event) => {
        setPost({
            ...post,
            [event.target.name]: event.target.value
        })
    }

    const handleOnSubmit = async (event) => {
        event.preventDefault()
        await BlogPostsAPI.updatePost(post)
        window.location = '/'
    }

    const handleOnDelete = async (event) => {
        event.preventDefault()
        await BlogPostsAPI.deletePost(id)
        window.location = '/'
    }

    return (
        <form onSubmit={handleOnSubmit}>
            <h2>Edit Blog Post</h2>
            
            <label htmlFor='title'>
                Title
                <input type='text' id='title' name='title' value={post.title} onChange={handleOnChange} />
            </label>

            <label htmlFor='content'>
                Content
                <textarea id='content' name='content' value={post.content} onChange={handleOnChange} />
            </label>

            <div className='edit-buttons'>
                <button type='submit'>Update</button>
                <button onClick={handleOnDelete}>Delete</button>
            </div>
        </form>
    )
}

export default EditPost
