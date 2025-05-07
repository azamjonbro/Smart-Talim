const mongoose = require('mongoose');

const superAdminSettingsSchema = new mongoose.Schema({
    styled: {
        type: String,
        default:"dark",
    },
    fontFamily:{
        type: String,
        default:"'Poppins', sans-serif",
    },
    brandcolor: {
        type: String,
        default:"#0d6efd",
    },
    mainColor: {
        type: String,
        default:"#ccc",
    },
    notification: {
        type: String,
        default:false,
    },
    changedPassword: {
        type: String,
        default:false,
    },
    changedPasswordTime: {  
        type: String,
        default: new Date().toLocaleTimeString(),
    },

}, { timestamps: true });
const SuperAdminSettings = mongoose.model('SuperAdminSettings', superAdminSettingsSchema);
module.exports = SuperAdminSettings;