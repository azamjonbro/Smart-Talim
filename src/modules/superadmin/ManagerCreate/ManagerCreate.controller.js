const ManagerCreateModel = require('./ManagerCreate.model');
const bcrypt = require('bcrypt');


const createManager = async (req, res) => {
    try {
        const { username, name, email, password } = req.body;
        const superAdminId = req.user._id;
        const existingManager = await ManagerCreateModel.findOne({ username });
        if (existingManager) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        
        const newManager = new ManagerCreateModel({
            username,
            name,
            email,
            password: hashedPassword,
            createdBy: superAdminId
        });

        await newManager.save();
        res.status(201).json({ message: 'Manager created successfully', data: newManager });
    } catch (error) {
        res.status(500).json({ message: 'Error creating manager', error });
    }
};

const getAllManagers = async (req, res) => {
    try {
        const managers = await ManagerCreateModel.find().populate('createdBy', 'username email');
        res.status(200).json({ message: 'Managers retrieved successfully', data: managers });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving managers', error });
    }
};

const getManagerById = async (req, res) => {
    try {
        const manager = await ManagerCreateModel.findById(req.params.id).populate('createdBy', 'username email');
        if (!manager) return res.status(404).json({ message: 'Manager not found' });
        res.status(200).json({ message: 'Manager retrieved successfully', data: manager });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving manager', error });
    }
};

const updateManager = async (req, res) => {
    try {
        const manager = await ManagerCreateModel.findById(req.params.id);
        if (!manager) return res.status(404).json({ message: 'Manager not found' });

        const { username, name, email, password, status } = req.body;

        if (username && username !== manager.username) {
            const exists = await ManagerCreateModel.findOne({ username });
            if (exists) return res.status(400).json({ message: 'Username already exists' });
        }

        if (username) manager.username = username;
        if (name) manager.name = name;
        if (email) manager.email = email;
        if (password) manager.password = await bcrypt.hash(password, 10);
        if (status) manager.status = status;

        await manager.save();
        res.status(200).json({ message: 'Manager updated successfully', data: manager });
    } catch (error) {
        res.status(500).json({ message: 'Error updating manager', error });
    }
};

const deleteManager = async (req, res) => {
    try {
        const manager = await ManagerCreateModel.findById(req.params.id);
        if (!manager) return res.status(404).json({ message: 'Manager not found' });

        manager.status = 'inactive';
        await manager.save();

        res.status(200).json({ message: 'Manager deactivated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deactivating manager', error });
    }
};

// endi bu yerda managerni login qilish uchun function yozamiz

const loginManager = async (req, res) => {
    try {
        const { username, password } = req.body;
        const manager = await ManagerCreateModel.findOne({ username });
        
        if (!manager) {
            return res.status(404).json({ message: 'Manager not found' });
        }
        
        const isMatch = await bcrypt.compare(password, manager.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        if (typeof manager.generateAuthToken !== 'function') {
            return res.status(500).json({ message: 'Auth token generation method is missing.' });
        }

        const token = manager.generateAuthToken();
        
        res.status(200).json({ message: 'Login successful', token });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};


module.exports = {
    createManager,
    getAllManagers,
    getManagerById,
    updateManager,
    deleteManager,
    loginManager
};
