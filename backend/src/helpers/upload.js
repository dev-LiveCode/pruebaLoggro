import multer from 'multer';

const storage = multer.memoryStorage(); // Guardar el archivo en memoria temporalmente
const upload = multer({ storage });

export default upload;