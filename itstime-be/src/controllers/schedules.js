import Schedule from '../models/schedules';
import User from '../models/user';
import mongoose from 'mongoose';

export const allSchedules = async (req, res, next) => {
  await mongoose.connect('mongodb://localhost/itstime');

  return Schedule.find().lean().exec(async (err, schedules) => {
    mongoose.connection.close();
    return res.json(
      {
        schedules: schedules.map(schedule => ({
          ...schedule
        }))
      }
    )
  }
  );
};

export const personalSchedules = async (req, res, next) => {
  await mongoose.connect('mongodb://localhost/itstime');
  const personId = req.query.id;
  // Find schedule Ids based on the personId
  return User.find({ _id: personId }).select('scheduleIds -_id').exec(
    async (err, item) => {
      const scheduleIds = item[0].scheduleIds.map(id => mongoose.Types.ObjectId(id))
      return await Schedule.find(
        {
          '_id': { $in: scheduleIds }
        }
      ).lean().exec((err, item) => {
        return res.status(200).send(item)
      })
    }
  );
};

export const singleSchedule = async (req, res, next) => {
  await mongoose.connect('mongodb://localhost/itstime');
  console.log('params, query', req.params, req.query)
  res.status(200).send('Something broke!')
  mongoose.connection.close();
};