module.exports = (req, res, next) => {
    if (req.session.adminId) {
        return next();
    }
    res.redirect('/landingPage/admin');
};
