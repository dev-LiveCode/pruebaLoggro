import app from './app.js'
import connectDB from './config/_db.js';

connectDB()

// Listening
app.listen(app.get('port'))


console.log(`Server running on port ${app.get('port')}`)