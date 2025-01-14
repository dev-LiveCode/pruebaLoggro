import AWS from 'aws-sdk';
// import environtments
import { env } from "../env.js";

// Configuración de AWS SDK
AWS.config.update({
    accessKeyId: env().AWS_ACCESS_KEY_ID, // Desde variables de entorno
    secretAccessKey: env().AWS_SECRET_ACCESS_KEY, // Desde variables de entorno
    region: env().AWS_REGION // Región donde está el bucket
});

const s3 = new AWS.S3();

export default s3;