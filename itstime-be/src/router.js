import express, { Router } from 'express';
import { allSchedules, singleSchedule } from './controllers/schedules';
import { signup, login} from './controllers/user';

const router = Router();

router.route('/schedules')
  .get(allSchedules);

router.route('/schedule')
  .get(singleSchedule);

router.route('/login')
  .get(login);

router.route('/signup')
  .get(signup);

export default router;