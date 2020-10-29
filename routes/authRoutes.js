const router = require('express').Router();
const passport = require('passport');

// Auth Login
router.get('/login', (req, res) => {
	res.render('login');
});

// Auth with google
router.get(
	'/google',
	passport.authenticate('google', {
		scope: ['profile', 'email'],
	})
);

// Callback Google Redirect
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
	res.redirect('/profile');
});

// Auth logout
router.get('/logout', (req, res) => {
	// Passport (Logging out)
	send('Logging... out');
});

module.exports = router;
