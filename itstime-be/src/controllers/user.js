import mongoose from 'mongoose';
import User from '../models/user';
import { populateInitialSchedules } from '../populate_initial_data';

export const signup = async (req, res, next) => {
  await mongoose.connect('mongodb://localhost/itstime');
  const data = req.body;

  User.find({ username: data.username }, async function(err, docs) {
    if (docs.length) {
      res.status(200).send(`user ${data.username} already exist`);
    } else {
      const user = new User({ ...data, scheduleIds: await populateInitialSchedules() });
      await user.save();
      res.status(200).send(user._id);
    }
    mongoose.connection.close();
  });
};

export const login = async (req, res, next) => {
  await mongoose.connect('mongodb://localhost/itstime');
  const data = req.body;
  User.find(data, function(err, docs) {
    if (docs.length) {
      return res.status(200).send(docs[0]._id);
    } else {
      res.status(200).send('login fail');
    }
    mongoose.connection.close();
  });
};
