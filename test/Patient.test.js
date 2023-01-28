const Patient = require('./Patient');

test(' When web application controller delete patient from system , system will delete patient and update patient count to system,  in this test count is 20 and delete one user, answer shoud be 19', () => {
  expect(Patient(20, 1)).toBe(19);
});