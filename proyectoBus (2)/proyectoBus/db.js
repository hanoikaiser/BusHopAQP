const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('rutasdb', 'postgres', '2521', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres'
});

module.exports = sequelize;
