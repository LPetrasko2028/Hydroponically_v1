# Devices Data

Devices need to have a consistent data structure. I will create some entries that are vague to allow for flexibility.

## Device Data Structure

```json
{
    "id": 1,
    "name": "Arduino Nano",
    "functionality": [
        "pH",
        "TDS",
        "Water Temp",
    ],
    "sensors": [
        {
            "id": 1,
            "name": "pH",
        },
        {
            "id": 2,
            "name": "TDS",
        },
    ],
    "identifiers": {
        "serialNumber": "1234567890",
        "productId": "1234567890",
        "vendorId": "1234567890",
    },
    "connection": { // set/reserve path to device in linux
        "type": "USB",
        "path": "/dev/ttyUSB0",
        "baudRate": 9600,
        "dataBits": 8,
    }
}

```

## Functionality

Functionality is an array of strings that describe the functionality of the device. This allows the controllers to determine which device has which functionality/ which sensors.

## Identifiers 

Identifiers is an object of device data that put together creates a unique ID that allows Hydroponically to recognize devices

## Connection

Connection is an object that contains data used to connect to the device like path, baud rate, etc.

## Sensors

Sensors is an array of sensors that are attached to the device. This is a rough draft and will be expanded upon. It will be used for the frontend and UX when displaying the setup page. Used to keep track of which sensors are connected to which device. PRODUCT TOPOLOGY

