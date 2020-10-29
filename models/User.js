/*  Mongoose module */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
	username: { type: String },
	email: { type: String, unique: true },
	googleID: { type: String },
});

module.exports = mongoose.model('User', userSchema);
