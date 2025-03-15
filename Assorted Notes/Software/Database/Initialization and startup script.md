# Initialization and startup script

## Overview

I want to create a script that will initialize the database and set up the user account for a given username and password. This script will be used to set up the database for a new installation of the Hydroponically system.

## On Startup
Required Databases:
- user_preferences
- network
- sensors
- relays
- devices
- sensor_readings
- relay_logs
- device_logs
- schedules
- grow_cycles
- grows
- system_info
- system_logs
- notifications
- tasks
- settings

Required Views:
- by_user
- by_preference_type

Required Design Documents:
- _design/preferences
- _design/network
- _design/sensors
- _design/relays
- _design/devices
- _design/sensor_readings
- _design/relay_logs
- _design/device_logs
- _design/schedules
- _design/grow_cycles
- _design/grows
- _design/system_info
- _design/system_logs
- _design/notifications
- _design/tasks
- _design/settings

## Steps to complete - User needs to be created first
1. Create Databases
2. Create Views
3. Create Design Documents
4. Create Index Documents
5. Create User Account - (with user creation, preferences, )
6. Initialization program


## Initialization Program
1. Check if database exists
2. User input for preferences
3. User input for devices (arduinos)
4. User input for sensors
5. User input for relays
6. User Verifies setup with tests that are presented (for every device-blink, sensor-read, relay-switch)
