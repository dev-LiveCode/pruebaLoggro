import Joi from 'joi';

export const dateRangeSchema = Joi.object({
    startDate: Joi.date().required().messages({
        'date.required': 'La fecha inicio es obligatoria.',
        'date.base': 'La fecha inicio debe ser una fecha válida.',
    }),
    endDate: Joi.date().required().messages({
        'date.required': 'La fecha fin es obligatoria.',
        'date.base': 'La fecha fin debe ser una fecha válida.',
    })
});