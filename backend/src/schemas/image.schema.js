import Joi from 'joi';

// Define el esquema para validar los datos
const imageSchema = Joi.object({
    personName: Joi.string().min(3).max(50).required().messages({
        'string.empty': 'El campo del nombre de la persona es obligatorio.',
        'string.min': 'El nombre de la persona debe tener al menos 3 caracteres.',
        'string.max': 'El nombre de la persona no debe superar los 50 caracteres.',
    }),
    requestDate: Joi.date().optional().messages({
        'date.base': 'La fecha de solicitud debe ser una fecha válida.',
    }),
    files: Joi.array()
        .items(
            Joi.object({
                mimetype: Joi.string()
                    .valid('image/jpeg', 'image/jpg', 'image/png')
                    .required()
                    .messages({
                        'any.only': 'Solo se permiten archivos .jpeg, .jpg y .png.',
                        'any.required': 'El tipo MIME del archivo es obligatorio.',
                    }),
                size: Joi.number()
                    .max(20 * 1024 * 1024)
                    .messages({
                        'number.max': 'El archivo no puede exceder los 15 MB.',
                    }),
            })
        )
        .min(1)
        .required()
        .messages({
            'array.min': 'Debes cargar al menos una imagen.',
            'any.required': 'El campo "Archivos" es obligatorio.',
        }),
});

export default imageSchema;