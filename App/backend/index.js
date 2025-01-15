// create an express app
import express from 'express';

import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

// create a server
const server = app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});