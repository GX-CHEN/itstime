import Schedule from '../models/schedules';

export const allSchedules = (req, res, next) => {
  // Find all schedules and return json response
  Schedule.find().lean().exec((err, schedules) => res.json(
    // Iterate through each schedule
    { schedules: schedules.map(schedule => ({
      ...schedule
    }))}
  ));
};

export const singleSchedule = (req, res, next) => {
  console.log('params', req.params)
  console.log('query', req.query)
  res.status(200).send('Something broke!')
};