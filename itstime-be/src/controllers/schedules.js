import Schedule from '../models/schedules';

export const allSchedules =  async (req, res, next) => {
  console.log('inside it')
  // Find all schedules and return json response
  Schedule.find().lean().exec((err, schedules) => {
    console.log('schedules', schedules)
    res.json(
      // Iterate through each schedule
      {
        schedules: schedules.map(schedule => ({
          ...schedule
        }))
      }
    )
  }
  );
};

export const singleSchedule = (req, res, next) => {
  console.log('params', req.params)
  console.log('query', req.query)
  res.status(200).send('Something broke!')
};