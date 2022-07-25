const Sequelize = require('sequelize');

const connection = new Sequelize('db_name', 'db_user', 'db_password',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;
