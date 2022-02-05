import { Sequelize } from 'sequelize-typescript';

require('dotenv').config();

const config = {
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

if (process.env.NODE_ENV == 'test'){
  config.database = process.env.DB_TEST_NAME;
}

/*
  I used `!` here, because I'm gonna check anyway to see if these
  env variables are passed or not when the server starts
  refer to checking-env-variables.ts for reference
*/
const sequelize = new Sequelize(config.database!, config.username!, config.password, {
  host: config.host,
  dialect: 'postgres',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const startDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export { sequelize, startDbConnection};