import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

// schedules will be a list of ids refer to specific schedule (notice each schedule contains nested scheduleItems)
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    scheduleIds: { type: Array, default: [] }
  },
  { timestamps: true }
);

//hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
  const user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

export { UserSchema };
export default mongoose.model('User', UserSchema);
