const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Admin = require('../../models/Admin');
const authenticateToken = require('../../middlewares/authenticateToken');
require('dotenv').config();


// Apply token authentication middleware to all routes below
router.use(authenticateToken);

// POST route for admin login
router.post('/landingPage/admin', async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await Admin.findOne({ username });
        if (admin) {
            const match = await bcrypt.compare(password, admin.password);
            if (match) {
                const token = jwt.sign({ username: admin.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
                return res.status(200).send({ message: "Login successful", token });
            } else {
                return res.status(400).send({ error: "Invalid credentials" });
            }
        } else {
            return res.status(400).send({ error: "Invalid credentials" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Internal server error' });
    }
});

// POST route for admin registration
router.post('/landingPage/admin/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingAdmin = await Admin.findOne({ username });
        if (existingAdmin) {
            return res.status(400).send({ error: "Username already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 8);
        const newAdmin = new Admin({ username, password: hashedPassword });
        await newAdmin.save();

        return res.status(201).send({ message: "Admin registered successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Internal server error' });
    }
});


module.exports = router;
