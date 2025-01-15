import { Router } from "express";

// Import middleware
import upload from "../helpers/upload.js";
import validate from '../helpers/validate.js';
import { validateDateRange } from "../helpers/utils.middlewares.js";

// Import schemas
import imageSchema from '../schemas/image.schema.js';

// imports functions from controllers
import { getAllImages, getImageById, uploadImage, getImagesByDateRange, getAverageByHour } from "../controllers/images.controller.js";

const router = Router();

router.get('/test', (req, res) => {
    res.json({ message: 'Hello from images' })
})

// Get all images
router.get('/', getAllImages)

// Get images on range date
router.get('/range', validateDateRange, getImagesByDateRange)

// Get average and stats images by hour
router.get('/hourly', validateDateRange, getAverageByHour)

// Get one image
router.get('/id/:id', getImageById)

// Upload image
router.post('/', upload.array('files', 4), validate(imageSchema), uploadImage)



export default router