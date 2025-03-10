// Command to run:
// node development_scripts/Generate_Data/GenerateSensorData.js

// Required dependencies
// convert to ES6 module

import nano from 'nano';
import moment from 'moment';

/**
 * Script to generate simulated sensor data and store it in CouchDB
 * 
 * Usage:
 * 1. Install dependencies: npm install nano moment
 * 2. Update the config settings below
 * 3. Run the script: node sensor-data-script.js
 */

// Configuration
const config = {
  // CouchDB connection settings
  couchdb: {
    url: 'http://couchdb:5984',  // CouchDB URL
    username: 'admin',             // CouchDB username
    password: 'strongpassword',          // CouchDB password
  },
  // Database and data generation settings
  sensor: {
    databaseName: 'ph_sensor_readings',  // Name of the database to create
    numReadings: 100,                 // Number of readings to generate
    startDate: '2025-01-01',          // Start date for readings
    minValue: 4,                      // Minimum sensor value
    maxValue: 10,                    // Maximum sensor value
    intervalMinutes: 1                  // Minutes between readings
  }
};

/**
 * Generate random sensor readings
 * @param {Object} options Configuration options for data generation
 * @returns {Array} Array of sensor reading objects
 */
function generateSensorData(options) {
  const {
    numReadings,
    startDate,
    minValue,
    maxValue,
    intervalMinutes
  } = options;
  
  const readings = [];
  let currentDate = moment(startDate);
  
  for (let i = 0; i < numReadings; i++) {
    // Generate a random value between min and max
    const value = parseFloat((Math.random() * (maxValue - minValue) + minValue).toFixed(2));
    
    readings.push({
      date: currentDate.format(),
      value: value
    });
    // Look into fixing the format of the date
    // Increment date by interval
    currentDate = currentDate.add(intervalMinutes, 'minutes');
  }
  
  return readings;
}

/**
 * Initialize CouchDB connection, create database, and insert data
 * @param {Object} couchConfig CouchDB connection settings
 * @param {Object} sensorConfig Sensor and database settings
 */
async function setupAndInsertData(couchConfig, sensorConfig) {
  // Connect to CouchDB
  const couchURL = `${couchConfig.url}`;
  const couchAuth = {
    username: couchConfig.username,
    password: couchConfig.password
  };
  
  console.log(`Connecting to CouchDB at ${couchURL}...`);
  const couchdbServer = nano({
    url: couchURL,
    requestDefaults: { jar: true }
  });
  
  try {
    // Authenticate with CouchDB
    await couchdbServer.auth(couchAuth.username, couchAuth.password);
    console.log('Authentication successful');
    
    // Create the database (or connect to it if it exists)
    let db;
    try {
      console.log(`Creating database: ${sensorConfig.databaseName}`);
      db = await couchdbServer.db.create(sensorConfig.databaseName);
      console.log(`Database '${sensorConfig.databaseName}' created successfully`);
    } catch (err) {
      if (err.statusCode === 412) {
        console.log(`Database '${sensorConfig.databaseName}' already exists`);
      } else {
        throw err;
      }
    }
    
    // Connect to the database
    db = couchdbServer.use(sensorConfig.databaseName);
    
    // Generate sensor data
    console.log(`Generating ${sensorConfig.numReadings} sensor readings...`);
    const sensorData = generateSensorData(sensorConfig);
    
    // Insert data into CouchDB
    console.log('Inserting data into CouchDB...');
    const insertPromises = sensorData.map(reading => {
      return db.insert({
        ...reading,
        timestamp: new Date().toISOString()
      });
    });
    
    const results = await Promise.all(insertPromises);
    console.log(`Successfully inserted ${results.length} documents`);
    
    // Verify data was inserted
    const info = await db.info();
    console.log(`Database now contains ${info.doc_count} documents`);
    
  } catch (error) {
    console.error('Error:', error.message);
    if (error.statusCode) {
      console.error(`Status code: ${error.statusCode}`);
    }
  }
}

// Run the script
(async () => {
  try {
    await setupAndInsertData(config.couchdb, config.sensor);
    console.log('Script completed successfully');
  } catch (err) {
    console.error('Script failed:', err);
  }
})();