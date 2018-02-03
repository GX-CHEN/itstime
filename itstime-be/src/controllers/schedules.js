import Schedule from '../models/schedules';

export const index = (req, res, next) => {
  // Find all movies and return json response
  Schedule.find().lean().exec((err, schedules) => res.json(
    // Iterate through each movie
    { schedules: schedules.map(schedule => ({
      ...schedule
    }))}
  ));
};