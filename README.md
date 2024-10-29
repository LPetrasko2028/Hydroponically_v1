This is the launch point for the Hydroponically project. I want to try to make a simple, easy to use, and easy to understand program that can be used to control a hydroponic system.
This is the first iteration and will be a rough draft of what I want.
I am planning on using Deno, but the technology used may change.
GOALS:
[] GPIO control and general raspberry pi control concepts
    -[] Reading pH sensor data
    -[] Reading TDS sensor data
    -[] Reading Temperature sensor data
    -[] Controlling peristaltic pumps
    -[] Control water pump - this will be the most difficult part - CONTROLLING power from the wall socket to pump. (relay switch, residual current device, ) !!! WOO HOO !!!
    -[] Control lighting - Once the water pump solution is working I will be able to control the lighting.
[] Backend to control the hydroponic system
    -[] Watering
    -[] Lighting
    -[] Nutrient delivery
    -[] Temperature control
    -[] pH control
[] Frontend to control the hydroponic system
    -[] base UI for backend functions
        -[] watering
        -[] lighting
        -[] nutrient delivery
        -[] temperature control
        -[] pH control
    -[] Graphs for backend data
        -[] Watering
        -[] Lighting
        -[] Nutrient delivery
        -[] Temperature control
        -[] pH control
    -[] Design for the UI
        -[] Color scheme
        -[] Layout
        -[] Typography
        -[] Icons
[] Documentation
    -[] User Manual
        -[] How to set up the hydroponic system
            -[] Raspberry Pi
                -[] Power supply
                -[] Running the program
                -[] Wi-Fi
            -[] pH sensor
            -[] TDS sensor
            -[] Temperature sensor
            -[] Water pump
            -[] Lighting
            -[] Nutrient delivery
            -[] Temperature control
            -[] pH control
        -[] How to use the UI
            -[] Watering
            -[] Lighting
            -[] Nutrient delivery
            -[] Temperature control
            -[] pH control
        -[] Back up data with maybe github
    -[] Developer Manual
        -[] How the system works
            -[] Raspberry Pi
            -[] sensors
            -[] relay/power control
            -[] Programming
        -[] Contributing to the project
            -[] How to customize your own hydroponic system
            -[] How to request your added features to the project repository
            -[] How to contribute to the documentation
