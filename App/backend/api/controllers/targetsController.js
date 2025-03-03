// create target
// get target
// get target list
// update target
// delete target

export async function getTargets(req, res) {
    try {
        const targets = await getTargetsFROMSQL();
        res.status(200).json(targets);
    } catch (error) {
        res.status(500).json({ message: 'Error finding targets.' });
        return;
    }
}

export async function getTargetById(req, res) {
    try {
        const target = await getTargetByIdFROMSQL(req.params.id);
        if (!target) {
            res.status(404).json({ message: 'Error finding target by id.' });
            return;
        }
        res.status(200).json(target);
    } catch (error) {
        res.status(500).json({ message: 'Error finding target by id.' });
        return;
    }
}

export async function createTarget(req, res) {
    try {
        const target = req.body.target;
        const isTargetCreated = await createTargetINSQL(target);
        if (!isTargetCreated) {
            res.status(404).json({ message: 'Error creating target.' });
            return;
        }
        res.status(200).json({ message: 'Target has been created.' });
        return;
    } catch (error) {
        res.status(500).json({ message: 'Error creating target.' });
        return;
    }
}

export async function updateTarget(req, res) {
    try {
        const target = req.body.target;
        const isTargetUpdated = await updateTargetINSQL(target);
        if (!isTargetUpdated) {
            res.status(404).json({ message: 'Error updating target.' });
            return;
        }
        res.status(200).json({ message: 'Target has been updated.' });
        return;
    } catch (error) {
        res.status(500).json({ message: 'Error updating target.' });
        return;
    }
}

export async function deleteTarget(req, res) {
    try {
        const target = req.body.target;
        const isTargetDeleted = await deleteTargetINSQL(target);
        if (!isTargetDeleted) {
            res.status(404).json({ message: 'Error deleting target.' });
            return;
        }
        res.status(200).json({ message: 'Target has been deleted.' });
        return;
    } catch (error) {
        res.status(500).json({ message: 'Error deleting target.' });
        return;
    }
}