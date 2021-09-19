const express = require('express');
require('dotenv').config({path: './config/config.env'});
require('./config/db')
const cors = require('cors')

const app = express();

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())

// Import router
const bookRoutes = require('./routes/book.routes');

// Use Router
app.use('/api/book', bookRoutes);

app.listen(process.env.PORT, () => {
  console.log(`server listening to ${process.env.PORT}`);
});
