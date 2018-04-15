import { Router } from "express";
import {
  allSchedules,
  getSchedule,
  removeSchedule,
  addSchedule,
  personalSchedules,
  addScheduleItem,
  removeScheduleItem,
  updateScheduleItem
} from "./controllers/schedules";
import { signup, login } from "./controllers/user";

const router = Router();

router.route("/allSchedules").get(allSchedules);

router.route("/personalSchedules").get(personalSchedules);

router.route("/schedule").get(getSchedule);

router.route("/removeSchedule").get(removeSchedule);

router.route("/addSchedule").get(addSchedule);

router.route("/removeScheduleItem").post(removeScheduleItem);

router.route("/addScheduleItem").post(addScheduleItem);

router.route("/updateScheduleItem").post(updateScheduleItem);

router.route("/login").post(login);

router.route("/signup").post(signup);

export default router;
