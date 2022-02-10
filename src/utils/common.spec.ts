import { truncateDB } from '../../spec/utils';
import Common from './common';
import { sequelize } from '../../config/sequelize';
import { QueryTypes } from 'sequelize';

describe('CommonRepository', function() {

  describe('Testing dbInsertion Function', function() {
    beforeEach(async() => {
      await truncateDB();
    });

    // Success scenarios
    it('inserts a record', async function() {
      await Common.dbInsertion('users', {
        firstname: 'user',
        lastname: 'test',
        email: 'test@test.com',
        password: 'password',
      });

      const users = Array.from(
        await sequelize.query('SELECT * from users;', { type: QueryTypes.SELECT }),
      );
      expect(users.length).toBe(1);

      const user = users[0] as any;
      expect(user.firstname).toBe('user');
      expect(user.email).toBe('test@test.com');
    });
  });

  describe('Testing dbFetch Function', function() {
    beforeEach(async() => {
      await truncateDB();
    });

    it('fetches records', async function() {
      await sequelize.query(
        `
          INSERT INTO users(firstname,lastname,email,password)
          VALUES('user1','test1','test1@test.com','password');
        `, { type: QueryTypes.INSERT });
      await sequelize.query(
        `
          INSERT INTO users(firstname,lastname,email,password)
          VALUES('user2','test2','test2@test.com','password');
        `, { type: QueryTypes.INSERT });

      // testing the selections
      const usersEmails = await Common.dbFetch('users', null, ['email']) as any[];
      // testing the conditions
      const secondUser = await Common.dbFetch('users', { email: 'test2@test.com' }) as any[];

      expect(usersEmails.length).toBe(2);
      // as we didn't put firstname in fields selections
      expect(usersEmails[0].firstname).not.toBeDefined();
      expect(usersEmails[0].email).toBe('test1@test.com');
      expect(usersEmails[1].email).toBe('test2@test.com');

      expect(secondUser.length).toBe(1);
      // here we didn't pass a selection, so it will being all fields
      expect(secondUser[0].firstname).toBe('user2');
      expect(secondUser[0].email).toBe('test2@test.com');

    });
  });

  describe('Testing dbUpdate Function', function() {
    beforeEach(async() => {
      await truncateDB();
    });

    it('updates records', async function() {
      await sequelize.query(
        `
          INSERT INTO users(firstname,lastname,email,password)
          VALUES('user1','test1','test1@test.com','password');
        `, { type: QueryTypes.INSERT });
      await sequelize.query(
        `
          INSERT INTO users(firstname,lastname,email,password)
          VALUES('user2','test2','test2@test.com','password');
        `, { type: QueryTypes.INSERT });

      await Common.dbUpdate(
        'users',
        { email: 'me@me.com' },
        { email: 'test1@test.com' },
      );
      const users = Array.from(
        await sequelize.query('SELECT * FROM users ORDER BY id ASC;', { type: QueryTypes.SELECT }),
      ) as any[];

      expect(users.length).toBe(2);
      expect(users[0].email).toBe('me@me.com');
      expect(users[1].email).toBe('test2@test.com');
    });
  });

  describe('Testing dbDeletion Function', function() {
    beforeEach(async() => {
      await truncateDB();
    });

    it('deletes records', async function() {
      await sequelize.query(
        `
          INSERT INTO users(firstname,lastname,email,password)
          VALUES('user1','test1','test1@test.com','password');
        `, { type: QueryTypes.INSERT });
      await sequelize.query(
        `
          INSERT INTO users(firstname,lastname,email,password)
          VALUES('user2','test2','test2@test.com','password');
        `, { type: QueryTypes.INSERT });

      await Common.dbDeletion('users', { email: 'test1@test.com'});

      const users = Array.from(
        await sequelize.query('SELECT * from users;', { type: QueryTypes.SELECT }),
      ) as any[];

      expect(users.length).toBe(1);
      expect(users[0].email).toBe('test2@test.com');
    });
  });

});
