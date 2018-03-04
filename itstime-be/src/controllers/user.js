import mongoose from 'mongoose';
import User from '../models/user';

export const signup = async (req, res, next) => {
  await mongoose.connect('mongodb://localhost/itstime');
  const data = req.query;
  const user = new User(data);

  User.find({ username: data.username }, function (err, docs) {
    if (docs.length) {
      console.log('user exist')
      res.status(200).send('user already exist')
    } else {
      console.log('not exist')
      user.save();
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
      console.log('exist')
      res.status(200).send('login success')
    } else {
      console.log('not exist')
      res.status(200).send('login fail')
    }
    mongoose.connection.close();
  });

};
