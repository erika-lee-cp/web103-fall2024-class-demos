import { request } from '../utilities/api'

const videosURL = '/api/videos'

const getAllVideos = () => request('GET', videosURL)
const getVideosById = (id) => request('GET', `${videosURL}/${id}`)

export default {
    getAllVideos,
    getVideosById,
}