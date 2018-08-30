import User from "../../src/models/user";

describe('user schema test', function () {
  it('should be invalid if required field is empty', function (done) {
    const user = new User();

    user.validate(function (err) {
      expect(err.errors.username).toBeTruthy();
      expect(err.errors.password).toBeTruthy();
      expect(err.errors.scheduleIds).toBeFalsy();
      done();
    });
  });

  it('should create a valid user if username & password exist', function (done) {
    const user = new User({ username: "hello", password: "world" });
    expect(user.username).toBe("hello");
    expect(user.password).toBe("world");
    done();
  });
});