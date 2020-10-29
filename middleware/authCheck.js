module.exports = (req, res, next) => {
    !req.user ? res.redirect('/auth/login') : next();
}