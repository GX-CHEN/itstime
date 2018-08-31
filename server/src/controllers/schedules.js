import Schedule from '../models/schedules';
import User from '../models/user';
import mongoose from 'mongoose';

export const personalSchedules = async (req, res, next) => {
  await mongoose.connect('mongodb://localhost/itstime');
  const personId = req.query.id;
  return User.find({ _id: personId })
    .select('scheduleIds -_id')
    .exec(async (err, item) => {
      const scheduleIds = item[0].scheduleIds.map(id => mongoose.Types.ObjectId(id));
      return await Schedule.find({
        _id: { $in: scheduleIds }
      })
        .lean()
        .exec((err, item) => {
          return res.status(200).send(item);
        });
    });
};

export const getSchedule = async (req, res, next) => {
  await mongoose.connect('mongodb://localhost/itstime');
  return await Schedule.find({ _id: req.query.id })
    .lean()
    .exec((err, item) => {
      return res.status(200).send(item);
    });
};

export const addSchedule = async (req, res, next) => {
  await mongoose.connect('mongodb://localhost/itstime');
  const { name, personId } = req.body;
  const schedule = new Schedule({ scheduleName: name, scheduleItems: [] });
  await schedule.save();
  const _id = schedule._id;
  await User.update({ _id: personId }, { $push: { scheduleIds: _id } }, function(err, numAffected) {
    console.log('err, numAffected', err, numAffected);
  });
  return res.status(200).send('schedule created succeeded');
};

export const removeSchedule = async (req, res, next) => {
  await mongoose.connect('mongodb://localhost/itstime');
  const { scheduleId } = req.body;
  return await Schedule.remove({ _id: scheduleId }, err => {
    if (!err) {
      return res.status(200).send('schedule removed succeed' + req.query.id);
    }
  });
};

export const addScheduleItem = async (req, res, next) => {
  await mongoose.connect('mongodb://localhost/itstime');
  const { scheduleId, name, time, description } = req.body;
  await Schedule.update({ _id: scheduleId }, { $addToSet: { scheduleItems: { name, time, description } } }, function(
    err,
    numAffected
  ) {
    console.log('err, numAffected', err, numAffected);
    return res.status(200).send('schedule item created succeeded' + name + time);
  });
};

export const removeScheduleItem = async (req, res, next) => {
  await mongoose.connect('mongodb://localhost/itstime');
  const { scheduleId, itemId } = req.body;
  await Schedule.update({ _id: scheduleId }, { $pull: { scheduleItems: { _id: itemId } } }, function(err, numAffected) {
    console.log('err, numAffected', err, numAffected);
    return res.status(200).send('schedule item deleted succeeded' + itemId);
  });
};

export const updateScheduleItem = async (req, res, next) => {
  await mongoose.connect('mongodb://localhost/itstime');
  const { scheduleId, itemId, name, time, description } = req.body;
  await Schedule.update(
    { _id: scheduleId, 'scheduleItems._id': itemId },
    {
      $set: { 'scheduleItems.$.name': name, 'scheduleItems.$.time': time, 'scheduleItems.$.description': description }
    },
    function(err, numAffected) {
      console.log('err, numAffected', err, numAffected);
      return res.status(200).send('schedule item updated succeeded' + itemId);
    }
  );
};
