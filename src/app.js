// app.js
const express = require('express');
const app = express();
const cors = require('cors');
// 📁 Routes
const superAdminRoutes = require('./routes/superAdmin.routes');

// 🔌 Middleware
app.use(cors()); 
app.use(express.json()); 
app.use('/api/superadmin', superAdminRoutes);


app.get('/', (req, res) => {
    
    res.send('🚀 SuperAdmin API working!');
});

module.exports = app;
