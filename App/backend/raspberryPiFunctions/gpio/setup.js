const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const { lookupPhysicalToGPIO } = require("./lookup.js");

const gpioDirectory = path.join(__dirname, "gpio");

// setupGPIO
//   - setups the GPIO pins
//   - sets up the physical pins
//   - sets up the BCM pins
async function setupGPIO() {
    // setupGPIO
    //   - setups the GPIO pins
    //   - sets up the physical pins
    //   - sets up the BCM pins
    await setupGPIOPins();
    await setupPhysicalPins();
    await setupBCMPins();
}