
export async function getGrowCycles(req, res) {
    try {
        const growCycles = await getGrowCyclesFROMSQL();
        res.status(200).json(growCycles);
    } catch (error) {
        res.status(500).json({ message: 'Error finding grow cycles.' });
        return;
    }
}

export async function getCurrentGrowCycle(req, res) {
    try {
        const currentGrowCycle = await getCurrentGrowCycleFROMSQL();
        res.status(200).json(currentGrowCycle);
    } catch (error) {
        res.status(500).json({ message: 'Error finding current grow cycle.' });
        return;
    }
}

export async function getGrowCycleById(req, res) {
    try {
        const growCycle = await getGrowCycleByIdFROMSQL(req.params.id);
        res.status(200).json(growCycle);
    } catch (error) {
        res.status(500).json({ message: 'Error finding grow cycle by id.' });
        return;
    }
}

export async function createGrowCycle(req, res) {
    try {
        const growCycle = req.body.growCycle;
        const isGrowCycleCreated = await createGrowCycleINSQL(growCycle);
        if (!isGrowCycleCreated) {
            res.status(404).json({ message: 'Error creating grow cycle.' });
            return;
        }
        res.status(200).json({ message: 'Grow cycle has been created.' });
        return;
    } catch (error) {
        res.status(500).json({ message: 'Error creating grow cycle.' });
        return;
    }
}

export async function updateGrowCycle(req, res) {
    try {
        const growCycle = req.body.growCycle;
        const isGrowCycleUpdated = await updateGrowCycleINSQL(growCycle);
        if (!isGrowCycleUpdated) {
            res.status(404).json({ message: 'Error updating grow cycle.' });
            return;
        }
        res.status(200).json({ message: 'Grow cycle has been updated.' });
        return;
    } catch (error) {
        res.status(500).json({ message: 'Error updating grow cycle.' });
        return;
    }
}