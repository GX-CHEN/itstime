import mongoose from 'mongoose';
import User from '../models/user';
import { populateInitialSchedules } from '../populate_initial_data';

export const signup = async (req, res, next) => {
  await mongoose.connect('mongodb://localhost/itstime');
  const data = req.query;

  User.find({ username: data.username }, async function (err, docs) {
    if (docs.length) {
      res.status(200).send('user already exist')
    } else {
      const user = new User({...data, scheduleIds: await populateInitialSchedules()});
      await user.save();
      res.status(200).send('signup success')
    }
    mongoose.connection.close();
  });

};

export const login = async (req, res, next) => {
  await mongoose.connect('mongodb://localhost/itstime');
  const data = req.query;
  User.find(data, function (err, docs) {
    if (docs.length) {
      res.status(200).send('login success')
    } else {
      res.status(200).send('login fail')
    }
    mongoose.connection.close();
  });

};
