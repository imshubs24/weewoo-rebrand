const express = require('express');
const cors = require("cors");
require('dotenv').config();
const userRoutes = require('./Routes/userRoutes');

// DB connection
const mongoConnection = require('./db/connection');
mongoConnection();

const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello From Server Side');
})

const port = process.env.PORT || 8000;
const hostname = '127.0.0.1'

app.listen(port, (req, res) => {
    console.log(`Server listening at http://${hostname}:${port}`);
});