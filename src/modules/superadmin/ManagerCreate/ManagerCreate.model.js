const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const ManagerCreateSchema = new mongoose.Schema({
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
ManagerCreateSchema.methods.generateAuthToken = function() {
    const payload = {
        _id: this._id,
        username: this.username,
        email: this.email,
        role: this.role,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
};

const ManagerCreateModel = mongoose.model('Managers', ManagerCreateSchema);

module.exports = ManagerCreateModel;
