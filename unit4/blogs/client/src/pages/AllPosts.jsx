import { useState, useEffect } from 'react'
import Post from '../components/Post'
import BlogPostsAPI from '../services/postsapi'

const AllPosts = () => {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const data = await BlogPostsAPI.getAllPosts()
                setPosts(data)
            } catch (error) {
                throw error
            }
        }) ()
    }, [])

    return (
        <main>
            {
                posts && posts.length > 0 ? posts.map((post) => 
                    <Post key={post.id} post={post} />
                ) : <h3>{'No blog posts found 😔'}</h3>
            }
        </main>
    )
}

export default AllPosts
