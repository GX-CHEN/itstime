import mongoose, { Schema } from 'mongoose';

// Define schedule schema
var scheduleSchema = new Schema({
  scheduleName: String,
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