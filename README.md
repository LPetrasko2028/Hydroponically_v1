# Hydroponically

This is the launch point for the Hydroponically project. I want to try to make a simple, easy to use, and easy to understand program that can be used to control a hydroponic system.
This is the first iteration and will be a rough draft of what I want.
I am planning on using Deno, but the technology used may change.
[Markdown Reference](https://www.markdownguide.org/cheat-sheet/)

## GOALS:
1. [X] GPIO control and general raspberry pi control concepts
    - [X] Reading pH sensor data
    - [X] Reading TDS sensor data
    - [X] Reading Temperature sensor data
    - [X] Controlling peristaltic pumps
    - [X] Control water pump - CONTROLLING power from the wall socket to pump. (relay switch) !!! WOO HOO !!!
    - [X] Control lighting - Once the water pump solution is working I will be able to control the lighting.
2. [ ] Backend to control the hydroponic system
    - [ ] Watering
    - [ ] Lighting
    - [ ] Nutrient delivery
    - [ ] Temperature control
    - [ ] pH control
    - [ ] Write variable tests for each physical component
    - [ ] Write unit tests for each function
3. [ ] Frontend to control the hydroponic system
    - [ ] base UI for backend functions
        - [ ] watering
        - [ ] lighting
        - [ ] nutrient delivery
        - [ ] temperature control
        - [ ] pH control
        - [ ] Testing for the previous items
    - [ ] Graphs for backend data
        - [ ] Watering
        - [ ] Lighting
        - [ ] Nutrient delivery
        - [ ] Temperature control
        - [ ] pH control
    - [ ] Design for the UI
        - [ ] Color scheme
        - [ ] Layout
        - [ ] Typography
        - [ ] Icons
4. [ ] Legal Requirements
    - [ ] Set up business
    - [ ] License
    - [ ] Review Privacy Policy
    - [ ] Review Terms of Service
    - [ ] Code of Conduct
    - [ ] Contributing Guidelines
5. [ ] Network mesh of Hydroponically devices
    - [ ] Create a network of devices by using network discovery protocols
    - [ ] Create backend for network discovery
    - [ ] Create frontend for network discovery
        - [ ] Create a network map
        - [ ] Create a device list
        - [ ] Ability to add or remove a device to any network
6. [ ] Documentation
    - [ ] User Manual
        - [ ] How to set up the hydroponic system
            - [ ] Raspberry Pi
                - [ ] Power supply
                - [ ] Running the program
                - [ ] Wi-Fi
            - [ ] pH sensor
            - [ ] TDS(Nutrients) sensor
            - [ ] Temperature sensor
            - [ ] Water pump
            - [ ] Lighting
            - [ ] TDS(Nutrients) control
            - [ ] Temperature control
            - [ ] pH control
        - [ ] How to use the UI
            - [ ] Watering
            - [ ] Lighting
            - [ ] Nutrient delivery
            - [ ] Temperature control
            - [ ] pH control
        - [ ] Back up data with maybe github
    - [ ] Developer Manual
        - [ ] How the system works
            - [ ] Raspberry Pi
            - [ ] sensors
            - [ ] relay/power control
            - [ ] Programming
        - [ ] Contributing to the project
            - [ ] How to customize your own hydroponic system
            - [ ] How to request your added features to the project repository
            - [ ] How to contribute to the documentation
    - [ ] Notes to show the development process
        - [ ] Planning
            - [ ] Raspberry Pi
            - [ ] pH sensor
            - [ ] TDS(Nutrients) sensor
            - [ ] Temperature sensor
            - [X] Relay/Power control
            - [X] Water pump
            - [X] Lighting
        - [ ] Physical design and implementation
            - [ ] Raspberry Pi
            - [ ] pH sensor
            - [ ] TDS(Nutrients) sensor
            - [ ] Temperature sensor
            - [X] Relay/Power control
            - [X] Water pump
            - [X] Lighting
        - [ ] Programming
