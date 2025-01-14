import {dateRangeSchema} from '../schemas/utils.schemas.js';

export const validateDateRange = (req, res, next) => {
    const { error } = dateRangeSchema.validate(req.query);
    if (error) {
        return res.status(400).json({ message: error.message });
    }
    next();
};