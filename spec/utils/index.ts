import supertest from 'supertest';
import app from '../../app';
import Common from '../../src/utils/common';

const truncateDB = async () => {
  await Common.dbTruncate();
};

const signup = async () => {
  const randomId = Math.floor(Math.random() * 1000);
  const response = await supertest(app)
    .post('/users')
    .send({
      firstname: 'test',
      lastname: 'test',
      email: `test-${randomId}@test.com`,
      password: '123456',
    });
  const token = response.body.data.token;
  return 'Bearer ' + token;
};

export { truncateDB, signup };