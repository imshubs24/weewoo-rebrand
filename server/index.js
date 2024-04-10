const express = require('express');
const cors = require("cors");
require('dotenv').config();
const userRoutes = require('./Routes/userRoutes');
const foodRoutes = require('./Routes/foodRoutes');
const orderRoutes = require('./Routes/orderRoutes')

const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use('/api/users', userRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/order', orderRoutes);

app.get('/', (req, res) => {
    res.send('Hello From Server Side');
})

const port = process.env.PORT || 8000;
const hostname = '127.0.0.1';

app.listen(port, (req, res) => {
    console.log(`Server listening at http://${hostname}:${port}`);
});