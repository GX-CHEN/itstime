import express, { Router } from 'express';
// Import index action from movies controller
import { index } from './controllers/schedules';

// Initialize the router
const router = Router();

// Handle /movies.json route with index action from movies controller
router.route('/schedules.json')
  .get(index);

export default router;