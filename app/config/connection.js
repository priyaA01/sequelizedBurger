// *********************************************************************************
// CONNECTION.JS - THIS FILE INITIATES THE CONNECTION TO MYSQL
// *********************************************************************************

// Dependencies
var Sequelize = require("sequelize");
var sequelize;
// Creates mySQL connection using Sequelize
if(process.env.JAWSDB_URL)
{
sequelize = new Sequelize(process.env.JAWSDB_URL);
}
sequelize = new Sequelize("sequelize_burger", "root", "welcome1", {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

// Exports the connection for other files to use
module.exports = sequelize;
