# Circuit Safety

This is a list of things to consider when designing a circuit safely.

## Things to consider

1. Voltage
2. Current
3. Resistance
4. Temperature
5. Fuses
6. Insulation
7. Electrical Noise

## From Claude (AI)
1. Isolation and Insulation


    - Use properly rated relays with adequate isolation between control and power circuits
    - Ensure voltage ratings of all components exceed 120V AC by a safe margin (typically 2-3x)
    - Use appropriate insulation and spacing between high and low voltage sections
    - Consider using optically isolated relay modules for added safety


2. Protection Mechanisms


    - Install appropriate fuses or circuit breakers rated for the expected load
    - Include transient voltage suppression (MOVs, TVS diodes) to protect from surges
    - Use snubber circuits across relay contacts to reduce arcing
    - Consider adding emergency stop functionality


3. Grounding and Enclosure


    - Proper grounding of all metal components and enclosures
    - Use a suitable NEMA-rated enclosure to prevent accidental contact
    - Include strain relief for all cable entries
    - Clearly mark high voltage warnings on enclosure


4. Component Selection


    - Use UL listed or similarly certified components
    - Select relays with appropriate current ratings (include safety margin)
    - Consider relay contact material suitable for AC switching
    - Use proper wire gauge rated for the current


5. Layout Considerations


    - Maintain adequate clearance between high and low voltage sections
    - Route control and power wiring separately
    - Include proper ventilation if needed
    - Make all connections in proper junction boxes

## Notes from the Claude's response

- **Optically isolated relay modules** - Safer than other types of relays. The control circuit is isolated from the power circuit completely. 
On/Off switching is done by LED, Light Sensors, and the relay contacts.

    1. Basic Structure


        - Input side: LED that converts electrical signal to light
        - Isolation barrier: Clear, insulating material (usually transparent plastic)
        - Output side: Photodetector (usually a phototransistor) that controls the relay
        - The LED and photodetector have no electrical connection - only light passes between them


    2. Safety Benefits


        - Complete electrical isolation between control and power circuits
        - Typically rated for 2500-5000V isolation
        - Prevents high voltage from reaching low voltage control circuits
        - Protects both equipment and users from electrical faults
        - Eliminates ground loops between different circuit sections

    3. Relay Characteristics Chart

        Characteristic        | Optical  | Mechanical | SSR    | Reed
        ---------------------|----------|------------|--------|--------
        Isolation Quality    | Excellent| Good       | Good   | Good
        Switching Speed      | Fast     | Slow       | Fast   | Fast
        Current Handling     | Good     | Excellent  | Good   | Poor
        Lifespan            | Excellent| Fair       | Good   | Good
        Cost                | Moderate | Low        | High   | Moderate
        Size                | Small    | Large      | Small  | Small
        Noise Immunity      | Excellent| Fair       | Good   | Fair


- **Amperage rating considerations for relays** - 3 types of device amperage needs: Resistive, Inductive, and Capacitive loads.
    - General considerations:
        - General rule: Use relay rated 25-50% above max expected current
        - For inductive loads: Double or triple the continuous rating

    - Resistive loads (heaters, incandescent bulbs): 
        - Closest to rated current value
        - Minimal inrush current
    - Inductive loads (motors, transformers):
        - Can draw 6-10x rated current at startup
        - Need higher rated relay than continuous current
    - Capacitive loads (LED lights, power supplies): Amperage rating for relay is 10-20x the rated current of the device/load
        - e.g. LED lights: 10-20x rated current + 25-50% safety margin - a 45W LED light would be 45/120 = 0.375A. 0.375A * 20 = 7.5A + 25-50% ~= 10A relay required rating
        - High inrush current spikes
        - May need 10-20x service current rating
- **What kind of isolation do you need?** - 
    - Clearance (through air): Minimum 2.5mm for 120V, 3mm for 240V, Recommended 4-6mm for safety margin
    - Creepage (along surfaces): Minimum 3-4mm for 120V, 4mm for 240V, Recommended 6-8mm for safety margin
    - Separation: Separate control and power circuits completely, Physical barriers between sections - my implementation will be separate containers for each section.
- **Transient voltage suppression (TVS)** - I don't think we need to worry about this for this project.
- **Grounding and enclosure** - 
    1. Grounding Requirements

        - Main Ground Types:

            - Protective Earth (PE) - Green/Yellow wire
            - Circuit/Signal Ground
            - Chassis Ground

        - Implementation:

            - Minimum 14 AWG copper for PE connection
            - Single point grounding to avoid loops
            - Dedicated ground bars/terminals
            - Bond all metal parts to ground
            - Keep ground paths short and direct

    2. Enclosure Specifications

        - NEMA Ratings:
        
            - NEMA 1: Indoor, basic protection
            - NEMA 12: Indoor, dust/drip protection
            - NEMA 4: Outdoor, waterproof
            - NEMA 4X: Outdoor, corrosion resistant
        
        - Material Options:
        
            - Metal: Better EMI shielding, grounding
            - Plastic: Better isolation, no grounding needed
            - Must be UL listed for electrical enclosures

    3. Required Features

        - Cable Entry:
        
            - ==Strain relief/cable glands==
            - Proper sizing for wire bundles
            - ==Sealed entries for moisture protection==
        
        - Ventilation:
        
            - ==If needed for heat dissipation==
            - Filtered vents to maintain NEMA rating
        
        - Access:
        
            - Hinged cover or removable panel
            - ==Lockable for safety==
            - Clear service access space

    4. Safety Markings/Labels

        - ==High voltage warning labels==
        - ==Ground connection points marked==
        - <mark>==Circuit identification==</mark>
        - Emergency stop location (if applicable)
        - Manufacturer/rating information


- **NEMA-rated enclosure** -
- **UL-listed or similarly certified components** -

## Summary

I am leaning towards using Optically isolated relay modules if the price is in my range, otherwise I will use mechanical relays.

The control circuit will be isolated from the power circuit completely by default, so other than organizing cables and wiring, insulation, and separate containers, I don't think there will be any other considerations. 