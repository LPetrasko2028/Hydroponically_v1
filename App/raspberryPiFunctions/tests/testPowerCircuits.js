import Gpio from 'onoff';

// Test the power circuit - turn on and off the relays
// GPIO pins:
//   - GPIO 6 - Water circuit relay
//   - GPIO 13 - Lighting circuit relay
//   - GPIO 19 - Empty
//   - GPIO 26 - Empty

// Converted -> GPIO pins: 518, 525, 531, 538

const WaterCircuitRelay = new Gpio.Gpio(518, 'out');
const LightingCircuitRelay = new Gpio.Gpio(525, 'out');
const EmptyCircuitRelay = new Gpio.Gpio(531, 'out');
const EmptyCircuitRelay2 = new Gpio.Gpio(538, 'out');

function testPowerCircuitRelays() {
    console.log('Testing power circuit relays...');

    // Turn on the water circuit relay
    WaterCircuitRelay.writeSync(WaterCircuitRelay.readSync() ^ 1);
    console.log('Flipping Water circuit relay');

    // Turn on the lighting circuit relay
    LightingCircuitRelay.writeSync(LightingCircuitRelay.readSync() ^ 1);
    console.log('Flipping Lighting circuit relay');

    // Turn on the empty circuit relay
    EmptyCircuitRelay.writeSync(EmptyCircuitRelay.readSync() ^ 1);
    console.log('Flipping Empty circuit relay');

    // Turn on the second empty circuit relay
    EmptyCircuitRelay2.writeSync(EmptyCircuitRelay2.readSync() ^ 1);
    console.log('Flipping Second Empty circuit relay');
}

let testPowerCircuitRelaysInterval = setInterval(testPowerCircuitRelays, 1000);

function endTestPowerCircuitRelays() {
    console.log('Ending test power circuit relays...');
    clearInterval(testPowerCircuitRelaysInterval);
    WaterCircuitRelay.unexport();
    LightingCircuitRelay.unexport();
    EmptyCircuitRelay.unexport();
    EmptyCircuitRelay2.unexport();
}

setTimeout(endTestPowerCircuitRelays, 5000);

process.on('SIGINT', endTestPowerCircuitRelays);
