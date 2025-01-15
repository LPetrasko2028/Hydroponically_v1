import fs from 'fs';

/**
 * Reads the GPIO debug file and creates a mapping of GPIO names to numbers
 * @returns {Object} Mapping of GPIO names to their corresponding numbers
 * @throws {Error} If the debug file cannot be read or parsed
 */
function createGPIOMapping() {
    try {
        // Read the GPIO debug file
        const gpioDebugContent = fs.readFileSync('/sys/kernel/debug/gpio', 'utf8');
        
        // Initialize the mapping object
        const gpioMapping = {};
        
        // Split the content into lines
        const lines = gpioDebugContent.split('\n');
        
        // Regular expression to match GPIO lines
        // Matches patterns like "gpio-512 (ID_SDA   )" or "gpio-516 (GPIO4   )"
        const gpioRegex = /gpio-(\d+)\s+\(([A-Za-z0-9_]+)\s*\)/;
        
        // Process each line
        lines.forEach(line => {
            const match = line.match(gpioRegex);
            if (match) {
                const gpioNum = parseInt(match[1], 10);
                const gpioName = match[2].trim();
                gpioMapping[gpioName] = gpioNum;
            }
        });
        
        return gpioMapping;
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error('GPIO debug file not found. Make sure debugfs is mounted and you have the necessary permissions.');
        }
        if (error.code === 'EACCES') {
            throw new Error('Permission denied. Try running the script with sudo.');
        }
        throw error;
    }
}

/**
 * Example usage of the GPIO mapping function
 */
try {
    const mapping = createGPIOMapping();
    console.log('GPIO Name to Number Mapping:');
    console.log(JSON.stringify(mapping, null, 2));
    
    // Example output would look like:
    // {
    //   "ID_SDA": 512,
    //   "GPIO4": 516
    // }
} catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
}

export default createGPIOMapping;