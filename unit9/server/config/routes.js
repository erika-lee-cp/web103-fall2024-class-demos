import express from 'express'

import VideosController from '../controllers/videos.js'

const router = express.Router()

router.get('/videos', VideosController.getVideos)
router.get('/videos/:id', VideosController.getVideosById)

export default router