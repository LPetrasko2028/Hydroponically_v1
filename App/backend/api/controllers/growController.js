
export async function getGrows(req, res) {
    try {
        const grows = await getGrowsFROMSQL();
        res.status(200).json(grows);
    } catch (error) {
        res.status(500).json({ message: 'Error finding grows.' });
        return;
    }
}

export async function getCurrentGrow(req, res) {
    try {
        const currentGrow = await getCurrentGrowFROMSQL();
        res.status(200).json(currentGrow);
    } catch (error) {
        res.status(500).json({ message: 'Error finding current grow.' });
        return;
    }
}

export async function getGrowById(req, res) {
    try {
        const grow = await getGrowByIdFROMSQL(req.params.id);
        if (!grow) {
            res.status(404).json({ message: 'Error finding grow by id.' });
            return;
        }
        res.status(200).json(grow);
    } catch (error) {
        res.status(500).json({ message: 'Error finding grow by id.' });
        return;
    }
}

export async function startGrow(req, res) {
    try {
        const grow = req.body.grow;
        const isGrowStarted = await startGrowINSQL(grow);
        if (!isGrowStarted) {
            res.status(404).json({ message: 'Error starting grow.' });
            return;
        }
        res.status(200).json({ message: 'Grow has been started.' });
        return;
    } catch (error) {
        res.status(500).json({ message: 'Error starting grow.' });
        return;
    }
}

export async function endGrow(req, res) {
    try {
        const grow = req.body.grow;
        const isGrowEnded = await endGrowINSQL(grow);
        if (!isGrowEnded) {
            res.status(404).json({ message: 'Error ending grow.' });
            return;
        }
        res.status(200).json({ message: 'Grow has been ended.' });
        return;
    } catch (error) {
        res.status(500).json({ message: 'Error ending grow.' });
        return;
    }
}

