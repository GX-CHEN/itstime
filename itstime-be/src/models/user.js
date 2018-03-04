var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username: String,
  password: String
}, { timestamps: true });

export default mongoose.model('User', UserSchema);