const SupperAdmin = require('./superadmin.model.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Super Admin yaratish
const createSuperAdmin = async (req, res) => {
    try {
        // 1. Faqat mavjud superadmin JWT orqali yangi superadmin yarata oladi
        const requester = req.user; // bu `auth middleware` orqali keladi
        if (requester.role !== 'superadmin') {
            return res.status(403).json({ message: 'Only superadmin can create another superadmin' });
        }

        // 2. Ma'lumotlarni ajratib olish
        const { username, name, email, password } = req.body;

        // 3. Email validatsiyasi (ixtiyoriy, express-validator bilan ham qilsa bo'ladi)
        if (!email || !password || !username || !name) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const normalizedEmail = email.toLowerCase();

        // 4. Email mavjudligini tekshirish
        const existingUser = await SupperAdmin.findOne({ email: normalizedEmail });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // 5. Parolni hash qilish
        const hashedPassword = await bcrypt.hash(password, 10);

        // 6. Yangi superadmin yaratish
        const newSuperAdmin = new SupperAdmin({
            username,
            name,
            email: normalizedEmail,
            password: hashedPassword,
            role: 'superadmin',
        });

        await newSuperAdmin.save();

        // 7. JWT token yaratish
        const token = jwt.sign(
            { id: newSuperAdmin._id, role: newSuperAdmin.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // 8. Javob qaytarish
        res.status(201).json({
            message: 'Super admin created successfully',
            user: {
                id: newSuperAdmin._id,
                username: newSuperAdmin.username,
                name: newSuperAdmin.name,
                email: newSuperAdmin.email,
                role: newSuperAdmin.role,
            },
            token,
        });

    } catch (error) {
        console.error('Error creating super admin:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const loginSuperAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const superAdmin = await SupperAdmin.findOne({ username });
        if (!superAdmin) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const isPasswordValid = await bcrypt.compare(password, superAdmin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ id: superAdmin._id, role: superAdmin.role , username:superAdmin.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({
            message: 'Login successful',
            user: {
                id: superAdmin._id,
                username: superAdmin.username,
                name: superAdmin.name,
                email: superAdmin.email,
                role: superAdmin.role,
            },
            token,
        });
    }
    catch (error) {
        console.error('Error logging in super admin:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const updateSuperAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, name, email, password } = req.body;
        const superAdmin = await SupperAdmin.findById(id);
        if (!superAdmin) {
            return res.status(404).json({ message: 'Super admin not found' });
        }
        if (username) superAdmin.username = username;
        if (name) superAdmin.name = name;
        if (email) superAdmin.email = email;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            superAdmin.password = hashedPassword;
        }
        await superAdmin.save();
        res.status(200).json({
            message: 'Super admin updated successfully',
            user: {
                id: superAdmin._id,
                username: superAdmin.username,
                name: superAdmin.name,
                email: superAdmin.email,
                role: superAdmin.role,
            },
        });
    }
    catch (error) {
        console.error('Error updating super admin:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    createSuperAdmin,
    loginSuperAdmin,
    updateSuperAdmin,
};
