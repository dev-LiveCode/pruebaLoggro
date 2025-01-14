import express from 'express'

// import routes
import authRoutes from './auth.routes.js'
import imagesRoutes from './images.routes.js'

// Imports routes from routes files
import { authToken } from '../helpers/jwt.js'

// Router
const router = express.Router()

router.use('/auth', authRoutes)
// router.use('/images', authToken, imagesRoutes)
router.use('/images', imagesRoutes)


export default router