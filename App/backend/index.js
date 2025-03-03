// create an express app
import express from 'express';

import dotenv from 'dotenv';
dotenv.config();

// import api_v1 from './api/api_v1.js';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World new!');
});
app.get('/api', (req, res) => {
    res.send('Hello World!');
});

// app.use('/v1/api', api_v1);

// create a server
const server = app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});