# GPIO

## Raspberry Pi (B+, 2, 3 & Zero) GPIO Pins
<style>
    .GPIO-Pin-Table {
        text-align: center;
    } 
    .GPIO-Pin-Table th {
        border: 1px solid lightgrey;

    }
    .GPIO-Pin-Table td {
        border: 1px solid lightgrey;
        padding: 5px;
        text-align: center;
    }
    .GPIO-Ground {
        background-color: #1f67db;
        color: white;
    }
    .GPIO-Power {
        background-color: red;
        color: white;
    }
    .GPIO-UART {
        background-color: grey;
        color: black;
    }
    .GPIO-I2C {
        background-color: green;
        color: white;
    }
    .GPIO-SPI {
        background-color: orange;
        color: black;
    }
    .GPIO-GPIO {
        background-color: #ecf086;
        color: black;
    }
    .GPIO-Do-Not-Connect {
        background-color: black;
        color: white;
    }
</style>

<div class="GPIO-Pin-Table">

  <table>
  <thead>
    <tr>
      <th>Left Pin</th>
      <th>Pin#</th>
      <th>Pin#</th>
      <th>Right Pin</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="GPIO-Power">3V3</td>
      <td>1</td>
      <td>2</td>
      <td class="GPIO-Power">5V</td>
    </tr>
    <tr>
      <td class="GPIO-I2C">GPIO 2</td>
      <td>3</td>
      <td>4</td>
      <td class="GPIO-Power">5V</td>
    </tr>
    <tr>
      <td class="GPIO-I2C">GPIO 3</td>
      <td>5</td>
      <td>6</td>
      <td class="GPIO-Ground">GND</td>
    </tr>
    <tr>
      <td class="GPIO-GPIO">GPIO 4</td>
      <td>7</td>
      <td>8</td>
      <td class="GPIO-UART">GPIO 14</td>
    </tr>
    <tr>
      <td class="GPIO-Ground">GND</td>
      <td>9</td>
      <td>10</td>
      <td class="GPIO-UART">GPIO 15</td>
    </tr>
    <tr>
      <td class="GPIO-GPIO">GPIO 17</td>
      <td>11</td>
      <td>12</td>
      <td class="GPIO-GPIO">GPIO 18</td>
    </tr>
    <tr>
      <td class="GPIO-GPIO">GPIO 27</td>
      <td>13</td>
      <td>14</td>
      <td class="GPIO-Ground">GND</td>
    </tr>
    <tr>
      <td class="GPIO-GPIO">GPIO 22</td>
      <td>15</td>
      <td>16</td>
      <td class="GPIO-GPIO">GPIO 23</td>
    </tr>
    <tr>
      <td class="GPIO-Power">3V3</td>
      <td>17</td>
      <td>18</td>
      <td class="GPIO-GPIO">GPIO 24</td>
    </tr>
    <tr>
      <td class="GPIO-SPI">GPIO 10</td>
      <td>19</td>
      <td>20</td>
      <td class="GPIO-Ground">GND</td>
    </tr>
    <tr>
      <td class="GPIO-SPI">GPIO 9</td>
      <td>21</td>
      <td>22</td>
      <td class="GPIO-GPIO">GPIO 25</td>
    </tr>
    <tr>
      <td class="GPIO-SPI">GPIO 11</td>
      <td>23</td>
      <td>24</td>
      <td class="GPIO-SPI">GPIO 8</td>
    </tr>
    <tr>
      <td class="GPIO-Ground">GND</td>
      <td>25</td>
      <td>26</td>
      <td class="GPIO-SPI">GPIO 7</td>
    </tr>
    <tr>
      <td class="GPIO-Do-Not-Connect">DNC</td>
      <td>27</td>
      <td>28</td>
      <td class="GPIO-Do-Not-Connect">DNC</td>
    </tr>
    <tr>
      <td class="GPIO-GPIO">GPIO 5</td>
      <td>29</td>
      <td>30</td>
      <td class="GPIO-Ground">GND</td>
    </tr>
    <tr>
      <td class="GPIO-GPIO">GPIO 6</td>
      <td>31</td>
      <td>32</td>
      <td class="GPIO-GPIO">GPIO 12</td>
    </tr>
    <tr>
      <td class="GPIO-GPIO">GPIO 13</td>
      <td>33</td>
      <td>34</td>
      <td class="GPIO-Ground">GND</td>
    </tr>
    <tr>
      <td class="GPIO-GPIO">GPIO 19</td>
      <td>35</td>
      <td>36</td>
      <td class="GPIO-GPIO">GPIO 16</td>
    </tr>
    <tr>
      <td class="GPIO-GPIO">GPIO 26</td>
      <td>37</td>
      <td>38</td>
      <td class="GPIO-GPIO">GPIO 20</td>
    </tr>
    <tr>
      <td class="GPIO-Ground">GND</td>
      <td>39</td>
      <td>40</td>
      <td class="GPIO-GPIO">GPIO 21</td>
    </tr>
  </tbody>
</table>

  <table class="GPIO-Pin-Table">
  <thead>
    <tr>
      <th>Category</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Physical Pin Number</td>
    </tr>
    <tr>
      <td class="GPIO-Power">Power +</td>
    </tr>
    <tr>
      <td class="GPIO-Ground">Ground</td>
    </tr>
    <tr>
      <td class="GPIO-UART">UART</td>
    </tr>
    <tr>
      <td class="GPIO-I2C">I2C</td>
    </tr>
    <tr>
      <td class="GPIO-SPI">SPI</td>
    </tr>
    <tr>
      <td class="GPIO-GPIO">GPIO</td>
    </tr>
    <tr>
      <td class="GPIO-Do-Not-Connect">Do Not Connect</td>
    </tr>
  </tbody>
</table>

</div>

Need to make sure the raspberry pi settings are set to use the GPIO pins, check SPI, I2C, UART, and GPIO.

## Sensors Implementation

The sensors I bought that are the cheapest and most accessible have analog output, which requires an analog to digital converter (ADC) to convert the analog signal to a digital signal. I was planning on buying a pack of Arduino Nano's

## Plan
I plan to test and prototype the sensors with the arduino uno and the raspberry pi that I already have. I will then test the sensors with the arduino nano and the raspberry pi that I bought.

- [ ] Test the sensors with the arduino uno and the raspberry pi that I already have.
- [ ] Test the sensors with the arduino nano and the raspberry pi that I bought.