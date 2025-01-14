// Importing modules
import express from 'express'
import cors from 'cors'
import path from 'path';
import { fileURLToPath } from 'url';
import cookiesParser from 'cookie-parser'

// imports helpers


// imports routes
import router from './routes/_index.js'

// Initializations
const app = express()

// Define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Setters
app.set('port', process.env.PORT || 3000)

// Middlewares
app.use(cors())
app.use(express.json());
app.use(cookiesParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


// Routes
app.use('/api', router)
app.get('', (req, res) => {
  res.json({
    message: 'Welcome to parking API'
  });
});

export default app




