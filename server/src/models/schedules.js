import mongoose, { Schema } from 'mongoose';

// Define schedule schema
const scheduleSchema = new Schema({
  scheduleName: {
    type: String,
    required: true
  },
  scheduleItems: [
    {
      name: String,
      time: String,
      description: String 
    }
  ],
}, {collection: 'schedules'});

// Export Mongoose model
export default mongoose.model('schedule', scheduleSchema);