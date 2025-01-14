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
    file: Joi.any().required().messages({
        'any.required': 'El archivo de imagen es obligatorio.',
    }),
});

export default imageSchema;