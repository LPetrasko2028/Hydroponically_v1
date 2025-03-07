// create an express app
import express from 'express';
import chalk from "chalk";

import dotenv from 'dotenv';
dotenv.config();

// Appears that the current docker container flattens the directory structure into the /usr/local/app directory
// No need to use the full path to the database controller file
import createDBObject from './database/db.js';

// import api_v1 from './api/api_v1.js';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

const timelog = (req, res, next) => {
    const date = new Date();
    const GET = chalk.green;
    const POST = chalk.hex('#FF8800');
    const PUT = chalk.blue;
    const DELETE = chalk.red;

    console.log( (req.method == 'GET') ? GET(req.method) : (req.method == 'POST') ? POST(req.method) : (req.method == 'PUT') ? PUT(req.method) : DELETE(req.method), 'request at', chalk.blue(`${req.url}`), 'Time:', chalk.yellow(date.toLocaleString('en-US', { timeZoneName: 'short' })));
    next();
};
if (process.env.NODE_ENV === 'development') app.use(timelog);


app.get('/', (req, res) => {
    res.send('Hello World new!');
});
app.get('/api', (req, res) => {
    res.send('Hello World!');
});

app.get('/db', async (req, res) => {
    const db = await createDBObject('_users');
    db.info()
        .then((info) => {
            res.send(info);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

// app.use('/v1/api', api_v1);

// create a server
const server = app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});