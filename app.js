require('dotenv').config({ path: 'config.env' });
require('dotenv').config({ path: 'config.env' });
const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const passport = require('passport');
const cookieSession = require('cookie-session');
const server = http.createServer(app);
const port = process.env.PORT || 4000;

// Set View Engine and use Static Folder and Cookie Session
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname + '/public')));
app.use(
	cookieSession({
		maxAge: 24 * 60 * 60 * 1000,
		keys: [process.env.SESSION_KEY],
	})
);
// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Require Mongoose && PassportSetup
require('./config/db');
require('./config/passport-setup');

// Routes setup
app.use('/auth', require('./routes/authRoutes'));
app.get('/', (req, res) => res.render('home'));
app.get('*', (req, res) => res.render('errors/404'));

server.listen(port, () => console.log(`Server Listening on PORT ${port}`));
