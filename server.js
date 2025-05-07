require('dotenv').config(); // .env faylni o'qish
const app = require('./src/app'); // app.js dan Express ilovani import qilish
const { connectDB } = require('./src/config/database'); // MongoDB ulanishi uchun
const SuperAdmin = require('./src/modules/superadmin/Login/superadmin.model'); // SuperAdmin modelini import qilish
const bcrypt = require('bcrypt'); 
const PORT = process.env.PORT || 5000;

const createDefaultSuperAdmin = async () => {
    try {
        const existingSuperAdmin = await SuperAdmin.findOne({ role: 'superadmin' });
        if (existingSuperAdmin) {
            console.log('SuperAdmin already exists');
            return;
        }
        const plainPassword = 'P@ssw0rd';
        const hashedPassword = await bcrypt.hash(plainPassword, 10); 


        const superAdmin = new SuperAdmin({
            username: 'SuperAdmin',
            name: 'Azamjonbro',
            email: 'azamjonbro@gmail.com',
            password: hashedPassword, 
            role: 'superadmin',
        });
        await superAdmin.save();
        console.log('Default SuperAdmin created successfully');
    } catch (error) {
        console.error('Error creating SuperAdmin:', error);
    }
};

app.listen(PORT, () => {
    connectDB(); 
    createDefaultSuperAdmin(); 
    console.log(`🚀 MongoDB connected`);
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
