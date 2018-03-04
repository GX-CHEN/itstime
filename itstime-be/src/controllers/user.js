import mongoose from 'mongoose';
import User from '../models/user';

// Connect to MongoDB
mongoose.connect('mongodb://localhost/users');

export const signup = (req, res, next) => {
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
  });

};

export const login = (req, res, next) => {
  const data = req.query;
  User.find(data, function (err, docs) {
    if (docs.length) {
      console.log('exist')
      res.status(200).send('login success')
    } else {
      console.log('not exist')
      res.status(200).send('login fail')
    }
  });

};
