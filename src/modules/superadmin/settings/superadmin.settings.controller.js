const SuperAdminSettings = require('./superadmin.settings.model');

// Create settings
const createSuperAdminSettings = async (req, res) => {
    try {
        // Avval bitta sozlama mavjudligini tekshiramiz (odatda bitta bo'lishi kerak)
        const existing = await SuperAdminSettings.findOne();
        if (existing) {
            return res.status(400).json({ message: 'Settings already exist.' });
        }

        const newSettings = new SuperAdminSettings(req.body);
        const savedSettings = await newSettings.save();

        res.status(201).json({ message: 'Settings created successfully', data: savedSettings });
    } catch (error) {
        res.status(500).json({ message: 'Error creating settings', error });
    }
};
// Update settings
const updateSuperAdminSettings = async (req, res) => {
    try {
        const settingsId = req.params.id; // ID URL dan olinadi
        const updatedSettings = await SuperAdminSettings.findByIdAndUpdate(
            settingsId,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedSettings) {
            return res.status(404).json({ message: 'Settings not found' });
        }

        res.status(200).json({ message: 'Settings updated successfully', data: updatedSettings });
    } catch (error) {
        res.status(500).json({ message: 'Error updating settings', error });
    }
};
const getSuperAdminSettings = async (req, res) => {
    try {
        const settings = await SuperAdminSettings.findOne();
        if (!settings) {
            return res.status(404).json({ message: 'Settings not found' });
        }
        res.status(200).json({ message: 'Settings retrieved successfully', data: settings });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving settings', error });
    }
}

module.exports = {
    createSuperAdminSettings,
    updateSuperAdminSettings,
    getSuperAdminSettings
};