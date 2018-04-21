import mongoose from 'mongoose';
import User from '../models/user';
import { populateInitialSchedules } from '../populate_initial_data';
import bcrypt from 'bcrypt';

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

// export const login = async (req, res, next) => {
//   await mongoose.connect('mongodb://localhost/itstime');
//   const data = req.body;
//   User.find(data, function(err, docs) {
//     if (docs.length) {
//       return res.status(200).send(docs[0]._id);
//     } else {
//       res.status(200).send('login fail');
//     }
//     mongoose.connection.close();
//   });
// };

export const login = async (req, res, next) => {
  await mongoose.connect('mongodb://localhost/itstime');
  const { username, password } = req.body;

  User.findOne({ username: username }).exec(function(err, user) {
    if (err) {
      return res.status(200).send('login fail, something went wrong');
    } else if (!user) {
      return res.status(200).send(`login fail, user ${username} not exist`);
    } else {
      bcrypt.compare(password, user.password, function(err, result) {
        if (result === true) {
          return res.status(200).send(user._id);
        } else {
          return res.status(200).send(`login fail, wrong password ${password}`);
        }
      });
    }
  });
};
