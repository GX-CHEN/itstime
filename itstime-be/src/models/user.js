var mongoose = require('mongoose');

// schedules will be a list of ids refer to specific schedule (notice each schedule contains nested scheduleItems)
var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  scheduleIds: { type : Array , "default" : [] }
}, { timestamps: true });

export default mongoose.model('User', UserSchema);