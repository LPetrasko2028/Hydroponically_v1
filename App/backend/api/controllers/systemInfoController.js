// get system info
// get system status
// get system logs
// get system settings
// update system settings

export async function getSystemInfo(req, res) {
    try {
        const systemInfo = await findSystemInfo();
        res.status(200).json(systemInfo);
    } catch (error) {
        res.status(500).json({ message: 'Error finding system info.' });
        return;
    }
}

export async function getSystemStatus(req, res) {
    try {
        const systemStatus = await findSystemStatus();
        res.status(200).json(systemStatus);
    } catch (error) {
        res.status(500).json({ message: 'Error finding system status.' });
        return;
    }
}

export async function getSystemLogs(req, res) {
    try {
        const systemLogs = await findSystemLogs();
        res.status(200).json(systemLogs);
    } catch (error) {
        res.status(500).json({ message: 'Error finding system logs.' });
        return;
    }
}

export async function getSystemSettings(req, res) {
    try {
        const systemSettings = await findSystemSettings();
        res.status(200).json(systemSettings);
    } catch (error) {
        res.status(500).json({ message: 'Error finding system settings.' });
        return;
    }
}

export async function updateSystemSettings(req, res) {
    try {
        const systemSettings = req.body.systemSettings;
        const isSystemSettingsUpdated = await updateSystemSettings(systemSettings);
        if (!isSystemSettingsUpdated) {
            res.status(404).json({ message: 'Error updating system settings.' });
            return;
        }
        res.status(200).json({ message: 'System settings have been updated.' });
        return;
    } catch (error) {
        res.status(500).json({ message: 'Error updating system settings.' });
        return;
    }
}

export async function resetSystemSettings(req, res) {
    try {
        const systemSettings = req.body.systemSettings;
        const isSystemSettingsReset = await resetSystemSettings(systemSettings);
        if (!isSystemSettingsReset) {
            res.status(404).json({ message: 'Error deleting system settings.' });
            return;
        }
        res.status(200).json({ message: 'System settings have been reset.' });
        return;
    } catch (error) {
        res.status(500).json({ message: 'Error resetting system settings.' });
        return;
    }
}