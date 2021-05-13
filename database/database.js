const Sequelize = require('sequelize');

const connection = new Sequelize('perguntas', 'root', '@Meui302015',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;