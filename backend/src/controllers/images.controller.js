// Import model
import Image from '../models/images.model.js'

// Import env
import {env} from '../env.js'

// Imports
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

// Import AWS SDK
import s3 from '../config/_aws.js';

export const getAllImages = async (req, res) => {
    try {
        const images = await Image.find()
        res.status(200).json({
            message: 'Success on get images',
            data: images
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'Error on get images',
            error: error.message
        })
    }
}

export const getImageById = async (req, res) => {
    try {
        const image = await Image.findById(req.params.id)
        if(!image) {
            res.status(404).json({
                message: `Image with id ${req.params.id} not found`
            })
            return
        }
        res.status(200).json({
            message: `Success on get image by id ${req.params.id}`,
            data: image
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: `Error on get by id ${req.params.id}`,
            error: error.message
        })
    }
}

export const uploadImage = async (req, res) => {
    try {
        const { personName, requestDate } = req.body;
        const files = req.files; // Asegúrate de usar multer para manejar el archivo

        if (!files || files.length === 0) {
            return res.status(400).json({
                message: 'No se cargaron archivos',
            });
        }
        const uploadedImages = [];

        for (const file of files) {

        // Generar un nombre único para la imagen en S3
            const uniqueFileName = `${uuidv4()}-${Date.now()}.png`;

            // Configuración para subir a S3
            const params = {
                Bucket: env().AWS_S3_BUCKET, // Nombre del bucket
                Key: uniqueFileName, // Nombre del archivo en S3
                Body: file.buffer, // Archivo en formato buffer (requerido por S3)
                ContentType: file.mimetype, // Tipo MIME del archivo
                ACL: 'public-read', // Acceso público (ajusta según necesidades)
            };

            // Subir archivo a S3
            const uploadResult = await s3.upload(params).promise();

            // Guardar en MongoDB
            const { size } = file;
            const url = uploadResult.Location; // URL pública de la imagen
            const newImage = new Image({ size, url, personName, requestDate: requestDate || Date.now() });
            const savedImage = await newImage.save();

            uploadedImages.push(savedImage);
        }

        res.status(201).json({
            message: 'Success on process and upload images',
            data: uploadedImages,
        });
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: `Error on upload images`,
            error: error.message
        })
    }
}

export const getImagesByDateRange = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        // Validar que las fechas están presentes
        if (!startDate || !endDate) {
            return res.status(400).json({
                message: 'Please provide both start date and end date in the query parameters.',
            });
        }

        // Convertir las fechas a objetos Date
        const start = new Date(startDate);
        const end = new Date(endDate);

        // Validar que las fechas son válidas
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            return res.status(400).json({
                message: 'Invalid date format. Please use YYYY-MM-DD or ISO 8601 format.',
            });
        }

        // Consultar imágenes dentro del rango de fechas
        const images = await Image.find({
            requestDate: {
                $gte: start,
                $lte: end,
            },
        });

        res.status(200).json({
            message: 'Images retrieved successfully',
            data: images,
        });

    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: `Error on get images for date range`,
            error: error.message
        })
    }
}

export const getAverageByHour = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        // Validar fechas
        if (!startDate || !endDate) {
            return res.status(400).json({
                message: 'Please provide both startDate and endDate in the query parameters.',
            });
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            return res.status(400).json({
                message: 'Invalid date format. Please use YYYY-MM-DD or ISO 8601 format.',
            });
        }

        // Agrupación por hora
        const imagesByHour = await Image.aggregate([
            {
                $match: {
                    requestDate: { $gte: start, $lte: end },
                },
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$requestDate" },
                        month: { $month: "$requestDate" },
                        day: { $dayOfMonth: "$requestDate" },
                        hour: { $hour: "$requestDate" },
                    },
                    count: { $sum: 1 },
                },
            },
            {
                $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1, "_id.hour": 1 },
            },
        ]);

        // Formatear los datos para gráficos
        const formattedData = imagesByHour.map((item) => ({
            hour: `${item._id.year}-${item._id.month
                .toString()
                .padStart(2, "0")}-${item._id.day
                .toString()
                .padStart(2, "0")} ${item._id.hour}:00`,
            count: item.count,
        }));

        // Calcular promedio de imágenes por hora
        const totalImages = imagesByHour.reduce((sum, item) => sum + item.count, 0);
        const averagePerHour = totalImages / imagesByHour.length;

        res.status(200).json({
            message: 'Images count by hour retrieved successfully',
            data: {
                hourlyData: formattedData,
                averagePerHour,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error calculating images by hour',
            error: error.message,
        });
    }
};