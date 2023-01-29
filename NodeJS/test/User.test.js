const Patient = require('./User');

test(' When web application controller delete user from system , system will delete patient and update users  count to system , in this test count is 10 and delete one user, answer shoud be 9', () => {
  expect(Patient(10, 1)).toBe(9);
});