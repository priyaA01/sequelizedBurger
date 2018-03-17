var db = require("../models");
var Sequelize = require("sequelize");

const Op = Sequelize.Op;

// Routes
// =============================================================
module.exports = function (app) {
  // Get all burgers
  app.get("/api", function (req, res) {
    db.Burger.findAll({}).then(function (results) {
      res.json(results);
    });
  });

  // update burger 
  app.get("/api/update/:id", function (req, res) {
    db.Burger.update({
      devoured: true
    }, {
      where: {
        id: req.params.id
      }
    }).then(function (results) {

      res.json(results);
    });


  });

  // Add a burger
  app.post("/api/new", function (req, res) {
    db.Burger.create({
      burger_name: req.body.burger_name

    }).then(function (results) {
      res.json(results);
    });
  });

  // Delete a burger
  app.post("/api/delete", function (req, res) {
    db.Burger.destroy({
      where: {
        devoured: {
          [Op.or]: [true, false]
        }
      }
    }).then(function (results) {
      res.json(results);
    });
  });
};