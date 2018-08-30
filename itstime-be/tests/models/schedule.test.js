import Schedule from "../../src/models/schedules";

describe('schedule schema test', function () {
  it('should be invalid if require field is empty', function (done) {
    const schedule = new Schedule();

    schedule.validate(function (err) {
      expect(err.errors.scheduleName).toBeTruthy();
      expect(err.errors.scheduleItems).toBeFalsy();
      done();
    });
  });
});