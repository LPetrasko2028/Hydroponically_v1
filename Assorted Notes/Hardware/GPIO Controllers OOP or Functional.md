# OOP vs Functional

The following is a comparison of the two methods of controlling GPIO pins in js.

## OOP

For OOP I would create a class for each use case of GPIO pins.
 
1) For the power/peristaltic pump relay circuits I would create a RelayCircuitController class and objects for each relay circuit.
2) For the sensors I would create a I2CController class and a SensorController class.