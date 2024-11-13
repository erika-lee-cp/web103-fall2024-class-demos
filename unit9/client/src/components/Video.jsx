import { useState, useEffect } from 'react'
import VideosAPI from '../services/VideosAPI'

const Video = (props) => {

    const [video, setVideo] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const videoData = await VideosAPI.getVideosById(props.id)
                setVideo(videoData)
            } catch (error) {
                throw error
            }
        }) ()
    }, [props])

    return (
        <article>
            <h2>{video.name}</h2>

            <iframe
                width="350"
                height="216"
                src={`https://www.youtube-nocookie.com/embed/${video.youtube}`}
                title={video.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen>
            </iframe>
        </article>
    )
}

export default Video