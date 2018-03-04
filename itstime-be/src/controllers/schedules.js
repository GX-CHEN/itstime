import Schedule from '../models/schedules';
import mongoose from 'mongoose';

// Connect to MongoDB
mongoose.connect('mongodb://localhost/schedules');

export const allSchedules =  async (req, res, next) => {
  // Find all schedules and return json response
  return Schedule.find().lean().exec((err, schedules) => {
    return res.json(
      // Iterate through each schedule
      {
        schedules: schedules.map(schedule => ({
          ...schedule
        }))
      }
    )
  }
  );
};

export const singleSchedule = (req, res, next) => {
  console.log('params', req.params)
  console.log('query', req.query)
  res.status(200).send('Something broke!')
};