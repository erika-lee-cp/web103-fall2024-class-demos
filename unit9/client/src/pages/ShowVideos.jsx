import { useState, useEffect } from 'react'
import VideosAPI from '../services/VideosAPI'
import Video from '../components/Video'

const ShowVideos = () => {

    const [videos, setVideos] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const videoData = await VideosAPI.getAllVideos()
                setVideos(videoData)
            } catch (error) {
                throw error
            }
        }) ()
    }, [videos])

    return (
        <main>
            {
                videos && videos.length > 0 ? videos.map((video, index) => 
                    <Video
                        key={video.id}
                        id={video.id}
                        name={video.name}
                        youtube={video.youtube}
                    />
                ) : <h2>{'No videos found!'}</h2>
            }
        </main>
    )
}

export default ShowVideos