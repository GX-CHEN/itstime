import Schedule from '../models/schedules';
import mongoose from 'mongoose';

export const allSchedules = async (req, res, next) => {
  await mongoose.connect('mongodb://localhost/schedules');

  // Find all schedules and return json response
  return await Schedule.find().lean().exec(async (err, schedules) => {
    mongoose.connection.close();
    return await res.json(
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
  mongoose.connect('mongodb://localhost/schedules');
  console.log('params', req.params)
  console.log('query', req.query)
  res.status(200).send('Something broke!')
  mongoose.connection.close();
};