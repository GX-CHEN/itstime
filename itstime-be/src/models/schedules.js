import mongoose, { Schema } from 'mongoose';

// Define schedule schema
var scheduleSchema = new Schema({
  scheduleName: String,
  scheduleItems: Array,
}, {collection: 'schedules'});

// Export Mongoose model
export default mongoose.model('schedule', scheduleSchema);