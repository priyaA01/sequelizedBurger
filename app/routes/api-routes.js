// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
var Burger = require("../models/burger.js");
var Sequelize = require("sequelize");

const Op = Sequelize.Op;

// Routes
// =============================================================
module.exports = function(app) {
  // Get all books
  app.get("/api", function(req, res) {
    Burger.findAll({}).then(function(results) {
      console.log("results" + results);
      res.json(results);
    });
  });

  // Get all books from a specific author
  app.get("/api/update/:id", function(req, res) {
      Burger.update(
        { devoured : true },
        { where: {id : req.params.id }}
       ).then(function(results){

        res.json(results);
       });

    
  });

  // Add a burger
  app.post("/api/new", function(req, res) {
   Burger.create({
      burger_name: req.body.burger_name

    }).then(function(results) {
    
      });
  });

  // Delete a book
  app.post("/api/delete", function(req, res) {
    console.log(req.body);
     Burger.destroy({
      where: {
        devoured: {
          [Op.or]: [true, false]
        }
      }
     }).then(function(results) {

      });
  });
};
