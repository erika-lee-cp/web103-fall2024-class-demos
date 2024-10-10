const Post = ( { post } ) => {

    const handleOnClick = (event) => {
        event.preventDefault()
        window.location.href = `/edit/${post.id}`
    }

    return (
        <article>
            <div className='article-body'>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
            </div>

            <div className='article-footer'>
                <button onClick={handleOnClick}>Edit 📝</button>
            </div>
        </article>
    )
}

export default Post
