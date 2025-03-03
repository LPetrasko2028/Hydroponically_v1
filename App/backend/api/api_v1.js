import express from 'express';
import { body, validationResult } from 'express-validator';

// Import controllers
import { getDevices, createDevice } from '../controllers/deviceController.js';
import { getTargets, getTargetById, createTarget, updateTarget, deleteTarget } from '../controllers/targetsController.js';
import { getNetwork, findNetwork, updateNetwork, deleteNetwork } from '../controllers/networkController.js';
import { getSystemInfo, getSystemStatus, getSystemLogs, getSystemSettings, updateSystemSettings, resetSystemSettings } from '../controllers/systemInfoController.js';
import { getSystemTopology, createSystemTopology, updateSystemTopology, deleteSystemTopology } from '../controllers/systemTopologyController.js';
import { getSensors, getSensorById, createSensor, updateSensor, deleteSensor } from '../controllers/sensorsController.js';
import { getSensorData, getSensorDataById, createSensorData, updateSensorData, deleteSensorData } from '../controllers/sensorDataController.js';
import { getGrowCycles, getCurrentGrowCycle, getGrowCycleById, createGrowCycle, updateGrowCycle, deleteGrowCycle } from '../controllers/growCycleController.js';
import { getGrows, getCurrentGrow, getGrowById, startGrow, endGrow } from '../controllers/growController.js';
import { startVideoStream, stopVideoStream } from '../controllers/cameraController.js';
import { getCameraDefaultsettings, updateCameraDefaultsettings } from '../controllers/cameraController.js';
import { getCameraTimelapse, startCameraTimelapse, stopCameraTimelapse, getCameraTimelapseSettings, updateCameraTimelapseSettings } from '../controllers/cameraController.js';

// Import test controllers
import { sensorTest } from '../controllers/sensorTestController.js';
import { relayTest } from '../controllers/relayTestController.js';

// Import Authentication Router
import authenticationRouter from '../routes/authenticationRoutes.js';

const api = express.Router();

// Authentication Routes
api.use('/auth', authenticationRouter);

/** Middleware:
 * Input validation and sanitization
 * api.get('/example', [
 *     body('example').isString().isLength({ min: 3 }).isAlpha(), // validate
 *     body('name').isString().isLength({ min: 3 }).isAlpha(), // validate
 *     body('age').toInt(), // sanitize
 *  ],
 * getExample);
 */
 

// Device Routes
api.get('/devices', getDevices);
/** Create device instead of save device, my thoughts
 * The device object should not only be the connection that is saved and not created, but the type of device and other details like:
 * Arduino nano, ESP32, USB Camera, etc.
 */
api.post('/devices', createDevice);
api.put('/devices', updateDevice);
api.delete('/devices', deleteDevice);

// Network Routes
api.get('/network', getNetwork);
api.post('/network', createNetwork);
api.put('/network', updateNetwork);
api.delete('/network', deleteNetwork);

// System Routes
api.get('/system', getSystemInfo);
api.get('/system/status', getSystemStatus);
api.get('/system/logs', getSystemLogs);
api.get('/system/settings', getSystemSettings);
api.put('/system/settings', updateSystemSettings);

// Target Routes
api.get('/targets', getTargets);
api.get('/targets/:id', getTargetById);
api.post('/targets', createTarget);
api.put('/targets', updateTarget);
api.delete('/targets', deleteTarget);

// System Topology Routes
api.get('/system/topology', getSystemTopology);
api.post('/system/topology', createSystemTopology);
api.put('/system/topology', updateSystemTopology);
api.delete('/system/topology', deleteSystemTopology);

// Sensor Routes
api.get('/sensors', getSensors);
api.post('/sensors', createSensor);
api.put('/sensors', updateSensor);
api.delete('/sensors', deleteSensor);

// Sensor Data Routes
api.get('/sensors/data', getSensorData);
api.get('/sensors/data/:sensorId', getSensorDataById);
api.post('/sensors/data', createSensorData);
api.put('/sensors/data', updateSensorData);
api.delete('/sensors/data', deleteSensorData);

// Sensor Test Routes
api.post('/sensors/test', sensorTest);

// Relay Test Routes
api.post('/relays/test', relayTest);

// Camera Routes
api.post('/camera/startvideostream', startvideostream);
api.post('/camera/stopvideostream', stopvideostream);

api.get('/camera/defaultsettings', getCameraDefaultsettings);
api.post('/camera/defaultsettings', updateCameraDefaultsettings);

api.get('/camera/timelapse', getCameraTimelapse);
api.post('/camera/starttimelapse', startCameraTimelapse);
api.post('/camera/stoptimelapse', stopCameraTimelapse);
api.get('/camera/timelapsesettings', getCameraTimelapseSettings);
api.post('/camera/timelapsesettings', updateCameraTimelapseSettings);

// Grow Cycle Routes
api.get('/growcycle', getGrowCycles);
api.get('/growcycle/current', getCurrentGrowCycle);
api.get('/growcycle/:id', getGrowCycleById);
api.post('/growcycle', createGrowCycle);
api.put('/growcycle', updateGrowCycle);
api.delete('/growcycle', deleteGrowCycle);

/** Grow Cycle Data Type:
 *  {
 *     id: 1,
 *     name: 'Grow Cycle 1',
 *     startDate: null, // set later new Date(),
 *     endDate: null, // set later new Date(),
 *     duration: 90, // in days
 *     targets: [
 *         {
 *             name: 'pH',
 *             value: 7.5,
 *             unit: 'pH',
 *          },
 *          {
 *              name: 'tds',
 *              value: 0.5,
 *              unit: 'ppm',
 *          },
 *     ],
 *     timings: [
 *         {
 *             name: 'watering',
 *             type: 'interval',
 *             interval: 30, // in minutes
 *             duration: 1, // in minutes
 *         },
 *         {
 *             name: 'lighting',
 *             type: 'daily',
 *             startTime: '12:00',
 *             endTime: '23:00',
 *         },
 *     ],
 *     aiStages: [
 *         {
 *             name: 'seedling',
 *             data: x,
 *         },
 *         {
 *             name: 'mild vegetation',
 *             data: x,
 *         },
 *         {
 *             name: 'mature vegetation',
 *             data: x,
 *         },
 *      ],
 *  }
 * 
 */

// Grow Cycle is the template for each grow
// the grow data object is all of the data of running through a grow cycle
// So you run a grow cycle and create a grow. The grow data object can be used to view previous grows and the current grow

// Grow Routes
api.get('/grows', getGrows);
api.get('/grows/current', getCurrentGrow);
api.get('/grows/:id', getGrowById);
api.post('/grows/start', startGrow);
api.post('/grows/end', endGrow);



export default api;