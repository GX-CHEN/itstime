import mongoose, { Schema } from 'mongoose';

// Define schedule schema
var scheduleSchema = new Schema({
  scheduleName: {
    type: String,
    unique: true,
  },
  scheduleItems: Array,
});

// Export Mongoose model
export default mongoose.model('schedules', scheduleSchema);