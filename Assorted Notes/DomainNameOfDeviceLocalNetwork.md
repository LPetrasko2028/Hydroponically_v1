# How to set the domain name of a device on a local network

I want to set the domain name of the Hydroponically device on a local network. 
I have seen this done with raspberry pi itself and pihole.

This feature would increase usability and make it easier for users to connect to the device.

Look at pihole's code and documentation for more information.

## How to set the domain name of a device on a local network

I'll help you set up a local domain name for your Linux device. This is commonly done using the `/etc/hosts` file or through Avahi/mDNS.

Here's the simplest method using `/etc/hosts`:

1. SSH into your device or open a terminal, then edit the hosts file:
```bash
sudo nano /etc/hosts
```

2. Add a line with your desired local domain name:
```
127.0.1.1    your-device-name.local    your-device-name
```

For example:
```
127.0.1.1    raspberrypi.local    raspberrypi
```

Another popular method is using Avahi (which is usually pre-installed on Raspberry Pi OS):

1. First, make sure Avahi is installed:
```bash
sudo apt-get update
sudo apt-get install avahi-daemon
```

2. Your device will automatically be accessible as `hostname.local`. To change the hostname:
```bash
sudo hostnamectl set-hostname your-new-name
```

After changing the hostname, you'll need to reboot:
```bash
sudo reboot
```

Then you can access your device using `your-new-name.local`

Would you like me to explain more about either method or discuss other approaches?