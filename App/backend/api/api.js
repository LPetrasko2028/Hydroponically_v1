import express from 'express';

import { getDevices, saveDevice } from '../controllers/deviceController.js';

const api = express.Router();

// Device Routes
api.get('/devices', getDevices);
api.post('/devices', saveDevice);



export default api;