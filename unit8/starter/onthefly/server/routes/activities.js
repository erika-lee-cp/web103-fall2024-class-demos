import express from 'express'
import ActivitiesController from '../controllers/activities.js'

const router = express.Router()

router.get('/', ActivitiesController.getActivities)
router.get('/:trip_id', ActivitiesController.getTripActivities)
router.post('/:trip_id', ActivitiesController.createActivity)
router.delete('/:id', ActivitiesController.deleteActivity)
router.patch('/:id', ActivitiesController.updateActivityLikes)

export default router
