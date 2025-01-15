# Devices

Connecting devices to the Raspberry Pi is a little tricky. We need to ensure the correct drivers are installed and the correct permissions are set.

Devices:
- Arduino
    - Arduino Uno
    - Arduino Mega
    - Arduino Nano
- ESP 32
- ESP8266

## Arduino

Arduino devices will need the CH340 drivers installed.


## ESP

ESP devices will need the drivers installed. The drivers depend on the chip used.

Some devices use the CH340 drivers, others use the CP210x drivers.



## Drivers

### CH340

The CH340 drivers are used by the Arduino Uno, Mega, and Nano.

https://learn.sparkfun.com/tutorials/how-to-install-ch340-drivers/all

### CP210x

The CP210x drivers are used by the ESP32 and ESP8266.

https://randomnerdtutorials.com/install-esp32-esp8266-usb-drivers-cp210x-windows/
https://www.silabs.com/developer-tools/usb-to-uart-bridge-vcp-drivers
