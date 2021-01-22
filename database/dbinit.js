const { Sequelize } = require('sequelize');
require('dotenv').config();

// params: database name, username, password (do NOT push your password to the GitHub!)
const sequelize = new Sequelize('crud', 'unode', 'root', {
  host: process.env.localhost,
  dialect: 'postgres',
  port: 5433,
});

const testDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully');
  } catch (error) {
    console.error('Unable to connect to database', error);
  }
};

console.log('process.env.host:', process.env.host);

testDatabase();

module.exports = { sequelize };
