const express = require('express');
const router = express.Router();
const Admin = require('../../models/Admin');

// GET route to render admin login form
router.get('/LandingPage/admin', (req, res) => {
    const { error } = req.query; // Extract error message from query params
    res.render('adminSide/adminLogin', { error: error ? 'Invalid credentials!' : '' });
});

router.post('/landingPage/admin', async (req, res) => {
    const { username, password } = req.body;
    try {
        // Check if admin exists
        const admin = await Admin.findOne({ username, password });
        if (admin) {
            // Admin found, redirect to admin dashboard
            res.redirect("/LandingPage/admin/dashboard");
        } else {
            // Admin not found, redirect to login page with error message
            res.redirect('/LandingPage/admin?error=true');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
