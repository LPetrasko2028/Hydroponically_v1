// find devices
// get device
// get devices
// save/create device
// update device
// delete device


import { findDevices } from '../../raspberryPiFunctions/devices/findDevices.js';

export async function getDevices(req, res) {
    const devices = await findDevices();
    res.json(devices);
}

export async function saveDevice(req, res) {
    const device = req.body.device;

    res.json(device);
}