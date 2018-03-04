import mongoose from 'mongoose';
import Schedule from "./models/schedules";

const schedules = [
  {
    scheduleName: 'Healthy Life Style',
    scheduleItems: [
      {
        name: 'Wake up',
        time: '7:00',
        description: 'According to chronobiologists (specialists in the study of the body\'s physiological rhythms), our internal alarm clocks are programmed to go off after seven to eight hours sleep, which means I, like most people, get a biological wake-up call at around 7am.'
      }, {
        name: 'Eat Breakfast',
        time: '9:25',
        description: 'Studies at the University of Leeds by Professor John Blundell have shown that people who eat a breakfast that is high in carbohydrate and low in fat are less likely to binge on high-calories foods later in the day.'
      }, {
        name: 'Take light lunch',
        time: '12:20',
        description: 'The body\'s digestive processes reach top speed at around midday, so now is the time to stop for a light meal.'
      }, {
        name: 'Work out',
        time: '17:15',
        description: 'It is no coincidence that many Olympic records are broken at around this time - in fact, very few have ever been set before noon.'
      }, {
        name: 'Dinner',
        time: '18:00',
        description: 'Eating too much at this time of day can overload the digestive system. '
      }, {
        name: 'Bed Time',
        time: '22:15',
        description: 'Between 10pm and 11pm is said to be the best time to go to bed.\n' +
          'As heart-rate falls slowly this is when my body releases a further surge of sleep hormones.'
      }
    ]
  },
  {
    scheduleName: 'Productive Day',
    scheduleItems: [
      {
        name: 'Wake up',
        time: '6:00',
        description: 'Never use the snooze button again as it confuses your brain and body'
      }, {
        name: 'Eat Breakfast',
        time: '7:30',
        description: 'Shower, workout before breakfast'
      }, {
        name: 'Working on demanding tasks',
        time: '9:00',
        description: 'Ignore social media in the morning'
      }, {
        name: 'Packed lunch or order in',
        time: '13:00',
        description: 'You can also meet a business partner over lunch'
      }, {
        name: 'Working on easier and monotonous tasks',
        time: '14:00',
        description: 'Use the Pomodoro Technique, work in 25-minute intervals, with 5-minute breaks.'
      }, {
        name: 'Going to sleep',
        time: '23:00',
        description: 'Your brain needs at least 7H of sleep every night.'
      }
    ]

  },
  {
    scheduleName: 'Early Birds Schedule',
    scheduleItems: [
      {
        name: 'Eat Breakfast',
        time: '6:00',
        description: 'The best time is within 30 minutes of waking up'
      }, {
        name: 'Exercise',
        time: '6:30',
        description: 'It can be easier to stick with a morning exercise routine because the timing is less likely to conflict with other responsibilities'
      }, {
        name: 'Coffee Break',
        time: '10:00',
        description: 'Aim for mid morning to optimize productivity. Coffee is most effective between 9am and 10:30am when cortisol (a natural hormone that regulates energy) levels are lower.'
      }, {
        name: 'Eat lunch',
        time: '12:00',
        description: 'Take a break at lunch and get away from your work space instead of eating at your computer.'
      }, {
        name: 'Eat a snack',
        time: '15:00',
        description: 'Make sure you don\'t have too long of a gap between lunch and dinner.'
      }, {
        name: 'Eat dinner',
        time: '18:00',
        description: 'Try to eat at least three hours before going to bed to maintain a healthy metabolism'
      }, {
        name: 'Relax and Pursue interests',
        time: '20:00',
        description: 'If you have a side project or artistic hobby, the late evening is a good time for creativity, as fatigue lowers inhibitions and opens you up to unusual ideas.'
      }, {
        name: 'Going to sleep',
        time: '21:30',
        description: 'Adults should aim to get between seven and nine hours of sleep each night.'
      }
    ]
  }
  ,
  {
    scheduleName: 'Night Owls Schedule',
    scheduleItems: [
      {
        name: 'Eat Breakfast',
        time: '7:00',
        description: 'The best time is within 30 minutes of waking up'
      }, {
        name: 'Coffee Break',
        time: '10:00',
        description: 'Aim for mid morning to optimize productivity. Coffee is most effective between 9am and 10:30am when cortisol (a natural hormone that regulates energy) levels are lower.'
      }, {
        name: 'Eat Lunch',
        time: '12:00',
        description: 'Take a break at lunch and get away from your work space instead of eating at your computer.'
      }, {
        name: 'Take a break',
        time: '15:00',
        description: 'Make time to refresh for 10 to 30 minutes for the rest of the afternoon.'
      }, {
        name: 'Exercise',
        time: '18:00',
        description: 'This is when reaction time is quickest, blood pressure and heart rate are lowest, and body temperature is almost at its peak. Be sure to eat a snack before the workout if you haven\'t eaten since lunch.'
      }, {
        name: 'Eat dinner',
        time: '20:30',
        description: 'Try to eat at least three hours before going to bed to maintain a healthy metabolism'
      }, {
        name: 'Relax and Pursue interests',
        time: '21:30',
        description: 'If you have a side project or artistic hobby, the late evening is a good time for creativity, as fatigue lowers inhibitions and opens you up to unusual ideas.'
      }, {
        name: 'Going to sleep',
        time: '23:30',
        description: 'Adults should aim to get between seven and nine hours of sleep each night.'
      }
    ]

  }
];

console.log('inside populate')
// Connect to MongoDB
mongoose.connect('mongodb://localhost/schedules');

// Go through each schedule
schedules.map(data => {
  // Initialize a model with movie data
  const schedule = new Schedule(data);
  // and save it into the database
  schedule.save();
});

mongoose.connection.close()