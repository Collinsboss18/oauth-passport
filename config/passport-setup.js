const mongoose = require('mongoose');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/User');

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
	const user = await User.findById(id);
	done(null, user);
});
passport.use(
	new GoogleStrategy(
		{
			// Options for the google stats
			callbackURL: '/auth/google/redirect',
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
		},
		async (accessToken, refreshToken, profile, done) => {
			// CB Function
			const uProfile = profile._json;
			try {
				const currentUser = await User.findOne({ googleID: uProfile.sub });
				if (currentUser) {
					done(null, currentUser);
					console.log('User is' + currentUser);
				} else {
					newUser = new User({
						_id: new mongoose.Types.ObjectId(),
						username: uProfile.name,
						email: uProfile.email,
						googleID: uProfile.sub,
					}).save();
					done(null, newUser);
					console.log('User created' + newUser);
				}
			} catch (err) {
				console.log(err.message);
			}
		}
	)
);
