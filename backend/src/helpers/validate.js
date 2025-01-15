const validate = (schema) => {
    return (req, res, next) => {

        const files = req.files.map(file => ({
            mimetype: file.mimetype,
            size: file.size,
        }));
        const { error } = schema.validate(
            {
                ...req.body,
                files: files, // Incluye el archivo en la validación
            },
            { abortEarly: false } // Recoge todos los errores en lugar de detenerse en el primero
        );

        if (error) {
            return res.status(400).json({
                message: 'Error de validación de datos',
                details: error.details.map((err) => err.message),
            });
        }

        next();
    };
};

export default validate;