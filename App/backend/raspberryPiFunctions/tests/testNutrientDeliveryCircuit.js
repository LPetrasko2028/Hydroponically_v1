import Gpio from 'onoff';

// Test the nutrient delivery circuit - turn on and off the relays
// GPIO pins:
//  - GPIO 18 - pH up
//  - GPIO 23 - pH down
//  - GPIO 24 - Nutrient 1
//  - GPIO 25 - Nutrient 2
//  - GPIO 12 - Nutrient 3
//  - GPIO 16 - Empty
//  - GPIO 20 - Empty
//  - GPIO 21 - Empty

// Converted -> GPIO pins: 530, 535, 536, 537, 524, 528, 532, 533

const pHUp = new Gpio.Gpio(530, 'out');
const pHDown = new Gpio.Gpio(535, 'out');
const Nutrient1 = new Gpio.Gpio(536, 'out');
const Nutrient2 = new Gpio.Gpio(537, 'out');
const Nutrient3 = new Gpio.Gpio(524, 'out');
const EmptyCircuitRelay = new Gpio.Gpio(528, 'out');
const EmptyCircuitRelay2 = new Gpio.Gpio(532, 'out');
const EmptyCircuitRelay3 = new Gpio.Gpio(533, 'out');

function testNutrientDeliveryCircuit() {
    console.log('Testing nutrient delivery circuit...');

    // Flip the pH up relay
    pHUp.writeSync(pHUp.readSync() ^ 1);
    console.log('Flipping pH up relay');

    // Flip the pH down relay
    pHDown.writeSync(pHDown.readSync() ^ 1);
    console.log('Flipping pH down relay');

    // Turn on the nutrient 1 relay
    Nutrient1.writeSync(Nutrient1.readSync() ^ 1);
    console.log('Flipping Nutrient 1 relay');

    // Turn on the nutrient 2 relay
    Nutrient2.writeSync(Nutrient2.readSync() ^ 1);
    console.log('Flipping Nutrient 2 relay');

    // Turn on the nutrient 3 relay
    Nutrient3.writeSync(Nutrient3.readSync() ^ 1);
    console.log('Flipping Nutrient 3 relay');

    // Turn on the empty circuit relay
    EmptyCircuitRelay.writeSync(EmptyCircuitRelay.readSync() ^ 1);
    console.log('Flipping Empty circuit relay');

    // Turn on the second empty circuit relay
    EmptyCircuitRelay2.writeSync(EmptyCircuitRelay2.readSync() ^ 1);
    console.log('Flipping Second Empty circuit relay');

    // Turn on the third empty circuit relay
    EmptyCircuitRelay3.writeSync(EmptyCircuitRelay3.readSync() ^ 1);
    console.log('Flipping Third Empty circuit relay');
}

let testNutrientDeliveryCircuitInterval = setInterval(testNutrientDeliveryCircuit, 1000);

function endTestNutrientDeliveryCircuit() {
    console.log('Ending test nutrient delivery circuit...');
    clearInterval(testNutrientDeliveryCircuitInterval);
    pHUp.unexport();
    pHDown.unexport();
    Nutrient1.unexport();
    Nutrient2.unexport();
    Nutrient3.unexport();
    EmptyCircuitRelay.unexport();
    EmptyCircuitRelay2.unexport();
    EmptyCircuitRelay3.unexport();
}

setTimeout(endTestNutrientDeliveryCircuit, 5000);

process.on('SIGINT', endTestNutrientDeliveryCircuit);