const ManagerCreateModel = require('./ManagerCreate.model');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SuperAdminSettings = require('../settings/superadmin.settings.model');


// Create a new manager
const createManager = async (req, res) => {
    try {
        const { username, name, email, password } = req.body;

        // Check if the manager already exists
        const existingManager = await ManagerCreateModel.findOne({ email });
        if (existingManager) {
            return res.status(400).json({ message: 'Manager already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new manager
        const newManager = new ManagerCreateModel({
            username,
            name,
            email,
            password: hashedPassword,
        });

        // Save the manager to the database
        await newManager.save();

        res.status(201).json({ message: 'Manager created successfully', data: newManager });
    } catch (error) {
        res.status(500).json({ message: 'Error creating manager', error });
    }
};
// Get all managers
const getAllManagers = async (req, res) => {
    try {
        const managers = await ManagerCreateModel.find();
        res.status(200).json({ message: 'Managers retrieved successfully', data: managers });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving managers', error });
    }
};
// Get a manager by ID
const getManagerById = async (req, res) => {
    try {
        const managerId = req.params.id;
        const manager = await ManagerCreateModel.findById(managerId);
        if (!manager) {
            return res.status(404).json({ message: 'Manager not found' });
        }
        res.status(200).json({ message: 'Manager retrieved successfully', data: manager });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving manager', error });
    }
};

// Update a manager
const updateManager = async (req, res) => {
    try {
        const managerId = req.params.id;
        const { username, name, email, password } = req.body;

        // Find the manager by ID
        const manager = await ManagerCreateModel.findById(managerId);
        if (!manager) {
            return res.status(404).json({ message: 'Manager not found' });
        }

        // Update the manager's details
        if (username) manager.username = username;
        if (name) manager.name = name;
        if (email) manager.email = email;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            manager.password = hashedPassword;
        }

        // Save the updated manager to the database
        await manager.save();

        res.status(200).json({ message: 'Manager updated successfully', data: manager });
    } catch (error) {
        res.status(500).json({ message: 'Error updating manager', error });
    }
};

// Delete a manager
const deleteManager = async (req, res) => {
    try {
        const managerId = req.params.id;

        // Find the manager by ID
        const manager = await ManagerCreateModel.findById(managerId);
        if (!manager) {
            return res.status(404).json({ message: 'Manager not found' });
        }
        manager.status = 'inactive';
        await manager.save();

        res.status(200).json({ message: 'Manager deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting manager', error });
    }
};

module.exports = {
    createManager,
    getAllManagers,
    getManagerById,
    updateManager,
    deleteManager,
};