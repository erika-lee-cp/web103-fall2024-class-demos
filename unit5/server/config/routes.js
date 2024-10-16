import express from 'express'

import SalonController from '../controllers/salon.js'
import AppointmentsController from '../controllers/appointments.js'
import HairStylesController from '../controllers/hairstyles.js'
import HairStylistsController from '../controllers/hairstylists.js'
import CustomersController from '../controllers/customers.js'

const router = express.Router()

// salon - add route to get salon info
router.get('/salon', SalonController.getSalonOfferings)

// appointments
router.get('/appointments', AppointmentsController.getAppointments)
router.get('/appointments/:id', AppointmentsController.getAppointmentsById)

// hair styles
router.get('/hairstyles', HairStylesController.getHairStyles)
router.get('/hairstyles/:id', HairStylesController.getHairStylesById)

// hair stylists
router.get('/hairstylists', HairStylistsController.getHairStylists)
router.get('/hairstylists/:id', HairStylistsController.getHairStylistById)

// customers
router.get('/customers', CustomersController.getCustomers)
router.get('/customers/:id', CustomersController.getCustomerById)

// customers - add route to get customer appointments
router.get('/customers/:id/appointments', CustomersController.getCustomerAppointments)

export default router;