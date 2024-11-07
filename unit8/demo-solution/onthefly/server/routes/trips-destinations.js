import express from 'express'
import TripsDestinationsController from '../controllers/trips-destinations.js'

const router = express.Router()

router.get('/', TripsDestinationsController.getTripsDestinations)
router.get('/trips/:destination_id', TripsDestinationsController.getAllTrips)
router.get('/destinations/:trip_id', TripsDestinationsController.getAllDestinations)
router.post('/', TripsDestinationsController.createTripDestination)

export default router
