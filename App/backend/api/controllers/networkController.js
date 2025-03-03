// create network
// get network topology/ device list
// get network status
// find network
// update network
// delete network

import findNetwork from '../raspberryPiFunctions/network/findNetwork.js';

export async function findNetwork(req, res) {

    // move error handling to findNetwork function and respond with error message
    try {
        // get network topology/ device list from sql database
        const currentNetwork = await getNetwork();
        // scan network
        const network = await findNetwork();
        /** Separate finding new devices on the network into compareNetwork function */
        const newDevices = await compareNetwork(network, currentNetwork);
    } catch (error) {
        res.status(500).json({ message: 'Error finding network.' });
        return;
    }
    const currentNetwork = await getNetwork();
    const network = await findNetwork();
    if (!network) {
        res.status(404).json({ message: 'Error scanning network. No network found.' });
        return;
    }
    if (network.length === 0) {
        res.status(404).json({ message: 'Error scanning network. No devices found.' });
        return;
    }
    if (network === currentNetwork) {
        res.status(200).json({ message: 'Network is up to date.' });
        return;
    }
    if (network !== currentNetwork) {
        const isNetworkUpdated = await updateNetwork(network);
        if (!isNetworkUpdated) {
            res.status(404).json({ message: 'Error updating network.' });
            return;
        }
        res.status(200).json({ message: 'Network has been updated.' });
        return;
    }
}

export async function getNetworkTopology(req, res) {
    try {
        const networkTopology = await getNetworkTopologyFROMSQL();
        res.status(200).json(networkTopology);
    } catch (error) {
        res.status(500).json({ message: 'Error finding network topology.' });
        return;
    }
}

export async function getNetworkDevices(req, res) {
    try {
        const networkDevices = await getNetworkDevicesFROMSQL();
        res.status(200).json(networkDevices);
    } catch (error) {
        res.status(500).json({ message: 'Error finding network devices.' });
        return;
    }
}

export async function getNetworkStatus(req, res) {
    try {
        const networkStatus = await getNetworkStatusFROMSQL();
        res.status(200).json(networkStatus);
    } catch (error) {
        res.status(500).json({ message: 'Error finding network status.' });
        return;
    }
}

export async function updateNetwork(req, res) {
    try {
        const network = req.body.network;
        const isNetworkUpdated = await updateNetworkINSQL(network);
        if (!isNetworkUpdated) {
            res.status(404).json({ message: 'Error updating network.' });
            return;
        }
        res.status(200).json({ message: 'Network has been updated.' });
        return;
    } catch (error) {
        res.status(500).json({ message: 'Error updating network.' });
        return;
    }
}

export async function deleteNetwork(req, res) {
    try {
        const network = req.body.network;
        const isNetworkDeleted = await deleteNetworkINSQL(network);
        if (!isNetworkDeleted) {
            res.status(404).json({ message: 'Error deleting network.' });
            return;
        }
        res.status(200).json({ message: 'Network has been deleted.' });
        return;
    } catch (error) {
        res.status(500).json({ message: 'Error deleting network.' });
        return;
    }
}