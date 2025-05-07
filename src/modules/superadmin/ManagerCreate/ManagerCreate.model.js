const mongoose = require('mongoose');

const ManagerCreate = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: 'manager',
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
    },
}, { timestamps: true });

const MangerCreate = mongoose.model('Managers', ManagerCreate);

module.exports = MangerCreate;
