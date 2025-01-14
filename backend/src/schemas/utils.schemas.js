import Joi from 'joi';

export const dateRangeSchema = Joi.object({
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
});